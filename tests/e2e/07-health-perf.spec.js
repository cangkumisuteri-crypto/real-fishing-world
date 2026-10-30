import { test, expect, sleep, stats, T } from './lib.js';
import fs from 'node:fs';

test('QA-15 zero console / page errors across a full play session', async ({ game: g, page }) => {
  await g.start();
  const hasState = (await g.hook('getState')) && !!(await g.pos());
  await g.stickHold(0, 1, 1500); await g.stickHold(1, 0, 900); await g.swipe(-120, 30); await g.swipe(120, -30);
  if (hasState && g.gt) {
    const spot = g.gt.edgeSpots(1)[0];
    await g.walkToward(spot.x, spot.z, { timeout: 25000, arrive: 0.6, recorder: false }).catch((e) => g.note('walk', e.message));
    for (let i = 0; i < 2; i++) {
      if (await g.fishStartActive()) { await g.tap(g.loc.fishStart); await sleep(700); await g.tap(g.loc.fishStop); await sleep(400); }
    }
  } else g.weak('no hooks/ground truth: session covered boot, play, stick, swipe only (not fishing)');
  const vp = page.viewportSize();
  await page.setViewportSize({ width: vp.height, height: vp.width }); await sleep(500); await page.setViewportSize(vp); await sleep(500);
  if (await g.hook('saveNow')) await g.call('saveNow'); else await sleep(T.autosaveWaitMs);
  await page.reload(); await g.waitPlayVisible(); await g.tap(g.loc.play); await g.waitPlaying(); await sleep(1500);
  await g.testInfo.attach('warnings.txt', { body: g.warnings.join('\n') || '(none)', contentType: 'text/plain' });
  g.note('console warnings (advisory)', g.warnings.length);
  expect(g.errors, 'console.error / pageerror / failed request / HTTP>=400 during the session').toEqual([]);
});

test('QA-16 basic perf sample — EMULATION ONLY, NOT real-iPhone fps', async ({ game: g, page, browserName, context }) => {
  await g.start();
  const out = { disclaimer: 'Emulation on a shared Linux box (software GL). NOT iPhone performance. 30 fps on a real iPhone is UNVERIFIED.', browser: browserName, project: g.testInfo.project.name };
  out.idle = stats(await g.perfSample(4000));
  const hasState = (await g.hook('getState')) && !!(await g.pos());
  // moving + rotating: hold the stick while sampling
  await g.stickDown(0, 1);
  const moving = g.perfSample(8000);
  const wig = (async () => { for (let i = 0; i < 8; i++) { await g.stickSet(Math.sin(i), 1); await sleep(900); } })();
  out.moving = stats(await moving); await wig; await g.stickUp();
  if (browserName === 'chromium') {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    out.movingCpu4x = stats(await g.perfSample(5000));
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    const m = await cdp.send('Performance.getMetrics').catch(() => null);
    if (m) out.chromiumMetrics = Object.fromEntries(m.metrics.filter((x) => /JSHeapUsedSize|Nodes|LayoutCount/.test(x.name)).map((x) => [x.name, x.value]));
  }
  if (await g.hook('getState')) { const s = await g.state(); if (s?.perf) out.rendererInfo = s.perf; else g.weak('getState().perf (draw calls / triangles / textures) not exposed'); }
  fs.mkdirSync(new URL('../out', import.meta.url).pathname, { recursive: true });
  fs.writeFileSync(new URL(`../out/perf-${g.testInfo.project.name}.json`, import.meta.url).pathname, JSON.stringify(out, null, 1));
  await g.testInfo.attach('perf.json', { body: JSON.stringify(out, null, 1), contentType: 'application/json' });
  g.note('perf (EMULATION, not iPhone)', JSON.stringify({ idle: out.idle?.avgFps, moving: out.moving?.avgFps, p95ms: out.moving?.p95FrameMs, max: out.moving?.maxFrameMs }));
  // Only catastrophic things fail: render loop dead or main thread frozen. No fps target is asserted from emulation.
  expect(out.moving, 'no animation frames while moving – render loop dead').not.toBeNull();
  expect(out.moving.avgFps, 'effectively frozen (< 1 fps avg) even in emulation').toBeGreaterThan(1);
  expect(out.moving.maxFrameMs, 'a single frame stalled > 5 s – hang').toBeLessThan(5000);
  if (out.moving.avgFps < +(process.env.QA_FPS_WARN || 20)) g.note('perf-advisory', `avg ${out.moving.avgFps} fps in emulation (<${process.env.QA_FPS_WARN || 20}); software-GL numbers are not comparable to iPhone, investigate draw calls`);
  expect(g.errors).toEqual([]);
});
