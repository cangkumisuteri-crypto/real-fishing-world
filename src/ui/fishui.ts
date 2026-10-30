/** ウキ釣りのHUD（ボタン・ゲージ・結果カード・仕掛け/図鑑パネル）。ロジックは持たず、セッション状態を表示に写すだけ。 */
import type { FishingSession, Phase } from '../fishing/session';
import { FLOATS, HOOKS, BAITS, RIG_PRESETS, DEPTH_MIN, DEPTH_MAX, DEPTH_STEP, dragRecommended, T0, type Rig } from '../fishing/rigdata';
import { SPECIES, SPECIES_BY_ID } from '../data/species';
import type { SaveData } from '../systems/save';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const setIf = (el: HTMLElement, key: string, val: string, cache: Record<string, string>, fn: () => void) => { if (cache[key] !== val) { cache[key] = val; fn(); } };
export const TOD_JA: Record<string, string> = { dawn: '朝マヅメ', day: '昼', dusk: '夕マヅメ', night: '夜' };

export interface RigPanelApi {
  rig(): Rig; phase(): Phase; seabed(): number; seabedKnown(): boolean;
  setRig(p: Partial<Rig>): void; preset(id: string): void; depth(delta: number): void;
}
export interface FightView { known: boolean; name: string; sizeCm: number; dist: number; bearing: number; mode: string; tension: number; slipping: boolean; drag: number; theta: number; raised: boolean; assist?: boolean; auto?: boolean }

export class FishUI {
  e = {
    action: $('btnAction'), reel: $('btnReel'), retrieve: $('btnRetrieve'), aim: $('btnAim'), auto: $('btnAuto'), cue: $('cue'), flash: $('flash'), gear: $('btnGear'), exit: $('btnExit'),
    dragPlus: $('dragPlus'), dragMinus: $('dragMinus'), dragVal: $('dragVal'), rod: $('rodInd'),
    ten: $('tenGauge'), power: $('powerGauge'), info: $('fightInfo'), card: $('infoCard'), result: $('resultCard'),
  };
  private cache: Record<string, string> = {};
  /** 準備中に表示する釣り場情報（hud.showFishing が作る） */
  readyHtml = '';
  /** 設定・状態（controller が設定する。変えたら invalidate()） */
  autoOn = false; assistOn = true; quickCast = false;
  invalidate() { this.cache.phase = ''; }
  /** アタリ・合わせの合図（中央の大きな文字＋画面ふちのフラッシュ） */
  cue(kind: 'bite' | 'hit' | 'miss' | 'pre', text: string) {
    const c = this.e.cue; c.className = ''; void c.offsetWidth; c.textContent = text; c.className = `show ${kind}`;
    if (kind === 'bite' || kind === 'hit') { const f = this.e.flash; f.className = ''; void f.offsetWidth; f.className = 'show'; }
  }
  private show(el: HTMLElement, on: boolean) { el.classList.toggle('show', on); }

