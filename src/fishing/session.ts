/**
 * ウキ釣りセッション: 仕掛け → キャスト → ウキ物理 → アタリ → 合わせ → ファイト → 取り込み。
 * three.js 非依存（node でヘッドレス検証可能）。表示は view.ts、UI は ui/fishui.ts。
 */
import { SIM } from '../data/tuning';
import { SPECIES_BY_ID, BAIT_CATALOG, type Species, type BiteType } from '../data/species';
import { FishSim, type Agent, type BaitState, type WorldQuery } from './fishsim';
import { Fight, hookSizeFactor, type FightEvent, type FightResult } from './fight';
import { makeEnv, activity, todOf, TOD_JA, type Env } from './env';
import { Rng, clamp, clamp01, lerp } from './rng';
import { BAITS, FLOATS, HOOKS, IDEAL_HOOK, T0, DEFAULT_RIG, DEPTH_MAX, DEPTH_MIN, dragRecommended, type Rig, type FloatDef, type BaitDef } from './rigdata';

export type Phase = 'ready' | 'aim' | 'flight' | 'wait' | 'bite' | 'fight' | 'result';
export interface CatchRecord {
  speciesId: string; sizeCm: number; weightKg: number; quality: number; hour: number; at: number;
  rig: Rig; fightS: number; hookQ: number; first: boolean; env: { tempC: number; tod: string };
}
export type SessionEvent =
  | { kind: 'cast'; power: number; dist: number }
  | { kind: 'splash'; x: number; z: number }
  | { kind: 'nibble'; strength: number }
  | { kind: 'pre'; strength: number }
  | { kind: 'bite'; strength: number; type: BiteType }
  | { kind: 'hookset'; result: 'empty' | 'early' | 'late' | 'miss' | 'hooked'; q: number }
  | { kind: 'fish_hit'; species: string }
  | { kind: 'fight_event'; ev: FightEvent }
  | { kind: 'end'; result: FightResult; reason: string; catchRec?: CatchRecord; species: string }
  | { kind: 'bait_gone' }
  | { kind: 'snag'; state: 'hooked' | 'freed' | 'lost' }
  | { kind: 'toast'; msg: string; level?: 'info' | 'warn' }
  | { kind: 'hint'; msg: string }
  | { kind: 'reel_in_done' }
  | { kind: 'quick_retrieve' }
  | { kind: 'spook' };

interface Beat { t: number; amp: number; dur: number; kind: 'pre' | 'main' }
interface BiteScript { agent: Agent; t0: number; beats: Beat[]; mainAt: number; W: number; strength: number; type: BiteType; slide: number; ateAt: number; spitAt: number; done: boolean; preFired: boolean; mainFired: boolean }

/** シェーダと同じ式の波高（JS側ミラー）。ウキの上下動に使う */
export function waveH(x: number, z: number, t: number): number {
  return (Math.sin(x * 0.35 + t * 1.1) * 0.5 + Math.sin(z * 0.5 - t * 0.9 + x * 0.2) * 0.35 + Math.sin((x + z) * 0.9 + t * 1.7) * 0.15) * 0.18;
}

export interface SessionOpts { seed?: number; hour?: number; month?: number; fast?: number }

export class FishingSession {
  rng: Rng; sim: FishSim; env: Env;
  rig: Rig = { ...DEFAULT_RIG };
  phase: Phase = 'ready';
  events: SessionEvent[] = [];
  // プレイヤー/向き
  px = 0; pz = 0; yaw = 0;
  // キャスト
  aimPower = 0; private aimDir = 1; aiming = false;
  castFrom = { x: 0, z: 0, y: 0 }; castTo = { x: 0, z: 0 }; castDist = 0; castT = 0; castDur = 1; castPower = 0;
  // ウキ
  fx = 0; fz = 0; fvx = 0; fvz = 0; floatInWater = false; settle = 0; baitDepthNow = 0; seabed = 0; zone = 0;
  floatDip = 0; floatSlide = 0; floatTilt = 0;
  retrieving = false; reelHeld = false; distToPlayer = 0;
  /** 回収ボタン（約1秒の高速巻き上げ）。null=通常 */
  quick: { t: number; dur: number; sx: number; sz: number; tx: number; tz: number; lost: boolean } | null = null; lastPower = 0;
  bait: BaitState | null = null; baitLife = 1;
  // アタリ
  script: BiteScript | null = null; t = 0; waitT = 0; sinceBite = 0; sinceAction = 0;
  nibbles = 0; baitStolen = 0; casts = 0;
  // ファイト
  fight: Fight | null = null; fishAgent: Agent | null = null;
  inp = { reel: 0, theta: 50, drag: 0.75, steer: 0 };
  hookQ = 0; hookedSp: Species | null = null;
  private ctxT = 0; ctxCache = { nearStruct: false, rough: 0.2 };
  lastResult: { result: FightResult; reason: string; rec?: CatchRecord; species: string } | null = null;
  // 状態
  noise = 0; snag = false; snagHold = 0; hintT = 0; lastHint = '';
  stats = { bites: 0, hooked: 0, landed: 0, lost: 0, breaks: 0, hookouts: 0, early: 0, empty: 0, late: 0 };
  statsFight = { time: 0 };
  recent: string[] = [];

