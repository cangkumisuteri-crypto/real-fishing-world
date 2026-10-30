import * as THREE from 'three';
import type { SkyState } from '../systems/envtime';

const vert = /* glsl */`
varying vec3 vDir;
void main(){ vDir = normalize(position); vec4 p = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * p; gl_Position.z = gl_Position.w; }
`;
const frag = /* glsl */`
varying vec3 vDir;
uniform vec3 uZenith, uHorizon, uSunDir, uSunColor; uniform float uDay, uTime;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
void main(){
  vec3 d = normalize(vDir);
  float y = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, pow(y, 0.55));
  // 太陽
  float sd = max(dot(d, uSunDir), 0.0);
  col += uSunColor * (pow(sd, 600.0) * 4.0 + pow(sd, 18.0) * 0.35);
  // 雲（低コスト fbm 2 オクターブ）
  if (d.y > 0.02) {
    vec2 p = d.xz / (d.y + 0.25) * 1.6 + vec2(uTime*0.004, 0.0);
    float c = vn(p*1.3)*0.65 + vn(p*3.1)*0.35;
    c = smoothstep(0.52, 0.85, c) * smoothstep(0.02, 0.25, d.y);
    vec3 cc = mix(uHorizon*0.9, vec3(1.0), 0.55) * (0.35 + 0.65*uDay);
    col = mix(col, cc, c*0.75);
  }
  // 星
  float night = 1.0 - smoothstep(0.0, 0.35, uDay);
  if (night > 0.01 && d.y > 0.0) {
    vec2 sp = vec2(atan(d.x, d.z) * 70.0, d.y * 110.0);
    vec2 fc = fract(sp) - 0.5;
    float s = step(0.985, h(floor(sp))) * smoothstep(0.32, 0.05, length(fc));
    col += vec3(s) * night * smoothstep(0.0, 0.2, d.y);
  }
  // 海面に向かう下半球はフォグ色
  col = mix(col, uHorizon, smoothstep(0.0, -0.15, d.y));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

export class Sky {
  mesh: THREE.Mesh;
  u = {
    uZenith: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uSunDir: { value: new THREE.Vector3() },
    uSunColor: { value: new THREE.Color() }, uDay: { value: 1 }, uTime: { value: 0 },
  };
  constructor() {
    const m = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms: this.u, side: THREE.BackSide, depthWrite: false, depthTest: false, fog: false });
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 24, 16), m);
    this.mesh.renderOrder = -10;
    this.mesh.frustumCulled = false;
    this.mesh.name = 'sky';
  }
  apply(s: SkyState) {
    this.u.uZenith.value.copy(s.zenith); this.u.uHorizon.value.copy(s.horizon); this.u.uSunDir.value.copy(s.sunDir);
    this.u.uSunColor.value.copy(s.sunColor); this.u.uDay.value = s.dayLight;
  }
}
