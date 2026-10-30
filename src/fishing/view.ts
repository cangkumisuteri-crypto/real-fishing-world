/** ウキ釣りの3D表示：ウキ・ライン・オモリ・エサ・狙い弧・波紋・魚影・ファイト中の魚・釣れた魚。ロジックは session.ts。 */
import * as THREE from 'three';
import { WATER_Y } from '../world/grid';
import { FishingSession, waveH } from './session';
import { makeFish, disposeObj } from './fishmodel';
import { SPECIES_BY_ID } from '../data/species';
import { BAITS } from './rigdata';

const V = new THREE.Vector3();
const lineMat = () => new THREE.LineBasicMaterial({ color: 0xf2f6fa, transparent: true, opacity: 0.85 });

export class FishingView {
  group = new THREE.Group();
  private floatG = new THREE.Group();
  private floatTip!: THREE.Mesh;
  private floatBody!: THREE.Mesh;
  private lineAir: THREE.Line; private lineWater: THREE.Line;
  private sinker: THREE.Mesh; private baitMesh: THREE.Mesh;
  private aimLine: THREE.Line; private aimRing: THREE.Mesh;
  private rings: { m: THREE.Mesh; age: number; size: number; on: boolean }[] = [];
  private shadows: THREE.InstancedMesh;
  private fightG = new THREE.Group(); private fightFish: THREE.Group | null = null; private fightId = '';
  private fightShadow: THREE.Mesh;
  private catchG = new THREE.Group(); private catchFish: THREE.Group | null = null; private catchT = 0;
  private pnts: Float32Array; private pnts2 = new Float32Array(2 * 3);
  private idleRipT = 0;
  /** 画面に出ている魚影の数（QA） */
  shadowCount = 0;
  rodBend = 0; private rodTw = 0;
  tip = new THREE.Vector3();
  floatPos = new THREE.Vector3();
  floatScreenScale = 1;
  constructor(private scene: THREE.Scene, private camera: THREE.PerspectiveCamera, private rodObj: THREE.Object3D) {
    this.group.name = 'fishingView'; this.group.visible = false;
    // ウキ（遠くでも見えるよう距離に応じて拡大して表示する）
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.34, 6).translate(0, 0.17, 0), new THREE.MeshBasicMaterial({ color: 0xf5f5f0 }));
    this.floatTip = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.009, 0.12, 8).translate(0, 0.4, 0), new THREE.MeshBasicMaterial({ color: 0xff4a1a }));
    this.floatBody = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8).scale(1, 1.5, 1).translate(0, 0.0, 0), new THREE.MeshLambertMaterial({ color: 0xf2e9c8 }));
    const tip2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.05, 8).translate(0, 0.49, 0), new THREE.MeshBasicMaterial({ color: 0xffe14a }));
    this.floatG.add(stick, this.floatTip, tip2, this.floatBody);
    this.floatG.traverse((o) => { o.frustumCulled = false; });
    this.group.add(this.floatG);
    const mkLine = (n: number) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); const l = new THREE.Line(g, lineMat()); l.frustumCulled = false; return l; };
    this.lineAir = mkLine(28); this.lineWater = mkLine(2);
    this.lineWater.material = new THREE.LineBasicMaterial({ color: 0xe8f0f6, transparent: true, opacity: 0.55 });
    this.pnts = new Float32Array(28 * 3);
    this.sinker = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshLambertMaterial({ color: 0x555a60 }));
    this.baitMesh = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff9a7a }));
    this.sinker.frustumCulled = false; this.baitMesh.frustumCulled = false;
    this.group.add(this.lineAir, this.lineWater, this.sinker, this.baitMesh);
    // 狙い弧
    this.aimLine = mkLine(32); (this.aimLine.material as THREE.LineBasicMaterial).color.set(0xff8a3d); (this.aimLine.material as THREE.LineBasicMaterial).opacity = 0.95;
    this.aimRing = new THREE.Mesh(new THREE.RingGeometry(0.7, 1.0, 28).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xff8a3d, transparent: true, opacity: 0.8, depthWrite: false, fog: false }));
    this.aimRing.renderOrder = 4; this.aimRing.frustumCulled = false;
    this.group.add(this.aimLine, this.aimRing);
    // 波紋
    const rg = new THREE.RingGeometry(0.85, 1.0, 32).rotateX(-Math.PI / 2);
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ color: 0xeaf6ff, transparent: true, opacity: 0, depthWrite: false, fog: false }));
      m.renderOrder = 4; m.visible = false; m.frustumCulled = false; this.group.add(m); this.rings.push({ m, age: 9, size: 1, on: false });
    }
    // 魚影（暗い楕円）
    const eg = new THREE.CircleGeometry(1, 14).rotateX(-Math.PI / 2);
    this.shadows = new THREE.InstancedMesh(eg, new THREE.MeshBasicMaterial({ color: 0x02101c, transparent: true, opacity: 0.35, depthWrite: false, fog: false }), 28);
    this.shadows.count = 0; this.shadows.renderOrder = 3; this.shadows.frustumCulled = false; this.group.add(this.shadows);
    this.fightShadow = new THREE.Mesh(eg, new THREE.MeshBasicMaterial({ color: 0x02101c, transparent: true, opacity: 0.45, depthWrite: false, fog: false }));
    this.fightShadow.renderOrder = 3; this.fightShadow.frustumCulled = false; this.fightShadow.visible = false;
    this.group.add(this.fightG, this.fightShadow);
    this.catchG.visible = false; this.camera.add(this.catchG);
    scene.add(this.group);
  }
  get floatShown() { return this.group.visible && this.floatG.visible; }
  get fightFishShown() { return !!this.fightFish && this.fightFish.visible; }
  show(on: boolean) { this.group.visible = on; if (!on) { this.hideCatch(); } }

  ripple(x: number, z: number, size = 1) {
    const r = this.rings.find((q) => !q.on) ?? this.rings[0];
    r.on = true; r.age = 0; r.size = size; r.m.visible = true; r.m.position.set(x, WATER_Y, z);
  }
  twitchRod(amount: number) { this.rodTw = Math.max(this.rodTw, amount); }
  /** セッションのイベントに合わせた視覚効果 */
  onEvent(s: FishingSession, e: ReturnType<FishingSession['popEvents']>[number]) {
    if (e.kind === 'splash') { this.ripple(e.x, e.z, 1.6); this.ripple(e.x, e.z, 2.6); }
    else if (e.kind === 'nibble') { this.ripple(s.fx, s.fz, 0.6); this.twitchRod(0.03); }
    else if (e.kind === 'pre') { this.ripple(s.fx, s.fz, 0.5); this.twitchRod(0.05); }
    else if (e.kind === 'bite') { this.ripple(s.fx, s.fz, 1.2); this.twitchRod(0.12 + 0.1 * e.strength); }
    else if (e.kind === 'fight_event') { const k = e.ev.kind; if (k === 'run' || k === 'dive' || k === 'side_run' || k === 'headshake' || k === 'last_run') { this.ripple(s.fx, s.fz, 1.8); this.twitchRod(0.1); } }
    else if (e.kind === 'hookset') { this.ripple(s.fx, s.fz, 1.4); this.twitchRod(0.15); }
  }

  showCatch(speciesId: string, sizeCm: number) {
    this.hideCatch();
    const f = makeFish(speciesId, Math.min(0.55, Math.max(0.18, sizeCm / 100 * 0.9)));
    this.catchFish = f; this.catchG.add(f); this.catchG.position.set(0, -0.08, -0.85); this.catchG.visible = true; this.catchT = 0;
  }
  hideCatch() { if (this.catchFish) { this.catchG.remove(this.catchFish); disposeObj(this.catchFish); this.catchFish = null; } this.catchG.visible = false; }
  get catchShown() { return !!this.catchFish; }

  update(s: FishingSession, t: number, dt: number, dayLight: number, fishing: boolean) {
    this.group.visible = fishing;
    if (!fishing) { this.rodBend = 0; return; }
    this.camera.updateMatrixWorld(true);
    this.rodObj.updateWorldMatrix(true, false);
    this.tip.set(0, 1.58, 0); this.rodObj.localToWorld(this.tip);
    // 竿のしなり・ピクつき
    this.rodTw *= Math.exp(-dt * 7);
    const f = s.fight;
    const tens = f ? Math.min(1.2, f.tension) : 0;
    this.rodBend += ((f ? 0.1 + 0.28 * tens : 0) + this.rodTw * Math.sin(t * 60) - this.rodBend) * Math.min(1, dt * 12);
    this.rodObj.rotation.x += this.rodBend;

    const ph = s.phase;
    const showRig = ph === 'flight' || ph === 'wait' || ph === 'bite' || ph === 'fight';
    this.floatG.visible = showRig; this.lineAir.visible = showRig; this.lineWater.visible = showRig && ph !== 'flight' && ph !== 'fight';
    this.sinker.visible = this.baitMesh.visible = showRig && ph !== 'flight' && ph !== 'fight';
    this.aimLine.visible = this.aimRing.visible = ph === 'aim';

    // 狙い弧
    if (ph === 'aim') {
      const L = s.landing(s.yaw, s.aimPower);
      if (L) {
        const a = this.aimLine.geometry.attributes.position as THREE.BufferAttribute;
        const n = a.count; const H = 2.2 + L.dist * 0.12;
        for (let i = 0; i < n; i++) { const u = i / (n - 1); a.setXYZ(i, this.tip.x + (L.x - this.tip.x) * u, this.tip.y + (WATER_Y + 0.1 - this.tip.y) * u + H * 4 * u * (1 - u), this.tip.z + (L.z - this.tip.z) * u); }
        a.needsUpdate = true; this.aimLine.visible = true;
        this.aimRing.visible = true; this.aimRing.position.set(L.x, WATER_Y + waveH(L.x, L.z, t) + 0.05, L.z); const rs = 0.5 + L.dist * 0.04; this.aimRing.scale.set(rs, 1, rs);
      } else { this.aimLine.visible = false; this.aimRing.visible = false; }
    }

    // 波紋
    for (const r of this.rings) {
      if (!r.on) continue; r.age += dt;
      const k = r.age / 1.2;
      if (k >= 1) { r.on = false; r.m.visible = false; continue; }
      const rad = 0.05 + 0.6 * r.size * k;
      r.m.scale.set(rad, 1, rad); (r.m.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.75;
      r.m.position.y = WATER_Y + waveH(r.m.position.x, r.m.position.z, t) + 0.04;
    }
    if (showRig && ph !== 'flight' && s.floatInWater) { this.idleRipT -= dt; if (this.idleRipT <= 0) { this.idleRipT = 3.2; this.ripple(s.fx, s.fz, 0.45); } }

    // ウキ
    if (showRig) {
      const dist = Math.hypot(s.fx - s.px, s.fz - s.pz);
      const sc = (1 + dist * 0.11) * (s.floatDef.id === 'fL' ? 1.25 : s.floatDef.id === 'fS' ? 0.85 : 1);
      this.floatScreenScale = sc;
      const rx = Math.cos(s.yaw), rz = -Math.sin(s.yaw);
      let x = s.fx, z = s.fz, y: number; let tilt = 0;
      if (ph === 'flight') { y = WATER_Y + s.flightHeight(); }
      else if (ph === 'fight') { y = WATER_Y + waveH(x, z, t) + 0.02; }
      else {
        const settle = Math.min(1, s.settle / 1.6);
        const bob = waveH(x, z, t) * 1.0 + Math.sin(t * 2.3 + x) * 0.012;
        x += rx * s.floatSlide * 0.9 * sc * 0.5; z += rz * s.floatSlide * 0.9 * sc * 0.5;
        y = WATER_Y + bob - s.floatDip * 0.42 * sc + (1 - settle) * 0.1 * sc + 0.02;
        if (s.floatTilt > 0.5 || s.snag) tilt = 1.15;
      }
      this.floatG.position.set(x, y, z); this.floatG.scale.setScalar(sc); this.floatG.rotation.set(0, 0, tilt);
      this.floatPos.copy(this.floatG.position);
      // ライン（竿先→ウキ）
      const pa = this.lineAir.geometry.attributes.position as THREE.BufferAttribute; const n = pa.count;
      const lenH = Math.hypot(x - this.tip.x, z - this.tip.z);
      const slack = ph === 'flight' ? 0.12 : ph === 'fight' ? Math.max(0.0, 0.05 - 0.05 * tens) : Math.max(0.015, 0.09 * (1 - Math.min(1, s.settle / 2.5))) + (s.reelHeld ? 0 : 0.015);
      const topY = y + 0.35 * sc;
      for (let i = 0; i < n; i++) {
        const u = i / (n - 1);
        const sag = slack * lenH * 4 * u * (1 - u);
        let py = this.tip.y + (topY - this.tip.y) * u - sag;
        if (u > 0.04) py = Math.max(py, WATER_Y + waveH(this.tip.x + (x - this.tip.x) * u, this.tip.z + (z - this.tip.z) * u, t) + 0.015);
        pa.setXYZ(i, this.tip.x + (x - this.tip.x) * u, py, this.tip.z + (z - this.tip.z) * u);
      }
      pa.needsUpdate = true;
      // 水中：ウキ→オモリ→エサ
      if (this.lineWater.visible) {
        const depth = s.baitDepthNow; const by = WATER_Y - depth;
        const pw = this.lineWater.geometry.attributes.position as THREE.BufferAttribute;
        pw.setXYZ(0, x, y - 0.02, z); pw.setXYZ(1, x + 0.0, by, z); pw.needsUpdate = true;
        this.baitMesh.position.set(x, by, z); this.sinker.position.set(x, by + Math.min(0.5, depth * 0.3), z);
        const bd = BAITS.find((b) => b.id === s.rig.baitId); (this.baitMesh.material as THREE.MeshBasicMaterial).color.set(bd?.color ?? 0xff9a7a);
        this.baitMesh.visible = s.baitLife > 0.05;
        this.baitMesh.scale.setScalar(0.6 + 0.5 * s.baitLife);
      }
    }

    // 魚影
    let n = 0;
    if (ph === 'wait' || ph === 'bite') {
      const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
      const vis = Math.max(0.15, dayLight) * s.env.clarity;
      (this.shadows.material as THREE.MeshBasicMaterial).opacity = 0.35 * Math.min(1, vis * 1.3);
      for (const a of s.sim.agents) {
        if (n >= 28) break;
        const dx = a.x - s.fx, dz = a.z - s.fz; if (dx * dx + dz * dz > 100) continue;
        if (a.y > 3.2 || a.sp.id === 'esatori' && a.y > 2) continue;
        const len = Math.max(0.12, a.sizeCm / 100);
        q.setFromAxisAngle(up, -a.heading); sc.set(len * 0.5, 1, len * 0.17); p.set(a.x, WATER_Y + 0.03, a.z);
        m.compose(p, q, sc); this.shadows.setMatrixAt(n++, m);
      }
    }
    this.shadows.count = n; this.shadows.instanceMatrix.needsUpdate = true; this.shadowCount = n;

    // ファイト中の魚
    const fw = ph === 'fight' ? s.fishWorld() : null;
    if (fw && f) {
      const id = f.sp.id;
      if (this.fightFish && this.fightId !== id + Math.round(f.sizeCm)) { this.fightG.remove(this.fightFish); disposeObj(this.fightFish); this.fightFish = null; }
      if (!this.fightFish) { this.fightFish = makeFish(id, Math.max(0.12, f.sizeCm / 100)); this.fightId = id + Math.round(f.sizeCm); this.fightG.add(this.fightFish); }
      const near = Math.max(0, 1 - f.dist / 4);
      const surf = f.mode === 'run' || f.mode === 'side_run' || near > 0.5 || f.mode === 'headshake';
      const yy = WATER_Y + (surf ? 0.03 : -0.45 - 0.5 * (1 - near)) + waveH(fw.x, fw.z, t);
      this.fightG.position.set(fw.x, yy, fw.z); this.fightG.visible = near > 0.25 || surf;
      const hx = s.px - fw.x, hz = s.pz - fw.z; this.fightG.rotation.y = -Math.atan2(hz, hx) + Math.sin(t * 14) * (0.35 * tens);
      this.fightShadow.visible = true; const len = Math.max(0.2, f.sizeCm / 100);
      this.fightShadow.position.set(fw.x, WATER_Y + 0.035, fw.z); this.fightShadow.scale.set(len * 0.6, 1, len * 0.22);
      // ファイト中の水しぶき（時々）
      if (surf && Math.random() < dt * 3) this.ripple(fw.x, fw.z, 1.1);
    } else { this.fightG.visible = false; this.fightShadow.visible = false; if (this.fightFish && ph !== 'fight' && ph !== 'result') { this.fightG.remove(this.fightFish); disposeObj(this.fightFish); this.fightFish = null; } }

    // 釣れた魚の回転表示
    if (this.catchFish) { this.catchT += dt; this.catchFish.rotation.y = this.catchT * 0.9 + 0.4; this.catchFish.rotation.z = 0.15 + Math.sin(this.catchT * 5) * 0.06 * Math.max(0, 1 - this.catchT / 1.5); }
    void SPECIES_BY_ID; void V;
  }
}