  constructor(public world: WorldQuery, opts: SessionOpts = {}) {
    this.rng = new Rng(opts.seed ?? (Math.random() * 4294967296) >>> 0);
    this.env = makeEnv(opts.hour ?? new Date().getHours() + new Date().getMinutes() / 60, opts.month);
    this.sim = new FishSim(world, this.rng);
    this.boost = opts.fast ?? 1;
    this.rig.depthM = DEFAULT_RIG.depthM;
  }
  boost = 1;
  emit(e: SessionEvent) { this.events.push(e); }
  popEvents() { const e = this.events; this.events = []; return e; }
  get floatDef(): FloatDef { return FLOATS.find((f) => f.id === this.rig.floatId) ?? FLOATS[0]; }
  get baitDef(): BaitDef { return BAITS.find((b) => b.id === this.rig.baitId) ?? BAITS[0]; }
  get hookSize(): number { return (HOOKS.find((h) => h.id === this.rig.hookId) ?? HOOKS[0]).size; }
  setEnv(hour: number, month?: number) { this.env = makeEnv(hour, month ?? this.env.month); }

  /* ---------- 開始 ---------- */
  begin(px: number, pz: number, yaw: number) {
    this.px = px; this.pz = pz; this.yaw = yaw;
    this.phase = 'ready'; this.fight = null; this.script = null; this.bait = null; this.floatInWater = false; this.quick = null;
    const dx = -Math.sin(yaw), dz = -Math.cos(yaw);
    this.sim.agents.length = 0;
    this.sim.populate(px + dx * 12, pz + dz * 12, true);
    this.casts = 0;
  }
  end() { this.quick = null; this.phase = 'ready'; this.fight = null; this.script = null; this.bait = null; this.floatInWater = false; this.aiming = false; this.sim.agents.length = 0; }

  /* ---------- 仕掛け ---------- */
  setRig(p: Partial<Rig>) {
    Object.assign(this.rig, p);
    this.rig.depthM = clamp(Math.round(this.rig.depthM * 2) / 2, DEPTH_MIN, DEPTH_MAX);
    if (this.bait) this.bait.hookSize = this.hookSize;
  }
  adjustDepth(delta: number) {
    this.setRig({ depthM: this.rig.depthM + delta });
    // 着水中に変えると、仕掛けを沈め直す（ゆっくり）
    this.emit({ kind: 'toast', msg: `ウキ下 ${this.rig.depthM.toFixed(1)}m` });
  }

  /* ---------- キャスト ---------- */
  startAim() { if (this.phase !== 'ready') return false; this.aiming = true; this.aimPower = 0; this.aimDir = 1; this.phase = 'aim'; return true; }
  cancelAim() { if (this.phase === 'aim') { this.aiming = false; this.phase = 'ready'; } }
  /** 狙い先（現在の向きと power）をレイで求める。null なら投げられない */
  landing(yaw: number, power: number): { x: number; z: number; dist: number } | null {
    const maxD = this.floatDef.castMaxM;
    const want = lerp(3.5, maxD, clamp01(power));
    const dx = -Math.sin(yaw), dz = -Math.cos(yaw);
    let last = -1;
    for (let d = 1.0; d <= want + 1e-6; d += 0.5) {
      const x = this.px + dx * d, z = this.pz + dz * d;
      if (!this.world.isWater(x, z) || this.world.depthAt(x, z) < 0.8 || (this.world.tetraAt(x, z) && !this.world.holeAt(x, z))) { if (last > 0) break; else continue; }
      last = d;
    }
    if (last < 2.0) return null;
    const d = last;
    return { x: this.px + dx * d, z: this.pz + dz * d, dist: d };
  }
  cast(power: number, yaw: number): boolean {
    if (this.phase !== 'ready' && this.phase !== 'aim') return false;
    const p = clamp01(power);
    const L = this.landing(yaw, p);
    if (!L) { this.emit({ kind: 'toast', msg: 'そこは岸が近すぎて投げられない。もう少し沖へ向けよう', level: 'warn' }); this.aiming = false; this.phase = 'ready'; return false; }
    this.yaw = yaw;
    const scat = (1 - 0.8) * 0.5;
    const to = { x: L.x + this.rng.u(-scat, scat), z: L.z + this.rng.u(-scat, scat) };
    if (!this.world.isWater(to.x, to.z)) { to.x = L.x; to.z = L.z; }
    this.castFrom = { x: this.px, z: this.pz, y: 1.9 }; this.castTo = to; this.castDist = L.dist; this.castPower = p;
    this.castT = 0; this.castDur = 0.55 + 0.022 * L.dist;
    this.phase = 'flight'; this.aiming = false; this.floatInWater = false; this.bait = null; this.script = null; this.snag = false;
    this.fx = this.px; this.fz = this.pz; this.retrieving = false;
    this.baitLife = this.baitLife > 0.2 ? this.baitLife : 1; // デモ: エサは無限（付け直しは自動）
    this.casts++; this.lastPower = p; this.quick = null;
    this.sinceBite = 0; this.sinceAction = 0;
    this.emit({ kind: 'cast', power: p, dist: L.dist });
    return true;
  }
  /** 回収（巻き上げ）開始/終了 */
  setRetrieve(on: boolean) { if (this.phase === 'wait' || this.phase === 'bite') this.reelHeld = on; else if (this.phase !== 'fight') this.reelHeld = false; }

