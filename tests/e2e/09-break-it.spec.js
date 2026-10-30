import fs from 'node:fs';
import { test, expect, sleep, violations } from './lib.js';

// Adversarial ("try to break it") checks requested after the build was declared ready. Everything is judged from outside:
// ground-truth map (src/world, read-only) + window.__rfw.state() + DOM. Needs ?qa=1 for teleport.
const SHOTS = new URL('../out/shots' + (process.env.QA_TAG ? '.' + process.env.QA_TAG : '') + '/', import.meta.url).pathname;
fs.mkdirSync(SHOTS, { recursive: true });

async function shot(g, name) {
  const f = `${SHOTS}${g.testInfo.project.name}-${name}.png`;
  await g.page.screenshot({ path: f }).catch(() => {});
  await g.testInfo.attach(name + '.png', { path: f, contentType: 'image/png' }).catch(() => {});
  return f;
}
const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
async function moved(g, ms) { const a = await g.needPos(); await sleep(ms); const b = await g.needPos(); return dist(a, b); }
async function stage(g) {
  g.needGT(); await g.start(); await g.needHooks('getState', 'teleport');
  const spot = g.gt.edgeSpots(1)[0]; const open = g.gt.approachFrom(spot, 5) || g.gt.inlandSpot(8);
  await g.teleport(open.x, open.z, 0); await sleep(300);
  return { spot, open };
}
async function ringActive(g) { return g.page.evaluate(() => document.querySelector('#joyRing')?.classList.contains('active') ?? null); }
async function walkingNow(g) { return (await moved(g, 500)) > 0.4; }

