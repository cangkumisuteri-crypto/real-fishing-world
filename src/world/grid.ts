/** 2D グリッド（0.5m）。地形種別・衝突・距離場・水深・海底ゾーンを保持する。x=東, z=南, 北は -z */
import { SeabedZone } from '../data/seabed';

export const CELL = 0.5;
export const N = 320;
export const ORG = -80;
export const WATER_Y = -1.5;
export const EXTENT = N * CELL; // 160m

export const G = { WATER: 0, CONCRETE: 1, ASPHALT: 2, SAND: 3, ROCK: 4, GRASS: 5 } as const;
export const PLAYER_RADIUS = 0.35;

export const cx = (x: number) => Math.floor((x - ORG) / CELL);
export const cz = (z: number) => Math.floor((z - ORG) / CELL);
export const wx = (ix: number) => ORG + (ix + 0.5) * CELL;
export const wz = (iz: number) => ORG + (iz + 0.5) * CELL;

export function hash2(x: number, y: number, s = 0): number {
  let h = (x * 374761393 + y * 668265263 + s * 982451653) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return ((h >>> 0) % 100000) / 100000;
}
export function vnoise(x: number, y: number, s = 0): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy, s), b = hash2(ix + 1, iy, s), c = hash2(ix, iy + 1, s), d = hash2(ix + 1, iy + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export class Grid {
  ground = new Uint8Array(N * N);
  blocked = new Uint8Array(N * N); // 建物・小物
  tetra = new Uint8Array(N * N); // 水中のテトラ帯（立入不可）
  hole = new Uint8Array(N * N); // 穴釣り用の隙間（水セル）
  dWater = new Float32Array(N * N); // 陸セル: 最寄りの水までの距離(m)
  dLand = new Float32Array(N * N); // 水セル: 最寄りの陸までの距離(m)
  landType = new Uint8Array(N * N); // 水セル: 最寄り陸の種別
  depth = new Float32Array(N * N); // 水深 (m)
  zone = new Uint8Array(N * N); // 海底ゾーン
  reach = new Uint8Array(N * N); // スポーン地点から到達可能
  cornerH = new Float32Array((N + 1) * (N + 1)); // 砂浜の高さ(頂点)

  idx(ix: number, iz: number) { return iz * N + ix; }
  inB(ix: number, iz: number) { return ix >= 0 && iz >= 0 && ix < N && iz < N; }
  groundAt(ix: number, iz: number) { return this.inB(ix, iz) ? this.ground[iz * N + ix] : G.WATER; }
  walkable(ix: number, iz: number) {
    if (!this.inB(ix, iz)) return false;
    const i = iz * N + ix;
    const g = this.ground[i];
    return g !== G.WATER && g !== G.GRASS && !this.blocked[i];
  }
  isWaterCell(ix: number, iz: number) { return this.inB(ix, iz) && this.ground[iz * N + ix] === G.WATER; }

  rect(x0: number, z0: number, x1: number, z1: number, type: number) {
    const ax = Math.max(0, cx(x0)), bx = Math.min(N - 1, cx(x1 - 1e-6));
    const az = Math.max(0, cz(z0)), bz = Math.min(N - 1, cz(z1 - 1e-6));
    for (let z = az; z <= bz; z++) for (let x = ax; x <= bx; x++) this.ground[z * N + x] = type;
  }
  flag(arr: Uint8Array, x0: number, z0: number, x1: number, z1: number, v = 1) {
    const ax = Math.max(0, cx(x0)), bx = Math.min(N - 1, cx(x1 - 1e-6));
    const az = Math.max(0, cz(z0)), bz = Math.min(N - 1, cz(z1 - 1e-6));
    for (let z = az; z <= bz; z++) for (let x = ax; x <= bx; x++) arr[z * N + x] = v;
  }

  /** 円(半径r)が歩行不可セルに重なるか */
  blockedCircle(x: number, z: number, r: number): boolean {
    const ax = cx(x - r), bx = cx(x + r), az = cz(z - r), bz = cz(z + r);
    for (let iz = az; iz <= bz; iz++) {
      for (let ix = ax; ix <= bx; ix++) {
        if (this.walkable(ix, iz)) continue;
        const x0 = ORG + ix * CELL, z0 = ORG + iz * CELL;
        const nx = Math.max(x0, Math.min(x, x0 + CELL)), nz = Math.max(z0, Math.min(z, z0 + CELL));
        const dx = x - nx, dz = z - nz;
        if (dx * dx + dz * dz < r * r) return true;
      }
    }
    return false;
  }

  /** 地面の高さ（砂浜のみ傾斜） */
  heightAt(x: number, z: number): number {
    const ix = cx(x), iz = cz(z);
    if (this.groundAt(ix, iz) !== G.SAND) return 0;
    const fx = (x - ORG) / CELL - ix, fz = (z - ORG) / CELL - iz;
    const W = N + 1;
    const h00 = this.cornerH[iz * W + ix], h10 = this.cornerH[iz * W + ix + 1];
    const h01 = this.cornerH[(iz + 1) * W + ix], h11 = this.cornerH[(iz + 1) * W + ix + 1];
    return h00 * (1 - fx) * (1 - fz) + h10 * fx * (1 - fz) + h01 * (1 - fx) * fz + h11 * fx * fz;
  }
}

/* ---------- 距離変換（最近傍ソース追跡つき・近似ユークリッド） ---------- */
function distanceTransform(src: Uint8Array): { d: Float32Array; s: Int32Array } {
  const d = new Float32Array(N * N).fill(1e9);
  const s = new Int32Array(N * N).fill(-1);
  for (let i = 0; i < N * N; i++) if (src[i]) { d[i] = 0; s[i] = i; }
  const relax = (ix: number, iz: number, nx: number, nz: number) => {
    if (nx < 0 || nz < 0 || nx >= N || nz >= N) return;
    const ni = nz * N + nx;
    const si = s[ni];
    if (si < 0) return;
    const sx = si % N, sz = (si / N) | 0;
    const dd = Math.hypot(ix - sx, iz - sz);
    const i = iz * N + ix;
    if (dd < d[i]) { d[i] = dd; s[i] = si; }
  };
  for (let pass = 0; pass < 2; pass++) {
    for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) { relax(ix, iz, ix - 1, iz); relax(ix, iz, ix - 1, iz - 1); relax(ix, iz, ix, iz - 1); relax(ix, iz, ix + 1, iz - 1); }
    for (let iz = N - 1; iz >= 0; iz--) for (let ix = N - 1; ix >= 0; ix--) { relax(ix, iz, ix + 1, iz); relax(ix, iz, ix + 1, iz + 1); relax(ix, iz, ix, iz + 1); relax(ix, iz, ix - 1, iz + 1); }
  }
  for (let i = 0; i < N * N; i++) d[i] *= CELL;
  return { d, s };
}