  /** 回収ボタン：魚が掛かっていない着水中なら、約1秒で仕掛けを巻き戻す（ウキ・ラインが水面を滑って戻る）。 */
  quickRetrieve(): boolean {
    if (this.quick || !this.floatInWater || (this.phase !== 'wait' && this.phase !== 'bite')) return false;
    if (this.script) { this.sim.finishBite(this.script.agent, 'miss', this.bait); this.script = null; }
    this.phase = 'wait'; this.reelHeld = false; this.retrieving = true;
    const dx = this.px - this.fx, dz = this.pz - this.fz, d = Math.max(0.01, Math.hypot(dx, dz));
    const lost = this.snag && this.rng.chance(0.35); this.snag = false; this.snagHold = 0;
    this.quick = { t: 0, dur: clamp(0.7 + d * 0.012, 0.8, 1.1), sx: this.fx, sz: this.fz, tx: this.px + (this.fx - this.px) / d * 1.4, tz: this.pz + (this.fz - this.pz) / d * 1.4, lost };
    this.noise = Math.max(this.noise, 0.25); this.floatDip = 0;
    this.emit({ kind: 'quick_retrieve' });
    return true;
  }
  private updateQuick(dt: number) {
    const q = this.quick!; q.t += dt;
    const u = clamp01(q.t / q.dur), e = u * u * (3 - 2 * u) * 0.35 + u * 0.65; // ほぼ等速＋少し加速
    this.fx = lerp(q.sx, q.tx, e); this.fz = lerp(q.sz, q.tz, e);
    this.baitDepthNow *= Math.max(0, 1 - dt * 6);
    if (this.bait) { this.bait.x = this.fx; this.bait.z = this.fz; this.bait.depth = this.baitDepthNow; this.bait.action = 'retrieve'; }
    this.distToPlayer = Math.hypot(this.fx - this.px, this.fz - this.pz);
    if (u >= 1) { const lost = q.lost; this.quick = null; this.finishRetrieve(lost); }
  }
  /** おまかせ釣り用：水深・底質・ウキ下から「無難な投げ先」を選ぶ（向き yaw と強さ power） */
  autoCastPlan(): { yaw: number; power: number; depth: number } | null {
    const base = this.yaw; let best: { yaw: number; power: number; score: number; depth: number } | null = null;
    for (const off of [0, 0.2, -0.2, 0.4, -0.4, 0.6, -0.6]) for (const pw of [0.55, 0.7, 0.4, 0.85, 0.3]) {
      const y = base + off; const L = this.landing(y, pw); if (!L) continue;
      const depth = this.world.depthAt(L.x, L.z), zone = this.world.zoneAt(L.x, L.z);
      if (this.world.tetraAt(L.x, L.z)) continue;
      let sc = -Math.abs(depth - (this.rig.depthM + 1.2)) * 0.8 + (zone === 1 || zone === 3 ? 0.8 : 0) - Math.abs(off) * 0.5 - Math.abs(pw - 0.6) * 0.3 + this.rng.u(0, 0.4);
      if (depth < 1.8) sc -= 3;
      if (!best || sc > best.score) best = { yaw: y, power: pw, score: sc, depth };
    }
    return best ? { yaw: best.yaw, power: best.power, depth: best.depth } : null;
  }

