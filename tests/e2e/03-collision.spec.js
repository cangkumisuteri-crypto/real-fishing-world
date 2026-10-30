import { test, expect, MOCK, violations } from './lib.js';

// Ground truth comes from src/world (read-only). The game is judged by where *it says* the player is (window.__rfw.getState().player)
// compared to the map the programmer defined: never inside water, building rectangles, props (strict build only), or outside the map.
const strict = !MOCK;

async function prep(g) {
  g.needGT();
  await g.start();
  await g.needHooks('getState');
  if (!(await g.pos())) g.untested('getState().player.{x,z} missing');
}

test.describe('QA-06..07 collision', () => {
  test('QA-06 cannot walk through terrain / buildings / props', async ({ game: g }) => {
    test.setTimeout(420000);
    await prep(g);
    const gt = g.gt; const all = []; const log = [];
    // (a) closed-loop pushes straight into every building centre from where we stand
    for (const b of gt.buildings.slice(0, 7)) {
      const r = await g.walkToward((b.x0 + b.x1) / 2, (b.z0 + b.z1) / 2, { timeout: 9000, keepPushing: true, stuckMs: 99999 });
      all.push(...r.samples); log.push({ target: b.id, reason: r.reason, end: r.end });
      if (await g.hook('teleport')) await g.teleport(gt.spawn.x, gt.spawn.z);
      else await g.walkToward(gt.spawn.x, gt.spawn.z, { timeout: 12000, recorder: false }).catch(() => {});
    }
    // (b) if teleport exists: approach each building from 2.5 m outside each face, walk inward for 3 s
    if (await g.hook('teleport')) {
      for (const b of gt.buildings) {
        const cx = (b.x0 + b.x1) / 2, cz = (b.z0 + b.z1) / 2;
        for (const [px, pz] of [[cx, b.z0 - 2.5], [cx, b.z1 + 2.5], [b.x0 - 2.5, cz], [b.x1 + 2.5, cz]]) {
          if (gt.isWater(px, pz) || gt.blockedCircle(px, pz, 0.4)) continue;
          await g.teleport(px, pz);
          const r = await g.walkToward(cx, cz, { timeout: 3500, keepPushing: true, stuckMs: 99999 });
          all.push(...r.samples);
        }
      }
    } else g.weak('no teleport hook: only walked toward buildings from spawn side, so not every face/prop was probed');
    const v = violations(gt, all, { strict });
    await g.testInfo.attach('collision-log.json', { body: JSON.stringify({ log, samples: all.length, violations: v.slice(0, 50) }, null, 1), contentType: 'application/json' });
    g.note('samples', all.length);
    expect(all.length, 'recorder produced no samples').toBeGreaterThan(50);
    expect(v.slice(0, 5), `${v.length} terrain violations (first 5 shown)`).toEqual([]);
    // non-vacuous: the player really did walk and was then stopped by something
    const travelled = all.reduce((s, p, i) => (i ? s + Math.hypot(p.x - all[i - 1].x, p.z - all[i - 1].z) : 0), 0);
    expect(travelled, 'player barely moved – test would pass vacuously').toBeGreaterThan(10);
    expect(g.errors).toEqual([]);
  });

  test('QA-07 cannot walk into the sea (incl. tetrapod zone & hole gaps)', async ({ game: g }) => {
    test.setTimeout(420000);
    await prep(g);
    const gt = g.gt; const all = []; const log = [];
    const spots = gt.edgeSpots(5);
    expect(spots.length, 'ground truth found no shoreline spots').toBeGreaterThan(0);
    // (a) from spawn push toward the sea beyond the nearest edge spot, keep pushing 8 s
    for (const s of spots.slice(0, 1)) {
      const out = { x: s.x + s.toWater.x * 12, z: s.z + s.toWater.z * 12 };
      const r = await g.walkToward(out.x, out.z, { timeout: 14000, keepPushing: true, stuckMs: 99999 });
      all.push(...r.samples); log.push({ spot: s, reason: r.reason, end: r.end });
    }
    // (b) teleport (if possible) to each shoreline spot and push into the water in 3 directions
    if (await g.hook('teleport')) {
      for (const s of spots) {
        for (const ang of [0, 0.7, -0.7]) {
          await g.teleport(s.x, s.z);
          const dx = s.toWater.x * Math.cos(ang) - s.toWater.z * Math.sin(ang), dz = s.toWater.x * Math.sin(ang) + s.toWater.z * Math.cos(ang);
          const r = await g.walkToward(s.x + dx * 10, s.z + dz * 10, { timeout: 3500, keepPushing: true, stuckMs: 99999 });
          all.push(...r.samples); log.push({ spot: s, ang, reason: r.reason });
        }
      }
    } else g.weak('no teleport hook: only the first shoreline was probed');
    const v = violations(gt, all, { strict });
    await g.testInfo.attach('sea-log.json', { body: JSON.stringify({ log, samples: all.length, violations: v.slice(0, 50) }, null, 1), contentType: 'application/json' });
    expect(all.length).toBeGreaterThan(50);
    expect(v.slice(0, 5), `${v.length} violations (first 5)`).toEqual([]);
    // the game's own isWater hook (if any) must agree with ground truth at the final position
    if (await g.hook('isWater')) { const p = await g.pos(); expect(await g.call('isWater', p.x, p.z)).toBe(false); }
    expect(g.errors).toEqual([]);
  });

  test('QA-07b hook cross-check: game\'s own collision query agrees with src/world ground truth', async ({ game: g }) => {
    await g.start(); g.needGT();
    const gt = g.gt; const bad = [];
    if (await g.hook('isWater')) {            // proposed contract
      for (let x = -60; x <= 60; x += 3) for (let z = -50; z <= 50; z += 3) {
        const mine = gt.isWater(x, z) || gt.isTetra(x, z);
        const theirs = await g.call('isWater', x, z);
        if (mine !== !!theirs && !gt.isTetra(x, z)) bad.push([x, z, mine, theirs]);
      }
    } else if (await g.hook('blocked')) {     // actual build: blocked(x,z) must be true on every water / tetrapod / building point
      const pts = [];
      for (let x = -78; x <= 78; x += 2) for (let z = -78; z <= 78; z += 2) pts.push([x, z]);
      const res = await g.page.evaluate((p) => p.map(([x, z]) => window.__rfw.blocked(x, z)), pts);
      pts.forEach(([x, z], i) => { if ((gt.isWater(x, z) || gt.isTetra(x, z) || gt.inBuilding(x, z)) && !res[i]) bad.push([x, z, 'gt says solid/water, game blocked()=false']); });
      g.note('points', pts.length);
    } else g.untested('neither isWater nor blocked hook exposed');
    expect(bad.slice(0, 5), `${bad.length} grid points where the game disagrees with layout.ts`).toEqual([]);
  });
});