  /** フェーズごとのボタン表示 */
  setPhase(ph: Phase, s: FishingSession) {
    const e = this.e;
    document.body.dataset.phase = ph;
    const wait = ph === 'wait' || ph === 'bite';
    const fightManual = !this.assistOn && !this.autoOn;
    this.show(e.action, ph !== 'result');
    this.show(e.reel, !this.autoOn && (wait || ph === 'fight'));
    this.show(e.retrieve, wait);
    this.show(e.aim, ph === 'ready' && this.quickCast && !this.autoOn);
    this.show(e.auto, ph !== 'result' && !(ph === 'fight' && fightManual));
    e.auto.classList.toggle('on', this.autoOn);
    (e.auto.querySelector('.lb') as HTMLElement).textContent = this.autoOn ? 'おまかせ中' : 'おまかせ';
    e.auto.setAttribute('aria-pressed', this.autoOn ? 'true' : 'false');
    for (const el of [e.dragPlus, e.dragMinus, e.dragVal, e.rod]) this.show(el, ph === 'fight' && fightManual);
    for (const el of [e.ten, e.info]) this.show(el, ph === 'fight');
    this.show(e.power, ph === 'aim');
    e.card.style.display = ph === 'fight' || ph === 'aim' || ph === 'result' ? 'none' : '';
    this.show(e.exit, ph !== 'result');
    e.gear.classList.toggle('off', !(ph === 'ready' || wait));
    // メインボタン
    const a = e.action; const lb = a.querySelector('.lb')!, ic = a.querySelector('.ic')!;
    a.classList.remove('go', 'alert', 'hold', 'off');
    const set = (i: string, l: string) => { ic.textContent = i; lb.textContent = l; };
    if (this.autoOn) {
      a.classList.add('off');
      const L: Record<string, string> = { ready: '投げ待ち', aim: '投げ待ち', flight: '飛行中', wait: 'アタリ待ち', bite: '合わせ中', fight: 'ファイト中' };
      set('🤖', L[ph] ?? '');
    } else switch (ph) {
      case 'ready': set('🎯', 'キャスト'); a.classList.add('go'); break;
      case 'aim': set('🎯', '投げる！'); a.classList.add('go'); break;
      case 'flight': set('…', '飛行中'); a.classList.add('off'); break;
      case 'wait': set('⚡', '合わせ'); a.classList.add('go'); break;
      case 'bite': set('⚡', '合わせ！'); a.classList.add('alert'); break;
      case 'fight': set('⬆', '竿を立てる'); break;
      default: break;
    }
    document.body.dataset.auto = this.autoOn ? '1' : '0';
    this.cache = { ...this.cache, phase: ph };
    void s;
  }
  setReelHold(on: boolean) { this.e.reel.classList.toggle('hold', on); }
  setRaiseHold(on: boolean) { this.e.action.classList.toggle('hold', on); }

