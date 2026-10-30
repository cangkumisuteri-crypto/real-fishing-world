/** 港町「架空」のレイアウト定義。座標は m（x=東, z=南）。実在の港ではない。 */
import { Grid, G, CELL, cx, cz, wx, wz, vnoise, hash2, N, computeDerived, computeReach } from './grid';

export interface Building { id: string; x0: number; z0: number; x1: number; z1: number; h: number; body: number; roof: number; roofKind: 'gable' | 'flat'; ridgeX?: boolean; windows?: boolean; door?: 'N' | 'S' }
export interface Place { id: string; name: string; x: number; z: number; r: number; note: string }
export interface SpotDef { id: string; name: string; x: number; z: number; kind: 'quay' | 'hole' | 'tip' | 'breakwater' | 'beach' | 'rock' }

export const SPAWN = { x: -20, z: 15.5, yaw: 0 };

export const BUILDINGS: Building[] = [
  { id: 'shop', x0: 0, z0: 19, x1: 10, z1: 27, h: 3.6, body: 0xe9e2d2, roof: 0x2f5f8f, roofKind: 'gable', ridgeX: true, windows: true, door: 'N' },
  { id: 'base', x0: -30, z0: 19, x1: -22, z1: 25, h: 3.0, body: 0x8a6e52, roof: 0x585c61, roofKind: 'gable', ridgeX: true, windows: true, door: 'N' },
  { id: 'wareA', x0: 26, z0: 22, x1: 44, z1: 34, h: 6.2, body: 0xb9c3c9, roof: 0x7a858c, roofKind: 'gable', ridgeX: true, windows: false },
  { id: 'wareB', x0: -20, z0: 30, x1: -6, z1: 40, h: 5.6, body: 0xcfc6b0, roof: 0x8a5a4a, roofKind: 'gable', ridgeX: false, windows: true },
  { id: 'market', x0: 12, z0: 28, x1: 24, z1: 36, h: 4.2, body: 0xe6e0d0, roof: 0x4f7d9a, roofKind: 'gable', ridgeX: true, windows: true, door: 'N' },
  { id: 'house1', x0: -38, z0: 33, x1: -31, z1: 39, h: 4.4, body: 0xe9dcc4, roof: 0x5a4a44, roofKind: 'gable', ridgeX: true, windows: true },
  { id: 'house2', x0: 30, z0: 38, x1: 37, z1: 41, h: 4.0, body: 0xd9d4c8, roof: 0x6b5048, roofKind: 'gable', ridgeX: true, windows: true },
  { id: 'cont1', x0: -4, z0: 34, x1: 2.5, z1: 36.5, h: 2.6, body: 0xc0392b, roof: 0xc0392b, roofKind: 'flat' },
  { id: 'cont2', x0: 3, z0: 34, x1: 9.5, z1: 36.5, h: 2.6, body: 0x2e86c1, roof: 0x2e86c1, roofKind: 'flat' },
  { id: 'cont3', x0: -4, z0: 37, x1: 2.5, z1: 39.5, h: 2.6, body: 0x2e8b57, roof: 0x2e8b57, roofKind: 'flat' },
  { id: 'cont4', x0: 3, z0: 37, x1: 9.5, z1: 39.5, h: 2.6, body: 0xd68910, roof: 0xd68910, roofKind: 'flat' },
];

export const PLACES: Place[] = [
  { id: 'shop', name: '潮風つり具 しおかぜ', x: 5, z: 16, r: 4.5, note: '釣具店（準備中・Phase 5で実装）' },
  { id: 'base', name: '拠点', x: -26, z: 16, r: 4.5, note: '拠点（準備中・Phase 5で実装）' },
  { id: 'market', name: '魚市場', x: 18, z: 26, r: 4.5, note: '魚市場（売却は未実装）' },
];

export const SPOTS: SpotDef[] = [
  { id: 'quay', name: '岸壁（港内）', x: -8, z: 9, kind: 'quay' },
  { id: 'hole', name: '穴釣りエリア（岸壁の隙間）', x: -26.5, z: 10.8, kind: 'hole' },
  { id: 'tip', name: '防波堤の先端', x: 20.5, z: -49, kind: 'tip' },
  { id: 'bw', name: '防波堤（港内側）', x: 18.8, z: -25, kind: 'breakwater' },
  { id: 'beach', name: '砂浜', x: 35, z: -2.2, kind: 'beach' },
  { id: 'rock', name: '岩場', x: -48, z: 12, kind: 'rock' },
];

/** 穴釣りの隙間（中心x）。幅1m・奥行2m */
export const HOLE_XS = [-34, -31, -28, -25, -22, -19];

export interface PropPos { x: number; z: number }
export interface MapData {
  grid: Grid;
  bollards: PropPos[];
  lamps: PropPos[];
  rocks: { x: number; z: number; s: number }[];
  tetras: { x: number; z: number; y: number; r: number }[];
  crates: { x: number; z: number; w: number; d: number; h: number; c: number }[];
}

