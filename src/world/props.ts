import * as THREE from 'three';
import { Grid, G, N, wx, wz, hash2, cx, cz, WATER_Y, snapReachable, vnoise } from './grid';
import { GB, rgb, shade, colored, RGB } from './geom';
import { BUILDINGS, MapData, SPOTS, SpotDef } from './layout';
import { signTex } from './textures';
import { SeabedZone } from '../data/seabed';
import { woodTex } from './textures';

export interface PropsQuality { seaweed: number; tetraMax: number }

export interface SpotMarker { def: SpotDef; x: number; z: number }

export function buildProps(map: MapData, q: PropsQuality) {
  const g = map.grid;
  const group = new THREE.Group();
  group.name = 'props';
  const lambertVC = new THREE.MeshLambertMaterial({ vertexColors: true });

  // ---- 建物（1メッシュに結合） ----
  const bb = new GB();
  const win = rgb(0x2b4558);
  for (const b of BUILDINGS) {
    const body = rgb(b.body), roof = rgb(b.roof);
    bb.box(b.x0, 0, b.z0, b.x1, b.h, b.z1, body, true);
    if (b.roofKind === 'gable') bb.gable(b.x0, b.z0, b.x1, b.z1, b.h, Math.min(b.x1 - b.x0, b.z1 - b.z0) * 0.22 + 0.6, 0.35, roof, !!b.ridgeX);
    else { bb.box(b.x0 - 0.05, b.h, b.z0 - 0.05, b.x1 + 0.05, b.h + 0.12, b.z1 + 0.05, shade(roof, 0.8), true); }
    if (b.windows) {
      for (const side of [-1, 1]) {
        const z = side < 0 ? b.z0 - 0.04 : b.z1 + 0.04;
        for (let x = b.x0 + 1.4; x < b.x1 - 1.2; x += 2.6) {
          if (b.door === (side < 0 ? 'N' : 'S') && Math.abs(x - (b.x0 + b.x1) / 2) < 1.8) continue;
          bb.box(x - 0.55, 1.4, z - 0.04, x + 0.55, 2.3, z + 0.04, win, true);
        }
      }
    }
    if (b.roofKind === 'flat') {
      // コンテナの縦リブ
      const rib = shade(body, 0.85);
      for (let x = b.x0 + 0.5; x < b.x1; x += 0.7) { bb.box(x - 0.04, 0.1, b.z0 - 0.04, x + 0.04, b.h - 0.1, b.z0, rib, true); bb.box(x - 0.04, 0.1, b.z1, x + 0.04, b.h - 0.1, b.z1 + 0.04, rib, true); }
    }
    if (b.door) {
      const mx = (b.x0 + b.x1) / 2;
      const z = b.door === 'N' ? b.z0 - 0.05 : b.z1 + 0.05;
      bb.box(mx - 0.7, 0, z - 0.05, mx + 0.7, 2.2, z + 0.05, rgb(0x7a4a2a), true);
      if (b.id === 'shop') {
        // 日よけ（赤白）
        for (let k = 0; k < 6; k++) bb.box(b.x0 + 2.5 + k * 0.85, 2.45, b.z0 - 1.4, b.x0 + 2.5 + (k + 1) * 0.85, 2.6, b.z0, k % 2 ? rgb(0xf5f0e8) : rgb(0xd9453d), true);
        // 店先の竿立て
        bb.box(b.x0 + 0.6, 0, b.z0 - 0.5, b.x0 + 1.6, 1.0, b.z0 - 0.1, rgb(0x8b6a3d), true);
        for (let k = 0; k < 4; k++) bb.box(b.x0 + 0.7 + k * 0.22, 1.0, b.z0 - 0.35, b.x0 + 0.78 + k * 0.22, 2.4, b.z0 - 0.27, rgb(0x2a2a2a), true);
      }
    }
  }
  // 柵（草地との境界）
  const fence = rgb(0xc8c8c0);
  for (let x = -40; x <= 48; x += 2) bb.box(x - 0.05, 0, 41.9, x + 0.05, 1.1, 42.0, fence, true);
  bb.box(-40, 0.9, 41.92, 48, 0.98, 41.98, fence, true);
  bb.box(-40, 0.5, 41.92, 48, 0.58, 41.98, fence, true);
  // 船（港内）
  const boats: [number, number, number, number][] = [[-12, 3.6, 0.1, 0xf4f4f0], [-2.5, 2.4, -0.05, 0x3a7bd5], [8, 3.8, 0.12, 0xf4f4f0], [-27, -3, 0.0, 0xe8b830]];
  for (const [x, z, , c] of boats) {
    const hull = rgb(c), red = rgb(0x8b2b2b);
    bb.box(x - 2.4, -1.95, z - 0.85, x + 2.4, -1.4, z + 0.85, red, true);
    bb.box(x - 2.4, -1.4, z - 0.85, x + 2.4, -0.55, z + 0.85, hull, true);
    bb.box(x + 2.4, -1.4, z - 0.45, x + 3.2, -0.55, z + 0.45, hull, true);
    bb.box(x - 1.0, -0.55, z - 0.6, x + 0.5, 0.5, z + 0.6, shade(hull, 0.95), true);
    bb.box(x - 0.9, 0.0, z - 0.62, x + 0.4, 0.35, z + 0.62, win, true);
    bb.box(x - 0.04, 0.5, z - 0.04, x + 0.04, 2.4, z + 0.04, rgb(0x555555), true);
  }
  // 木箱
  for (const c of map.crates) bb.box(c.x - c.w / 2, 0, c.z - c.d / 2, c.x + c.w / 2, c.h, c.z + c.d / 2, rgb(c.c), true);
  // 穴釣りエリアの注意ポール（黄黒）
  const hz = [-35.2, -17.8];
  for (const x of hz) for (let k = 0; k < 4; k++) bb.box(x - 0.07, k * 0.3, 7.6, x + 0.07, (k + 1) * 0.3, 7.6 + 0.14, k % 2 ? rgb(0x222222) : rgb(0xe8c428), true);
  const bm = new THREE.Mesh(bb.build(), lambertVC); bm.name = 'buildings'; group.add(bm);

  // 拠点の木製デッキ（wood.webp）
  { const dk = new GB(); dk.box(-31, 0, 17.6, -21, 0.06, 19, [1, 1, 1], true);
    const w = woodTex(); const dm = new THREE.Mesh(dk.build(), new THREE.MeshLambertMaterial({ map: w, vertexColors: true })); dm.name = 'baseDeck'; group.add(dm); }
  // ---- 看板 ----
  const signs: [string, string, string, string, number, number, number][] = [
    ['潮風つり具', 'しおかぜ（準備中）', '#1f4f8f', '#ffffff', 5, 17.0, 3.4],
    ['拠点', 'BASE / 準備中', '#3f6a55', '#f2f2e6', -26, 17.0, 3.0],
    ['魚市場', 'FISH MARKET / 準備中', '#7a3b2a', '#fff2da', 18, 26.9, 3.0],
    ['穴釣りエリア', '隙間に落ちないよう注意', '#e8c428', '#222222', -22.5, 12.3, 2.2],
  ];
  for (const [m, s, bg, fg, x, z, y] of signs) {
    const mat = new THREE.MeshBasicMaterial({ map: signTex(m, s, bg, fg) });
    const w = m === '穴釣りエリア' ? 2.6 : 3.6, h = w * 192 / 512;
    for (const side of [1, -1]) { // 表裏どちらから見ても文字が正しく読める
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
      mesh.position.set(x, y, z + side * 0.03); mesh.rotation.y = side === 1 ? 0 : Math.PI;
      group.add(mesh);
    }
    const posts = new GB();
    posts.box(x - w / 2 + 0.1, 0, z - 0.04, x - w / 2 + 0.2, y, z + 0.04, rgb(0x555555), true);
    posts.box(x + w / 2 - 0.2, 0, z - 0.04, x + w / 2 - 0.1, y, z + 0.04, rgb(0x555555), true);
    group.add(new THREE.Mesh(posts.build(), lambertVC));
    // 看板の脚をぶつからないよう衝突セルにも反映
    for (const px of [x - w / 2 + 0.15, x + w / 2 - 0.15]) { const ix = cx(px), iz = cz(z); if (g.inB(ix, iz)) g.blocked[iz * N + ix] = 1; }
  }

  // ---- インスタンス: 係船柱・街灯 ----
  const bg = new GB();
  bg.addGeo(new THREE.CylinderGeometry(0.15, 0.2, 0.42, 8), new THREE.Matrix4().makeTranslation(0, 0.21, 0), rgb(0x2f3a42));
  bg.addGeo(new THREE.CylinderGeometry(0.24, 0.16, 0.12, 8), new THREE.Matrix4().makeTranslation(0, 0.46, 0), rgb(0xe8c428));
  const bollardMesh = inst(bg.build(), lambertVC, map.bollards.map((p) => [p.x, g.heightAt(p.x, p.z), p.z, 0, 1]));
  bollardMesh.name = 'bollards'; group.add(bollardMesh);

  const lg = new GB();
  lg.addGeo(new THREE.CylinderGeometry(0.06, 0.09, 4.4, 6), new THREE.Matrix4().makeTranslation(0, 2.2, 0), rgb(0x505860));
  lg.addGeo(new THREE.BoxGeometry(0.9, 0.05, 0.05), new THREE.Matrix4().makeTranslation(0.35, 4.4, 0), rgb(0x505860));
  const lampPole = inst(lg.build(), lambertVC, map.lamps.map((p) => [p.x, 0, p.z, 0, 1]));
  lampPole.name = 'lampPoles'; group.add(lampPole);
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xffe9a8 });
  const lampHead = inst(new THREE.SphereGeometry(0.16, 8, 6), lampMat, map.lamps.map((p) => [p.x + 0.8, 4.34, p.z, 0, 1]));
  lampHead.name = 'lampHeads'; group.add(lampHead);

  // ---- テトラポッド（インスタンス） ----
  const tg = new GB();
  const up = new THREE.Vector3(0, 1, 0);
  for (const d of [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]) {
    const dir = new THREE.Vector3(d[0], d[1], d[2]).normalize();
    const m = new THREE.Matrix4().compose(dir.clone().multiplyScalar(0.45), new THREE.Quaternion().setFromUnitVectors(up, dir), new THREE.Vector3(1, 1, 1));
    tg.addGeo(new THREE.CylinderGeometry(0.17, 0.27, 0.95, 5), m, rgb(0xa5a39b));
  }
  const tetraList = map.tetras.slice(0, q.tetraMax);
  const tetra = new THREE.InstancedMesh(tg.build(), lambertVC, tetraList.length);
  { const m = new THREE.Matrix4(), e = new THREE.Euler(), qn = new THREE.Quaternion(), s = new THREE.Vector3();
    tetraList.forEach((t, i) => { e.set(hash2(i, 1, 51) * 6.28, hash2(i, 2, 51) * 6.28, hash2(i, 3, 51) * 6.28); qn.setFromEuler(e); s.setScalar(t.r * 1.4); m.compose(new THREE.Vector3(t.x, t.y, t.z), qn, s); tetra.setMatrixAt(i, m); }); }
  tetra.name = 'tetrapods'; group.add(tetra);

  // ---- 岩 ----
  const rg = new THREE.IcosahedronGeometry(0.75, 0).toNonIndexed();
  { const p = rg.getAttribute('position'); for (let i = 0; i < p.count; i++) { const k = 1 + 0.18 * Math.sin(p.getX(i) * 7.1 + p.getZ(i) * 5.3 + p.getY(i) * 3.7); p.setXYZ(i, p.getX(i) * k, p.getY(i) * k, p.getZ(i) * k); } rg.computeVertexNormals(); }
  const rockMesh = new THREE.InstancedMesh(rg, new THREE.MeshLambertMaterial({ color: 0xffffff }), map.rocks.length);
  { const m = new THREE.Matrix4(), qn = new THREE.Quaternion(), e = new THREE.Euler(); const c = new THREE.Color();
    map.rocks.forEach((r, i) => { e.set(0, hash2(i, 5, 61) * 6.28, 0); qn.setFromEuler(e); const onWater = g.groundAt(cx(r.x), cz(r.z)) === G.WATER; m.compose(new THREE.Vector3(r.x, onWater ? WATER_Y + 0.05 : 0.15, r.z), qn, new THREE.Vector3(r.s * 1.1, r.s * 0.8, r.s * 1.1)); rockMesh.setMatrixAt(i, m); const v = 0.38 + hash2(i, 6, 61) * 0.22; c.setRGB(v * 1.05, v, v * 0.92); rockMesh.setColorAt(i, c); }); }
  rockMesh.name = 'rocks'; group.add(rockMesh);

  // ---- 海藻 ----
  const bladeGeo = new THREE.PlaneGeometry(0.28, 1, 1, 4); bladeGeo.translate(0, 0.5, 0);
  const swayU = { value: 0 };
  const weedMat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  weedMat.onBeforeCompile = (sh) => {
    sh.uniforms.uTimeW = swayU;
    sh.vertexShader = 'uniform float uTimeW;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n transformed.x += sin(uTimeW*1.6 + instanceMatrix[3].x*0.7 + instanceMatrix[3].z*0.5) * 0.28 * position.y * position.y;');
  };
  const weeds: { x: number; z: number; s: number }[] = [];
  let guard = 0;
  while (weeds.length < q.seaweed && guard++ < q.seaweed * 60) {
    const ix = Math.floor(hash2(guard, 1, 71) * N), iz = Math.floor(hash2(guard, 2, 71) * N);
    const i = iz * N + ix;
    if (g.ground[i] !== G.WATER || g.tetra[i]) continue;
    const z = g.zone[i];
    const p = z === SeabedZone.Weed ? 0.9 : z === SeabedZone.Reef ? 0.5 : z === SeabedZone.Wall ? 0.25 : z === SeabedZone.Shallow ? 0.12 : 0;
    if (hash2(guard, 3, 71) > p) continue;
    const dep = g.depth[i];
    if (dep > 7) continue;
    // 見える範囲（プレイエリア周辺）に寄せる
    const x = wx(ix), zz = wz(iz);
    if (x < -70 || x > 62 || zz < -62 || zz > 30) continue;
    weeds.push({ x, z: zz, s: Math.min(2.8, 0.7 + dep * 0.5) * (0.7 + hash2(guard, 4, 71) * 0.6) });
  }
  const weedMesh = new THREE.InstancedMesh(bladeGeo, weedMat, weeds.length);
  { const m = new THREE.Matrix4(), qn = new THREE.Quaternion(), e = new THREE.Euler(); const c = new THREE.Color();
    weeds.forEach((w, i) => { const dep = g.depth[cz(w.z) * N + cx(w.x)]; e.set(0, hash2(i, 7, 71) * 3.14, 0); qn.setFromEuler(e); m.compose(new THREE.Vector3(w.x, WATER_Y - dep, w.z), qn, new THREE.Vector3(1, w.s, 1)); weedMesh.setMatrixAt(i, m); c.setRGB(0.1 + hash2(i, 8, 71) * 0.12, 0.35 + hash2(i, 9, 71) * 0.2, 0.12); weedMesh.setColorAt(i, c); }); }
  weedMesh.name = 'seaweed'; group.add(weedMesh);

  // ---- 遠景（対岸・山） ----
  const hg = new GB();
  const hills: [number, number, number, number, number, number][] = [
    [-120, 150, 120, 46, 0x40604f, 7], [20, 190, 160, 70, 0x365846, 7], [150, 160, 120, 50, 0x40604f, 6], [-230, 120, 140, 60, 0x365846, 7],
    [-100, -330, 160, 26, 0x5d7488, 7], [60, -360, 200, 34, 0x56707f, 7], [220, -300, 140, 24, 0x5d7488, 7], [-260, -240, 100, 20, 0x5d7488, 6],
  ];
  for (const [x, z, w, h, c, seg] of hills) hg.addGeo(new THREE.ConeGeometry(1, 1, seg), new THREE.Matrix4().compose(new THREE.Vector3(x, h / 2 - 1, z), new THREE.Quaternion(), new THREE.Vector3(w / 2, h, w / 2)), rgb(c));
  group.add(new THREE.Mesh(hg.build(), lambertVC));

  // ---- 釣り場マーカー（ヒント。任意） ----
  const markers: SpotMarker[] = [];
  const mg = new GB();
  const mpos: number[] = [], mv: number[] = [], midx: number[] = [];
  const labels = new THREE.Group(); labels.name = 'spotLabels';
  for (const s of SPOTS) {
    let p: [number, number] = snapReachable(g, s.x, s.z, 6) ?? [s.x, s.z];
    { // マーカーは「水際ぎりぎりで歩ける場所」に寄せる（釣り開始が必ず押せるように）
      let bd = 1e9, bp: [number, number] | null = null;
      for (let dz = -18; dz <= 18; dz++) for (let dx = -18; dx <= 18; dx++) {
        const ix = cx(s.x) + dx, iz = cz(s.z) + dz;
        if (!g.inB(ix, iz) || !g.reach[iz * N + ix] || !g.walkable(ix, iz) || g.dWater[iz * N + ix] > 1.3) continue;
        const d = Math.hypot(dx, dz); if (d < bd) { bd = d; bp = [wx(ix), wz(iz)]; }
      }
      if (bp && bd < 9) p = bp;
    }
    markers.push({ def: s, x: p[0], z: p[1] });
    const y0 = g.heightAt(p[0], p[1]) + 0.04;
    const base = mpos.length / 3;
    const R0 = 0.55, R1 = 0.8, SEG = 20;
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a);
      mpos.push(p[0] + c * R0, y0, p[1] + sn * R0, p[0] + c * R1, y0, p[1] + sn * R1); mv.push(0, 0);
    }
    for (let i = 0; i < SEG; i++) { const a = base + i * 2; midx.push(a, a + 1, a + 3, a, a + 3, a + 2); }
    const b2 = mpos.length / 3;
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2, c = Math.cos(a) * 0.5, sn = Math.sin(a) * 0.5;
      mpos.push(p[0] + c, y0, p[1] + sn, p[0] + c, y0 + 4, p[1] + sn); mv.push(1, 0, 1, 1);
    }
    // mv は (kind) を1要素/頂点で持つため作り直す
    for (let i = 0; i < SEG; i++) { const a = b2 + i * 2; midx.push(a, a + 1, a + 3, a, a + 3, a + 2); }
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex(s.name), transparent: true, depthTest: false, fog: false }));
    sp.scale.set(5.2, 0.9, 1); sp.position.set(p[0], y0 + 4.6, p[1]); sp.renderOrder = 20; labels.add(sp);
  }
  // kind/height 属性を頂点ごとに構築
  const nV = mpos.length / 3;
  const kindA = new Float32Array(nV), hA = new Float32Array(nV);
  { let v = 0; for (let s = 0; s < SPOTS.length; s++) { const SEG = 20; for (let i = 0; i <= SEG; i++) { kindA[v] = 0; hA[v++] = 0; kindA[v] = 0; hA[v++] = 0; } for (let i = 0; i <= SEG; i++) { kindA[v] = 1; hA[v++] = 0; kindA[v] = 1; hA[v++] = 1; } } }
  const mgeo = new THREE.BufferGeometry();
  mgeo.setAttribute('position', new THREE.Float32BufferAttribute(mpos, 3));
  mgeo.setAttribute('aKind', new THREE.BufferAttribute(kindA, 1));
  mgeo.setAttribute('aH', new THREE.BufferAttribute(hA, 1));
  mgeo.setIndex(midx);
  const markerU = { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() } };
  const markerMat = new THREE.ShaderMaterial({
    uniforms: markerU, transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    vertexShader: 'attribute float aKind; attribute float aH; varying float vK; varying float vH; varying vec3 vW; void main(){ vK=aKind; vH=aH; vW=position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: 'uniform float uTime; uniform vec3 uCam; varying float vK; varying float vH; varying vec3 vW; void main(){ float p = 0.65+0.35*sin(uTime*3.0); float near = smoothstep(3.0,9.0,distance(vW.xz,uCam.xz)); float a = vK<0.5 ? 0.9*p : (1.0-vH)*0.38*p*near; gl_FragColor = vec4(1.0,0.78,0.25,a);\n#include <colorspace_fragment>\n\n }',
  });
  const markerMesh = new THREE.Mesh(mgeo, markerMat); markerMesh.frustumCulled = false; markerMesh.renderOrder = 5; markerMesh.name = 'spotMarkers';
  const hints = new THREE.Group(); hints.name = 'hints'; hints.add(markerMesh, labels); group.add(hints);

  return { group, markers, hints, update(t: number, cam?: THREE.Vector3) { swayU.value = t; markerU.uTime.value = t; if (cam) { markerU.uCam.value.copy(cam); for (const sp of labels.children) sp.visible = Math.hypot(sp.position.x - cam.x, sp.position.z - cam.z) > 9; } }, lampMat, lampHead, stats: { weeds: weeds.length, tetras: tetraList.length, rocks: map.rocks.length } };
}

function inst(geo: THREE.BufferGeometry, mat: THREE.Material, list: number[][]) {
  const m = new THREE.InstancedMesh(geo, mat, list.length);
  const mx = new THREE.Matrix4(), qn = new THREE.Quaternion(), e = new THREE.Euler();
  list.forEach((p, i) => { e.set(0, p[3], 0); qn.setFromEuler(e); mx.compose(new THREE.Vector3(p[0], p[1], p[2]), qn, new THREE.Vector3(p[4], p[4], p[4])); m.setMatrixAt(i, mx); });
  m.frustumCulled = false;
  return m;
}
function labelTex(text: string) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 88;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = 'rgba(10,25,40,0.72)'; ctx.beginPath(); (ctx as any).roundRect?.(4, 4, 504, 80, 18); if (!(ctx as any).roundRect) ctx.rect(4, 4, 504, 80); ctx.fill();
  ctx.strokeStyle = '#ffc94a'; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = 'bold 40px "Hiragino Sans","Noto Sans JP","Noto Sans CJK JP",sans-serif';
  ctx.fillText('★ ' + text, 256, 46, 490);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
