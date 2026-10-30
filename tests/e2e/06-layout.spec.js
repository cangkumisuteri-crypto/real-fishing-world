import { test, expect, sleep } from './lib.js';

/** viewport sets per project; the chromium project additionally covers the two iPhone 13 sizes. */
function sizes(testInfo) {
  const v = testInfo.project.use.viewport; const lo = Math.min(v.width, v.height), hi = Math.max(v.width, v.height);
  const base = { portrait: [{ width: lo, height: hi }], landscape: [{ width: hi, height: lo }] };
  if (testInfo.project.name.startsWith('chromium')) { base.portrait = [{ width: 390, height: 844 }]; base.landscape = [{ width: 844, height: 390 }, { width: 1280, height: 720 }]; }
  return base;
}
async function safeInsets(g, orient) { // Chromium-only emulation of the iPhone notch / home indicator
  if (g.browserName !== 'chromium') return null;
  try {
    const c = await g.context.newCDPSession(g.page);
    const insets = orient === 'portrait' ? { top: 47, bottom: 34, left: 0, right: 0 } : { top: 0, bottom: 21, left: 47, right: 47 };
    await c.send('Emulation.setSafeAreaInsetsOverride', { insets }); return insets;
  } catch (e) { return null; }
}

async function scenarios(g, label) {
  // A: playing at spawn. B: at the shoreline with 釣り開始 visible. C: fishing mode.
  const out = [];
  out.push(['playing', await g.layoutReport(label + '-playing')]);
  if (g.gt && (await g.hook('getState'))) {
    const spot = g.gt.edgeSpots(1)[0];
    if (await g.hook('teleport')) await g.teleport(spot.x, spot.z); else await g.walkToward(spot.x, spot.z, { timeout: 25000, arrive: 0.6, recorder: false });
    if (await g.fishStartActive()) {
      out.push(['edge-start-visible', await g.layoutReport(label + '-edge')]);
      await g.tap(g.loc.fishStart); await sleep(500);
      out.push(['fishing', await g.layoutReport(label + '-fishing')]);
      await g.tap(g.loc.fishStop); await sleep(300);
    } else g.weak(`${label}: 釣り開始 never became visible at the shoreline – edge/fishing layouts not checked`);
  } else g.weak(`${label}: no getState/ground truth – only the spawn screen layout was checked`);
  return out;
}

for (const orient of ['portrait', 'landscape']) {
  const id = orient === 'portrait' ? 'QA-12' : 'QA-13';
  test(`${id} ${orient} layout: nothing overlaps, off-screen, clipped or hidden under notch`, async ({ game: g, page }, testInfo) => {
    const list = sizes(testInfo)[orient];
    const failures = [];
    for (const size of list) {
      await page.setViewportSize(size);
      const insets = await safeInsets(g, orient);
      await g.start();
      for (const [name, rep] of await scenarios(g, `${orient}-${size.width}x${size.height}`)) {
        for (const p of rep.problems) failures.push(`[${size.width}x${size.height} ${name}] ${p}`);
        if (insets) for (const b of rep.boxes.filter((b) => b.interactive)) {
          if (b.y < insets.top || b.y + b.h > size.height - insets.bottom || b.x < insets.left || b.x + b.w > size.width - insets.right) failures.push(`[${size.width}x${size.height} ${name}] inside safe-area inset zone: ${b.name} (Chromium inset emulation)`);
        }
      }
      if (!insets) g.weak(`${orient}: safe-area (notch/home bar) can only be emulated in Chromium via CDP; WebKit projects cannot verify env(safe-area-inset-*) – needs real iPhone`);
      await page.screenshot({ path: testInfo.outputPath(`layout-${orient}-${size.width}x${size.height}.png`) });
      await testInfo.attach(`layout-${orient}-${size.width}x${size.height}.png`, { path: testInfo.outputPath(`layout-${orient}-${size.width}x${size.height}.png`), contentType: 'image/png' });
    }
    const meta = await page.evaluate(() => document.querySelector('meta[name=viewport]')?.content || '');
    if (!/viewport-fit=cover/.test(meta)) g.note('safe-area-advisory', 'viewport meta has no viewport-fit=cover; if UI is meant to reach the notch edges it needs env(safe-area-inset-*) handling');
    expect(failures, 'layout problems').toEqual([]);
    expect(g.errors).toEqual([]);
  });
}

