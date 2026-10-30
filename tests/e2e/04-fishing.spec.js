import { test, expect, T, sleep } from './lib.js';

async function atEdge(g) {
  // returns {spot} after standing on a plain shoreline spot. Uses closed-loop walking; teleport only as a shortcut when available.
  const spot = g.gt.edgeSpots(1)[0];
  const r = await g.walkToward(spot.x, spot.z, { timeout: 25000, arrive: 0.6, recorder: false });
  if (r.reason !== 'arrived') g.note('edge-walk', `${r.reason} at ${JSON.stringify(r.end)} target ${spot.x},${spot.z}`);
  // lean on the water a little to be at the very edge
  await g.stickDown(0, 0); await g.stickUp();
  return { spot, r };
}
async function prep(g) { g.needGT(); await g.start(); await g.needHooks('getState'); if (!(await g.pos())) g.untested('getState().player missing'); }

test.describe('QA-08..10 fishing UI', () => {
  test('QA-08 「釣り開始」 appears at the water edge (and only there)', async ({ game: g }) => {
    await prep(g);
    const gt = g.gt;
    const dW = async () => { const p = await g.pos(); return gt.dWater(p.x, p.z); };
    // far from water: hidden
    const spot = gt.edgeSpots(1)[0]; const inland = gt.approachFrom(spot, 5) || gt.inlandSpot(8);
    if (inland && (await g.hook('teleport'))) await g.teleport(inland.x, inland.z);
    await sleep(500);
    const d0 = await dW(); g.note('start distance to water (m)', d0.toFixed(1));
    // design/ART_DIRECTION.md 4.3: away from water the button is GREYED OUT (not hidden) -> accept hidden OR disabled
    if (d0 > T.edgeMax + 1) expect(await g.fishStartActive(), `釣り開始 must be hidden or disabled ${d0.toFixed(1)} m from water`).toBe(false);
    else g.weak(`spawn is only ${d0.toFixed(1)} m from water: far-from-water negative case not exercised`);
    // walk to the edge while sampling visibility vs. ground-truth distance
    const samples = [];
    const ctl = { stop: false };
    const poll = (async () => { while (!ctl.stop) { const p = await g.pos(); samples.push({ d: gt.dWater(p.x, p.z), v: await g.fishStartActive(), t: Date.now() }); await sleep(120); } })();
    const r = await g.walkRoute(spot, { arrive: 0.5 });
    await sleep(900); ctl.stop = true; await poll;
    await g.testInfo.attach('edge-samples.json', { body: JSON.stringify({ spot, r: r.reason, samples: samples.filter((_, i) => i % 3 === 0) }), contentType: 'application/json' });
    expect(r.reason, 'could not reach the shoreline spot (collision/pathing problem?)').toBe('arrived');
    const dEdge = await dW(); g.note('final distance to water (m)', dEdge.toFixed(2));
    await expect.poll(() => g.fishStartActive(), { timeout: 2500, message: `釣り開始 must be visible AND enabled when standing ${dEdge.toFixed(2)} m from the water` }).toBe(true);
    const early = samples.filter((s) => s.v && s.d > T.edgeMax);
    expect(early.length, `釣り開始 enabled while farther than ${T.edgeMax} m from water (QA_EDGE_MAX): worst ${Math.max(0, ...early.map((s) => s.d)).toFixed(1)} m`).toBe(0);
    // layout of the button itself
    const rep = await g.layoutReport('edge-with-start-button');
    expect(rep.problems, 'UI problems with 釣り開始 on screen').toEqual([]);
    // retreat inland: hidden again
    if (await g.hook('teleport') && inland) { await g.teleport(inland.x, inland.z); await expect.poll(() => g.fishStartActive(), { timeout: 2500 }).toBe(false); }
    else { await g.walkToward(gt.spawn.x, gt.spawn.z, { timeout: 15000, recorder: false }).catch(() => {}); if ((await dW()) > T.edgeMax + 1) await expect.poll(() => g.fishStartActive(), { timeout: 2500 }).toBe(false); }
    // not only at markers: a second, different shoreline spot (needs teleport)
    if (await g.hook('teleport')) {
      const more = gt.edgeSpots(5).slice(1);
      for (const s of more) { await g.teleport(s.x, s.z); await expect.poll(() => g.fishStartActive(), { timeout: 2500, message: `no enabled 釣り開始 at free shoreline spot (${s.x.toFixed(1)},${s.z.toFixed(1)})` }).toBe(true); }
      g.note('extra-shoreline-spots-checked', more.length);
    } else g.weak('no teleport hook: only one shoreline spot verified');
    expect(g.errors).toEqual([]);
  });

  test('QA-09 「釣り開始」 switches to fishing mode (move UI -> fishing UI)', async ({ game: g }) => {
    await prep(g);
    await atEdge(g);
    await expect.poll(() => g.fishStartActive(), { timeout: 3000 }).toBe(true);
    const p0 = await g.pos();
    await g.tap(g.loc.fishStart);
    await expect.poll(async () => (await g.state())?.mode ?? ((await g.vis(g.loc.fishUi)) ? 'fishing' : 'move'), { timeout: 4000, message: 'mode never became fishing' }).toBe('fishing');
    await expect(g.loc.fishStart, '釣り開始 should hide once fishing').toBeHidden();
    if (await g.loc.fishUi.count()) await expect(g.loc.fishUi, 'fishing UI visible').toBeVisible(); else g.weak('no [data-testid=fishing-ui]: fishing UI judged by state.mode + stop control only');
    await expect(g.loc.fishStop, 'a way back to move mode must be visible').toBeVisible();
    if (await g.loc.joystick.count()) await expect(g.loc.joystick, 'movement joystick must be hidden/replaced in fishing mode').toBeHidden();
    // player is locked in place
    await g.stickHold(0, 1, 900).catch(() => {}); await sleep(300);
    const p1 = await g.pos(); expect(Math.hypot(p1.x - p0.x, p1.z - p0.z), 'player must not walk while fishing').toBeLessThan(0.3);
    const rep = await g.layoutReport('fishing-mode'); expect(rep.problems, 'fishing UI layout').toEqual([]);
    const f = await g.frame();
    expect((await g.diff(f, f)).colorsA, '3D view still rendering in fishing mode').toBeGreaterThan(6);
    expect(g.errors).toEqual([]);
  });

  test('QA-10 fishing mode toggles on and off repeatedly without desync', async ({ game: g }) => {
    await prep(g);
    await atEdge(g);
    const mode = async () => (await g.state())?.mode ?? ((await g.vis(g.loc.fishUi)) ? 'fishing' : 'move');
    for (let i = 1; i <= 3; i++) {
      await expect.poll(() => g.fishStartActive(), { timeout: 3000, message: `cycle ${i}: 釣り開始 enabled` }).toBe(true);
      await g.tap(g.loc.fishStart);
      await expect.poll(mode, { message: `cycle ${i}: enter fishing` }).toBe('fishing');
      await sleep(400);
      await g.tap(g.loc.fishStop);
      await expect.poll(mode, { message: `cycle ${i}: leave fishing` }).toBe('move');
      await expect(g.loc.joystick, `cycle ${i}: joystick back`).toBeVisible();
      if (await g.loc.fishUi.count()) await expect(g.loc.fishUi, `cycle ${i}: fishing UI gone`).toBeHidden();
    }
    // after leaving, walking works again
    const a = await g.pos(); await g.stickHold(0, -1, 700); const b = await g.pos();
    expect(Math.hypot(a.x - b.x, a.z - b.z), 'can walk after leaving fishing mode').toBeGreaterThan(0.4);
    // rapid double tap on start must end in a consistent state
    await g.walkToward(a.x, a.z, { timeout: 8000, arrive: 0.5, recorder: false }).catch(() => {});
    if (await g.fishStartActive()) {
      await g.loc.fishStart.tap({ clickCount: 1 }).catch(() => {}); await g.page.touchscreen.tap(...(await centre(g))).catch(() => {});
      await sleep(600);
      const m = await mode(); expect(['fishing', 'move']).toContain(m);
      expect(await g.vis(g.loc.joystick), 'UI/state consistent: joystick visible iff move mode').toBe(m === 'move');
    } else g.weak('not at edge after walking back: rapid double-tap sub-check skipped');
    expect(g.errors).toEqual([]);
  });
});
async function centre(g) { const b = await g.box(g.loc.fishStart); return b ? [b.x + b.width / 2, b.y + b.height / 2] : [1, 1]; }