  /** 毎フレーム呼ぶ（変化があるときだけDOMを書く） */
  update(s: FishingSession, fv: FightView | null, extra: { baitPct: number; castDist: number }) {
    const e = this.e, c = this.cache;
    if (c.phase !== s.phase) this.setPhase(s.phase, s);
    const rig = s.rig;
    e.retrieve.classList.toggle('off', !!s.quick);
    if (s.phase === 'aim') {
      const L = s.landing(s.yaw, s.aimPower);
      const txt = L ? `パワー ${Math.round(s.aimPower * 100)}%（約${L.dist.toFixed(0)}m）` : '投げられない方向です';
      setIf(e.power, 'pw', txt, c, () => { e.power.querySelector('span')!.textContent = txt; });
      (e.power.querySelector('i') as HTMLElement).style.width = `${Math.round(s.aimPower * 100)}%`;
    }
    if (s.phase === 'wait' || s.phase === 'bite' || s.phase === 'flight') {
      const bait = Math.round(extra.baitPct);
      const html = `ウキ下 <b>${rig.depthM.toFixed(1)}m</b> ／ 水深 約${s.phase === 'flight' ? '?' : s.seabed.toFixed(1)}m ／ エサ <b>${bait}%</b><br><small>${s.snag ? '根掛かり！ 巻いて外そう' : s.phase === 'bite' ? 'ウキが動いた！ 合わせ！' : s.phase === 'wait' ? 'ウキを見よう。沈んだら「合わせ」' : '飛んでいます…'}</small>`;
      setIf(e.card, 'info', html, c, () => { e.card.innerHTML = html; });
    } else if (s.phase === 'ready') {
      setIf(e.card, 'info', 'ready' + this.readyHtml, c, () => { e.card.innerHTML = this.readyHtml; });
    }
    if (fv) {
      const t = Math.max(0, fv.tension);
      (e.ten.querySelector('i') as HTMLElement).style.width = `${Math.min(100, Math.round(t * 100))}%`;
      const lvl = t > 0.92 ? 'danger blink' : t > 0.75 ? 'danger' : t > 0.55 ? 'warn' : '';
      setIf(e.ten, 'tl', lvl, c, () => { e.ten.className = `gauge ph show ${lvl}`; });
      const tt = `テンション ${Math.round(t * 100)}%${fv.slipping ? '（ドラグ滑り中）' : ''}`;
      setIf(e.ten, 'tt', tt, c, () => { e.ten.querySelector('span')!.textContent = tt; });
      const b = fv.bearing; const side = b > 0.12 ? '右' : b < -0.12 ? '左' : '正面';
      const opp = b > 0.12 ? '左' : '右';
      let tip = '';
      switch (fv.mode) {
        case 'run': tip = fv.assist ? '走ってる！ 少し待とう' : '走ってる！ 巻かずにドラグに任せて耐える'; break;
        case 'side_run': tip = fv.assist ? `魚が${side}へ走ってる` : `魚が${side}へ横走り → 竿を${opp}へ（横にドラッグ）`; break;
        case 'dive': tip = fv.assist ? '底へ突っ込む！ 耐えよう' : '底へ突っ込む！ 竿を立ててためる'; break;
        case 'wedged': tip = fv.assist ? '根に入られた！ 少し待とう' : '根に入られた！ 竿を立ててゆっくり耐える'; break;
        case 'headshake': tip = fv.assist ? '首振り！ 巻くのを止めて' : '首振り！ 竿を立てて衝撃を逃がす'; break;
        case 'rest': tip = fv.auto ? 'チャンス！ 巻いてます' : 'チャンス！ 今のうちに巻こう'; break;
        default: tip = fv.auto ? '自動で巻いて寄せてます' : '巻いて寄せよう（赤くなる前に離す）';
      }
      const l1 = `${fv.known ? `${fv.name} 約${Math.round(fv.sizeCm)}cm` : '何かが掛かった！'} ｜ 距離 ${fv.dist.toFixed(1)}m`;
      const ih = `${l1}<br><span style="color:#ffd37a">${tip}</span>`;
      setIf(e.info, 'fi', ih, c, () => { e.info.innerHTML = ih; });
      const rec = dragRecommended(T0);
      const cls = fv.drag < rec[0] - 0.02 ? 'lo' : fv.drag > rec[1] + 0.02 ? 'hi' : 'ok';
      const dv = fv.drag.toFixed(2);
      setIf(e.dragVal, 'dv', cls + dv, c, () => { e.dragVal.className = `fs ph show ${cls}`; e.dragVal.querySelector('b')!.textContent = dv; });
      const th = Math.round(fv.theta);
      setIf(e.rod, 'th', String(th) + fv.raised, c, () => { $('rodTxt').textContent = `竿${th}°`; (e.rod.querySelector('.bar i') as HTMLElement).style.bottom = `${Math.round(((th - 5) / 85) * 90)}%`; });
    }
    void extra.castDist;
  }

  /* ---------- 結果カード ---------- */
  hideResult() { this.e.result.classList.remove('open'); this.e.result.innerHTML = ''; }
  showResult(html: string) { this.e.result.innerHTML = html; this.e.result.classList.add('open'); }

