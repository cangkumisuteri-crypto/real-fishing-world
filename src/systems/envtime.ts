/** 端末の現地時刻から太陽位置とゲーム内の空色を求める（ゲーム内モデル。天気・潮はデモ固定で未連動）。 */
import * as THREE from 'three';

export interface SkyState {
  hours: number;
  sunDir: THREE.Vector3;
  elevDeg: number;
  zenith: THREE.Color;
  horizon: THREE.Color;
  sunColor: THREE.Color;
  sunIntensity: number;
  hemiIntensity: number;
  dayLight: number; // 0 夜 .. 1 昼
  fog: THREE.Color;
}

const LAT = 34.6 * Math.PI / 180; // 大阪湾の雰囲気（架空の港）
const keys: { e: number; z: number; h: number; sun: number; hemi: number; sc: number }[] = [
  { e: -14, z: 0x050914, h: 0x0d1a33, sun: 0.0, hemi: 0.28, sc: 0x7f9ad0 },
  { e: -4, z: 0x1a2447, h: 0x5a4a6a, sun: 0.0, hemi: 0.35, sc: 0xff9a60 },
  { e: 2, z: 0x3a5088, h: 0xf0955c, sun: 0.7, hemi: 0.5, sc: 0xffa860 },
  { e: 12, z: 0x4a78b8, h: 0xe8c9a8, sun: 1.4, hemi: 0.7, sc: 0xffe0b8 },
  { e: 30, z: 0x3f7fc4, h: 0xc2dcec, sun: 2.0, hemi: 0.85, sc: 0xfff4e0 },
  { e: 90, z: 0x3a78c0, h: 0xbfd9ea, sun: 2.1, hemi: 0.9, sc: 0xfff6e8 },
];

export function localHours(override?: number | null): number {
  if (override != null && !Number.isNaN(override)) return override;
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
}

const ca = new THREE.Color(), cb = new THREE.Color();
export function computeSky(hours: number, out: SkyState, doy = dayOfYear()) {
  const decl = 23.44 * Math.PI / 180 * Math.sin(2 * Math.PI * (284 + doy) / 365);
  const H = (hours - 12) * 15 * Math.PI / 180;
  const sinE = Math.sin(LAT) * Math.sin(decl) + Math.cos(LAT) * Math.cos(decl) * Math.cos(H);
  const e = Math.asin(Math.max(-1, Math.min(1, sinE)));
  const cosE = Math.cos(e) || 1e-6;
  const sinA = -Math.cos(decl) * Math.sin(H) / cosE;
  const cosA = (Math.sin(decl) - Math.sin(LAT) * sinE) / (Math.cos(LAT) * cosE);
  out.sunDir.set(sinA * cosE, sinE, -cosA * cosE).normalize();
  out.hours = hours;
  const eDeg = e * 180 / Math.PI;
  out.elevDeg = eDeg;
  let i = 0;
  while (i < keys.length - 2 && eDeg > keys[i + 1].e) i++;
  const a = keys[i], b = keys[i + 1];
  const t = Math.max(0, Math.min(1, (eDeg - a.e) / (b.e - a.e)));
  out.zenith.set(a.z).lerp(cb.set(b.z), t);
  out.horizon.set(a.h).lerp(cb.set(b.h), t);
  out.sunColor.set(a.sc).lerp(ca.set(b.sc), t);
  out.sunIntensity = a.sun + (b.sun - a.sun) * t;
  out.hemiIntensity = a.hemi + (b.hemi - a.hemi) * t;
  out.dayLight = Math.max(0, Math.min(1, (eDeg + 6) / 22));
  out.fog.copy(out.horizon);
}
export function dayOfYear(d = new Date()) {
  return Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
}
export function makeSkyState(): SkyState {
  return { hours: 12, sunDir: new THREE.Vector3(0, 1, 0), elevDeg: 45, zenith: new THREE.Color(), horizon: new THREE.Color(), sunColor: new THREE.Color(), sunIntensity: 1, hemiIntensity: 1, dayLight: 1, fog: new THREE.Color() };
}
