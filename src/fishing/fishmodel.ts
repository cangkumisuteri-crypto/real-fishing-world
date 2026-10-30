/**
 * 3D魚（プロシージャル）。長さ1の魚を作って全長 lengthM に拡大する。+X 方向が頭、原点が体の中心。
 * 体は「断面が楕円の紡錘形」を種ごとの輪郭で作り、頂点色で背→側面→腹のグラデーションと控えめな模様（側線・縞・斑）を付ける。
 * ヒレは薄いシェイプ。派手な色・光り物は使わず、実物に近い落ち着いた色にしている。
 */
import * as THREE from 'three';

type Fin = [number, number, number, boolean?]; // t0, t1（体軸上の位置）, 高さ, とげとげか
interface Look {
  hb: number; hd: number; w: number;           // 背側・腹側の半高さ、半幅（全長=1）
  pk: number; ped: number; hp?: number; rp?: number;  // 最大高さの位置、尾柄の細さ、頭の先の鋭さ、後半の丸み
  back: number; side: number; belly: number; fin: number; finDark?: number; tail: number;
  pat?: 'aji' | 'saba' | 'kasago' | 'mebaru' | 'madai' | 'buri' | 'tachi';
  dorsals: Fin[]; anal?: Fin; tailLen: number; tailSpread: number; fork: number;
  eye: number; eyeCol?: number; pect: number;
}
const LOOKS: Record<string, Look> = {
  aji:     { hb: 0.075, hd: 0.07, w: 0.055, pk: 0.62, ped: 0.12, back: 0x66705a, side: 0xa9b3a2, belly: 0xe4e7e0, fin: 0xb9b58e, tail: 0xb3ad86, pat: 'aji', dorsals: [[0.52, 0.7, 0.07, true], [0.1, 0.36, 0.06]], anal: [0.1, 0.3, 0.05], tailLen: 0.15, tailSpread: 0.085, fork: 0.5, eye: 0.026, pect: 0.07 },
  saba:    { hb: 0.065, hd: 0.065, w: 0.06, pk: 0.5, ped: 0.07, hp: 1.15, back: 0x365f6e, side: 0xb9c6c8, belly: 0xe7ebea, fin: 0x6a8189, tail: 0x56707a, pat: 'saba', dorsals: [[0.52, 0.68, 0.06, true], [0.2, 0.34, 0.045]], anal: [0.2, 0.34, 0.04], tailLen: 0.16, tailSpread: 0.09, fork: 0.55, eye: 0.026, pect: 0.06 },
  kasago:  { hb: 0.12, hd: 0.095, w: 0.095, pk: 0.7, ped: 0.2, rp: 0.9, back: 0x6e4a3c, side: 0x8f6a58, belly: 0xc2a794, fin: 0x7e5848, finDark: 0x4b3029, tail: 0x775141, pat: 'kasago', dorsals: [[0.3, 0.78, 0.075, true]], anal: [0.18, 0.3, 0.045], tailLen: 0.13, tailSpread: 0.075, fork: 0.1, eye: 0.034, pect: 0.13 },
  mebaru:  { hb: 0.1, hd: 0.08, w: 0.075, pk: 0.68, ped: 0.16, back: 0x4d4a37, side: 0x6c6249, belly: 0x9d9078, fin: 0x5c5440, finDark: 0x3c3629, tail: 0x575039, pat: 'mebaru', dorsals: [[0.3, 0.76, 0.06, true]], anal: [0.16, 0.28, 0.04], tailLen: 0.13, tailSpread: 0.07, fork: 0.1, eye: 0.04, eyeCol: 0x1e1c16, pect: 0.1 },
  chinu:   { hb: 0.14, hd: 0.115, w: 0.07, pk: 0.58, ped: 0.15, back: 0x5d666c, side: 0x969ea0, belly: 0xc9cdcb, fin: 0x484f54, tail: 0x434a4f, dorsals: [[0.32, 0.76, 0.075, true]], anal: [0.14, 0.3, 0.055], tailLen: 0.14, tailSpread: 0.09, fork: 0.42, eye: 0.027, pect: 0.1 },
  seabass: { hb: 0.075, hd: 0.07, w: 0.055, pk: 0.6, ped: 0.12, hp: 1.15, back: 0x66727a, side: 0xb4bcbd, belly: 0xeceeea, fin: 0x7b858a, tail: 0x59646a, dorsals: [[0.5, 0.7, 0.06, true], [0.14, 0.34, 0.05]], anal: [0.14, 0.28, 0.04], tailLen: 0.14, tailSpread: 0.075, fork: 0.3, eye: 0.022, pect: 0.07 },
  tachiuo: { hb: 0.022, hd: 0.02, w: 0.0075, pk: 0.86, ped: 0.04, hp: 1.4, rp: 0.8, back: 0xaab8c0, side: 0xcdd5d8, belly: 0xe3e7e8, fin: 0xcad2d4, tail: 0xb3bec3, pat: 'tachi', dorsals: [[0.06, 0.82, 0.016]], tailLen: 0.025, tailSpread: 0.006, fork: 0, eye: 0.0105, pect: 0.02 },
  madai:   { hb: 0.145, hd: 0.115, w: 0.07, pk: 0.62, ped: 0.14, hp: 1.05, back: 0xc97c6f, side: 0xdba293, belly: 0xefd8d0, fin: 0xcc7a6c, tail: 0xc4695d, pat: 'madai', dorsals: [[0.3, 0.76, 0.07, true]], anal: [0.14, 0.3, 0.05], tailLen: 0.15, tailSpread: 0.095, fork: 0.42, eye: 0.026, pect: 0.09 },
  buri:    { hb: 0.082, hd: 0.082, w: 0.075, pk: 0.55, ped: 0.07, hp: 1.1, back: 0x44616f, side: 0xaab5b6, belly: 0xe6e5dc, fin: 0x9a9660, tail: 0x7f8668, pat: 'buri', dorsals: [[0.52, 0.66, 0.045], [0.2, 0.36, 0.04]], anal: [0.2, 0.34, 0.04], tailLen: 0.16, tailSpread: 0.095, fork: 0.5, eye: 0.022, pect: 0.07 },
};
const DEFAULT_LOOK: Look = { hb: 0.08, hd: 0.07, w: 0.055, pk: 0.6, ped: 0.12, back: 0x66727a, side: 0xa4adae, belly: 0xe4e7e5, fin: 0x7b858a, tail: 0x66727a, dorsals: [[0.3, 0.7, 0.06]], tailLen: 0.14, tailSpread: 0.08, fork: 0.4, eye: 0.025, pect: 0.07 };

