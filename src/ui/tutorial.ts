/**
 * 超短いチュートリアル（4ステップ・各1行）。説明を先に読ませず、最初の実際の1投の中で
 * 「今押すボタン」を光らせて案内する（やって覚える）。スキップはいつでも見える。
 * 進行は実際の操作（釣り開始→キャスト→合わせ/巻く→回収・おまかせ）で自動的に進む。純粋な状態機械＋最小のDOM。
 */
import type { Phase } from '../fishing/session';

const $ = (id: string) => document.getElementById(id)!;
export interface TutCtx { mode: 'move' | 'fish'; phase: Phase; canFish: boolean; waitSec: number; auto: boolean; assist: boolean; dt: number }
export interface TutHooks { get(): number; set(n: number): void; toast(m: string): void }
export const TUT_STEPS = 4;

export class Tutorial {
  /** 0..3=進行中, 4=完了/スキップ */
  step: number;
  private engaged = false; private shown = 0; private hi = ''; private text = '';
  constructor(private h: TutHooks) {
    this.step = h.get();
    $('tutSkip').addEventListener('click', () => this.finish(false));
  }
  get active() { return this.step < TUT_STEPS; }
  restart() { this.engaged = false; this.step = 0; this.shown = 0; this.h.set(0); }
  finish(done: boolean) {
    if (this.step >= TUT_STEPS) return;
    this.step = TUT_STEPS; this.h.set(TUT_STEPS); this.render('', '');
    this.h.toast(done ? 'OK！ メニューの「遊び方」でいつでも見直せます' : 'スキップしました（メニューの「遊び方」で見直せます）');
  }
  /** 回収/おまかせを使った（ステップ4の達成） */
  used() { if (this.step === 3) this.finish(true); }

  update(c: TutCtx) {
    if (!this.active) { if (this.text) this.render('', ''); return; }
    if (c.auto) { this.step = TUT_STEPS; this.h.set(TUT_STEPS); this.render('', ''); return; }
    let txt = '', hi = '';
    if (this.step === 0 && c.mode === 'fish') this.step = 1;
    if (this.step === 1 && c.mode === 'fish' && (c.phase === 'flight' || c.phase === 'wait' || c.phase === 'bite' || c.phase === 'fight')) this.step = 2;
    if (this.step === 2 && (c.phase === 'fight' || c.phase === 'bite')) this.engaged = true;
    if (this.step === 2 && (c.phase === 'result' || (this.engaged && c.phase === 'ready'))) { this.step = 3; this.shown = 0; this.engaged = false; }
    if (this.step === 3 && (c.phase === 'ready' || c.phase === 'wait')) this.shown += c.dt;
    if (this.step === 3 && this.shown > 9) { this.finish(true); return; }
    if (this.step !== this.h.get() && this.step < TUT_STEPS) this.h.set(this.step);
    if (c.mode === 'move') { txt = '水辺で「釣り開始」を押そう'; hi = c.canFish ? 'btnFish' : ''; }
    else switch (this.step) {
      case 0: case 1:
        if (c.phase === 'aim') { txt = 'もう一度押して投げる！'; hi = 'btnAction'; }
        else if (c.phase === 'ready') { txt = '「キャスト」を押そう'; hi = 'btnAction'; }
        break;
      case 2:
        if (c.phase === 'ready') { txt = '「キャスト」を押そう'; hi = 'btnAction'; }
        else if (c.phase === 'aim') { txt = 'もう一度押して投げる！'; hi = 'btnAction'; }
        else if (c.phase === 'flight') txt = 'ウキが着水するのを待とう…';
        else if (c.phase === 'bite') { txt = '今だ！「合わせ」を押す！'; hi = 'btnAction'; }
        else if (c.phase === 'wait') { if (c.waitSec > 25) { txt = '釣れない時は「回収」で投げ直し'; hi = 'btnRetrieve'; } else { txt = 'ウキが沈んだら「合わせ」！'; hi = ''; } }
        else if (c.phase === 'fight') { txt = c.assist ? '「巻く」を長押し！ 走る間は離す' : '「巻く」長押し。赤くなる前に離す'; hi = 'btnReel'; }
        break;
      case 3:
        if (c.phase === 'wait') { txt = '↩回収＝すぐ巻き戻し／🤖＝全自動'; hi = 'btnRetrieve'; }
        else if (c.phase === 'ready' || c.phase === 'aim') { txt = '↩回収＝すぐ巻き戻し／🤖＝全自動'; hi = 'btnAuto'; }
        break;
    }
    this.render(txt, hi);
  }

  private render(txt: string, hi: string) {
    if (txt !== this.text) {
      this.text = txt;
      $('tutTxt').textContent = txt; $('tutBar').classList.toggle('show', !!txt);
      document.body.dataset.tut = txt ? '1' : '0';
      if (txt) $('tutN').textContent = `${Math.min(this.step, 3) + 1}/${TUT_STEPS}`;
    } else if (txt) $('tutN').textContent = `${Math.min(this.step, 3) + 1}/${TUT_STEPS}`;
    if (hi !== this.hi) {
      if (this.hi) document.getElementById(this.hi)?.classList.remove('tutHi');
      this.hi = hi; if (hi) document.getElementById(hi)?.classList.add('tutHi');
    }
  }
}