  /* ---------- 仕掛けパネル ---------- */
  renderRig(body: HTMLElement, api: RigPanelApi) {
    const rig = api.rig(); const wait = api.phase() === 'wait' || api.phase() === 'bite';
    const dis = wait ? 'disabled' : '';
    const seg = (name: string, items: [string, string, string?][], cur: string, col = false) => `<div class="row seg${col ? ' col' : ''}" data-seg="${name}">${items.map(([v, l, sm]) => `<button data-v="${v}" class="${v === cur ? 'on' : ''}" ${dis}>${l}${sm ? `<small>${sm}</small>` : ''}</button>`).join('')}</div>`;
    const sea = api.seabed();
    const fish = SPECIES.filter((sp) => !sp.esatori).map((sp) => `${sp.nameJa} ${sp.bottom ? '底付近' : `${sp.depthRange.preferredMin}〜${sp.depthRange.preferredMax}m`}`).join(' ／ ');
    body.innerHTML = `<h2>仕掛け</h2>
      ${wait ? '<div class="sec" style="background:rgba(255,138,61,.2)">投入中は「ウキ下」だけ変えられます。他を変えるときは巻き上げてから。</div>' : ''}
      <div class="sec"><h3>ウキ下（ウキから針までの深さ）</h3>
        <div class="depthrow"><button id="dMinus" aria-label="浅く">−</button><b id="dVal">${rig.depthM.toFixed(1)}m</b><button id="dPlus" aria-label="深く">＋</button></div>
        <canvas id="dCv" width="320" height="150" style="max-width:340px"></canvas>
        <div style="font-size:12px;opacity:.85" id="dNote"></div>
        <div style="font-size:12px;opacity:.85;margin-top:4px">魚の泳ぐ深さの目安: ${fish}</div></div>
      <div class="sec"><h3>おすすめセット</h3>${seg('preset', RIG_PRESETS.map((p) => [p.id, p.nameJa, p.desc] as [string, string, string]), '', true)}</div>
      <div class="sec"><h3>ウキ</h3>${seg('float', FLOATS.map((f) => [f.id, f.nameJa, f.note] as [string, string, string]), rig.floatId, true)}</div>
      <div class="sec"><h3>ハリ</h3>${seg('hook', HOOKS.map((h) => [h.id, h.nameJa] as [string, string]), rig.hookId)}<div style="font-size:12px;opacity:.85">小さい魚（アジ・メバル）には小バリ、カサゴ・チヌには中バリ。大きすぎると小魚が掛かりにくい。</div></div>
      <div class="sec"><h3>エサ</h3>${seg('bait', BAITS.map((b) => [b.id, b.nameJa, b.note] as [string, string, string]), rig.baitId, true)}</div>`;
    const draw = () => {
      const r = api.rig(); (document.getElementById('dVal') as HTMLElement).textContent = r.depthM.toFixed(1) + 'm';
      const cv = document.getElementById('dCv') as HTMLCanvasElement | null; if (!cv) return; const g = cv.getContext('2d')!; const W = cv.width, H = cv.height;
      g.clearRect(0, 0, W, H);
      const maxD = Math.max(6, Math.ceil(Math.max(sea, r.depthM) + 0.5));
      const y = (d: number) => 24 + (d / maxD) * (H - 34);
      const grd = g.createLinearGradient(0, 24, 0, H); grd.addColorStop(0, '#2b7ba6'); grd.addColorStop(1, '#0c2d4a'); g.fillStyle = grd; g.fillRect(0, 24, W, H - 24);
      g.fillStyle = '#c9b88a'; g.fillRect(0, y(sea), W, H - y(sea)); g.fillStyle = '#8b7a52'; g.fillRect(0, y(sea), W, 3);
      g.fillStyle = '#cfe9f7'; g.fillRect(0, 22, W, 3);
      // 目盛り
      g.fillStyle = 'rgba(255,255,255,.7)'; g.font = '11px sans-serif';
      for (let d = 0; d <= maxD; d += 1) { g.fillRect(0, y(d), 6, 1); if (d % 2 === 0 && d > 0) g.fillText(`${d}m`, 9, y(d) + 4); }
      // ウキ・糸・針
      const fx = W * 0.58; g.fillStyle = '#ff4a1a'; g.fillRect(fx - 4, 8, 8, 16); g.fillStyle = '#fff'; g.fillRect(fx - 1, 4, 2, 6);
      const hy = Math.min(y(r.depthM), y(sea) - 2); g.strokeStyle = '#eee'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(fx, 24); g.lineTo(fx, hy); g.stroke();
      g.fillStyle = '#ff9a7a'; g.beginPath(); g.arc(fx, hy, 5, 0, 7); g.fill();
      g.fillStyle = '#fff'; g.fillText(r.depthM >= sea - 0.12 ? '底に着いている（根掛かり注意）' : `ウキ下 ${r.depthM.toFixed(1)}m`, fx + 12, Math.max(36, hy - 4));
      g.fillText(`水深 約${sea.toFixed(1)}m${api.seabedKnown() ? '' : '（足元。投げた先で変わる）'}`, 10, H - 5);
      (document.getElementById('dNote') as HTMLElement).textContent = r.depthM >= sea - 0.12 ? '針が底に着く設定です。根魚（カサゴ）は釣れやすいが、岩場では根掛かりしやすい。' : r.depthM < 1.5 ? '浅め：表層の魚（サバ・アジ）狙い。' : '底から少し浮かせると、アジ・メバルが食いやすい。';
    };
    draw();
    const q = (n: string) => body.querySelectorAll<HTMLButtonElement>(`[data-seg="${n}"] button`);
    const bind = (n: string, f: (v: string) => void) => q(n).forEach((b) => b.addEventListener('click', () => { if (b.disabled) return; f(b.dataset.v!); this.renderRig(body, api); }));
    bind('preset', (v) => api.preset(v)); bind('float', (v) => api.setRig({ floatId: v })); bind('hook', (v) => api.setRig({ hookId: v })); bind('bait', (v) => api.setRig({ baitId: v }));
    $('dMinus').addEventListener('click', () => { api.depth(-DEPTH_STEP); draw(); });
    $('dPlus').addEventListener('click', () => { api.depth(DEPTH_STEP); draw(); });
    void DEPTH_MIN; void DEPTH_MAX;
  }

