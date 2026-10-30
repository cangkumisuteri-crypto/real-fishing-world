import type { Settings, QualityId } from '../systems/save';
import { TIERS } from '../systems/quality';
import { FISHING_METHODS } from '../fishing/fishingMode';
import type { FishingSite } from '../fishing/spots';
import type { Minimap } from './minimap';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

export interface HudCallbacks {
  onFish(): void; onExit(): void; onCam(): void;
  onSettings(s: Settings): void;
  onSaveNow(): boolean; onClearSave(): boolean; onResetPos(): void;
  onRun(v: boolean): void;
  info(): { fps: number; quality: QualityId; timeLabel: string; timeDemo: boolean; saveStatus: string; renderer: string; calls: number; tris: number; dpr: number };
  playerPos(): { x: number; z: number; yaw: number };
}

export class Hud {
  private toastTimer = 0;
  private panelMode: 'map' | 'bag' | 'menu' | null = null;
  private mapTimer = 0;
  onPanel: (open: boolean) => void = () => {};
  constructor(private cb: HudCallbacks, private settings: () => Settings, private mini: Minimap) {
    const on = (id: string, f: () => void) => $(id).addEventListener('click', (e) => { e.preventDefault(); f(); });
    on('btnFish', () => cb.onFish());
    on('btnExit', () => cb.onExit());
    on('btnCam', () => cb.onCam());
    on('btnMap', () => this.open('map'));
    on('btnBag', () => this.open('bag'));
    on('btnMenu', () => this.open('menu'));
    on('panelClose', () => this.close());
    for (const id of ['btnGear', 'btnReel', 'btnBait', 'btnAction']) on(id, () => this.toast('この機能は Phase 2 以降で実装予定です'));
    const run = $('btnRun');
    const setRun = (v: boolean) => { run.classList.toggle('held', v); cb.onRun(v); };
    run.addEventListener('pointerdown', (e) => { e.preventDefault(); setRun(true); });
    for (const t of ['pointerup', 'pointercancel', 'pointerleave']) run.addEventListener(t, () => setRun(false));
    window.addEventListener('pointerup', () => { if (run.classList.contains('held')) setRun(false); });
  }

  setMode(m: 'move' | 'fish') { document.body.dataset.mode = m; }
  get panelOpen() { return this.panelMode !== null; }

