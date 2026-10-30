/** 簡易3D魚（プリミティブ）。リアルな見た目は後のフェーズ。種ごとの色・体型の違いだけ付ける。 */
import * as THREE from 'three';

interface Look { back: number; belly: number; h: number; w: number; tail: number; stripe?: number }
const LOOKS: Record<string, Look> = {
  aji: { back: 0x6f8a6a, belly: 0xe9eef0, h: 0.26, w: 0.16, tail: 0xb8a35a },
  saba: { back: 0x2f6f86, belly: 0xe3ecee, h: 0.22, w: 0.16, tail: 0x2f6f86, stripe: 0x1a3a46 },
  kasago: { back: 0xa8442f, belly: 0xd9a58a, h: 0.34, w: 0.24, tail: 0xb4503a },
  mebaru: { back: 0x4b4034, belly: 0x8d7a62, h: 0.3, w: 0.2, tail: 0x5a4a38 },
  chinu: { back: 0x59626c, belly: 0xc9ccd0, h: 0.38, w: 0.18, tail: 0x3c4249 },
  seabass: { back: 0x7d8890, belly: 0xeef0f0, h: 0.24, w: 0.17, tail: 0x6a747c },
  tachiuo: { back: 0xc8d2d8, belly: 0xf2f4f6, h: 0.1, w: 0.06, tail: 0xc8d2d8 },
  madai: { back: 0xe0735f, belly: 0xf3cfc4, h: 0.4, w: 0.2, tail: 0xd9604c },
  buri: { back: 0x3b5a78, belly: 0xe9e2c8, h: 0.24, w: 0.2, tail: 0x3b5a78, stripe: 0xe3c040 },
};
const DEFAULT_LOOK: Look = { back: 0x7a8a90, belly: 0xe8ecee, h: 0.25, w: 0.16, tail: 0x7a8a90 };

/** 全長 lengthM（m）の魚。+X 方向が頭。原点が体の中心。 */
export function makeFish(speciesId: string, lengthM: number): THREE.Group {
  const L = LOOKS[speciesId] ?? DEFAULT_LOOK;
  const g = new THREE.Group(); g.name = 'fish:' + speciesId;
  const geo = new THREE.SphereGeometry(0.5, 16, 10);
  const pos = geo.attributes.position; const col = new Float32Array(pos.count * 3);
  const back = new THREE.Color(L.back), belly = new THREE.Color(L.belly), st = L.stripe != null ? new THREE.Color(L.stripe) : null;
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i), x = pos.getX(i);
    c.copy(back).lerp(belly, THREE.MathUtils.smoothstep(y, -0.1, -0.32));
    if (st && y > 0.08 && Math.sin(x * 38) > 0.2) c.lerp(st, 0.7);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const body = new THREE.Mesh(geo, mat); body.scale.set(lengthM * 0.78, lengthM * L.h, lengthM * L.w);
  g.add(body);
  const tailMat = new THREE.MeshLambertMaterial({ color: L.tail, side: THREE.DoubleSide });
  const tail = new THREE.Mesh(new THREE.ConeGeometry(lengthM * L.h * 0.55, lengthM * 0.26, 4, 1), tailMat);
  tail.rotation.z = Math.PI / 2; tail.scale.set(1, 1, 0.25); tail.position.set(-lengthM * 0.46, 0, 0); g.add(tail);
  const fin = new THREE.Mesh(new THREE.ConeGeometry(lengthM * 0.07, lengthM * L.h * 0.55, 3), tailMat);
  fin.position.set(-lengthM * 0.02, lengthM * L.h * 0.5, 0); fin.scale.set(1.6, 1, 0.3); g.add(fin);
  const eyeM = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(lengthM * 0.022, 6, 5), eyeM); e.position.set(lengthM * 0.33, lengthM * L.h * 0.08, s * lengthM * L.w * 0.42); g.add(e); }
  g.traverse((o) => { o.frustumCulled = false; });
  return g;
}
export function disposeObj(o: THREE.Object3D) {
  o.traverse((c) => { const m = c as THREE.Mesh; m.geometry?.dispose?.(); const mm = m.material as THREE.Material | THREE.Material[]; if (Array.isArray(mm)) mm.forEach((x) => x.dispose()); else mm?.dispose?.(); });
}
