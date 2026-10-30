/** ウキ釣りコントローラ：セッション ⇔ 入力・表示・音・振動・セーブ をつなぐ。ゲームの判定そのものは session / fight にある。 */
import * as THREE from 'three';
import type { Grid } from '../world/grid';
import { gridWorld } from './world';
import { FishingSession, type Phase, type SessionEvent } from './session';
import { FishingView } from './view';
import { FishUI, type FightView } from '../ui/fishui';
import { Sfx } from '../systems/audio';
import { Haptics } from '../systems/haptics';
import { recordCatch, releaseCatch, type SaveData, type CatchLogEntry } from '../systems/save';
import { RIG_PRESETS } from './rigdata';
import { SPECIES_BY_ID } from '../data/species';
import type { Hud } from '../ui/hud';
import type { Input } from '../player/input';
import type { Player } from '../player/player';
import type { CameraRig } from '../camera/rig';
import type { FishingSite } from './spots';

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const $ = (id: string) => document.getElementById(id)!;

export interface CtlDeps {
  scene: THREE.Scene; rig: CameraRig; input: Input; player: Player; hud: Hud; g: Grid;
  data: SaveData; saveNow: () => boolean; hours: () => number; seed?: number; qa: boolean;
}

export class FishingController {
  session: FishingSession; view: FishingView; ui = new FishUI(); sfx = new Sfx(); hap = new Haptics();
  active = false; site: FishingSite | null = null;
  reelHeld = false; raised = false;
  /** QA用：ファイト入力の上書き（null なら実入力） */
  qaPose: { theta: number | null; steer: number | null } = { theta: null, steer: null };
  lastEntry: CatchLogEntry | null = null;
  knownSeabed = 3; seabedKnown = false;
  log: string[] = [];
  /** QA用：本アタリ(bite)イベントの通算回数 */
  biteEvents = 0;
  private envT = 0; private theta = 50; private lastPhase: Phase = 'ready'; private saveT = 0;
  private stage = $('stage');
  private resultCatch = false;

  constructor(private d: CtlDeps) {
    this.session = new FishingSession(gridWorld(d.g), { seed: d.seed, hour: d.hours() });
    this.view = new FishingView(d.scene, d.rig.camera, d.rig.rod);
    this.sfx.enabled = d.data.settings.sound; this.hap.enabled = d.data.settings.vibration;
    this.bind();
    d.hud.renderers.rig = (body) => this.ui.renderRig(body, {
      rig: () => this.session.rig, phase: () => this.session.phase, seabed: () => this.knownSeabed, seabedKnown: () => this.seabedKnown,
      setRig: (p) => { this.session.setRig(p); this.persistRig(); },
      preset: (id) => { const p = RIG_PRESETS.find((x) => x.id === id); if (p) { this.session.setRig(p.rig); this.persistRig(); this.d.hud.toast(`${p.nameJa} にセット`, 1500); } },
      depth: (dl) => { this.session.adjustDepth(dl); this.persistRig(); },
    });
    d.hud.renderers.zukan = (body) => this.ui.renderZukan(body, d.data);
  }
  applySettings(s: { sound: boolean; vibration: boolean }) { this.sfx.enabled = s.sound; this.hap.enabled = s.vibration; }
  private persistRig() { this.d.data.lastRig = { ...this.session.rig }; }

  /* ---------- 開始・終了 ---------- */
  enter(site: FishingSite) {
    this.site = site; this.active = true;
    const p = this.d.player, s = this.session;
    s.begin(p.x, p.z, site.yaw);
    if (this.d.data.lastRig) s.setRig(this.d.data.lastRig);
    this.knownSeabed = Math.max(1, site.depth); this.seabedKnown = false;
    this.d.input.flickOn = true; this.d.input.fightMode = false;
    this.lastPhase = 'ready'; this.envT = 0; this.saveT = 0;
    this.ui.setPhase('ready', s); this.ui.hideResult();
    this.ui.readyHtml = $('infoCard').innerHTML;
    this.d.hud.toast('キャスト→もう一度押して投げる（上フリックでも可）', 3200);
  }
  /** 離れてよいか（ファイト中・飛行中は不可） */
  requestExit(): boolean {
    const s = this.session;
    if (s.phase === 'flight' || s.phase === 'fight') { this.d.hud.toast(s.phase === 'fight' ? 'ファイト中は離れられません' : '仕掛けが飛んでいます', 1600); return false; }
    return true;
  }
  leave() {
    if (!this.active) return;
    if (this.session.phase === 'result') this.closeResult(false);
    this.session.end(); this.active = false; this.reelHeld = false; this.raised = false;
    this.d.input.flickOn = false; this.d.input.fightMode = false;
    this.view.hideCatch(); this.ui.hideResult(); this.setShake(0);
    document.body.dataset.phase = '';
  }