  toast(msg: string, ms = 2600) {
    const t = $('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(this.toastTimer); this.toastTimer = window.setTimeout(() => t.classList.remove('show'), ms);
  }

  updateChip(time: string, demoTime: boolean, site: FishingSite, placeNote: string) {
    $('chipTop').textContent = `波戸浦港 ${time}${demoTime ? '（デモ時刻）' : ' 実時刻'}`;
    $('chipSub').textContent = placeNote || (site.can ? `釣れる水際 ✔ 水深約${site.depth.toFixed(1)}m` : '水辺に近づくと釣れるよ');
    const b = $('btnFish');
    b.classList.toggle('off', !site.can);
    b.dataset.state = site.can ? 'ready' : 'disabled';
  }

  showFishing(site: FishingSite) {
    $('chipFTop').textContent = 'ウキ釣り（準備中）';
    $('chipFSub').textContent = site.spot && site.spot.def ? site.spot.def.name : '水際（自由な場所）';
    const lines = [
      `<b>釣り場</b>: ${site.spot ? site.spot.def.name : '水際（自由な場所）'}`,
      `<b>足元の水深</b>: 約${site.depth.toFixed(1)}m <small>（ゲーム内の目安）</small>`,
      `<b>海底</b>: ${site.zoneJa}${site.hole ? '（穴釣り向きの隙間）' : ''}`,
    ];
    if (site.nearTetra) lines.push('<span class="warn">⚠ テトラ帯は危険。上に乗らず安全な足場から。</span>');
    lines.push('<small>キャスト・アタリ・ファイトは次のPhaseで実装。いまは構えのみ。</small>');
    $('infoCard').innerHTML = lines.join('<br>');
  }

  open(kind: 'map' | 'bag' | 'menu') {
    this.panelMode = kind;
    const body = $('panelBody');
    $('panel').classList.add('open');
    this.onPanel(true);
    if (kind === 'map') {
      body.innerHTML = `<h2>マップ（波戸浦港）</h2>
        <div class="sec"><canvas id="mapCv"></canvas></div>
        <div class="sec"><h3>凡例</h3>★ 釣り場（目印） ／ 赤い矢印＝あなた ／ <span style="color:#e8c440">■</span> 穴釣りの隙間 ／ <span style="color:#a9ada8">■</span> テトラ帯（立入禁止）<br>水際ならどこでも釣り開始できます。マーカーは任意のヒントです。</div>`;
      const draw = () => { const p = this.cb.playerPos(); const cv = $<HTMLCanvasElement>('mapCv'); if (cv) this.mini.draw(cv, p.x, p.z, p.yaw); };
      draw(); this.mapTimer = window.setInterval(draw, 250);
    } else if (kind === 'bag') {
      body.innerHTML = `<h2>所持品<span class="tag">未実装</span></h2>
        <div class="sec">ここは「所持品」画面の枠だけです（Phase 1）。<br>竿・リール・エサ・クーラーボックス・釣果などは Phase 3 以降で実装予定です。</div>
        <div class="sec"><h3>いまの装備（表示のみ）</h3>手持ちの竿：ノーマルロッド（見た目のみ）</div>`;
    } else {
      this.renderMenu();
    }
  }
  private renderMenu() {
    const s = this.settings(), inf = this.cb.info();
    const body = $('panelBody');
    const seg = (name: string, items: [string, string][], cur: string) => `<div class="row seg" data-seg="${name}">${items.map(([v, l]) => `<button data-v="${v}" class="${v === cur ? 'on' : ''}">${l}</button>`).join('')}</div>`;
    body.innerHTML = `<h2>メニュー・設定</h2>
      <div class="sec"><h3>画質</h3>${seg('quality', (['low', 'mid', 'high'] as QualityId[]).map((q) => [q, TIERS[q].label] as [string, string]), s.quality)}
        <div style="font-size:12px;opacity:.8">重いときは「低」に。端末が重いと自動で下げることがあります（30fps上限は低/中。実機での安定動作は未確認）。</div></div>
      <div class="sec"><h3>視点</h3>${seg('camera', [['first', '一人称（標準）'], ['third', '三人称']], s.camera)}</div>
      <div class="sec"><h3>移動速度 <span id="vSpeed">${s.moveSpeed.toFixed(1)}×</span></h3><input id="rngSpeed" type="range" min="0.6" max="1.6" step="0.1" value="${s.moveSpeed}">
        <h3 style="margin-top:8px">視点の感度 <span id="vLook">${s.lookSens.toFixed(1)}×</span></h3><input id="rngLook" type="range" min="0.5" max="2" step="0.1" value="${s.lookSens}"></div>
      <div class="sec"><h3>釣り場マーカー</h3>${seg('hints', [['1', '表示'], ['0', '非表示']], s.hints ? '1' : '0')}</div>
      <div class="sec"><h3>セーブ</h3>設定と最後の位置を端末内（localStorage）に保存します。<span style="opacity:.8">状態: ${inf.saveStatus}</span>
        <div class="row"><button class="act" id="btnSaveNow">いま保存</button><button class="act" id="btnResetPos">スポーン地点へ戻る</button><button class="act danger" id="btnClear">セーブ削除</button></div></div>
      <div class="sec"><h3>釣法（準備中）</h3>${FISHING_METHODS.map((m) => `${m.ja}<span class="tag">${m.phase}</span>`).join('<br>')}</div>
      <div class="sec"><h3>現在の情報</h3>
        時刻: ${inf.timeLabel}（${inf.timeDemo ? 'デモ指定' : '端末の現地時刻を使用'}）<br>
        天気・潮・水温: <b>デモ固定</b>（実データ連動は未実装）<br>
        FPS(計測): <span id="vFps">${inf.fps ? inf.fps.toFixed(0) : '-'}</span> ／ 描画 ${inf.calls} calls ／ ${(inf.tris / 1000).toFixed(0)}k tris ／ DPR ${inf.dpr.toFixed(2)}<br>
        <small>${inf.renderer}</small></div>
      <div class="sec"><h3>このバージョンについて</h3>REAL FISHING WORLD v0.1.0（Phase 1）。架空の港「波戸浦港」を歩ける3Dプレビューです。<br>
        <b>未実装</b>: キャスト／アタリ／ファイト／魚の生成／釣果・図鑑・経済／天気・潮・実データ／ルアー・穴釣り／ショップ・拠点の中身／音。<br>
        <b>未検証</b>: iPhone 実機での動作・fps。</div>`;
    const q = (n: string) => body.querySelectorAll<HTMLButtonElement>(`[data-seg="${n}"] button`);
    const bind = (n: string, f: (v: string) => void) => q(n).forEach((b) => b.addEventListener('click', () => { f(b.dataset.v!); q(n).forEach((x) => x.classList.toggle('on', x === b)); }));
    bind('quality', (v) => this.change({ quality: v as QualityId }));
    bind('camera', (v) => this.change({ camera: v as 'first' | 'third' }));
    bind('hints', (v) => this.change({ hints: v === '1' }));
    $<HTMLInputElement>('rngSpeed').addEventListener('input', (e) => { const v = parseFloat((e.target as HTMLInputElement).value); $('vSpeed').textContent = v.toFixed(1) + '×'; this.change({ moveSpeed: v }); });
    $<HTMLInputElement>('rngLook').addEventListener('input', (e) => { const v = parseFloat((e.target as HTMLInputElement).value); $('vLook').textContent = v.toFixed(1) + '×'; this.change({ lookSens: v }); });
    $('btnSaveNow').addEventListener('click', () => this.toastPanel(this.cb.onSaveNow() ? '保存しました' : '保存できませんでした（この環境では保存不可）'));
    $('btnClear').addEventListener('click', () => this.toastPanel(this.cb.onClearSave() ? 'セーブを削除しました' : '削除に失敗しました'));
    $('btnResetPos').addEventListener('click', () => { this.cb.onResetPos(); this.close(); });
  }
  private change(p: Partial<Settings>) { this.cb.onSettings({ ...this.settings(), ...p }); }
  private toastPanel(msg: string) { this.toast(msg); }

  close() {
    if (this.panelMode === null) return;
    this.panelMode = null; clearInterval(this.mapTimer);
    $('panel').classList.remove('open'); $('panelBody').innerHTML = '';
    this.onPanel(false);
  }
}
