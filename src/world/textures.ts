import * as THREE from 'three';
import { hash2, vnoise } from './grid';
import concreteUrl from '../assets/textures/concrete.webp?url';
import rockUrl from '../assets/textures/rock.webp?url';
import sandUrl from '../assets/textures/sand.webp?url';
import woodUrl from '../assets/textures/wood.webp?url';

const loader = new THREE.TextureLoader();
function load(url: string, meters: number): THREE.Texture {
  const t = loader.load(url);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.repeat.set(1 / meters, 1 / meters); // uv = world xz(m)
  return t;
}
/** design/textures (CC0, 512px) — 1 枚あたりの実寸: concrete 2m / rock 1.5m / sand 3m / wood 1m */
export const concreteTex = () => load(concreteUrl, 2);
export const rockTex = () => load(rockUrl, 1.5);
export const sandTex = () => load(sandUrl, 3);
export const woodTex = () => load(woodUrl, 1);

function mk(size: number, paint: (ctx: CanvasRenderingContext2D, img: ImageData, s: number) => void): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  paint(ctx, img, size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 2;
  return t;
}
function fill(img: ImageData, s: number, f: (x: number, y: number) => [number, number, number]) {
  for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
    const [r, g, b] = f(x, y); const i = (y * s + x) * 4;
    img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255;
  }
}
export function asphaltTex() {
  return mk(256, (ctx, img, s) => {
    fill(img, s, (x, y) => { const v = 62 + hash2(x, y, 3) * 26 + vnoise(x * 0.05, y * 0.05, 4) * 18; return [v, v, v + 3]; });
    ctx.putImageData(img, 0, 0);
  });
}
export function grassTex() {
  return mk(256, (ctx, img, s) => {
    fill(img, s, (x, y) => { const n = vnoise(x * 0.06, y * 0.06, 8) * 0.6 + hash2(x, y, 9) * 0.4; return [50 + n * 35, 95 + n * 55, 45 + n * 25]; });
    ctx.putImageData(img, 0, 0);
  });
}
export function signTex(main: string, sub: string, bg: string, fg: string, w = 512, h = 192) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = fg; ctx.lineWidth = 8; ctx.strokeRect(8, 8, w - 16, h - 16);
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.floor(h * 0.48)}px "Hiragino Sans","Noto Sans JP","Noto Sans CJK JP",sans-serif`;
  ctx.fillText(main, w / 2, h * 0.42);
  ctx.font = `bold ${Math.floor(h * 0.17)}px "Hiragino Sans","Noto Sans JP","Noto Sans CJK JP",sans-serif`;
  ctx.fillText(sub, w / 2, h * 0.8);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
