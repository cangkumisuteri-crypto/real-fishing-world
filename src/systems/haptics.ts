/** 振動。navigator.vibrate が使えない端末（iOS Safari）では「画面の揺れ」で代替する。 */
export type Pat = 'pre' | 'bite' | 'hookset' | 'run' | 'warn' | 'snap' | 'landed' | 'lost' | 'cast' | 'splash';
const PATTERNS: Record<Pat, number | number[]> = {
  pre: 12, bite: [45, 30, 70], hookset: 90, run: [25, 20, 25], warn: [30, 40, 30], snap: [220], landed: [40, 50, 40, 50, 120], lost: [140], cast: 18, splash: 22,
};
const SHAKE: Record<Pat, number> = { pre: 0.25, bite: 1, hookset: 1, run: 0.6, warn: 0.5, snap: 1.4, landed: 0.7, lost: 0.8, cast: 0.2, splash: 0.35 };
export class Haptics {
  enabled = true;
  readonly canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
  /** 画面揺れの強さ（0..）。main ループで減衰させてカメラ・ステージに反映する */
  shake = 0;
  /** 呼ばれた回数（QA用） */
  counts: Record<string, number> = {};
  fire(p: Pat) {
    this.counts[p] = (this.counts[p] ?? 0) + 1;
    if (!this.enabled) return;
    if (this.canVibrate) { try { navigator.vibrate(PATTERNS[p]); } catch { /* ignore */ } }
    // iOS は vibrate 非対応。Android でも軽く揺らして視覚でも分かるようにする（iOSは強め）
    this.shake = Math.max(this.shake, SHAKE[p] * (this.canVibrate ? 0.5 : 1));
  }
  decay(dt: number) { this.shake = Math.max(0, this.shake - dt * 3.2); }
}
