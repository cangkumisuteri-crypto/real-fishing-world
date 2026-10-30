import type { QualityId } from './save';
export interface QualityTier { id: QualityId; label: string; dpr: number; waterSeg: number; detail: number; fpsCap: number; note: string }
export const TIERS: Record<QualityId, QualityTier> = {
  low: { id: 'low', label: '低（軽量）', dpr: 1.0, waterSeg: 48, detail: 0.35, fpsCap: 30, note: '省電力・30fps上限' },
  mid: { id: 'mid', label: '中（標準）', dpr: 1.25, waterSeg: 80, detail: 0.7, fpsCap: 30, note: '30fps上限' },
  high: { id: 'high', label: '高（きれい）', dpr: 1.5, waterSeg: 128, detail: 1.0, fpsCap: 60, note: '重い端末では非推奨' },
};
export function isIOSLike(): boolean {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
export function effectiveDpr(t: QualityTier): number {
  return Math.max(1, Math.min(t.dpr, window.devicePixelRatio || 1, 2));
}
/** 平均fps計測（直近 ~2秒） */
export class FpsMeter {
  private times: number[] = [];
  fps = 0;
  /** 描画フレームごとに呼ぶ */
  tick(now: number) {
    this.times.push(now);
    while (this.times.length > 2 && now - this.times[0] > 2000) this.times.shift();
    if (this.times.length > 5) this.fps = ((this.times.length - 1) * 1000) / (now - this.times[0]);
  }
}
