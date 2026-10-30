import * as THREE from 'three';

export type RGB = [number, number, number];
const tmp = new THREE.Color();
export function rgb(hex: number): RGB { tmp.setHex(hex); return [tmp.r, tmp.g, tmp.b]; }
export function shade(c: RGB, k: number): RGB { return [c[0] * k, c[1] * k, c[2] * k]; }

/** 頂点カラー付きのフラットシェード ジオメトリを1つに結合するビルダー（ドローコール削減） */
export class GB {
  pos: number[] = [];
  nor: number[] = [];
  col: number[] = [];
  uv: number[] = [];

  tri(a: number[], b: number[], c: number[], color: RGB, inside?: number[]) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const l = Math.hypot(nx, ny, nz) || 1;
    nx /= l; ny /= l; nz /= l;
    if (inside) {
      const mx = (a[0] + b[0] + c[0]) / 3 - inside[0], my = (a[1] + b[1] + c[1]) / 3 - inside[1], mz = (a[2] + b[2] + c[2]) / 3 - inside[2];
      if (nx * mx + ny * my + nz * mz < 0) { [b, c] = [c, b]; nx = -nx; ny = -ny; nz = -nz; }
    }
    for (const p of [a, b, c]) { this.pos.push(p[0], p[1], p[2]); this.nor.push(nx, ny, nz); this.col.push(color[0], color[1], color[2]); this.uv.push(p[0], p[2]); }
  }
  quad(a: number[], b: number[], c: number[], d: number[], color: RGB, inside?: number[]) {
    this.tri(a, b, c, color, inside); this.tri(a, c, d, color, inside);
  }
  /** colors: 各頂点色つきクアッド（a,b=上辺 c,d=下辺）。法線の向きは out で指定 */
  quadGrad(a: number[], b: number[], c: number[], d: number[], ca: RGB, cb: RGB, cc: RGB, cd: RGB, out: number[]) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    let P = [a, b, c, d], C = [ca, cb, cc, cd];
    if (nx * out[0] + ny * out[1] + nz * out[2] < 0) { P = [a, d, c, b]; C = [ca, cd, cc, cb]; nx = -nx; ny = -ny; nz = -nz; }
    for (const k of [0, 1, 2, 0, 2, 3]) { const p = P[k], q = C[k]; this.pos.push(p[0], p[1], p[2]); this.nor.push(nx, ny, nz); this.col.push(q[0], q[1], q[2]); this.uv.push(p[0], p[2]); }
  }
  box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, color: RGB, noBottom = false) {
    const c = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
    const A = [x0, y0, z0], B = [x1, y0, z0], C = [x1, y0, z1], D = [x0, y0, z1];
    const E = [x0, y1, z0], F = [x1, y1, z0], Gp = [x1, y1, z1], H = [x0, y1, z1];
    this.quad(E, F, Gp, H, shade(color, 1.0), c);
    this.quad(A, B, F, E, shade(color, 0.86), c);
    this.quad(D, C, Gp, H, shade(color, 0.9), c);
    this.quad(A, D, H, E, shade(color, 0.8), c);
    this.quad(B, C, Gp, F, shade(color, 0.82), c);
    if (!noBottom) this.quad(A, B, C, D, shade(color, 0.6), c);
  }
  /** 切妻屋根。ridgeX: 棟がx方向 */
  gable(x0: number, z0: number, x1: number, z1: number, y0: number, rise: number, ov: number, color: RGB, ridgeX: boolean) {
    x0 -= ov; z0 -= ov; x1 += ov; z1 += ov;
    const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2, ym = y0 + rise;
    const inside = [mx, y0 + rise * 0.3, mz];
    if (ridgeX) {
      const r0 = [x0, ym, mz], r1 = [x1, ym, mz];
      this.quad([x0, y0, z0], [x1, y0, z0], r1, r0, color, inside);
      this.quad([x0, y0, z1], [x1, y0, z1], r1, r0, shade(color, 0.85), inside);
      this.tri([x0, y0, z0], [x0, y0, z1], r0, shade(color, 0.7), inside);
      this.tri([x1, y0, z0], [x1, y0, z1], r1, shade(color, 0.7), inside);
    } else {
      const r0 = [mx, ym, z0], r1 = [mx, ym, z1];
      this.quad([x0, y0, z0], [x0, y0, z1], r1, r0, color, inside);
      this.quad([x1, y0, z0], [x1, y0, z1], r1, r0, shade(color, 0.85), inside);
      this.tri([x0, y0, z0], [x1, y0, z0], r0, shade(color, 0.7), inside);
      this.tri([x0, y0, z1], [x1, y0, z1], r1, shade(color, 0.7), inside);
    }
  }
  /** three.js のジオメトリを変換・着色して追加 */
  addGeo(geo: THREE.BufferGeometry, m: THREE.Matrix4, color: RGB) {
    const g = geo.index ? geo.toNonIndexed() : geo;
    const p = g.getAttribute('position'), n = g.getAttribute('normal');
    const nm = new THREE.Matrix3().getNormalMatrix(m);
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(m); this.pos.push(v.x, v.y, v.z); this.uv.push(v.x, v.z);
      v.fromBufferAttribute(n, i).applyMatrix3(nm).normalize(); this.nor.push(v.x, v.y, v.z);
      this.col.push(color[0], color[1], color[2]);
    }
  }
  build(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.computeBoundingSphere();
    return g;
  }
}

/** 頂点カラー付きの単色ジオメトリ(インスタンス用) */
export function colored(geo: THREE.BufferGeometry, color: RGB): THREE.BufferGeometry {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const n = g.getAttribute('position').count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { arr[i * 3] = color[0]; arr[i * 3 + 1] = color[1]; arr[i * 3 + 2] = color[2]; }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return g;
}