  /* ---------- 入力の結線 ---------- */
  private bind() {
    const e = this.ui.e, inp = this.d.input;
    const down = (el: HTMLElement, f: (ev: PointerEvent) => void) => el.addEventListener('pointerdown', (ev) => { ev.preventDefault(); this.sfx.unlock(); f(ev); });
    down(e.action, (ev) => { if (this.session.phase === 'fight') { this.setRaise(true); (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId); } else this.act(); });
    for (const t of ['pointerup', 'pointercancel', 'lostpointercapture'] as const) { e.action.addEventListener(t, () => this.setRaise(false)); e.reel.addEventListener(t, () => this.setReel(false)); }
    down(e.reel, (ev) => { this.setReel(true); (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId); });
    down(e.dragPlus, () => this.addDrag(0.1)); down(e.dragMinus, () => this.addDrag(-0.1));
    e.bait.addEventListener('click', () => this.openRig());
    e.gear.addEventListener('click', () => this.openRig());
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { this.setReel(false); this.setRaise(false); } });
    addEventListener('blur', () => { this.setReel(false); this.setRaise(false); });
    // PC キー：Space=メイン / R=巻く / ↑↓=ウキ下
    addEventListener('keydown', (ev) => {
      if (!this.active || this.d.hud.panelOpen || ev.repeat) return;
      if (ev.code === 'Space') { ev.preventDefault(); this.sfx.unlock(); if (this.session.phase === 'fight') this.setRaise(true); else this.act(); }
      else if (ev.code === 'KeyR') this.setReel(true);
      else if (ev.code === 'BracketRight') this.session.adjustDepth(0.5);
      else if (ev.code === 'BracketLeft') this.session.adjustDepth(-0.5);
    });
    addEventListener('keyup', (ev) => { if (ev.code === 'Space') this.setRaise(false); if (ev.code === 'KeyR') this.setReel(false); });
    inp.onFlick = (power) => {
      if (!this.active) return; this.sfx.unlock();
      if (this.session.phase === 'ready') this.session.startAim();
      if (this.session.phase === 'aim') this.session.cast(power, this.d.player.yaw);
    };
    $('btnExit').addEventListener('click', () => { if (this.active && this.session.phase === 'aim') this.session.cancelAim(); });
  }
  private openRig() {
    const ph = this.session.phase;
    if (ph === 'ready' || ph === 'wait' || ph === 'bite') this.d.hud.open('rig');
    else this.d.hud.toast('仕掛けは、投げる前か着水中に変えられます', 1500);
  }
  setReel(on: boolean) { this.reelHeld = on && this.active; this.ui.setReelHold(this.reelHeld); }
  setRaise(on: boolean) { this.raised = on && this.active && this.session.phase === 'fight'; this.ui.setRaiseHold(this.raised); }
  addDrag(v: number) { const s = this.session; s.inp.drag = clamp(Math.round((s.inp.drag + v) * 100) / 100, 0.2, 2.3); this.sfx.ui(); }
  /** メインボタン（キャスト／投げる／合わせ） */
  act() {
    const s = this.session;
    switch (s.phase) {
      case 'ready': s.startAim(); this.sfx.ui(); break;
      case 'aim': s.cast(s.aimPower, this.d.player.yaw); break;
      case 'wait': case 'bite': s.hookset(); break;
      default: break;
    }
  }

  /* ---------- 毎フレーム ---------- */
  /** 描画なしで進める部分（QAの advance からも使う） */
  step(dt: number) {
    if (!this.active) return;
    const s = this.session, inp = this.d.input, p = this.d.player;
    if (this.d.hud.panelOpen && s.phase === 'fight') { this.hap.decay(dt); return; }
    if (s.phase === 'ready' || s.phase === 'aim') s.yaw = p.yaw;
    // 環境（デモ）を時刻に追従
    this.envT += dt; if (this.envT > 10) { this.envT = 0; s.setEnv(this.d.hours()); }
    // リール
    if (s.phase === 'wait' || s.phase === 'bite') s.setRetrieve(this.reelHeld);
    if (s.phase === 'fight') {
      inp.fightMode = true;
      const st = inp.s;
      const th0 = 50;
      const target = st.fightHeld ? th0 - st.fdy * 0.35 : th0;
      this.theta += (clamp(target, 5, 90) - this.theta) * Math.min(1, dt * 14);
      let th = this.raised ? Math.max(this.theta, 80) : this.theta;
      let steer = st.fightHeld ? clamp(st.fdx / 70, -1, 1) : 0;
      if (this.qaPose.theta != null) th = this.qaPose.theta;
      if (this.qaPose.steer != null) steer = this.qaPose.steer;
      s.inp.theta = th; s.inp.steer = steer; s.inp.reel = this.reelHeld ? 1 : 0;
      // 視点を魚の方へゆっくり向ける
      const fw = s.fishWorld();
      if (fw && this.site) {
        const dx = fw.x - p.x, dz = fw.z - p.z;
        if (Math.hypot(dx, dz) > 1.5) {
          const want = clamp(angWrap(Math.atan2(-dx, -dz) - this.site.yaw), -0.9, 0.9) + this.site.yaw;
          p.yaw += angWrap(want - p.yaw) * Math.min(1, dt * 2.5);
        }
        p.pitch += (-0.3 - p.pitch) * Math.min(1, dt * 2);
      }
    } else { inp.fightMode = false; this.raised = false; this.ui.setRaiseHold(false); }
    inp.flickOn = (s.phase === 'ready' || s.phase === 'aim') && !this.d.hud.panelOpen;
    s.update(dt);
    if (this.reelHeld && (s.phase === 'fight' || ((s.phase === 'wait' || s.phase === 'bite') && s.floatInWater))) this.sfx.reel(1);
    for (const e of s.popEvents()) { this.view.onEvent(s, e); this.handle(e); }
    if (s.floatInWater && s.phase !== 'flight') { this.knownSeabed = s.seabed; this.seabedKnown = true; }
    if (s.phase !== this.lastPhase) {
      if (this.lastPhase === 'fight') { this.setReel(false); this.raised = false; }
      if (s.phase === 'fight') { this.theta = 50; this.setReel(false); }
      this.lastPhase = s.phase;
    }
    this.hap.decay(dt);
    this.saveT += dt; if (this.saveT > 30) { this.saveT = 0; if (s.phase !== 'fight') this.d.saveNow(); }
  }

  /** QA用：true の間はリアルタイムの進行を止める（advance だけが進める） */
  qaFreeze = false;
  update(dt: number, t: number, dayLight: number) {
    if (!this.qaFreeze) this.step(dt);
    const s = this.session;
    this.view.update(s, t, dt, dayLight, this.active);
    if (!this.active) return;
    this.ui.update(s, this.fightView(), { baitPct: s.baitLife * 100, castDist: s.castDist });
    this.setShake(this.hap.shake);
  }
  private setShake(v: number) {
    if (v < 0.02) { if (this.stage.style.transform) this.stage.style.transform = ''; return; }
    this.stage.style.transform = `translate(${((Math.random() - 0.5) * 12 * v).toFixed(1)}px,${((Math.random() - 0.5) * 12 * v).toFixed(1)}px)`;
  }
  fightView(): FightView | null {
    const f = this.session.fight; if (!f || this.session.phase !== 'fight') return null;
    return { known: f.dist < 3.5, name: f.sp.nameJa, sizeCm: f.sizeCm, dist: f.dist, bearing: f.bearing, mode: f.mode, tension: f.tension, slipping: f.slipping, drag: this.session.inp.drag, theta: this.session.inp.theta, raised: this.raised };
  }

  /* ---------- イベント → 音・振動・UI・セーブ ---------- */
  private handle(e: SessionEvent) {
    const s = this.session, d = this.d.data, hud = this.d.hud, sfx = this.sfx, hap = this.hap;
    this.log.push(e.kind + (e.kind === 'hookset' ? ':' + e.result : e.kind === 'fight_event' ? ':' + e.ev.kind : e.kind === 'end' ? ':' + e.result : ''));
    if (this.log.length > 80) this.log.shift();
    if (e.kind === 'bite') this.biteEvents++;
    switch (e.kind) {
      case 'cast': sfx.whoosh(); hap.fire('cast'); d.stats.casts++; this.persistRig(); break;
      case 'splash': sfx.splash(); hap.fire('splash'); break;
      case 'nibble': sfx.tick(); hap.fire('pre'); break;
      case 'pre': sfx.tick(); hap.fire('pre'); break;
      case 'bite': sfx.bite(); hap.fire('bite'); d.stats.bites++; break;
      case 'hookset':
        if (e.result === 'hooked') { sfx.hookset(); hap.fire('hookset'); } else { sfx.miss(); }
        break;
      case 'fish_hit': break;
      case 'fight_event': {
        const k = e.ev.kind;
        if (k === 'run' || k === 'side_run' || k === 'dive' || k === 'last_run' || k === 'headshake') hap.fire('run');
        else if (k === 'soft_warn' || k === 'tear_warn') { sfx.warn(); hap.fire('warn'); }
        else if (k === 'snap') { sfx.snap(); hap.fire('snap'); }
        else if (k === 'drag_slip') sfx.slip();
        if (e.ev.msg && (k === 'wedged' || k === 'slack' || k === 'freed')) hud.toast(e.ev.msg, 1800);
        break;
      }
      case 'end': this.onEnd(e); break;
      case 'bait_gone': hud.toast('エサを取られた！ 自動で付け直しました', 2200); break;
      case 'snag': hud.toast(e.state === 'hooked' ? '根掛かり！ 「巻く」で外れることがある' : e.state === 'freed' ? '根掛かりが外れた' : '仕掛けをロスト…', 2200); break;
      case 'toast': hud.toast(e.msg, 2200); break;
      case 'hint': hud.toast('💡 ' + e.msg, 6000); break;
      case 'reel_in_done': hud.toast('仕掛けを回収しました', 1400); this.setReel(false); break;
      case 'spook': break;
    }
    void s;
  }
  private onEnd(e: Extract<SessionEvent, { kind: 'end' }>) {
    const d = this.d.data, sp = SPECIES_BY_ID[e.species];
    this.setReel(false); this.raised = false;
    this.resultCatch = false; this.lastEntry = null;
    if (e.result === 'LANDED' && e.catchRec) {
      const r = e.catchRec;
      const spotId = this.site?.spot?.def?.id ?? 'free';
      const rc = recordCatch(d, { speciesId: r.speciesId, sizeCm: r.sizeCm, weightKg: r.weightKg, quality: r.quality, hour: r.hour, at: r.at }, spotId);
      this.lastEntry = rc.entry; this.resultCatch = true;
      this.sfx.landed(rc.first); this.hap.fire('landed');
      this.view.showCatch(r.speciesId, r.sizeCm);
      const zk = d.zukan[r.speciesId];
      this.ui.showResult(`<h2>釣れた！${rc.first ? '<span class="badge">図鑑に新登録</span>' : ''}</h2>
        <div class="big">${sp.nameJa}</div>
        <p><b>${r.sizeCm} cm</b> ／ 約${r.weightKg >= 1 ? r.weightKg.toFixed(2) + ' kg' : Math.round(r.weightKg * 1000) + ' g'}${rc.newMax && !rc.first ? ' <span style="color:#ffd37a">自己ベスト！</span>' : ''}</p>
        <p style="opacity:.8;font-size:12px">この魚の記録: ${zk.count}匹目・最大 ${zk.maxSizeCm}cm ／ ファイト ${Math.round(r.fightS)}秒</p>
        <div class="btns"><button id="rcRelease" data-ui>リリース</button><button id="rcKeep" data-ui class="pri">キープ</button></div>`);
      $('rcKeep').addEventListener('click', () => this.closeResult(false));
      $('rcRelease').addEventListener('click', () => this.closeResult(true));
    } else {
      if (e.result === 'LINE_BREAK') d.stats.lineBreaks++; else d.stats.hookOuts++;
      this.sfx.lost(); this.hap.fire(e.result === 'LINE_BREAK' ? 'snap' : 'lost');
      const title = e.result === 'LINE_BREAK' ? 'ラインブレイク！' : e.result === 'HOOK_OUT' ? 'バラした…' : '逃げられた…';
      this.ui.showResult(`<h2>${title}</h2><p>${e.reason}</p><p style="opacity:.8;font-size:12px">相手は ${sp?.nameJa ?? '魚'} でした。ドラグ・竿の角度・巻くタイミングを見直そう。</p>
        <div class="btns"><button id="rcOk" data-ui class="pri">OK</button></div>`);
      $('rcOk').addEventListener('click', () => this.closeResult(false));
    }
    this.d.saveNow();
  }
  closeResult(release: boolean) {
    if (release && this.lastEntry) { releaseCatch(this.d.data, this.lastEntry.id); this.sfx.splash(0.6); }
    this.view.hideCatch(); this.ui.hideResult();
    this.session.dismissResult(); this.lastEntry = null; this.resultCatch = false;
    this.d.saveNow();
  }
  get resultShown() { return this.ui.e.result.classList.contains('open'); }

  /* ---------- QA ---------- */
  /** 描画なしでセッションを進める（決定論的な高速試験用） */
  advance(sec: number) { const n = Math.round(sec * 30); for (let i = 0; i < n; i++) this.step(1 / 30); }
}
const angWrap = (a: number) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
