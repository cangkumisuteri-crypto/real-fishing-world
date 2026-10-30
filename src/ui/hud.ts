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
  private panelMode: 'map' | 'zukan' | 'rig' | 'menu' | null = null;
  /** 図鑑・仕掛けパネルの中身（fishui / controller が登録） */
  renderers: Partial<Record<'zukan' | 'rig', (body: HTMLElement) => void>> = {};
  private mapTimer = 0;
  onPanel: (open: boolean) => void = () => {};
  constructor(private cb: HudCallbacks, private settings: () => Settings, private mini: Minimap) {
    const on = (id: string, f: () => void) => $(id).addEventListener('click', (e) => { e.preventDefault(); f(); });
    on('btnFish', () => cb.onFish());
    on('btnExit', () => cb.onExit());
    on('btnCam', () => cb.onCam());
    on('btnMap', () => this.open('map'));
    on('btnBag', () => this.open('zukan'));
    on('btnMenu', () => this.open('menu'));
    on('panelClose', () => this.close());
    on('btnRun', () => cb.onRun(!this.runOn));
  }
  private runOn = false;
  /** 走るロックの表示（ON: オレンジ・「走る ON」・aria-pressed） */
  setRun(v: boolean) {
    this.runOn = v;
    const r = $('btnRun'); r.classList.toggle('on', v); r.setAttribute('aria-pressed', v ? 'true' : 'false'); r.dataset.state = v ? 'on' : 'off';
    r.querySelector('.lb')!.textContent = v ? '走る ON' : '走る';
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
    $('chipFTop').textContent = 'ウキ釣り';
    $('chipFSub').textContent = site.spot && site.spot.def ? site.spot.def.name : '水際（自由な場所）';
    const lines = [
      `<b>釣り場</b>: ${site.spot ? site.spot.def.name : '水際（自由な場所）'}`,
      `<b>足元の水深</b>: 約${site.depth.toFixed(1)}m <small>（ゲーム内の目安）</small>`,
      `<b>海底</b>: ${site.zoneJa}${site.hole ? '（穴釣り向きの隙間）' : ''}`,
    ];
    if (site.nearTetra) lines.push('<span class="warn">⚠ テトラ帯は危険。上に乗らず安全な足場から。</span>');
    $('infoCard').innerHTML = lines.join('<br>');
  }

  open(kind: 'map' | 'zukan' | 'rig' | 'menu') {
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
    } else if (kind === 'zukan' || kind === 'rig') {
      this.renderers[kind]?.(body);
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
      <div class="sec"><h3>常に走る</h3>${seg('alwaysRun', [['1', 'ON（常に走る）'], ['0', 'OFF（歩き）']], s.alwaysRun ? '1' : '0')}<div style="font-size:12px;opacity:.8">ONにすると、起動時と設定変更時に「走る」ロックがONになります。画面の「走る」ボタンでも切り替えられます（走る速さは歩きの約2倍）。</div></div>
      <div class="sec"><h3>効果音</h3>${seg('sound', [['1', 'ON'], ['0', 'OFF']], s.sound ? '1' : '0')}<div style="font-size:12px;opacity:.8">アタリ音・巻く音など。iPhoneは本体のマナーモード（消音）だと鳴らないことがあります。</div></div>
      <div class="sec"><h3>振動・画面の揺れ</h3>${seg('vibration', [['1', 'ON'], ['0', 'OFF']], s.vibration ? '1' : '0')}<div style="font-size:12px;opacity:.8">対応端末は振動します。iPhone Safari は振動に非対応のため、代わりに画面が揺れます。</div></div>
      <div class="sec"><h3>釣り場マーカー</h3>${seg('hints', [['1', '表示'], ['0', '非表示']], s.hints ? '1' : '0')}</div>
      <div class="sec"><h3>セーブ</h3>設定・図鑑・釣果・最後の位置を端末内（localStorage）に保存します。<span style="opacity:.8">状態: ${inf.saveStatus}</span>
        <div class="row"><button class="act" id="btnSaveNow">いま保存</button><button class="act" id="btnResetPos">スポーン地点へ戻る</button><button class="act danger" id="btnClear">セーブ削除</button></div></div>
      <div class="sec"><h3>釣法</h3>${FISHING_METHODS.map((m) => `${m.ja}<span class="tag">${m.phase}</span>`).join('<br>')}</div>
      <div class="sec"><h3>現在の情報</h3>
        時刻: ${inf.timeLabel}（${inf.timeDemo ? 'デモ指定' : '端末の現地時刻を使用'}）<br>
        天気・潮・水温・風: <b>デモ値</b>（実データ連動は未実装。時刻は端末の時刻）<br>
        FPS(計測): <span id="vFps">${inf.fps ? inf.fps.toFixed(0) : '-'}</span> ／ 描画 ${inf.calls} calls ／ ${(inf.tris / 1000).toFixed(0)}k tris ／ DPR ${inf.dpr.toFixed(2)}<br>
        <small>${inf.renderer}</small></div>
      <div class="sec"><h3>このバージョンについて</h3>REAL FISHING WORLD v0.2.0（Phase 2：ウキ釣り）。架空の港「波戸浦港」です。<br>
        <b>未実装</b>: 実データ連動の天気・潮・水温／ルアー・穴釣り／ショップ・拠点／経済・レベル／見た目のリアル化（Phase 3 以降）。<br>
        <b>未検証</b>: iPhone 実機での操作感・fps・音・振動。</div>`;
    const q = (n: string) => body.querySelectorAll<HTMLButtonElement>(`[data-seg="${n}"] button`);
    const bind = (n: string, f: (v: string) => void) => q(n).forEach((b) => b.addEventListener('click', () => { f(b.dataset.v!); q(n).forEach((x) => x.classList.toggle('on', x === b)); }));
    bind('quality', (v) => this.change({ quality: v as QualityId }));
    bind('camera', (v) => this.change({ camera: v as 'first' | 'third' }));
    bind('alwaysRun', (v) => this.change({ alwaysRun: v === '1' }));
    bind('sound', (v) => this.change({ sound: v === '1' }));
    bind('vibration', (v) => this.change({ vibration: v === '1' }));
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