  /* ---------- 合わせ ---------- */
  hookset(): void {
    if (this.phase === 'ready' || this.phase === 'aim' || this.phase === 'flight' || this.phase === 'fight' || this.phase === 'result') return;
    if (this.quick) return;
    const sc = this.script;
    this.noise = Math.max(this.noise, 0.15);
    if (!sc || sc.done || !this.bait) {
      this.stats.empty++;
      this.emit({ kind: 'hookset', result: 'empty', q: 0 });
      this.emit({ kind: 'toast', msg: '空振り（アタリが出てから合わせよう）' });
      this.floatDip = -0.2; // 上に跳ねる
      return;
    }
    const tt = this.t - sc.t0;
    const u = (tt - sc.mainAt) / sc.W;
    let q: number; let tag: 'early' | 'late' | 'ok' = 'ok';
    const fishW = sc.agent.sp.wariness;
    if (u < 0) {
      const lead = sc.mainAt - tt;
      if (lead < 0.12) q = 0.5; else { q = sc.type === 'peck_then_swallow' ? 0 : 0.12 * Math.exp(-lead * 1.5); tag = 'early'; }
      if (lead >= 0.12) tag = 'early';
    } else if (u <= 0.1) q = lerp(0.75, 1, u / 0.1);
    else if (u <= 0.8) q = 1;
    else if (u <= 1.0) q = lerp(1, 0.55, (u - 0.8) / 0.2);
    else if (u <= 1.5) { q = lerp(0.55, 0.3, (u - 1) / 0.5); tag = 'late'; }
    else q = 0.15;
    if (sc.type === 'peck_then_swallow' && u >= 0 && u < 0.35) q *= 0.4;
    if (sc.type === 'mouth_and_spit' && u > 0.55) { q *= 0.35; tag = 'late'; }
    const sp = sc.agent.sp;
    const hsF = hookSizeFactor(this.hookSize, IDEAL_HOOK[sp.id] ?? 7);
    let fit = 1 / Math.pow(hsF, 1.0);
    if (this.hookSize > (IDEAL_HOOK[sp.id] ?? 7) * 1.8 && sc.agent.sizeCm < 25) fit *= 0.6;
    const pHook = clamp01(SIM.HOOK_BASE_FLOAT * (q > 0 ? 0.25 + 0.75 * q : 0) * fit * (1 - 0.1 * fishW));
    sc.done = true;
    if (this.rng.chance(pHook)) {
      this.hookQ = q;
      const hookSet = clamp(0.3 + 0.7 * q + 0.1, 0.3, 1); // float: hookSet += 0.1
      this.emit({ kind: 'hookset', result: 'hooked', q });
      this.beginFight(sc.agent, hookSet, hsF);
    } else {
      const res: 'early' | 'late' | 'miss' = tag === 'early' ? 'early' : tag === 'late' ? 'late' : 'miss';
      if (res === 'early') this.stats.early++; else if (res === 'late') this.stats.late++;
      this.emit({ kind: 'hookset', result: res, q });
      this.emit({ kind: 'toast', msg: res === 'early' ? '早合わせ！魚に違和感を与えた' : res === 'late' ? '遅合わせ…エサだけ取られた' : 'ハリ掛かりしなかった', level: 'warn' });
      if (res === 'late' && this.bait) { this.bait.life = Math.max(0, this.bait.life - 0.6); this.checkBait(); }
      this.sim.finishBite(sc.agent, 'miss', this.bait);
      this.script = null; this.phase = 'wait'; this.floatDip = -0.15;
    }
  }

  /* ---------- ファイト ---------- */
  private beginFight(a: Agent, hookSet: number, hsF: number) {
    this.sim.finishBite(a, 'hooked', this.bait);
    this.fishAgent = a; this.hookedSp = a.sp;
    const dist = Math.hypot(this.fx - this.px, this.fz - this.pz);
    const bearing = clamp(this.relBearing(this.fx, this.fz), -1.2, 1.2);
    this.fight = new Fight({ sp: a.sp, sizeCm: a.sizeCm, W: a.W, hookSet, hookSizeF: hsF, barbless: false, tackle: T0, startDist: dist, startBearing: bearing }, this.rng);
    this.phase = 'fight'; this.script = null; this.stats.hooked++; this.statsFight.time = 0;
    this.inp.reel = 0; this.inp.theta = 50; this.inp.steer = 0;
    this.reelHeld = false; this.retrieving = false;
    this.emit({ kind: 'fish_hit', species: a.sp.id });
  }
  relBearing(x: number, z: number): number {
    const ang = Math.atan2(-(x - this.px), -(z - this.pz)); // yaw 規約: -z が 0
    let d = ang - this.yaw; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    return -d; // 右が +
  }
  fishWorld(): { x: number; z: number } | null {
    const f = this.fight; if (!f) return null;
    const fwdX = -Math.sin(this.yaw), fwdZ = -Math.cos(this.yaw);
    const rX = Math.cos(this.yaw), rZ = -Math.sin(this.yaw);
    return { x: this.px + f.dist * (Math.cos(f.bearing) * fwdX + Math.sin(f.bearing) * rX), z: this.pz + f.dist * (Math.cos(f.bearing) * fwdZ + Math.sin(f.bearing) * rZ) };
  }
  private updateFightCtx() {
    const p = this.fishWorld(); if (!p) return;
    let near = false, rough = 0.1;
    const w = this.world;
    const zr = [0.05, 1.0, 0.2, 0.8, 0.1, 0.4];
    for (const r of [0, 1.5, 3]) for (let k = 0; k < (r === 0 ? 1 : 8); k++) {
      const a = k * Math.PI / 4, x = p.x + Math.cos(a) * r, z = p.z + Math.sin(a) * r;
      if (!w.isWater(x, z)) { near = true; rough = Math.max(rough, 0.8); continue; }
      const zn = w.zoneAt(x, z);
      if (zn === 1 || zn === 3 || w.tetraAt(x, z) || w.holeAt(x, z)) { near = true; rough = Math.max(rough, w.tetraAt(x, z) || w.holeAt(x, z) ? 1.0 : zr[zn]); }
      else rough = Math.max(rough, zr[zn] * 0.5);
    }
    this.ctxCache = { nearStruct: near, rough };
  }
  private finishFight() {
    const f = this.fight!; const sp = f.sp;
    let rec: CatchRecord | undefined;
    if (f.result === 'LANDED') {
      this.stats.landed++;
      const ratio = Math.log(f.sizeCm / sp.size.typCm) / Math.log(sp.size.maxCm / sp.size.typCm);
      const quality = clamp01(0.5 + 0.35 * clamp(ratio, -1, 1) + 0.1 * (this.hookQ - 0.7));
      rec = { speciesId: sp.id, sizeCm: Math.round(f.sizeCm * 10) / 10, weightKg: Math.round(f.W * 1000) / 1000, quality: Math.round(quality * 100) / 100, hour: this.env.hour, at: Date.now(), rig: { ...this.rig }, fightS: Math.round(f.t * 10) / 10, hookQ: this.hookQ, first: false, env: { tempC: this.env.tempC, tod: todOf(this.env.hour) } };
    } else if (f.result === 'LINE_BREAK' || f.result === 'STUCK_LOST') { this.stats.breaks++; this.stats.lost++; }
    else if (f.result === 'HOOK_OUT') { this.stats.hookouts++; this.stats.lost++; }
    this.lastResult = { result: f.result, reason: f.reason, rec, species: sp.id };
    this.emit({ kind: 'end', result: f.result, reason: f.reason, catchRec: rec, species: sp.id });
    this.phase = 'result'; this.floatInWater = false; this.bait = null;
  }
  /** 結果カードを閉じて次の釣りへ */
  dismissResult() {
    if (this.phase !== 'result') return;
    this.fight = null; this.fishAgent = null; this.phase = 'ready'; this.lastResult = null;
    this.baitLife = 1;
  }

