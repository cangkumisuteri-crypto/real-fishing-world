import * as THREE from 'three';
import { Grid, cx, cz, N } from '../world/grid';
import { Player, EYE } from '../player/player';

export type CamMode = 'first' | 'third';

/** カメラ制御。一人称が標準。三人称は同じ構造で切替可能（後の機能拡張用に切替ボタンも実装済み）。 */
export class CameraRig {
  mode: CamMode = 'first';
  fishing = false;
  fishYaw = 0; // 釣りモード時の基準方位（水面の方向）
  camera: THREE.PerspectiveCamera;
  avatar: THREE.Group;
  rod: THREE.Group;
  private rodTilt = 0.6;
  constructor(private g: Grid, aspect: number) {
    this.camera = new THREE.PerspectiveCamera(72, aspect, 0.12, 3000);
    this.camera.rotation.order = 'YXZ';
    this.rod = makeRod();
    this.avatar = makeAvatar();
  }
  resize(w: number, h: number) {
    this.camera.aspect = w / h;
    this.camera.fov = w >= h ? 62 : 76; // 縦持ちは縦FOVを広げて見渡しやすく
    this.camera.updateProjectionMatrix();
  }
  setMode(m: CamMode) { this.mode = m; }
  enterFishing(yaw: number) { this.fishing = true; this.fishYaw = yaw; }
  exitFishing() { this.fishing = false; }

  /** 視点のスワイプ入力を適用（釣りモードでは水面方向の±範囲に制限） */
  look(p: Player, dx: number, dy: number, sens: number) {
    const k = 0.0042 * sens;
    p.yaw -= dx * k;
    p.pitch -= dy * k;
    const maxUp = this.fishing ? 0.25 : 1.35, maxDown = this.fishing ? -1.05 : -1.35;
    p.pitch = Math.max(maxDown, Math.min(maxUp, p.pitch));
    if (this.fishing) {
      let d = p.yaw - this.fishYaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      d = Math.max(-0.9, Math.min(0.9, d)); p.yaw = this.fishYaw + d;
    }
  }

  update(p: Player, dt: number) {
    const c = this.camera;
    const third = this.mode === 'third';
    const eyeY = p.y + EYE;
    if (!third) {
      c.position.set(p.x, eyeY, p.z);
    } else {
      // 後ろに引く。壁・建物にめり込まないよう歩ける範囲まで手前へ
      const back = this.fishing ? 2.4 : 3.6;
      const cp = Math.cos(p.pitch);
      let dist = back;
      const dx = Math.sin(p.yaw) * cp, dz = Math.cos(p.yaw) * cp;
      for (; dist > 0.4; dist -= 0.25) {
        const tx = p.x + dx * dist, tz = p.z + dz * dist;
        const ix = cx(tx), iz = cz(tz);
        const isWater = this.g.groundAt(ix, iz) === 0 && !this.g.tetra[iz * N + ix];
        if (isWater || !this.g.blockedCircle(tx, tz, 0.15)) break;
      }
      c.position.set(p.x + dx * dist, eyeY + 0.5 + Math.sin(-p.pitch) * dist, p.z + dz * dist);
      if (c.position.y < p.y + 0.4) c.position.y = p.y + 0.4;
    }
    c.rotation.set(p.pitch, p.yaw, 0);
    // アバターと竿
    this.avatar.visible = third;
    this.avatar.position.set(p.x, p.y, p.z);
    this.avatar.rotation.y = p.yaw;
    const targetTilt = this.fishing ? 0.3 : 0.5;
    this.rodTilt += (targetTilt - this.rodTilt) * Math.min(1, dt * 6);
    if (!third) {
      if (this.rod.parent !== c) { this.rod.parent?.remove(this.rod); c.add(this.rod); }
      const fish = this.fishing;
      this.rod.position.set(fish ? 0.3 : 0.26, fish ? -0.3 : -0.28, -0.4);
      this.rod.rotation.set(-(Math.PI / 2 - this.rodTilt), fish ? 0.05 : 0.16, 0);
    } else {
      if (this.rod.parent !== this.avatar) { this.rod.parent?.remove(this.rod); this.avatar.add(this.rod); }
      this.rod.position.set(-0.28, 1.15, -0.25);
      this.rod.rotation.set(-(Math.PI / 2 - this.rodTilt), 0, 0);
    }
  }
}

function makeRod(): THREE.Group {
  const g = new THREE.Group(); g.name = 'rod';
  const L = 1.8;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.013, L, 6).translate(0, L / 2 - 0.2, 0), new THREE.MeshLambertMaterial({ color: 0x1b1f24 }));
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.3, 8).translate(0, 0.0, 0), new THREE.MeshLambertMaterial({ color: 0xc23b2a }));
  const reel = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 0.07).translate(0, 0.14, 0.04), new THREE.MeshLambertMaterial({ color: 0x9aa3ab }));
  g.add(shaft, grip, reel);
  g.traverse((o) => { o.frustumCulled = false; });
  return g;
}
function makeAvatar(): THREE.Group {
  const g = new THREE.Group(); g.name = 'avatar';
  const m = (c: number) => new THREE.MeshLambertMaterial({ color: c });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 0.85, 10).translate(0, 1.0, 0), m(0x2f6fb0));
  const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.6, 10).translate(0, 0.3, 0), m(0x3b3f48));
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10).translate(0, 1.6, 0), m(0xf0c9a0));
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.19, 0.1, 10).translate(0, 1.74, 0), m(0xd9453d));
  g.add(body, legs, head, cap);
  return g;
}
