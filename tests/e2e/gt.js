// Ground truth about the map, read (read-only) from src/world/*.ts so the audit is independent of what the game *reports*.
// If src is missing/unbuildable, groundTruth() resolves to null and the tests that need it are marked UNTESTED.
import { register } from 'node:module';
let cache, registered = false;
export async function groundTruth() {
  if (cache !== undefined) return cache;
  try {
    if (!registered) { register('./ts-hooks.mjs', import.meta.url); registered = true; }
    const lay = await import('../../src/world/layout.ts');
    const gr = await import('../../src/world/grid.ts');
    const map = lay.buildMap();
    const g = map.grid;
    const { G, N, CELL, ORG, PLAYER_RADIUS, EXTENT } = gr;
    const idx = (x, z) => gr.cz(z) * N + gr.cx(x);
    const inB = (x, z) => { const ix = gr.cx(x), iz = gr.cz(z); return ix >= 0 && iz >= 0 && ix < N && iz < N; };
    const gt = {
      spawn: lay.SPAWN, buildings: lay.BUILDINGS, spots: lay.SPOTS, extent: { min: ORG, max: ORG + EXTENT }, playerRadius: PLAYER_RADIUS,
      isWater: (x, z) => !inB(x, z) || g.ground[idx(x, z)] === G.WATER,
      isTetra: (x, z) => inB(x, z) && !!g.tetra[idx(x, z)],
      isBlockedCell: (x, z) => inB(x, z) && !!g.blocked[idx(x, z)],
      blockedCircle: (x, z, r) => g.blockedCircle(x, z, r),
      dWater: (x, z) => (inB(x, z) ? g.dWater[idx(x, z)] : 0), // land cells: metres to nearest water
      inBuilding: (x, z, shrink = 0.05) => lay.BUILDINGS.find((b) => x > b.x0 + shrink && x < b.x1 - shrink && z > b.z0 + shrink && z < b.z1 - shrink) || null,
      /** Plain-sea shoreline cells a player can stand on (not hole gaps, props or tetra); sorted by distance from spawn. */
      edgeSpots(max = 6) {
        const out = [];
        for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) {
          const x = gr.wx(ix), z = gr.wz(iz);
          if (!g.walkable(ix, iz) || !g.reach[iz * N + ix]) continue;
          if (g.dWater[iz * N + ix] > 1.0 || g.blockedCircle(x, z, 0.4)) continue;
          // wide open water on at least one side (rules out the 1 m hole gaps)
          const open = [[0, -1], [0, 1], [-1, 0], [1, 0]].find(([dx, dz]) => [-2, -1, 0, 1, 2].every((k) => {
            const px = x + dx * 0.75 + (dz ? k : 0), pz = z + dz * 0.75 + (dx ? k : 0);
            return gt.isWater(px, pz) && !gt.isTetra(px, pz);
          }));
          if (!open) continue;
          out.push({ x, z, toWater: { x: open[0], z: open[1] }, d: Math.hypot(x - lay.SPAWN.x, z - lay.SPAWN.z) });
        }
        out.sort((a, b) => a.d - b.d);
        // spread: keep spots >= 12 m apart
        const picked = [];
        for (const s of out) if (picked.every((p) => Math.hypot(p.x - s.x, p.z - s.z) >= 12)) { picked.push(s); if (picked.length >= max) break; }
        return picked;
      },
      /** Centre of the largest free disc (radius ~12 m): a place where multi-touch tests can walk in any direction without hitting anything. */
      openSpot() {
        let best = null;
        for (let x = -60; x <= 60; x += 2) for (let z = -60; z <= 60; z += 2) {
          if (gt.isWater(x, z)) continue; let r = 0;
          for (; r <= 15; r++) { let ok = true; for (let a = 0; a < 16; a++) { const px = x + r * Math.cos(a / 16 * 6.2832), pz = z + r * Math.sin(a / 16 * 6.2832); if (gt.isWater(px, pz) || gt.blockedCircle(px, pz, 0.5)) { ok = false; break; } } if (!ok) break; }
          if (!best || r > best.r) best = { x, z, r };
        }
        return best;
      },
      /** A* route over the 0.5 m grid avoiding water/solids with clearance (0.55 m). Returns waypoints [{x,z}] (simplified) or null. */
      route(a, b, clear = 0.55) {
        const ix0 = (x) => Math.round((x - gr.wx(0)) / 0.5), iz0 = (z) => Math.round((z - gr.wz(0)) / 0.5);
        const ok = (ix, iz) => ix >= 0 && iz >= 0 && ix < N && iz < N && g.walkable(ix, iz) && !g.blockedCircle(gr.wx(ix), gr.wz(iz), clear);
        const s = [ix0(a.x), iz0(a.z)]; let e = [ix0(b.x), iz0(b.z)];
        const key = (x, z) => z * N + x; const gS = new Map([[key(...s), 0]]); const from = new Map(); const open = [[0, ...s]]; const seen = new Set();
        const h = (x, z) => Math.hypot(x - e[0], z - e[1]);
        let found = false;
        while (open.length) {
          open.sort((p, q) => p[0] - q[0]); const [, x, z] = open.shift(); const k = key(x, z);
          if (seen.has(k)) continue; seen.add(k);
          if (Math.hypot(x - e[0], z - e[1]) <= 1.5) { e = [x, z]; found = true; break; }
          for (const [dx, dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) {
            const nx = x + dx, nz = z + dz; if (!ok(nx, nz)) continue;
            const c = gS.get(k) + (dx && dz ? 1.414 : 1), nk = key(nx, nz);
            if (c < (gS.get(nk) ?? 1e9)) { gS.set(nk, c); from.set(nk, k); open.push([c + h(nx, nz), nx, nz]); }
          }
        }
        if (!found) return null;
        const pts = []; let k = key(...e);
        while (k !== undefined) { pts.push({ x: gr.wx(k % N), z: gr.wz(Math.floor(k / N)) }); k = from.get(k); }
        pts.reverse();
        return pts.filter((_, i) => i % 6 === 5 || i === pts.length - 1); // a waypoint about every 3 m
      },
      /** A point >= minD m from water with an unobstructed straight line to `spot` (so a straight-line walk-in test is not a pathing test). */
      approachFrom(spot, minD = 5) {
        let best = null;
        for (let r = 5; r <= 16; r += 1) for (let a = 0; a < 360; a += 10) {
          const x = spot.x + r * Math.cos((a * Math.PI) / 180), z = spot.z + r * Math.sin((a * Math.PI) / 180);
          const ix = Math.floor((x - gr.wx(0)) / 0.5 + 0.5), iz = Math.floor((z - gr.wz(0)) / 0.5 + 0.5);
          if (ix < 0 || iz < 0 || ix >= N || iz >= N || !g.walkable(ix, iz) || !g.reach[iz * N + ix] || g.dWater[iz * N + ix] < minD) continue;
          let ok = true;
          for (let t = 0; t <= 1 && ok; t += 0.5 / r) { const px = x + (spot.x - x) * t, pz = z + (spot.z - z) * t; if (gt.isWater(px, pz) && t < 0.97) ok = false; else if (g.blockedCircle(px, pz, 0.6) && t < 0.97) ok = false; }
          if (ok && (!best || g.dWater[iz * N + ix] > best.dw)) best = { x, z, dw: g.dWater[iz * N + ix] };
        }
        return best;
      },
      /** Walkable cell far (>= minD m) from any water, nearest to spawn. */
      inlandSpot(minD = 8) {
        let best = null;
        for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) {
          if (!g.walkable(ix, iz) || !g.reach[iz * N + ix] || g.dWater[iz * N + ix] < minD) continue;
          const x = gr.wx(ix), z = gr.wz(iz), d = Math.hypot(x - lay.SPAWN.x, z - lay.SPAWN.z);
          if (!best || d < best.d) best = { x, z, d };
        }
        return best;
      },
    };
    cache = gt;
  } catch (e) {
    cache = null;
    globalThis.__gtError = String(e && e.message || e);
  }
  return cache;
}
export const gtError = () => globalThis.__gtError;