  /* ---------- 更新 ---------- */
  update(dtReal: number) {
    const dt = Math.min(dtReal, 0.1);
    this.t += dt; this.noise = Math.max(0, this.noise - dt / 3);
    this.sinceAction += dt;
    if (this.aiming) {
      this.aimPower += this.aimDir * dt / 0.9;
      if (this.aimPower >= 1) { this.aimPower = 1; this.aimDir = -1; } else if (this.aimPower <= 0) { this.aimPower = 0; this.aimDir = 1; }
    }
    switch (this.phase) {
      case 'flight': this.updateFlight(dt); break;
      case 'wait': case 'bite': this.updateWater(dt); break;
      case 'fight': this.updateFight(dt); break;
      default: break;
    }
    this.floatDip *= Math.exp(-dt * 3);
    this.floatSlide *= Math.exp(-dt * 2.5);
  }

  private updateFlight(dt: number) {
    this.castT += dt;
    const u = clamp01(this.castT / this.castDur);
    this.fx = lerp(this.castFrom.x, this.castTo.x, u); this.fz = lerp(this.castFrom.z, this.castTo.z, u);
    if (u >= 1) this.land();
  }
  /** 放物線上の高さ（水面基準 +m） */
  flightHeight(): number {
    const u = clamp01(this.castT / this.castDur);
    return lerp(this.castFrom.y, 0.1, u) + (2.2 + this.castDist * 0.12) * 4 * u * (1 - u);
  }
  private land() {
    this.fx = this.castTo.x; this.fz = this.castTo.z;
    this.floatInWater = true; this.settle = 0; this.baitDepthNow = 0.2;
    this.seabed = this.world.depthAt(this.fx, this.fz); this.zone = this.world.zoneAt(this.fx, this.fz);
    this.phase = 'wait'; this.waitT = 0; this.noise = Math.max(this.noise, 0.3);
    const bd = this.baitDef;
    this.baitLife = 1;
    this.bait = { x: this.fx, z: this.fz, depth: 0.2, life: 1, dataId: bd.dataId, scent: bd.scent, hookSize: this.hookSize, action: 'drift', vib: 1, onBottom: false, playerX: this.px, playerZ: this.pz };
    this.floatDip = 0.12;
    this.emit({ kind: 'splash', x: this.fx, z: this.fz });
    this.sim.populate(this.fx, this.fz);
  }