test('QA-14 resize / rotate while playing keeps state, aspect and controls working', async ({ game: g, page }, testInfo) => {
  const { portrait, landscape } = sizes(testInfo);
  await page.setViewportSize(portrait[0]);
  await g.start();
  const hasState = (await g.hook('getState')) && !!(await g.pos());
  await g.stickHold(0, 1, 600).catch(() => {}); await g.swipe(-80, 0);
  const s0 = hasState ? await g.state() : null;
  const check = async (label) => {
    const vp = page.viewportSize();
    const r = await page.evaluate(() => { const c = document.querySelector('canvas'); const b = c.getBoundingClientRect(); return { cw: c.width, ch: c.height, bw: b.width, bh: b.height, iw: innerWidth, ih: innerHeight, dpr: devicePixelRatio, lost: (c.getContext('webgl2') || c.getContext('webgl'))?.isContextLost?.() }; });
    const problems = [];
    if (Math.abs(r.bw - vp.width) > 2 || Math.abs(r.bh - vp.height) > 2) problems.push(`canvas CSS size ${r.bw}x${r.bh} != viewport ${vp.width}x${vp.height}`);
    if (!r.cw || !r.ch) problems.push('canvas backing store is 0');
    else if (Math.abs(r.cw / r.ch - r.bw / r.bh) > 0.03) problems.push(`stretched: backing ${r.cw}x${r.ch} vs css ${r.bw}x${r.bh}`);
    if (r.cw && r.cw < r.bw * 0.5) problems.push(`backing store tiny (${r.cw}px for ${r.bw}px css) – blurry`);
    if (r.cw > r.bw * Math.max(2, r.dpr) * 1.01) problems.push(`backing store ${r.cw}px exceeds css*max(2,dpr): wasteful on iPhone`);
    if (r.lost) problems.push('WebGL context lost');
    const cam = hasState ? (await g.state()).camera : null;
    if (cam?.aspect != null && Math.abs(cam.aspect - vp.width / vp.height) > 0.05) problems.push(`camera.aspect ${cam.aspect.toFixed(3)} != ${(vp.width / vp.height).toFixed(3)}`);
    const rep = await g.layoutReport(label); problems.push(...rep.problems);
    return problems;
  };
  const all = [];
  const seq = [['landscape', landscape[0]], ['portrait', portrait[0]], ['landscape', landscape[0]], ['portrait', portrait[0]]];
  for (const [name, size] of seq) {
    await page.setViewportSize(size);
    await page.evaluate(() => window.dispatchEvent(new Event('orientationchange')));
    await sleep(600);
    all.push(...(await check(`rot-${name}`)).map((p) => `[${name}] ${p}`));
    if (hasState) { const s = await g.state(); const d = Math.hypot(s.player.x - s0.player.x, s.player.z - s0.player.z); if (d > 0.1) all.push(`[${name}] player moved ${d.toFixed(2)} m by rotation alone`); if (s.mode !== s0.mode) all.push(`[${name}] mode changed ${s0.mode}->${s.mode}`); }
  }
  // stress: 12 quick resizes incl. iOS address-bar style height jitter
  for (let i = 0; i < 12; i++) { await page.setViewportSize({ width: portrait[0].width, height: portrait[0].height - (i % 2) * 90 }); await sleep(60); }
  await page.setViewportSize(portrait[0]); await sleep(500);
  all.push(...(await check('after-jitter')).map((p) => `[jitter] ${p}`));
  // controls still work after all of that
  if (hasState) { const a = await g.pos(); await g.stickHold(0, 1, 800); const b = await g.pos(); if (Math.hypot(a.x - b.x, a.z - b.z) < 0.3) all.push('joystick no longer moves the player after rotations'); }
  else { const n = await g.idleNoise(); g.note('idle-noise', n); }
  await expect(g.loc.canvas).toBeVisible();
  expect(all, 'resize/rotate problems').toEqual([]);
  expect(g.errors).toEqual([]);
});
