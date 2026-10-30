import { Grid, G, N, cx, cz, wx, wz } from '../world/grid';
import { PLACES } from '../world/layout';
import type { SpotMarker } from '../world/props';

const X0 = -66, X1 = 56, Z0 = -58, Z1 = 46; // 表示範囲(m)
export class Minimap {
  private base: HTMLCanvasElement;
  private iw: number; private ih: number;
  constructor(private g: Grid, private markers: SpotMarker[]) {
    const ax = cx(X0), bx = cx(X1), az = cz(Z0), bz = cz(Z1);
    this.iw = bx - ax; this.ih = bz - az;
    this.base = document.createElement('canvas'); this.base.width = this.iw; this.base.height = this.ih;
    const ctx = this.base.getContext('2d')!; const img = ctx.createImageData(this.iw, this.ih);
    for (let z = 0; z < this.ih; z++) for (let x = 0; x < this.iw; x++) {
      const i = (az + z) * N + (ax + x);
      let c: number[];
      const gr = g.ground[i];
      if (gr === G.WATER) {
        const d = Math.min(1, g.depth[i] / 8);
        c = [Math.round(70 - 55 * d), Math.round(160 - 90 * d), Math.round(190 - 80 * d)];
        if (g.tetra[i]) c = [150, 156, 152];
        else if (g.hole[i]) c = [232, 196, 64];
      } else if (g.blocked[i] && gr !== G.ROCK) c = [210, 200, 175];
      else c = gr === G.CONCRETE ? [170, 170, 164] : gr === G.ASPHALT ? [95, 96, 100] : gr === G.SAND ? [226, 208, 158] : gr === G.ROCK ? [120, 106, 90] : [96, 142, 80];
      const o = (z * this.iw + x) * 4; img.data[o] = c[0]; img.data[o + 1] = c[1]; img.data[o + 2] = c[2]; img.data[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }
  /** 目標キャンバスに描画。player: ワールド座標 */
  draw(cv: HTMLCanvasElement, px: number, pz: number, yaw: number) {
    const W = cv.width = Math.min(560, Math.max(280, cv.clientWidth * (window.devicePixelRatio > 1 ? 1.5 : 1)) | 0);
    const H = cv.height = Math.round(W * this.ih / this.iw);
    const ctx = cv.getContext('2d')!; ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.base, 0, 0, W, H);
    const sx = W / this.iw / 0.5 * 0.5; // px per cell
    const toX = (x: number) => ((x - X0) / (X1 - X0)) * W, toY = (z: number) => ((z - Z0) / (Z1 - Z0)) * H;
    void sx;
    ctx.font = `bold ${Math.round(W / 40)}px sans-serif`; ctx.textAlign = 'center';
    for (const p of PLACES) { ctx.fillStyle = 'rgba(0,0,0,.65)'; const x = toX(p.x), y = toY(p.z); ctx.fillText(p.name, x + 1, y + 1); ctx.fillStyle = '#fff'; ctx.fillText(p.name, x, y); }
    for (const m of this.markers) {
      const x = toX(m.x), y = toY(m.z), r = W / 55;
      ctx.beginPath(); for (let k = 0; k < 10; k++) { const a = (k * Math.PI) / 5 - Math.PI / 2, rr = k % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.closePath();
      ctx.fillStyle = '#ffc94a'; ctx.fill(); ctx.strokeStyle = '#3a2a00'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    // プレイヤー（向き付き矢印）
    const x = toX(px), y = toY(pz), r = W / 42;
    ctx.save(); ctx.translate(x, y); ctx.rotate(-yaw);
    ctx.beginPath(); ctx.moveTo(0, -r * 1.3); ctx.lineTo(r * 0.85, r); ctx.lineTo(0, r * 0.45); ctx.lineTo(-r * 0.85, r); ctx.closePath();
    ctx.fillStyle = '#ff4d4d'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.round(W / 32)}px sans-serif`; ctx.fillText('N ↑', W - W / 16, W / 20);
  }
}
void wx; void wz;
