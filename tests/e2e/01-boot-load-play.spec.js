import { test, expect, T, sleep, SEL } from './lib.js';

test.describe('QA-01..03 boot / loading / play', () => {
  test('QA-01 boot: page loads, canvas + WebGL alive, not blank', async ({ game: g, page }) => {
    const res = await g.open();
    expect(res?.status(), 'index document HTTP status').toBe(200);
    // environment probe: if emulated browser has no WebGL at all, the game cannot be judged here.
    const gl = await page.evaluate(() => { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); });
    if (!gl) g.untested('this emulated browser exposes no WebGL – 3D boot cannot be judged (environment limit, not a game verdict)');
    await expect(g.loc.canvas, 'a <canvas> must exist (Three.js renderer attached)').toBeAttached({ timeout: 20000 });
    await g.waitPlayVisible().catch(() => {}); // title or loading, whichever – both are valid boot states; but must settle
    expect(await page.title(), 'document.title should not be empty').not.toBe('');
    const meta = await page.evaluate(() => document.querySelector('meta[name=viewport]')?.content || '');
    expect(meta, 'viewport meta must make the page mobile width').toMatch(/width=device-width/);
    g.note('viewport-meta', meta);
    // not a white / single-colour screen
    const a = await g.frame({ x: 0, y: 0, w: 1, h: 1 }), b = await g.frame({ x: 0, y: 0, w: 1, h: 1 });
    const d = await g.diff(a, b);
    g.note('boot-frame', `stdev=${d.stdA.toFixed(1)} colours=${d.colorsA}`);
    expect(d.colorsA, 'first screen has only a handful of colours – blank / white screen?').toBeGreaterThan(6);
    const lost = await page.evaluate(() => { const c = document.querySelector('canvas'); const g = c.getContext('webgl2') || c.getContext('webgl'); return g ? g.isContextLost() : null; });
    expect(lost, 'WebGL context must not be lost at boot').not.toBe(true);
    expect(g.errors, 'console/page errors during boot').toEqual([]);
  });

  test('QA-02 loading screen completes (and never hangs)', async ({ game: g, page }) => {
    const timeline = []; const t0 = Date.now();
    await page.goto('/', { waitUntil: 'commit' });
    let ready = false;
    while (Date.now() - t0 < T.loadMaxMs + 15000) {
      const s = await g.state().catch(() => null);
      const lv = await g.vis(g.loc.loading), pv = await g.vis(g.loc.play);
      const prog = s?.loading?.progress ?? (await page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const v = e.getAttribute('aria-valuenow') ?? e.value; return v == null ? null : +v; }, SEL.loadingBar).catch(() => null));
      timeline.push({ t: Date.now() - t0, phase: s?.phase ?? null, loadingVisible: lv, playVisible: pv, progress: prog });
      if (pv || s?.phase === 'title' || s?.phase === 'playing') { ready = true; break; }
      await sleep(120);
    }
    await g.testInfo.attach('loading-timeline.json', { body: JSON.stringify(timeline), contentType: 'application/json' });
    expect(ready, `Play/title never appeared within ${T.loadMaxMs + 15000} ms (hang or white screen). Last: ${JSON.stringify(timeline.at(-1))}`).toBe(true);
    const dt = timeline.at(-1).t; g.note('time-to-play-ms (EMULATION, not iPhone)', dt);
    expect(dt, 'loading took longer than the limit (emulation, informational scale)').toBeLessThan(T.loadMaxMs);
    const progs = timeline.map((x) => x.progress).filter((x) => x != null);
    if (progs.length) { for (let i = 1; i < progs.length; i++) expect(progs[i], 'progress must be monotonic').toBeGreaterThanOrEqual(progs[i - 1] - 1e-6); g.note('progress-seen', `${progs[0]}..${progs.at(-1)}`); }
    else g.weak('no loading progress hook/progressbar found: only checked that loading ends, not that progress is truthful');
    const sawLoading = timeline.some((x) => x.loadingVisible || x.phase === 'loading');
    g.note('loading-screen-observed', sawLoading ? 'yes' : 'no (loaded faster than polling, or no loading element)');
    await expect(g.loc.loading, 'loading overlay must be gone when Play is shown').toBeHidden();
    expect(g.errors).toEqual([]);
  });

  test('QA-02b loading completes on a throttled network (Chromium only)', async ({ game: g, page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'UNTESTED: network throttling needs CDP (Chromium only); WebKit cannot throttle here');
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    const t0 = Date.now(); await page.goto('/');
    await g.waitPlayVisible(90000);
    g.note('time-to-play-ms @ slow-4G emulation', Date.now() - t0);
    expect(g.errors).toEqual([]);
  });

  test('QA-03 Play button starts the game', async ({ game: g, page }) => {
    await g.open(); await g.waitPlayVisible();
    const box = await g.box(g.loc.play); const vp = g.vp();
    expect(box && box.x >= 0 && box.y >= 0 && box.x + box.width <= vp.width && box.y + box.height <= vp.height, 'Play button fully inside viewport').toBeTruthy();
    expect(Math.min(box.width, box.height), 'Play button tap target >= 44 px (HIG)').toBeGreaterThanOrEqual(44);
    const t0 = Date.now();
    await g.tap(g.loc.play);
    await g.waitPlaying(8000);
    g.note('play-to-playing-ms', Date.now() - t0);
    await expect(g.loc.play, 'Play button must disappear after starting').toBeHidden();
    if (await g.hook('getState')) {
      const s = await g.state();
      expect(['playing']).toContain(s.phase);
      if (g.gt && s.player) expect(Math.hypot(s.player.x - g.gt.spawn.x, s.player.z - g.gt.spawn.z), 'player starts at SPAWN (src/world/layout.ts)').toBeLessThan(3);
    } else g.weak('no getState hook: "playing" inferred from Play hidden + canvas/joystick visible');
    // touch UI present, 3D view alive and not blank
    await expect(g.loc.joystick, 'virtual joystick visible after Play (touch UI)').toBeVisible();
    const a = await g.frame(); await sleep(400); const b = await g.frame(); const d = await g.diff(a, b);
    expect(d.colorsA, '3D view blank after Play').toBeGreaterThan(6);
    // second tap on where Play was must not break anything
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2).catch(() => {});
    await sleep(500);
    expect(g.errors, 'errors after Play').toEqual([]);
  });
});