export function buildMap(): MapData {
  const g = new Grid();
  // ---- 地面 ----
  g.rect(-80, 42, 80, 80, G.GRASS);
  g.rect(48, 12, 80, 80, G.GRASS);
  g.rect(-80, 34, -40, 80, G.GRASS);
  g.rect(-40, 12, 48, 42, G.ASPHALT);
  g.rect(-40, 8, 23, 12, G.CONCRETE); // 岸壁
  g.rect(18, -45, 23, 8, G.CONCRETE); // 防波堤
  g.rect(15, -50, 26, -45, G.CONCRETE); // 先端
  g.rect(-40, -25, -35, 8, G.CONCRETE); // 西の腕堤
  g.rect(23, -4, 48, 12, G.SAND); // 砂浜
  g.rect(-56, 8, -40, 34, G.ROCK); // 岩場
  // 岩場の不規則な海岸線
  for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) {
    const i = iz * N + ix;
    if (g.ground[i] !== G.ROCK) continue;
    const x = wx(ix), z = wz(iz);
    const d = Math.min(x + 56, z - 8);
    if (d < 3.5) {
      const n = vnoise(x * 0.35, z * 0.35, 7) * 0.6 + hash2(ix, iz, 5) * 0.4;
      if (n < (3.5 - d) / 3.5 * 0.75) g.ground[i] = G.WATER;
    }
  }
  // 岸壁の穴釣り用の隙間
  for (const hx of HOLE_XS) { g.rect(hx - 0.5, 8, hx + 0.5, 10, G.WATER); g.flag(g.hole, hx - 0.5, 8, hx + 0.5, 10); }
  // テトラ帯（防波堤の外側・西腕堤の外側）: 水セルだが立入不可
  g.flag(g.tetra, 23, -44, 28, -5);
  g.flag(g.tetra, -40, -24, -36 + 0.0, 7); // 西腕堤の外(西)側
  g.flag(g.tetra, -43, -24, -40, 7);
  // 西腕堤の外側は岩場とつなげず、水のまま
  for (let i = 0; i < N * N; i++) if (g.tetra[i] && g.ground[i] !== G.WATER) g.tetra[i] = 0;

  // ---- 建物の衝突 ----
  for (const b of BUILDINGS) g.flag(g.blocked, b.x0, b.z0, b.x1, b.z1);
  // 敷地の柵（草地との境界）
  // ---- 小物 ----
  const bollards: PropPos[] = [];
  const lamps: PropPos[] = [];
  const placeBlock = (arr: PropPos[], x: number, z: number) => {
    const ix = cx(x), iz = cz(z);
    if (!g.walkable(ix, iz)) return;
    g.blocked[iz * N + ix] = 1;
    arr.push({ x: wx(ix), z: wz(iz) });
  };
  for (let x = -38; x <= 20; x += 6) {
    if (x > -37 && x < -16) continue; // 穴釣りエリアは空ける
    placeBlock(bollards, x, 8.6);
  }
  for (let z = -44; z <= 6; z += 8) placeBlock(bollards, 18.25, z);
  for (let z = -44; z <= 6; z += 8) placeBlock(bollards, 22.75, z);
  for (let x = -36; x <= 16; x += 10) placeBlock(lamps, x, 11.6);
  for (let z = -40; z <= 0; z += 14) placeBlock(lamps, 20.5, z);
  placeBlock(lamps, 20.5, -47.5);
  // 木箱・樽
  const crates: MapData['crates'] = [];
  const crate = (x: number, z: number, w: number, d: number, h: number, c: number) => {
    if (!g.walkable(cx(x), cz(z))) return;
    g.flag(g.blocked, x - w / 2, z - d / 2, x + w / 2, z + d / 2);
    crates.push({ x, z, w, d, h, c });
  };
  crate(11.5, 19.5, 1, 1, 1, 0x9a7b4f); crate(12.7, 19.5, 1, 1, 1, 0x8a6b3f); crate(12, 20.8, 1, 1, 1, 0xa88a5a);
  crate(-31.5, 18, 1, 1, 0.9, 0x6b8e9a);
  crate(26, 13.5, 1.5, 1, 1.0, 0xb0b0b0); crate(40, 14, 1, 1, 1, 0x9a7b4f);
  crate(-12, 14, 1.2, 1.2, 1.0, 0xd0d0c0);
  // 岩（装飾＋障害）
  const rocks: MapData['rocks'] = [];
  for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix += 1) {
    const i = iz * N + ix;
    if (g.ground[i] !== G.ROCK) continue;
    const x = wx(ix), z = wz(iz);
    if (hash2(ix, iz, 11) < 0.05 && Math.hypot(x + 46, z - 13) > 2.5) {
      const s = 0.5 + hash2(ix, iz, 12) * 0.45;
      g.flag(g.blocked, x - 0.5, z - 0.5, x + 0.5, z + 0.5);
      rocks.push({ x, z, s });
    }
  }
  // 水際の岩（水セル側・立入不可）
  for (let iz = 1; iz < N - 1; iz++) for (let ix = 1; ix < N - 1; ix++) {
    const i = iz * N + ix;
    if (g.ground[i] !== G.WATER || g.tetra[i] || g.hole[i]) continue;
    const x = wx(ix), z = wz(iz);
    if (x < -50 && x > -62 && z > 8 && z < 36 && hash2(ix, iz, 21) < 0.06) rocks.push({ x, z, s: 0.6 + hash2(ix, iz, 22) * 0.6 });
  }

  // ---- テトラポッド ----
  const tetras: MapData['tetras'] = [];
  for (let iz = 0; iz < N; iz += 2) for (let ix = 0; ix < N; ix += 2) {
    const i = iz * N + ix;
    if (!g.tetra[i] || g.ground[i] !== G.WATER) continue;
    const x = wx(ix) + (hash2(ix, iz, 31) - 0.5) * 0.8, z = wz(iz) + (hash2(ix, iz, 32) - 0.5) * 0.8;
    tetras.push({ x, z, y: -1.7 + hash2(ix, iz, 33) * 0.9, r: 0.55 + hash2(ix, iz, 34) * 0.15 });
    if (hash2(ix, iz, 35) > 0.45) tetras.push({ x: x + 0.3, z: z - 0.2, y: -0.9 + hash2(ix, iz, 36) * 0.9, r: 0.55 });
  }

  computeDerived(g);
  computeReach(g, SPAWN.x, SPAWN.z);
  return { grid: g, bollards, lamps, rocks, tetras, crates };
}