const ss = (x: number, a: number, b: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const hash = (a: number, b: number) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };

/** t: 0=尾柄 … 1=吻 → 体の輪郭（0..1） */
function profile(L: Look, t: number): number {
  const hp = L.hp ?? 0.95, rp = L.rp ?? 1;
  if (t >= L.pk) { const u = (t - L.pk) / (1 - L.pk); return Math.pow(Math.max(0, 1 - u * u), 0.5 * hp); }
  return L.ped + (1 - L.ped) * Math.pow(Math.sin(Math.PI / 2 * (t / L.pk)), rp);
}

function bodyGeometry(L: Look, speciesPat: Look['pat']): THREE.BufferGeometry {
  const N = 56, M = 22;
  const pos: number[] = [], col: number[] = [], idx: number[] = [];
  const cBack = new THREE.Color(L.back), cSide = new THREE.Color(L.side), cBelly = new THREE.Color(L.belly), c = new THREE.Color();
  const dark = new THREE.Color(), tmp = new THREE.Color();
  for (let i = 0; i <= N; i++) {
    const t = i / N, p = profile(L, t);
    for (let j = 0; j <= M; j++) {
      const a = (j / M) * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
      const h = ca >= 0 ? L.hb : L.hd;
      pos.push((t - 0.5), ca * h * p, sa * L.w * p);
      // 色：背→側面→腹
      const v = ca; // 1=背, -1=腹
      c.copy(cBack).lerp(cSide, ss(v, 0.62, 0.12)).lerp(cBelly, ss(v, -0.05, -0.55));
      const side = Math.abs(sa);
      switch (speciesPat) {
        case 'aji': { const ll = Math.exp(-(((v - 0.1) / 0.09) ** 2)) * ss(t, 0.1, 0.35) * 0.45; c.lerp(tmp.set(0xc4b46a), ll); break; }
        case 'saba': { const w = Math.sin(t * 62 + v * 7 + Math.sin(t * 17) * 2); const m = ss(w, 0.15, 0.7) * ss(v, 0.2, 0.55) * ss(t, 0.12, 0.3) * 0.65; c.lerp(dark.set(0x1b3540), m); break; }
        case 'kasago': { const n = Math.sin(t * 23 + v * 7 + a) + Math.sin(t * 41 - v * 13 + 1.7) + Math.sin(t * 9 + a * 2); c.lerp(dark.set(0x3d2820), ss(n, 0.4, 2.2) * 0.45).lerp(tmp.set(0xb08b78), ss(-n, 0.6, 2.2) * 0.3); break; }
        case 'mebaru': { const n = Math.sin(t * 19 + v * 9) + Math.sin(t * 37 - a * 3 + 0.4); c.lerp(dark.set(0x2f2b20), ss(n, 0.5, 1.8) * 0.4); break; }
        case 'madai': { const h2 = hash(Math.floor(t * 46), Math.floor((j / M) * 22)); c.lerp(tmp.set(0x6f9fcd), (h2 > 0.9 && v > -0.05 && t > 0.2 && t < 0.78 ? 0.45 : 0) * ss(v, -0.05, 0.3)); break; }
        case 'buri': { const b = Math.exp(-(((v - 0.03) / 0.07) ** 2)) * ss(t, 0.08, 0.3) * ss(0.78, t, 0.6) * 0.75; c.lerp(tmp.set(0xc3a944), b); break; }
        case 'tachi': { c.lerp(tmp.set(0xe5ebee), 0.25 * ss(v, 0.2, -0.2)); break; }
        default: break;
      }
      // 鰓蓋のあたりを少しだけ暗く
      c.lerp(dark.set(0x000000), 0.1 * Math.exp(-(((t - 0.76) / 0.012) ** 2)) * (1 - side * 0.3));
      void side;
      col.push(c.r, c.g, c.b);
    }
  }
  for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) {
    const a = i * (M + 1) + j, b = a + M + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

function finMesh(shape: THREE.Shape, color: number, opacity = 0.92): THREE.Mesh {
  const m = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide, transparent: opacity < 1, opacity });
  return new THREE.Mesh(new THREE.ShapeGeometry(shape, 6), m);
}
/** 背ビレ（上向き: dir=1）／尻ビレ（下向き: dir=-1） */
function dorsalFin(L: Look, f: Fin, dir: 1 | -1): THREE.Shape {
  const [t0, t1, h, spiky] = f; const s = new THREE.Shape(); const K = 14;
  const base = (t: number) => dir * (dir > 0 ? L.hb : L.hd) * profile(L, t) * 0.97;
  s.moveTo(t0 - 0.5, base(t0));
  const top: [number, number][] = [];
  for (let k = 0; k <= K; k++) {
    const u = k / K, t = t0 + (t1 - t0) * u;
    // 前が高く後ろへ下がる形（とげ条は前が高い）
    const env = spiky ? (1 - 0.55 * u) * Math.sin(Math.min(1, u * 5 + 0.2) * Math.PI / 2) : 0.55 + 0.45 * Math.sin(Math.PI * Math.min(1, u * 1.4)) ;
    const zig = spiky && k % 2 === 1 ? 0.78 : 1;
    top.push([t - 0.5, base(t) + dir * h * env * zig]);
  }
  for (const [x, y] of top) s.lineTo(x, y);
  s.lineTo(t1 - 0.5, base(t1));
  s.lineTo(t0 - 0.5, base(t0));
  return s;
}
function tailShape(L: Look): THREE.Shape {
  const s = new THREE.Shape(); const x0 = -0.5 + 0.01, hp = L.ped * L.hb * 0.9, tl = L.tailLen, sp = L.tailSpread, notch = tl * (1 - L.fork);
  s.moveTo(x0, hp); s.quadraticCurveTo(x0 - tl * 0.5, sp * 0.9, x0 - tl, sp);
  s.quadraticCurveTo(x0 - notch - tl * 0.05, sp * 0.25, x0 - notch, 0);
  s.quadraticCurveTo(x0 - notch - tl * 0.05, -sp * 0.25, x0 - tl, -sp);
  s.quadraticCurveTo(x0 - tl * 0.5, -sp * 0.9, x0, -hp); s.lineTo(x0, hp);
  return s;
}
function pectoralShape(len: number): THREE.Shape {
  const s = new THREE.Shape(); s.moveTo(0, 0.004); s.quadraticCurveTo(-len * 0.4, len * 0.34, -len, 0); s.quadraticCurveTo(-len * 0.4, -len * 0.3, 0, -0.004); return s;
}