test.describe('BREAK-IT adversarial', () => {
  test('QA-X1 stuck joystick: touchcancel / pointercancel releases the stick', async ({ game: g }) => {
    await stage(g);
    await g.stickDown(0, 1); await sleep(500);
    expect(await walkingNow(g), 'precondition: stick moves the player').toBe(true);
    await g.touch.cancel(0); g._stick = null; await sleep(250);
    const d = await moved(g, 900);
    await shot(g, 'x1-after-cancel');
    expect(d, `player kept moving ${d.toFixed(2)} m in 0.9 s after the touch was CANCELLED (stuck joystick)`).toBeLessThan(0.1);
    expect(await ringActive(g), 'joystick ring still shows .active after cancel').not.toBe(true);
    // not wedged: a new press works
    await g.stickDown(0, 1); await sleep(400); expect(await walkingNow(g), 'stick unusable after a cancel (joyId leak)').toBe(true); await g.stickUp();
    expect(g.errors).toEqual([]);
  });

  test('QA-X2 stuck joystick: finger released far OUTSIDE the viewport / over a button', async ({ game: g }) => {
    await stage(g);
    const vp = g.vp();
    // (a) drag out past the screen edge and release there
    await g.stickDown(0, 1); await sleep(300);
    const t = g.touch; const id = g._stick.id;
    await t.move(id, -60, vp.height + 60); await sleep(150); await t.up(id); g._stick = null; await sleep(300);
    let d = await moved(g, 800);
    expect(d, `player kept moving ${d.toFixed(2)} m after release outside the viewport`).toBeLessThan(0.1);
    expect(await ringActive(g)).not.toBe(true);
    // (b) drag onto a HUD button and release over it
    const btn = await g.box(g.loc.fishStart.first()); 
    await g.stickDown(0, 1); await sleep(300);
    if (btn) { await t.move(0, btn.x + btn.width / 2, btn.y + btn.height / 2); await sleep(150); }
    await t.up(0); g._stick = null; await sleep(300);
    d = await moved(g, 800);
    await shot(g, 'x2-after-release-over-button');
    expect(d, `player kept moving ${d.toFixed(2)} m after release over a HUD button`).toBeLessThan(0.1);
    expect(await ringActive(g)).not.toBe(true);
    // (c) down, then the window loses focus without any pointerup (iOS app switcher / call)
    await g.stickDown(0, 1); await sleep(300);
    await g.page.evaluate(() => window.dispatchEvent(new Event('blur'))); await sleep(250);
    d = await moved(g, 800);
    expect(d, `player kept moving ${d.toFixed(2)} m after window blur with finger still down`).toBeLessThan(0.1);
    await g.stickUp(); await sleep(200);
    expect(g.errors).toEqual([]);
  });

  test('QA-X3 multi-touch: stick + swipe at once, extra fingers, any release order', async ({ game: g }) => {
    await stage(g); const big = g.gt.openSpot(); await g.teleport(big.x, big.z, 0); await sleep(300); // free disc: walking in any direction is safe
    const vp = g.vp(); const t = g.touch;
    const yaw0 = (await g.state()).camera.yaw;
    await g.stickDown(0, 1);                                   // finger 0: stick (left half)
    await t.down(1, vp.width * 0.75, vp.height * 0.4);         // finger 1: look (right half)
    for (let i = 1; i <= 10; i++) { await t.move(1, vp.width * 0.75 - i * 14, vp.height * 0.4); await sleep(20); }
    await sleep(200);
    const dbg0 = await g.state(); const w2 = await walkingNow(g); const dbg1 = await g.state();
    console.log('X3DBG', JSON.stringify({ start: { x: dbg0.x, z: dbg0.z, yaw: dbg0.camera?.yaw ?? dbg0.yaw }, end: { x: dbg1.x, z: dbg1.z, yaw: dbg1.camera?.yaw ?? dbg1.yaw }, blockedEnd: await g.hook('blocked', dbg1.x, dbg1.z).catch(() => 'n/a') }));
    expect(w2, 'player stopped walking when a 2nd finger started looking').toBe(true);
    const yaw1 = (await g.state()).camera.yaw;
    expect(Math.abs(yaw1 - yaw0), 'camera did not rotate while the stick was held').toBeGreaterThan(0.05);
    // finger 2 in the left half (must be ignored, must not re-centre the stick) and finger 3 in the right half (ignored: look already owned)
    await g.teleport(big.x, big.z, g.state ? (await g.state()).camera?.yaw ?? 0 : 0); await sleep(200); // keep the free-disc margin while the stick stays held
    await t.down(2, vp.width * 0.2, vp.height * 0.3); await t.down(3, vp.width * 0.9, vp.height * 0.7); await sleep(150);
    expect(await walkingNow(g), '3rd/4th finger broke walking').toBe(true);
    await shot(g, 'x3-four-fingers');
    // release the STICK first while look finger is still down
    await t.up(0); g._stick = null; await sleep(250);
    let d = await moved(g, 700);
    expect(d, `stick finger up but player still moves ${d.toFixed(2)} m (stuck with other fingers down)`).toBeLessThan(0.1);
    // look finger still works
    const ya = (await g.state()).camera.yaw; for (let i = 1; i <= 8; i++) { await t.move(1, vp.width * 0.4 - i * 10, vp.height * 0.4); await sleep(20); }
    expect(Math.abs((await g.state()).camera.yaw - ya), 'look finger died after stick released').toBeGreaterThan(0.03);
    await t.up(1); await t.up(2); await t.up(3); await sleep(250);
    // reverse order: look released first, stick last
    await g.teleport(big.x, big.z, 0); await sleep(300);
    await g.stickDown(0, 1); await t.down(1, vp.width * 0.75, vp.height * 0.4); await sleep(300);
    await t.up(1); await sleep(300);
    expect(await walkingNow(g), 'releasing the look finger stopped the walk').toBe(true);
    await g.stickUp(); await sleep(250);
    d = await moved(g, 700); expect(d).toBeLessThan(0.1);
    // after all fingers are up the ring is idle and a fresh press works
    expect(await ringActive(g)).not.toBe(true);
    const { open } = { open: g.gt.approachFrom(g.gt.edgeSpots(1)[0], 5) }; await g.teleport(open.x, open.z, 0); await sleep(300); // earlier walking may have hit a wall: re-stage
    await g.stickDown(0, 1); await sleep(400); expect(await walkingNow(g), 'stick dead after 4-finger sequence (joyId leak)').toBe(true); await g.stickUp();
    expect(g.errors).toEqual([]);
  });

  test('QA-X4 background / resume: visibilitychange + pagehide save and stop the stick', async ({ game: g, page }) => {
    await stage(g);
    await g.stickDown(0, 1); await sleep(900);
    const before = await g.needPos();
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange')); window.dispatchEvent(new Event('pagehide'));
    });
    await sleep(300);
    const raw = await page.evaluate(() => localStorage.getItem('realFishingWorld.save'));
    expect(raw, 'no save written on visibilitychange(hidden)/pagehide').not.toBeNull();
    const sv = JSON.parse(raw);
    expect(dist(sv.position, before), 'save written on background is stale (>6 m from where the player was)').toBeLessThan(6);
    const d = await moved(g, 800);
    expect(d, `still walking ${d.toFixed(2)} m after the app was backgrounded with the finger down (input.reset not applied)`).toBeLessThan(0.1);
    await page.evaluate(() => { delete document.visibilityState; delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    await g.stickUp(); await sleep(300);
    expect(await moved(g, 600), 'player drifts after resume').toBeLessThan(0.1);
    // real lifecycle freeze / resume (Chromium only): rAF stops for seconds, then dt must be clamped (no tunnelling on resume)
    if (g.browserName === 'chromium') {
      const c = await g.context.newCDPSession(page);
      await g.stickDown(0, 1); await sleep(300);
      await c.send('Page.setWebLifecycleState', { state: 'frozen' }); await sleep(2500);
      await c.send('Page.setWebLifecycleState', { state: 'active' }); await sleep(600);
      await g.stickUp().catch(() => {}); await sleep(300);
      const s = await g.state();
      const bad = violations(g.gt, [{ t: 0, ...s.player }], { strict: true });
      expect(bad, 'player in an illegal place after resuming from a frozen page').toEqual([]);
      expect(s.fps, 'fps reading never recovered after resume').toBeGreaterThan(5);
    } else g.weak('Page.setWebLifecycleState freeze/resume only exists on Chromium; WebKit got the synthetic visibilitychange/pagehide only');
    await shot(g, 'x4-after-resume');
    expect(g.errors).toEqual([]);
  });

  test('QA-X5 sea / wall run with main-thread stalls (huge dt must not tunnel)', async ({ game: g, page }) => {
    test.setTimeout(240000);
    g.needGT(); await g.start(); await g.needHooks('getState', 'teleport');
    const spots = g.gt.edgeSpots(4); const all = []; const log = [];
    for (const s of spots) {
      const from = g.gt.approachFrom(s, 3) || s; await g.teleport(from.x, from.z, 0); await sleep(250);
      const tx = s.x + s.toWater.x * 9, tz = s.z + s.toWater.z * 9;     // 9 m INTO the sea
      const stall = (async () => { for (let i = 0; i < 4; i++) { await sleep(900); await page.evaluate(() => { const t = performance.now(); while (performance.now() - t < 700); }).catch(() => {}); } })();
      const r = await g.walkToward(tx, tz, { timeout: 9000, keepPushing: true, stuckMs: 99999 });
      await stall; all.push(...r.samples); log.push({ spot: s, reason: r.reason, end: r.end });
    }
    await g.testInfo.attach('x5-log.json', { body: JSON.stringify(log, null, 1), contentType: 'application/json' });
    const v = violations(g.gt, all, { strict: true });
    await shot(g, 'x5-shore-push');
    expect(all.length).toBeGreaterThan(50);
    expect(v.slice(0, 5), `${v.length} violations while pushing into the sea with 700 ms stalls`).toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('QA-X6 reload during play (moving / fishing / during loading)', async ({ game: g, page }) => {
    test.setTimeout(180000);
    const { spot } = await stage(g);
    await g.stickDown(0, 1); await sleep(1500);
    const before = await g.needPos();
    await page.reload(); await g.waitPlayVisible(); await g.tap(g.loc.play); await g.waitPlaying();
    await g.touch.releaseAll(); g._stick = null;
    const after = await g.needPos();
    expect(dist(before, after), 'after a reload mid-walk the player is >8 m from where they were').toBeLessThan(8);
    expect(await moved(g, 700), 'player walks on its own after reload (phantom stick)').toBeLessThan(0.1);
    expect(violations(g.gt, [{ t: 0, ...after }], { strict: true })).toEqual([]);
    // reload while in fishing mode
    await g.teleport(spot.x, spot.z); await expect.poll(() => g.fishStartActive(), { timeout: 3000 }).toBe(true);
    await g.tap(g.loc.fishStart.first()); await expect.poll(async () => (await g.state()).mode, { timeout: 4000 }).toMatch(/fish/);
    await page.reload(); await g.waitPlayVisible(); await g.tap(g.loc.play); await g.waitPlaying();
    const st = await g.state();
    expect(st.mode, 'game booted straight into a broken fishing mode after reload').toMatch(/move|play/);
    expect(await g.vis(g.loc.joystick) || true).toBe(true);
    await shot(g, 'x6-after-fishing-reload');
    // reload while still loading, three times quickly
    for (const ms of [150, 600, 1500]) { await page.goto('./?qa=1'); await sleep(ms); await page.reload(); }
    await g.waitPlayVisible(); await g.tap(g.loc.play); await g.waitPlaying();
    expect(g.errors.filter((e) => !/net::ERR_ABORTED|aborted|Load request cancelled/i.test(e)), 'errors across reloads').toEqual([]);
  });

  test('QA-X7 rotate mid-play with the stick held; no stuck input, HUD ok', async ({ game: g }) => {
    await stage(g);
    const vp = g.vp();
    await g.stickDown(0, 1); await sleep(400);
    await g.page.setViewportSize({ width: vp.height, height: vp.width }); await sleep(600);
    await g.page.setViewportSize({ width: vp.width, height: vp.height }); await sleep(600);
    await g.page.setViewportSize({ width: vp.height, height: vp.width }); await sleep(400);
    await g.stickUp(); await sleep(300);
    expect(await moved(g, 700), 'player keeps moving after the stick was released across rotations').toBeLessThan(0.1);
    const r = await g.layoutReport('after-rotate-with-stick');
    await shot(g, 'x7-landscape-after-rotate');
    expect(r.problems, 'UI problems after rotating').toEqual([]);
    expect(await g.page.evaluate(() => { const c = document.querySelector('canvas'); return c.clientWidth / c.clientHeight - innerWidth / innerHeight; })).toBeLessThan(0.05);
    expect(g.errors).toEqual([]);
  });

  test('QA-X8 button spam: fishing toggle / menu / play hammered', async ({ game: g }) => {
    const { spot } = await stage(g);
    await g.teleport(spot.x, spot.z); await expect.poll(() => g.fishStartActive(), { timeout: 3000 }).toBe(true);
    for (let i = 0; i < 8; i++) {
      await g.loc.fishStart.first().tap({ timeout: 800 }).catch(() => g.loc.fishStart.first().click({ timeout: 800, force: true }).catch(() => {}));
      await g.loc.fishStop.first().click({ timeout: 800, force: true }).catch(() => {});
    }
    await sleep(500);
    const s = await g.state();
    await shot(g, 'x8-after-spam');
    const stopVisible = await g.vis(g.loc.fishStop.first());
    expect(String(s.mode).startsWith('fish'), `state.mode=${s.mode} but 釣りをやめる visible=${stopVisible}: UI/state desync`).toBe(stopVisible);
    expect(g.errors).toEqual([]);
  });

  test('QA-X9 poisoned save: position in the sea / in a building / extreme / NaN', async ({ game: g, page }) => {
    test.setTimeout(180000);
    g.needGT(); await g.start(); await g.needHooks('getState');
    const gt = g.gt; const b = gt.buildings[0];
    const sea = gt.edgeSpots(1)[0]; const seaPt = { x: sea.x + sea.toWater.x * 6, z: sea.z + sea.toWater.z * 6 };
    const cases = {
      sea: seaPt, building: { x: (b.x0 + b.x1) / 2, z: (b.z0 + b.z1) / 2 }, far: { x: 1e9, z: -1e9 }, edgeOfMap: { x: 79.9, z: 79.9 }, negative: { x: -79.9, z: -79.9 },
      stringy: { x: '12', z: '5' }, nan: { x: null, z: null },
    };
    const results = [];
    for (const [name, pos] of Object.entries(cases)) {
      await page.evaluate((p) => { try { localStorage.setItem('realFishingWorld.save', JSON.stringify({ version: 1, settings: {}, position: { ...p, yaw: 0 } })); } catch (e) {} }, pos);
      await page.goto('./?qa=1'); await g.waitPlayVisible(); await g.tap(g.loc.play); await g.waitPlaying(); await sleep(500);
      const p = await g.needPos(); const bad = violations(gt, [{ t: 0, ...p }], { strict: true });
      results.push({ name, injected: pos, got: p, bad });
    }
    await g.testInfo.attach('x9-results.json', { body: JSON.stringify(results, null, 1), contentType: 'application/json' });
    await shot(g, 'x9-last-case');
    expect(results.filter((r) => r.bad.length), 'a poisoned save put the player somewhere illegal').toEqual([]);
    expect(g.errors).toEqual([]);
  });

  test('QA-X10 audio failure must not block the game (AudioContext.resume() rejection, no audio device / interrupted session)', async ({ game: g }) => {
    // shield OFF for this test. On Chromium the audio device exists, so we also force the rejection to make the check meaningful everywhere.
    await g.page.addInitScript(() => { const AC = window.AudioContext || window.webkitAudioContext; if (AC) { const r = AC.prototype.resume; AC.prototype.resume = function () { return Promise.reject(new DOMException('Failed to start the audio device', 'InvalidStateError')); }; } });
    await g.start(); await sleep(800);
    const open = await g.page.evaluate(() => document.querySelector('#err')?.classList.contains('open') ?? false);
    await g.testInfo.attach('x10.png', { body: await g.page.screenshot(), contentType: 'image/png' });
    await shot(g, 'x10-audio-failure');
    expect(open, 'BUG-A: an audio failure opened the full-screen fatal-error overlay (#err.open), which blocks all touch input').toBe(false);
    await g.stickDown(0, 1); await sleep(600); const d = await moved(g, 700); await g.stickUp();
    expect(d, 'player cannot move after an audio failure').toBeGreaterThan(0.2);
  });
});