/** 距離場・水深・海底ゾーン・砂浜の高さを計算 */
export function computeDerived(g: Grid) {
  const waterSrc = new Uint8Array(N * N);
  const landSrc = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const isWater = g.ground[i] === G.WATER;
    waterSrc[i] = isWater ? 1 : 0;
    landSrc[i] = !isWater || g.tetra[i] ? 1 : 0;
  }
  const w = distanceTransform(waterSrc);
  g.dWater.set(w.d);
  const l = distanceTransform(landSrc);
  g.dLand.set(l.d);
  for (let i = 0; i < N * N; i++) {
    const si = l.s[i];
    g.landType.set([si >= 0 ? (g.tetra[si] ? G.ROCK : g.ground[si]) : G.WATER], i);
  }
  // 砂浜の頂点高さ
  const W = N + 1;
  const sandH = (d: number) => -0.3 - 1.15 * Math.max(0, 1 - d / 6);
  for (let iz = 0; iz <= N; iz++) {
    for (let ix = 0; ix <= N; ix++) {
      let sum = 0, c = 0;
      for (let oz = -1; oz <= 0; oz++) for (let ox = -1; ox <= 0; ox++) {
        const x = ix + ox, z = iz + oz;
        if (g.inB(x, z) && g.ground[z * N + x] === G.SAND) { sum += g.dWater[z * N + x]; c++; }
        else if (g.inB(x, z) && g.ground[z * N + x] === G.WATER) { sum += 0; c++; }
      }
      g.cornerH[iz * W + ix] = c ? sandH(sum / c) : 0;
    }
  }
  // 水深・ゾーン
  for (let iz = 0; iz < N; iz++) {
    for (let ix = 0; ix < N; ix++) {
      const i = iz * N + ix;
      const gr = g.ground[i];
      if (gr !== G.WATER) { g.depth[i] = gr === G.SAND ? 0.15 : 4; g.zone[i] = SeabedZone.Sand; continue; }
      const d = g.dLand[i], lt = g.landType[i];
      let depth: number;
      if (lt === G.SAND) depth = 0.1 + d * 0.22;
      else if (lt === G.ROCK) depth = 1.0 + d * 0.5;
      else depth = 3.5 + Math.min(d, 20) * 0.12;
      if (g.hole[i]) depth = 3.5;
      depth = Math.min(depth, 10);
      g.depth[i] = depth;
      const wx_ = wx(ix), wz_ = wz(iz);
      const n = vnoise(wx_ * 0.08, wz_ * 0.08, 3);
      let z: number = SeabedZone.Sand;
      if ((lt === G.CONCRETE || lt === G.ASPHALT) && d < 3.5) z = SeabedZone.Wall;
      else if (lt === G.ROCK && d < 10) z = SeabedZone.Reef;
      else if (depth < 2.2) z = SeabedZone.Shallow;
      else if (n > 0.58 && depth >= 1.5 && depth <= 6.5 && d < 25) z = SeabedZone.Weed;
      else if (depth >= 7.5) z = SeabedZone.Deep;
      g.zone[i] = z;
    }
  }
}

/** スポーンからの到達可能領域（プレイヤー円で実際に通れるセルのみ） */
export function computeReach(g: Grid, sx: number, sz: number) {
  g.reach.fill(0);
  const clear = (ix: number, iz: number) => g.walkable(ix, iz) && !g.blockedCircle(wx(ix), wz(iz), PLAYER_RADIUS);
  const stack: number[] = [];
  const six = cx(sx), siz = cz(sz);
  if (!clear(six, siz)) return 0;
  g.reach[siz * N + six] = 1; stack.push(siz * N + six);
  let n = 1;
  while (stack.length) {
    const i = stack.pop()!;
    const ix = i % N, iz = (i / N) | 0;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = ix + dx, z = iz + dz;
      if (!g.inB(x, z)) continue;
      const j = z * N + x;
      if (g.reach[j] || !clear(x, z)) continue;
      g.reach[j] = 1; n++; stack.push(j);
    }
  }
  return n;
}

/** 指定点に最も近い到達可能セル中心 */
export function snapReachable(g: Grid, x: number, z: number, maxR = 8): [number, number] | null {
  const cix = cx(x), ciz = cz(z), R = Math.ceil(maxR / CELL);
  let best: [number, number] | null = null, bd = 1e9;
  for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
    const ix = cix + dx, iz = ciz + dz;
    if (!g.inB(ix, iz) || !g.reach[iz * N + ix]) continue;
    const dd = dx * dx + dz * dz;
    if (dd < bd) { bd = dd; best = [wx(ix), wz(iz)]; }
  }
  return best;
}