  private updateWater(dt: number) {
    const e = this.env, bait = this.bait;
    this.waitT += dt; this.settle += dt; this.sinceBite += dt;
    this.distToPlayer = Math.hypot(this.fx - this.px, this.fz - this.pz);
    if (this.quick) { this.updateQuick(dt); this.hintT = 0; return; }
    // 回収
    if (this.reelHeld && this.phase === 'wait') {
      this.retrieving = true;
      const dx = this.px - this.fx, dz = this.pz - this.fz, d = Math.hypot(dx, dz);
      const v = 2.2;
      if (this.snag) { this.snagHold += dt; this.floatDip = Math.max(this.floatDip, 0.1); if (this.snagHold > 1.0) { this.snag = false; const lost = this.rng.chance(0.4); this.emit({ kind: 'snag', state: lost ? 'lost' : 'freed' }); this.snagHold = 0; if (lost) { this.finishRetrieve(true); return; } } }
      else if (d > 2.0) { this.fx += dx / d * v * dt; this.fz += dz / d * v * dt; }
      else { this.finishRetrieve(false); return; }
      if (bait) { bait.action = 'retrieve'; this.noise = Math.max(this.noise, 0.12); }
    } else {
      this.retrieving = false; this.snagHold = 0;
      if (bait) bait.action = 'drift';
      // 潮流＋風で流れる（デモ値）
      if (!this.snag) {
        const vx = e.curDirX * e.current * 0.22 + e.windDirX * e.windMs * 0.012;
        const vz = e.curDirZ * e.current * 0.22 + e.windDirZ * e.windMs * 0.012;
        this.fvx += (vx - this.fvx) * dt * 0.5; this.fvz += (vz - this.fvz) * dt * 0.5;
        const nx = this.fx + this.fvx * dt, nz = this.fz + this.fvz * dt;
        if (this.world.isWater(nx, nz) && this.world.depthAt(nx, nz) > 0.8 && (!this.world.tetraAt(nx, nz) || this.world.holeAt(nx, nz))) { this.fx = nx; this.fz = nz; }
        else { this.fvx *= 0.5; this.fvz *= 0.5; }
      }
    }
    // 底・ウキ下
    this.seabed = this.world.depthAt(this.fx, this.fz); this.zone = this.world.zoneAt(this.fx, this.fz);
    const target = Math.min(this.rig.depthM, Math.max(0.3, this.seabed - 0.12));
    const sink = this.floatDef.sinkRate;
    this.baitDepthNow += clamp(target - this.baitDepthNow, -sink * dt * 2, sink * dt);
    const onBottom = this.rig.depthM >= this.seabed - 0.12;
    this.floatTilt = onBottom ? 1 : 0; // ウキが寝る（底に付いている）
    if (bait) {
      bait.x = this.fx; bait.z = this.fz; bait.depth = this.retrieving ? Math.min(this.baitDepthNow, 1.2) : this.baitDepthNow;
      bait.vib = Math.max(0, bait.vib - dt / 1.6);
      bait.onBottom = onBottom; bait.playerX = this.px; bait.playerZ = this.pz;
      bait.hookSize = this.hookSize;
      bait.life = this.baitLife;
      // 根掛かり（底が根で、ウキ下が底より深い）
      if (onBottom && (this.zone === 1 || this.world.holeAt(this.fx, this.fz) || this.world.tetraAt(this.fx, this.fz)) && !this.snag && !this.retrieving && this.phase === 'wait' && this.rng.chance(0.03 * dt)) {
        this.snag = true; this.snagHold = 0; this.emit({ kind: 'snag', state: 'hooked' });
        this.emit({ kind: 'toast', msg: '根掛かり！ 巻いて外そう（ウキ下を浅くすると防げる）', level: 'warn' });
      }
    }
    // 魚シム
    this.sim.boost = this.boost;
    this.sim.update(dt, this.phase === 'wait' || this.phase === 'bite' ? bait : null, e, this.noise + (this.retrieving ? 0.1 : 0));
    for (const ev of this.sim.popEvents()) this.onSimEvent(ev);
    this.updateScript(dt);
    // ヒント
    this.hintT += dt;
    if (this.phase === 'wait' && this.hintT > 8) { this.hintT = 0; this.maybeHint(); }
  }

  private finishRetrieve(lost: boolean) {
    this.floatInWater = false; this.bait = null; this.retrieving = false; this.reelHeld = false; this.phase = 'ready'; this.snag = false; this.quick = null;
    this.emit({ kind: 'reel_in_done' });
    if (lost) this.emit({ kind: 'toast', msg: '仕掛けを失った… 新しい仕掛けをセットしたよ', level: 'warn' });
    this.baitLife = 1;
  }

  private onSimEvent(ev: ReturnType<FishSim['popEvents']>[number]) {
    if (ev.kind === 'nibble') {
      const b = this.bait; if (!b) return;
      const loss = this.baitDef.esatoriLoss * this.rng.u(0.6, 1.2);
      this.baitLife = Math.max(0, this.baitLife - loss); b.life = this.baitLife;
      this.nibbles++;
      this.floatDip = Math.max(this.floatDip, 0.1); // 小さなチョンチョン
      this.emit({ kind: 'nibble', strength: 0.25 });
      this.checkBait();
    } else if (ev.kind === 'bite') {
      if (this.script || this.phase !== 'wait') { this.sim.finishBite(ev.agent, 'miss', this.bait); return; }
      this.startScript(ev.agent);
    } else if (ev.kind === 'state' && ev.to === 'flee' && ev.why === 'spook') {
      this.emit({ kind: 'spook' });
    }
  }
  private checkBait() {
    if (this.baitLife <= 0.05 && this.phase === 'wait') { this.emit({ kind: 'bait_gone' }); this.emit({ kind: 'toast', msg: 'エサを取られた！一度巻いて付け直そう', level: 'warn' }); }
  }

