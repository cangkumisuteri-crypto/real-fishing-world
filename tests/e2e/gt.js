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