/** 全長 lengthM（m）の魚。+X 方向が頭。原点が体の中心。 */
export function makeFish(speciesId: string, lengthM: number): THREE.Group {
  const L = LOOKS[speciesId] ?? DEFAULT_LOOK;
  const g = new THREE.Group(); g.name = 'fish:' + speciesId;
  const root = new THREE.Group(); g.add(root);
  const body = new THREE.Mesh(bodyGeometry(L, L.pat), new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 26, specular: 0x262a2c }));
  root.add(body);
  const finCol = L.fin;
  for (const f of L.dorsals) root.add(finMesh(dorsalFin(L, f, 1), finCol, 0.9));
  if (L.anal) root.add(finMesh(dorsalFin(L, L.anal, -1), finCol, 0.9));
  if (L.tailLen > 0.03) root.add(finMesh(tailShape(L), L.tail, 0.95));
  else { // タチウオ：尾はごく細い
    const s = new THREE.Shape(); s.moveTo(-0.5, 0.002); s.lineTo(-0.5 - L.tailLen * 3, 0); s.lineTo(-0.5, -0.002); root.add(finMesh(s, L.tail));
  }
  // 胸ビレ（左右）
  const tp = 0.74, pp = profile(L, tp);
  for (const sgn of [-1, 1]) {
    const pf = finMesh(pectoralShape(L.pect), finCol, 0.9);
    pf.position.set(tp - 0.5, -L.hd * 0.28 * pp, sgn * L.w * pp * 0.92); pf.rotation.set(0, sgn * 0.5, sgn * 0.0); root.add(pf);
  }
  // 目
  const ex = 0.87, ep = profile(L, ex);
  const iris = new THREE.MeshPhongMaterial({ color: 0xcfd0c0, shininess: 40 }), pup = new THREE.MeshPhongMaterial({ color: L.eyeCol ?? 0x14150f, shininess: 70 });
  for (const sgn of [-1, 1]) {
    const e = new THREE.Mesh(new THREE.SphereGeometry(L.eye, 12, 8), iris); e.scale.set(1, 1, 0.28);
    e.position.set(ex - 0.5, L.hb * 0.22 * ep, sgn * L.w * ep * 0.86); root.add(e);
    const pu = new THREE.Mesh(new THREE.SphereGeometry(L.eye * 0.68, 10, 8), pup); pu.scale.set(1, 1, 0.28);
    pu.position.set(ex - 0.5, L.hb * 0.22 * ep, sgn * (L.w * ep * 0.9 + L.eye * 0.05)); root.add(pu);
  }
  root.scale.setScalar(lengthM);
  g.traverse((o) => { o.frustumCulled = false; });
  return g;
}
export function disposeObj(o: THREE.Object3D) {
  o.traverse((c) => { const m = c as THREE.Mesh; m.geometry?.dispose?.(); const mm = m.material as THREE.Material | THREE.Material[]; if (Array.isArray(mm)) mm.forEach((x) => x.dispose()); else mm?.dispose?.(); });
}