  /* ---------- アタリの演出スクリプト ---------- */
  private startScript(a: Agent) {
    const sp = a.sp, r = this.rng;
    const type = sp.biteType as BiteType;
    const sizeF = Math.pow(a.W / sp.size.wTyp, 0.25);
    const strength = clamp((0.45 + 0.4 * r.next()) * sizeF, 0.25, 1);
    const beats: Beat[] = [];
    let lead = 0.5;
    const W = clamp((0.8 - 0.4 * sp.wariness) * SIM.BEGINNER_WINDOW * (type === 'mouth_and_spit' ? 0.6 : type === 'chase' ? 0.8 : 1), 0.45, 2.2);
    const pre = (t: number, amp: number) => beats.push({ t, amp, dur: 0.22, kind: 'pre' });
    switch (type) {
      case 'peck': pre(0, 0.3 * strength); pre(0.32, 0.35 * strength); if (r.chance(0.6)) pre(0.62, 0.3 * strength); lead = beats[beats.length - 1].t + 0.4; break;
      case 'chase': if (r.chance(0.3)) { pre(0, 0.25 * strength); lead = 0.35; } else lead = 0.02; break;
      case 'peck_then_swallow': pre(0, 0.3); pre(0.4, 0.3); pre(0.9, 0.35); lead = 1.5; break;
      case 'mouth_and_hold': pre(0, 0.2 * strength); pre(0.6, 0.25 * strength); lead = 1.0; break;
      case 'mouth_and_spit': pre(0, 0.25 * strength); lead = 0.55; break;
      case 'gulp': pre(0, 0.2 * strength); lead = 0.5; break;
      default: pre(0, 0.25 * strength); lead = 0.5; // suck
    }
    const sc: BiteScript = { agent: a, t0: this.t, beats, mainAt: lead, W, strength, type, slide: r.chance(0.5) ? 1 : -1, ateAt: lead + W * 1.5, spitAt: type === 'mouth_and_spit' ? lead + W * 0.55 : 1e9, done: false, preFired: false, mainFired: false };
    beats.push({ t: lead, amp: type === 'gulp' ? 1.0 * strength : type === 'chase' ? 0.9 * strength : 0.85 * strength, dur: W + 0.5, kind: 'main' });
    this.script = sc; this.phase = 'bite'; this.stats.bites++;
    this.sinceBite = 0; this.hintT = 0;
  }
  private updateScript(dt: number) {
    const sc = this.script; if (!sc) return;
    const tt = this.t - sc.t0;
    if (!sc.preFired && sc.beats.length > 1 && tt >= sc.beats[0].t) { sc.preFired = true; this.emit({ kind: 'pre', strength: sc.beats[0].amp }); }
    for (const b of sc.beats) {
      if (b.kind === 'pre' && !(b as Beat & { fired?: boolean }).fired && tt >= b.t) { (b as Beat & { fired?: boolean }).fired = true; this.floatDip = Math.max(this.floatDip, 0.08 + b.amp * 0.5); }
    }
    if (!sc.mainFired && tt >= sc.mainAt) { sc.mainFired = true; this.emit({ kind: 'bite', strength: sc.strength, type: sc.type }); this.floatSlide = sc.type === 'chase' ? sc.slide * 0.9 : sc.slide * 0.2; }
    // 本アタリ中の浮き沈み
    if (sc.mainFired && !sc.done) {
      const m = sc.beats[sc.beats.length - 1];
      const k = clamp01((tt - sc.mainAt) / 0.18);
      const spat = tt >= sc.spitAt;
      const target = (spat ? -0.3 : 1) * m.amp * k;
      this.floatDip += (target - this.floatDip) * clamp01(dt * 12);
    }
    if (tt >= sc.ateAt && !sc.done) this.biteEnd(sc);
    else if (sc.mainFired && sc.type === 'mouth_and_spit' && tt > sc.spitAt + 0.3 && !sc.done) this.biteEnd(sc);
  }
  private biteEnd(sc: BiteScript) {
    sc.done = true;
    // 合わせなかった：エサだけ食われる（または吐き出される）
    if (this.bait) { this.baitLife = Math.max(0, this.baitLife - (sc.type === 'mouth_and_spit' ? 0.15 : 0.7)); this.bait.life = this.baitLife; this.checkBait(); }
    this.emit({ kind: 'toast', msg: sc.type === 'mouth_and_spit' ? '吐き出された…（合わせが遅い）' : 'エサを食い逃げされた（合わせが遅れた）', level: 'warn' });
    this.stats.late++;
    this.sim.finishBite(sc.agent, 'ate', this.bait);
    this.script = null; this.phase = 'wait';
  }
  get biteActive() { return !!this.script && !this.script.done && this.script.mainFired; }
  get preActive() { return !!this.script && !this.script.done && !this.script.mainFired; }

  private updateFight(dt: number) {
    const f = this.fight!; if (!f) return;
    this.statsFight.time += dt;
    this.noise = Math.max(this.noise, 0.1);
    f.advance(dt, this.inp, () => { this.ctxT++; if (this.ctxT % 8 === 1) this.updateFightCtx(); return this.ctxCache; });
    for (const ev of f.popEvents()) {
      this.emit({ kind: 'fight_event', ev });
    }
    const p = this.fishWorld(); if (p) { this.fx = p.x; this.fz = p.z; }
    if (f.result) this.finishFight();
  }

