import * as THREE from 'three';
import { Grid, N, ORG, CELL } from './grid';
import type { SkyState } from '../systems/envtime';

const vert = /* glsl */`
uniform float uTime, uAmp;
varying vec3 vW; varying vec3 vN; varying float vFogDepth;
void main(){
  vec3 p = position;
  float edge = 1.0 - smoothstep(78.0, 98.0, max(abs(p.x), abs(p.z)));
  float a = uAmp * edge;
  float t = uTime;
  float h = 0.0; float dx = 0.0; float dz = 0.0;
  float k1 = 0.35, k2 = 0.5, k3 = 0.9;
  float ph1 = p.x*k1 + t*1.1, ph2 = p.z*k2 - t*0.9 + p.x*0.2, ph3 = (p.x+p.z)*k3 + t*1.7;
  h += sin(ph1)*0.5 + sin(ph2)*0.35 + sin(ph3)*0.15;
  dx += cos(ph1)*0.5*k1 + cos(ph2)*0.35*0.2 + cos(ph3)*0.15*k3;
  dz += cos(ph2)*0.35*k2 + cos(ph3)*0.15*k3;
  p.y += h * 0.18 * a;
  vN = normalize(vec3(-dx*0.18*a, 1.0, -dz*0.18*a));
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vW = wp.xyz;
  vec4 mv = viewMatrix * wp;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;
const frag = /* glsl */`
uniform float uTime, uDay, uFogNear, uFogFar;
uniform vec3 uHorizon, uZenith, uSunDir, uSunColor, uFogColor;
uniform sampler2D uShore; uniform vec2 uOrg; uniform float uSize;
varying vec3 vW; varying vec3 vN; varying float vFogDepth;
vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }
void main(){
  vec3 V = normalize(cameraPosition - vW);
  vec3 N = normalize(vN + vec3(0.035*sin(vW.x*1.7+uTime*1.3), 0.0, 0.035*cos(vW.z*1.5+uTime*1.1)));
  vec2 uv = (vW.xz - uOrg) / uSize;
  vec4 s = texture2D(uShore, clamp(uv, 0.001, 0.999));
  float dL = s.r * 24.0;
  float depth = s.g * 10.0;
  vec3 shallow = lin(vec3(0.33, 0.66, 0.62));
  vec3 deep = lin(vec3(0.03, 0.17, 0.30));
  vec3 base = mix(shallow, deep, smoothstep(0.3, 6.0, depth));
  base *= (0.18 + 0.82 * uDay);
  vec3 R = reflect(-V, N);
  vec3 sky = mix(uHorizon, uZenith, pow(clamp(R.y, 0.0, 1.0), 0.5));
  float ndv = max(dot(N, V), 0.0);
  float fres = clamp(0.03 + 0.97 * pow(1.0 - ndv, 4.0), 0.0, 1.0);
  float spec = pow(max(dot(R, uSunDir), 0.0), 220.0) * 2.0 * step(0.0, uSunDir.y + 0.02);
  vec3 col = mix(base, sky, fres * 0.9) + uSunColor * spec;
  float alpha = mix(0.38, 0.97, smoothstep(0.0, 3.2, depth));
  alpha = max(alpha, fres);
  // 岸際の泡
  float foam = smoothstep(1.0, 0.0, dL + 0.25 * sin(uTime*1.6 + vW.x*2.3 + vW.z*1.7)) * step(0.001, s.r + s.g);
  col = mix(col, vec3(0.9, 0.95, 0.95) * (0.3 + 0.7*uDay), foam * 0.45);
  alpha = max(alpha, foam * 0.6);
  float f = smoothstep(uFogNear, uFogFar, vFogDepth);
  col = mix(col, uFogColor, f);
  gl_FragColor = vec4(col, alpha);
  #include <colorspace_fragment>
}
`;

export class Water {
  group = new THREE.Group();
  mat: THREE.ShaderMaterial;
  near!: THREE.Mesh;
  tex: THREE.DataTexture;
  constructor(g: Grid, seg: number) {
    // 岸からの距離と水深を DataTexture に焼く（擬似深度）
    const data = new Uint8Array(N * N * 4);
    for (let i = 0; i < N * N; i++) {
      if (g.ground[i] === 0) { data[i * 4] = Math.min(255, (g.dLand[i] / 24) * 255); data[i * 4 + 1] = Math.min(255, (g.depth[i] / 10) * 255); }
      else { data[i * 4] = 0; data[i * 4 + 1] = 0; }
      data[i * 4 + 3] = 255;
    }
    this.tex = new THREE.DataTexture(data, N, N, THREE.RGBAFormat);
    this.tex.magFilter = THREE.LinearFilter; this.tex.minFilter = THREE.LinearFilter; this.tex.needsUpdate = true;
    this.mat = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag, transparent: true, depthWrite: false,
      uniforms: {
        uTime: { value: 0 }, uAmp: { value: 1 }, uDay: { value: 1 }, uFogNear: { value: 60 }, uFogNear2: { value: 0 }, uFogFar: { value: 320 },
        uHorizon: { value: new THREE.Color() }, uZenith: { value: new THREE.Color() }, uSunDir: { value: new THREE.Vector3(0, 1, 0) },
        uSunColor: { value: new THREE.Color() }, uFogColor: { value: new THREE.Color() },
        uShore: { value: this.tex }, uOrg: { value: new THREE.Vector2(ORG, ORG) }, uSize: { value: N * CELL },
      },
    });
    this.setSegments(seg);
    // 遠景（平面4枚で近景の外側を埋める）
    const B = 100, F = 1600;
    const far = new THREE.BufferGeometry();
    const rects = [[-F, -F, F, -B], [-F, B, F, F], [-F, -B, -B, B], [B, -B, F, B]];
    const pos: number[] = [];
    for (const [x0, z0, x1, z1] of rects) pos.push(x0, 0, z0, x0, 0, z1, x1, 0, z1, x0, 0, z0, x1, 0, z1, x1, 0, z0);
    far.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const fm = new THREE.Mesh(far, this.mat);
    fm.position.y = WATER_Y_; fm.renderOrder = 2; fm.frustumCulled = false; fm.name = 'waterFar';
    this.group.add(fm);
  }
  setSegments(seg: number) {
    if (this.near) { this.group.remove(this.near); this.near.geometry.dispose(); }
    const geo = new THREE.PlaneGeometry(200, 200, seg, seg).rotateX(-Math.PI / 2);
    this.near = new THREE.Mesh(geo, this.mat);
    this.near.position.y = WATER_Y_; this.near.renderOrder = 2; this.near.frustumCulled = false; this.near.name = 'waterNear';
    this.group.add(this.near);
  }
  update(t: number, s: SkyState, amp: number, fog: THREE.Fog) {
    const u = this.mat.uniforms;
    u.uTime.value = t; u.uAmp.value = amp; u.uDay.value = s.dayLight;
    u.uHorizon.value.copy(s.horizon); u.uZenith.value.copy(s.zenith); u.uSunDir.value.copy(s.sunDir);
    u.uSunColor.value.copy(s.sunColor); u.uFogColor.value.copy(s.fog);
    u.uFogNear.value = fog.near; u.uFogFar.value = fog.far;
  }
}
const WATER_Y_ = -1.5;