  /* ---------- 図鑑・釣果パネル ---------- */
  renderZukan(body: HTMLElement, save: SaveData) {
    const rows = SPECIES.filter((sp) => !sp.esatori).map((sp) => {
      const z = save.zukan[sp.id];
      return z ? `<tr><td><b>${sp.nameJa}</b></td><td>${z.count}匹</td><td>最大 ${z.maxSizeCm}cm</td><td>${'★'.repeat(Math.max(1, Math.round(z.bestQuality * 5)))}</td></tr>`
        : `<tr class="dim"><td>？？？</td><td colspan="3">未発見（${sp.nameJa.slice(0, 0)}釣ると登録）</td></tr>`;
    }).join('');
    const got = Object.keys(save.zukan).length, tot = SPECIES.filter((sp) => !sp.esatori).length;
    const recent = save.catchLog.slice(-12).reverse().map((c) => {
      const d = new Date(c.at); const sp = SPECIES_BY_ID[c.speciesId];
      return `<tr><td>${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}</td><td>${sp?.nameJa ?? c.speciesId}</td><td>${c.sizeCm}cm</td><td>${c.fate === 'release' ? 'リリース' : 'キープ'}</td></tr>`;
    }).join('');
    const st = save.stats;
    body.innerHTML = `<h2>図鑑・釣果</h2>
      <div class="sec"><h3>図鑑 ${got} / ${tot}</h3><table>${rows}</table></div>
      <div class="sec"><h3>最近の釣果（新しい順）</h3>${recent ? `<table>${recent}</table>` : '<span class="dim">まだ釣れていません。港で「釣り開始」しよう。</span>'}</div>
      <div class="sec"><h3>記録</h3>キャスト ${st.casts} ／ アタリ ${st.bites} ／ 釣れた ${st.catches} ／ リリース ${st.releases}<br>ラインブレイク ${st.lineBreaks} ／ バラシ ${st.hookOuts}</div>
      <div class="sec" style="font-size:12px;opacity:.8">所持金・経済・レベルは Phase 3 以降で実装予定です（いまは釣果の記録のみ）。</div>`;
  }
}