  /* ---------- ヒント ---------- */
  describeActive(): { id: string; n: number }[] {
    const m: Record<string, number> = {};
    for (const a of this.sim.agents) {
      if (a.sp.esatori) continue;
      if (Math.hypot(a.x - this.fx, a.z - this.fz) < 16 && (this.sim.agents.length ? true : false)) m[a.sp.id] = (m[a.sp.id] ?? 0) + 1;
    }
    return Object.entries(m).map(([id, n]) => ({ id, n })).sort((a, b) => b.n - a.n);
  }
  maybeHint() {
    const quiet = this.sinceBite;
    if (this.phase !== 'wait' || quiet < 40) return;
    const h = this.pickHint();
    if (h && h !== this.lastHint) { this.lastHint = h; this.hintT = -22; this.emit({ kind: 'hint', msg: h }); }
  }
  pickHint(): string | null {
    const rig = this.rig, sd = this.seabed, e = this.env, bait = this.baitDef;
    if (this.baitLife <= 0.05) return 'エサがなくなってる。巻いて付け直そう';
    if (this.nibbles >= 3 && this.baitLife < 0.5) return 'エサ取りが多い。ウキ下を深くするか、エサ持ちのいいアオイソメ・イカに替えてみよう';
    if (rig.depthM > sd - 0.1) return `ウキ下(${rig.depthM}m)が水深(約${sd.toFixed(1)}m)より深い。底を引きずっているよ。ウキ下を浅くしてみよう`;
    const act = this.describeActive();
    const tod = todOf(e.hour);
    let best: { sp: Species; A: number } | null = null;
    for (const sp of Object.values(SPECIES_BY_ID)) { if (sp.esatori || sp.depthRange.min > sd) continue; const A = activity(sp, e); if (!best || A > best.A) best = { sp, A }; }
    for (const { id } of act) {
      const sp = SPECIES_BY_ID[id];
      const mid = (sp.depthRange.preferredMin + sp.depthRange.preferredMax) / 2;
      if (sp.bottom && rig.depthM < sd - 1.2) return `${sp.nameJa}は底付近にいる。ウキ下を深くして、底ぎりぎり(約${(sd - 0.4).toFixed(1)}m)を狙おう`;
      if (Math.abs(rig.depthM - mid) > 1.6) return `${sp.nameJa}が周りにいそう。泳層はだいたい${sp.depthRange.preferredMin}〜${sp.depthRange.preferredMax}m。ウキ下を${mid.toFixed(1)}m前後にしてみよう`;
      if ((sp.baits[bait.dataId] ?? 0) < 0.45) {
        const bestB = Object.entries(sp.baits).filter(([k]) => BAITS.some((b) => b.dataId === k)).sort((a, b) => b[1] - a[1])[0];
        if (bestB) return `${sp.nameJa}には${BAIT_CATALOG[bestB[0]]?.nameJa ?? bestB[0]}がよく効く。エサを替えてみよう`;
      }
    }
    if (best && best.A < 0.25) return `今は${TOD_JA[tod]}で全体に活性が低め。朝夕のマヅメや夜に狙うと食いが立つよ`;
    if (this.sinceBite > 75) return '同じ場所は魚が散ったかも。投げる方向や距離を変えてみよう';
    return 'ウキ下やエサを変えて、投げる場所をずらしてみよう';
  }

  /* ---------- QA / デバッグ ---------- */
  /** 指定の魚をエサの目の前で食わせる（強制アタリ）。ファイト・バランス試験用 */
  forceBite(speciesId: string, sizeCm?: number): boolean {
    if (this.phase !== 'wait' || !this.bait) return false;
    const sp = SPECIES_BY_ID[speciesId]; if (!sp) return false;
    const cm = sizeCm ?? sp.size.typCm;
    const a = this.sim.spawnForced(sp, cm, this.fx, this.fz, this.bait.depth);
    this.startScript(a);
    return true;
  }
  snapshot() {
    return {
      phase: this.phase, rig: { ...this.rig }, fx: this.fx, fz: this.fz, floatInWater: this.floatInWater,
      baitLife: this.baitLife, baitDepth: this.baitDepthNow, seabed: this.seabed, bites: this.stats.bites, nibbles: this.nibbles,
      stats: { ...this.stats }, castDist: this.castDist, casts: this.casts, script: !!this.script,
      sim: { n: this.sim.agents.length, near: this.sim.stats.near, far: this.sim.stats.far, byState: this.sim.stats.byState, spooks: this.sim.stats.spooks, bites: this.sim.stats.bites, nibbles: this.sim.stats.nibbles },
      fight: this.fight ? { sp: this.fight.sp.id, dist: this.fight.dist, S: this.fight.S, T: this.fight.T, tension: this.fight.tension, mode: this.fight.mode, result: this.fight.result, D: this.fight.D, t: this.fight.t } : null,
      env: { hour: this.env.hour, tempC: this.env.tempC, current: this.env.current },
    };
  }
}
export { dragRecommended };
