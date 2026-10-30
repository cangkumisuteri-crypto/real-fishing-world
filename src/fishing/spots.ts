import { Grid, G, N, cx, cz, wx, wz } from '../world/grid';
import { SeabedZone, SEABED_ZONE_NAMES } from '../data/seabed';
import type { SpotMarker } from '../world/props';

export interface FishingSite {
  can: boolean;
  reason: string; // can=false のとき
  /** 水面のある方向（yaw）: -z 向きを 0 とする */
  yaw: number;
  edgeDist: number;
  depth: number;
  zone: number;
  zoneJa: string;
  hole: boolean;
  nearTetra: boolean;
  spot: SpotMarker | null;
}
const NONE: FishingSite = { can: false, reason: '水辺に近づこう', yaw: 0, edgeDist: 99, depth: 0, zone: 0, zoneJa: '', hole: false, nearTetra: false, spot: null };

/** 釣りができる場所の判定。「歩ける水際ならどこでも」可能。マーカー（釣り場ヒント）は任意の目印。 */
export function detectSite(g: Grid, x: number, z: number, markers: SpotMarker[]): FishingSite {
  const R = 1.7; // これより近くに水セルがあれば水際
  const ix0 = cx(x), iz0 = cz(z), r = Math.ceil(R / 0.5) + 1;
  let best = 1e9, bi = -1;
  for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
    const ix = ix0 + dx, iz = iz0 + dz;
    if (!g.inB(ix, iz) || g.ground[iz * N + ix] !== G.WATER) continue;
    const d = Math.hypot(wx(ix) - x, wz(iz) - z);
    if (d < best) { best = d; bi = iz * N + ix; }
  }
  let spot: SpotMarker | null = null, sd = 4.5;
  for (const m of markers) { const d = Math.hypot(m.x - x, m.z - z); if (d < sd) { sd = d; spot = m; } }
  if (bi < 0 || best > R) return { ...NONE, spot };
  // 水面方向: 周囲 7m の水セル（テトラ帯を除く）の重心へ
  let sx = 0, sz = 0, n = 0;
  const rr = 14;
  for (let dz = -rr; dz <= rr; dz++) for (let dx = -rr; dx <= rr; dx++) {
    const ix = ix0 + dx, iz = iz0 + dz;
    if (!g.inB(ix, iz)) continue;
    const i = iz * N + ix;
    if (g.ground[i] !== G.WATER || g.tetra[i]) continue;
    const d = Math.hypot(dx, dz) * 0.5; if (d > 7) continue;
    const w = 1 / (1 + d * 0.3);
    sx += (wx(ix) - x) * w; sz += (wz(iz) - z) * w; n++;
  }
  let yaw = 0;
  if (n > 0) { yaw = Math.atan2(-sx, -sz); } else { yaw = Math.atan2(-(wx(bi % N) - x), -(wz((bi / N) | 0) - z)); }
  const nearTetra = !!g.tetra[bi] || hasTetraNear(g, ix0, iz0);
  const z0 = g.zone[bi];
  return { can: true, reason: '', yaw, edgeDist: best, depth: g.depth[bi], zone: z0, zoneJa: SEABED_ZONE_NAMES[z0]?.ja ?? '', hole: !!g.hole[bi], nearTetra, spot };
}
function hasTetraNear(g: Grid, ix0: number, iz0: number) {
  for (let dz = -5; dz <= 5; dz++) for (let dx = -5; dx <= 5; dx++) { const ix = ix0 + dx, iz = iz0 + dz; if (g.inB(ix, iz) && g.tetra[iz * N + ix]) return true; }
  return false;
}
void SeabedZone;
