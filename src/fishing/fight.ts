/**
 * 共通ファイトコア（FISH_DESIGN §4）。固定 dt=1/30。three.js 非依存（node でシミュレーション可能）。
 * 数値はゲームバランス用の初期値で、実際の釣果を保証しない。
 */
import { FIGHT, FTUNE } from '../data/tuning';
import { fSus, type Species } from '../data/species';
import { Rng, clamp, clamp01 } from './rng';
import { type Tackle, bsRated } from './rigdata';

export type FightMode = 'cruise' | 'run' | 'side_run' | 'dive' | 'headshake' | 'rest' | 'wedged';
export type FightResult = null | 'LANDED' | 'LINE_BREAK' | 'HOOK_OUT' | 'STUCK_LOST';
export type FightEventKind = 'run' | 'side_run' | 'dive' | 'wedged' | 'freed' | 'headshake' | 'slack' | 'snap' | 'drag_slip' | 'last_run' | 'rest' | 'cruise' | 'soft_warn' | 'tear_warn';
export interface FightEvent { kind: FightEventKind; t: number; msg?: string }

export interface FightParams {
  sp: Species; sizeCm: number; W: number;
  hookSet: number;          // 0.3..1
  hookSizeF: number;        // 1..2
  barbless: boolean;
  tackle: Tackle;
  startDist: number; startBearing: number;
  /** 掛けた瞬間から数えて、すでに経過した秒（前アタリ後の猶予など）。通常0 */
  lineAgeUse?: number;
}
export interface FightInput { reel: number; theta: number; drag: number; steer: number }
export interface FightCtx { nearStruct: boolean; rough: number }

const MODE_MULT: Record<FightMode, number> = { cruise: 0.35, run: 1.0, side_run: 0.8, dive: 1.0, headshake: 1.0, rest: 0.2, wedged: 1.0 };
const MODE_COST: Record<FightMode, number> = { cruise: 0.2, run: 1.0, side_run: 0.8, dive: 0.8, headshake: 0.3, rest: 0, wedged: 0.6 };

export function rodCushion(theta: number): number {
  const z = (theta - FIGHT.ROD_IDEAL_ANGLE) / FIGHT.ROD_ANGLE_SIGMA;
  return (1 - FIGHT.ROD_CUSHION_MAX * Math.exp(-z * z)) * (theta > 80 ? FIGHT.ROD_OVERHEAD_PENALTY : 1);
}
export const rodLift = (t: Tackle, theta: number) => t.rodPowerKgf * (0.4 + 0.6 * Math.sin(theta * Math.PI / 180));

export class Fight {
  readonly sp: Species; readonly sizeCm: number; readonly W: number;
  readonly Fsus: number; readonly Fburst: number; readonly stamSec: number;
  readonly tackle: Tackle;
  readonly hookSet: number; readonly hookSizeF: number; readonly barbless: boolean;
  rng: Rng;
  // 状態
  t = 0;
  S = 1; mode: FightMode = 'cruise'; modeT = 1.2;
  dist: number; bearing: number; side = 1;
  T = 0; F_eff = 0; Pcap = 0; slipping = false; slipSec = 0; slack = 0; peakSlack = 0; slackSec = 0;
  D = 0; wedgeT = 0; holdT = 0; holdNeed = 2.5; freeFail = 0; recoverT = 0; reactT = 1.2;
  shockT = 0; lastRunDone = false; hsSince = 0;
  result: FightResult = null; reason = '';
  tension = 0;    // T/Bs_eff
  dragRatio = 0;  // 設定ドラグ / 推奨上限
  events: FightEvent[] = [];
  vRadial = 0;    // 魚の見かけ速度 (+沖)
  private lastTheta = 50;
  private softWarned = 0;
  private acc = 0;
  stats = { slipS: 0, maxT: 0, maxR: 0, wedges: 0, headshakes: 0, runs: 0, steps: 0 };

  constructor(p: FightParams, rng: Rng) {
    this.sp = p.sp; this.sizeCm = p.sizeCm; this.W = p.W; this.tackle = p.tackle;
    this.Fsus = fSus(p.sp, p.W); this.Fburst = this.Fsus * p.sp.pull.burstMult;
    this.stamSec = p.sp.fight.staminaSec * Math.pow(p.W / p.sp.size.wTyp, 0.3);
    this.hookSet = p.hookSet; this.hookSizeF = p.hookSizeF; this.barbless = p.barbless;
    this.rng = rng; this.dist = Math.max(2.5, p.startDist); this.bearing = p.startBearing;
    this.modeT = rng.u(FTUNE.START_CRUISE[0], FTUNE.START_CRUISE[1]);
    this.lineAge = p.lineAgeUse ?? 0;
  }
  lineAge: number;

  get BsEff(): number {
    const k = this.tackle;
    return bsRated(k) * k.knotEff * k.knotQ * (1 - FIGHT.ABR_STRENGTH_LOSS * this.D) * (1 - 0.08 * this.lineAge);
  }
  get Flock(): number { return FTUNE.LOCK_K * this.Fsus * (1 + this.sp.rockDiving); }
  get vf(): number { return Math.pow(this.sizeCm / this.sp.swim.refSizeCm, 0.5); }
  get nearSurface() { return this.dist < 5; }
  private ev(kind: FightEventKind, msg?: string) { this.events.push({ kind, t: this.t, msg }); }
  private enter(m: FightMode) {
    const r = this.rng, S = this.S;
    this.mode = m;
    switch (m) {
      case 'run': this.modeT = r.u(1.5, 5) * (0.5 + S); this.shockT = 0.15; this.stats.runs++; this.ev('run'); break;
      case 'side_run': this.modeT = r.u(1, 3); this.side = r.chance(0.5) ? 1 : -1; this.shockT = 0.12; this.ev('side_run'); break;
      case 'dive': this.modeT = r.u(0.9, 1.7); this.shockT = 0.15; this.ev('dive'); break;
      case 'headshake': this.modeT = 0.15; this.shockT = 0.15; this.stats.headshakes++; this.ev('headshake'); break;
      case 'rest': this.modeT = r.u(1, 3); this.ev('rest'); break;
      case 'wedged': this.modeT = 20; this.wedgeT = 0; this.holdT = 0; this.holdNeed = r.u(1.5, 4); this.recoverT = 0; this.stats.wedges++; this.ev('wedged'); break;
      case 'cruise': this.modeT = r.u(0.8, 2.2); break;
    }
  }

  /** 1ティック(=DT)進める */
  step(inp: FightInput, ctx: FightCtx): void {
    if (this.result) return;
    const dt = FIGHT.DT, r = this.rng, k = this.tackle, sp = this.sp;
    this.t += dt; this.stats.steps++;
    this.reactT = Math.max(0, this.reactT - dt);
    const theta = clamp(inp.theta, 5, 90);
    const reel = clamp01(inp.reel);
    const Dstatic = clamp(inp.drag, 0.05, k.dragMax);
    const S = this.S;
    const ps = this.Fsus / (sp.pull.coef * Math.pow(sp.size.wTyp, sp.pull.exp)); // 種内サイズ比（使わない場合あり）
    void ps;

    // ----- モード遷移 -----
    this.modeT -= dt;
    this.shockT = Math.max(0, this.shockT - dt);
    const powerNorm = clamp01(this.Fsus / 3);
    if (this.mode === 'wedged') {
      // 脱出判定は下で
    } else if (this.modeT <= 0) {
      if (this.mode === 'run' || this.mode === 'side_run' || this.mode === 'headshake') this.enter(S < 0.7 || r.chance(0.5) ? 'rest' : 'cruise');
      else if (this.mode === 'dive') this.enter('wedged');
      else this.enter('cruise');
    } else if (this.mode === 'cruise' || this.mode === 'rest') {
      if (this.mode === 'cruise') {
        const hRun = (0.15 + 0.35 * powerNorm) * (0.4 + 0.6 * S);
        const sideProb = /lateral|side|circles|shakes/.test(sp.fight.runStyle) ? 0.5 : 0.2;
        if (r.chance(hRun * dt)) this.enter(r.chance(sideProb) ? 'side_run' : 'run');
        else if (S < 0.3 && this.dist < 4 && !this.lastRunDone && r.chance(0.3 * dt * 3)) { this.lastRunDone = true; this.enter('run'); this.modeT = r.u(1, 2); this.ev('last_run', 'ラストラン！'); }
        else {
          const hHs = sp.fight.headShakeFreq * 0.5 * (1 + (this.nearSurface ? 1 : 0));
          if (r.chance(hHs * dt)) this.enter('headshake');
          else if (ctx.nearStruct && sp.rockDiving > 0) {
            const headUp = this.T / this.Fsus >= 0.6 && theta >= 45;
            let h = sp.rockDiving * FIGHT.DIVE_BASE_HAZARD * FTUNE.DIVE_SCALE * (this.t < 2 ? 3 : 1) * (headUp ? 0.5 : 1) * (S < 0.3 ? 0.4 : 1);
            if (this.reactT > 0 && this.T >= 0.6 * this.Fsus * 0.35 && theta >= 45) h *= 0.2;
            if (r.chance(h * dt)) this.enter('dive');
          }
        }
      }
    }
    if (this.mode === 'run' && this.modeT > 0 && !this.lastRunDone && S < 0.3) { /* noop */ }

    // ----- 魚の引き -----
    const stretchNorm = clamp01(k.stretch * clamp(this.dist / FIGHT.LENGTH_STRETCH_REF_M, 0.3, 1) / 0.25);
    let modeMult = MODE_MULT[this.mode];
    if (this.lastRunDone && this.mode === 'run' && this.S < 0.3) modeMult = 0.6;
    const shock = this.shockT > 0 ? 1 + (sp.pull.burstMult - 1) * (1 - 0.7 * stretchNorm) : 1;
    const Ff = this.Fsus * modeMult * (0.35 + 0.65 * S);
    const cush = rodCushion(theta);
    const Feff = Ff * cush * shock;
    this.F_eff = Feff;
    const lift = rodLift(k, theta);
    const Pcap = Math.min(Dstatic, lift, k.reelPowerKgf);
    this.Pcap = Pcap;

    // ----- 張力 -----
    const heat = 1 - Math.min(0.2, FIGHT.DRAG_HEAT_RATE * this.slipSec);
    const Dst = Dstatic * heat;
    let T = 0, slipping = false;
    const wedged = this.mode === 'wedged';
    if (wedged) {
      T = reel > 0.2 ? Math.min(Pcap, Pcap * reel) : 0.2 * Feff;
      if (reel > 0.2 && Dstatic < T) T = Dstatic * FIGHT.DRAG_DYN_RATIO;
    } else if (this.slack > 0.05) {
      T = 0;
    } else if (Feff >= Dst * FIGHT.DRAG_STICTION) {
      slipping = true; T = Dst * FIGHT.DRAG_DYN_RATIO;
    } else {
      T = Math.min(Pcap, Feff + FTUNE.PUSH * reel * Math.max(0, Pcap - Feff));
    }
    this.slipping = slipping;
    if (slipping) { this.slipSec += dt; this.stats.slipS += dt; if (this.slipSec - dt <= 0) this.ev('drag_slip'); }
    else this.slipSec = Math.max(0, this.slipSec - dt * 0.5);

    // ----- 距離・スラック -----
    const net = Pcap - Feff;
    const vReel = k.reelSpeed * reel * clamp01((k.reelPowerKgf - T) / k.reelPowerKgf);
    const vcr = sp.swim.cruise * this.vf, vb = sp.swim.burst * this.vf;
    // 魚の意図的な動き(+沖)
    let vInt = 0;
    switch (this.mode) {
      case 'run': vInt = vb * 0.55 * (0.4 + 0.6 * S); break;
      case 'side_run': vInt = vb * 0.12; break;
      case 'cruise': vInt = vcr * 0.4 * Math.sin(this.t * 0.9 + this.W * 7); break;
      case 'rest': vInt = -vcr * 0.5; break;
      case 'dive': vInt = vcr * 0.2; break;
      default: vInt = 0;
    }
    let dDist = 0;
    const prevSlack = this.slack;
    if (wedged) {
      dDist = 0;
    } else if (slipping) {
      const vSlip = vb * 0.55 * clamp01((Feff - Dst * FIGHT.DRAG_DYN_RATIO) / Feff);
      dDist = vSlip - vReel * 0.3;
    } else if (this.slack > 0.05 || (vInt < 0 && reel > 0)) {
      // 魚が寄ってくる、またはスラック中：巻いた分でスラックを取る
      this.slack = Math.max(0, this.slack + (-Math.min(0, vInt) - vReel) * dt);
      if (this.slack > this.peakSlack) this.peakSlack = this.slack;
      dDist = -vReel * 0.5;
    } else if (reel > 0) {
      dDist = -vReel * clamp(net / Math.max(0.05, Pcap), -1, 1) + Math.max(0, vInt) * 0.35;
    } else {
      dDist = (net < 0 ? vcr * 0.3 : -0.1) + Math.max(0, vInt) * 0.4;
      if (vInt < 0) this.slack = Math.max(0, this.slack - vInt * dt * 0.5);
    }
    // ポンピング: 竿を下げながら巻くと距離を稼ぐ
    const dth = theta - this.lastTheta; this.lastTheta = theta;
    if (dth < 0 && reel > 0.3 && !wedged && T > 0.05) { dDist -= Math.min(0.9, -dth * 0.1 / dt * 0.2) * clamp01(net / Math.max(0.05, Pcap)); }
    this.dist = clamp(this.dist + dDist * dt, 0.4, 60);
    this.vRadial = dDist;
    if (this.slack > 0.05) { this.slackSec += dt; if (prevSlack <= 0.05) this.ev('slack', 'ラインが緩んだ！'); }
    else {
      if (prevSlack > 0.05) {
        // スラック復帰スナップ
        const snap = 1 + 1.0 * clamp01(this.peakSlack / 1.0) * (1 - 0.6 * stretchNorm);
        T = Math.min(Pcap, T * snap); this.ev('snap');
      }
      this.slackSec = 0; this.peakSlack = 0; this.slack = Math.max(0, this.slack);
    }
    // 方位
    if (this.mode === 'side_run') {
      let lat = vb * 0.5 * (0.5 + 0.5 * S);
      const opp = -inp.steer * this.side;      // 魚と逆へ竿を向けている度合い
      lat *= 1 - 0.5 * clamp01(opp);
      this.bearing += this.side * lat * dt / Math.max(4, this.dist);
    } else if (this.mode === 'run') {
      this.bearing += (r.n01() * 0.02 + inp.steer * -0.05) * dt;
    } else {
      this.bearing -= this.bearing * 0.12 * dt; // 竿を向けている中心側へ引き戻される
      this.bearing += -inp.steer * 0.12 * dt;
    }
    this.bearing = clamp(this.bearing, -1.3, 1.3);

    this.T = T;

    // ----- スタミナ -----
    const rho = clamp(T / this.Fsus, 0, 1.5);
    let dS = -(1 / this.stamSec) * (FIGHT.STAMINA_BASE_RATE * MODE_COST[this.mode] + FIGHT.STAMINA_PRESSURE_RATE * rho) * FTUNE.STAMINA_SCALE;
    if (rho < 0.15) dS += FIGHT.STAMINA_REST_RECOVER * (1 - S);
    this.S = clamp01(S + dS * dt);

    // ----- 根潜り脱出 / 擦れ -----
    const Flock = this.Flock;
    if (wedged) {
      this.wedgeT += dt;
      if (T >= Flock && theta >= 45) {
        this.holdT += dt;
        if (this.holdT >= this.holdNeed) {
          if (r.chance(0.8)) { this.ev('freed', '根から引き出した！'); this.enter('run'); this.bearing = this.bearing * 0.5; }
          else { this.holdT = 0; this.holdNeed = r.u(1.5, 3); this.D += 0.06; }
        }
        this.recoverT = 0;
      } else if (T < 0.3 * Flock) {
        this.holdT = Math.max(0, this.holdT - dt);
        this.recoverT += dt;
        if (this.recoverT > r.u(3, 6)) { this.ev('freed', '魚が穴から出てきた'); this.enter('cruise'); this.modeT = 2; }
      } else { this.holdT = Math.max(0, this.holdT - dt * 0.5); this.recoverT = 0; }
    }
    const contact = wedged ? 1.0 : this.mode === 'dive' ? 0.8 : ctx.nearStruct && this.dist < 7 ? 0.15 : 0;
    if (contact > 0) {
      const BsE = Math.max(0.1, this.BsEff);
      const lbF = Math.sqrt(k.lineLb / 16);
      this.D = clamp01(this.D + FIGHT.ABR_K * FTUNE.ABR_SCALE * contact * Math.max(0.2, ctx.rough) * (0.3 + T / BsE) / k.abrRes / lbF * dt);
    }

    // ----- ラインブレイク -----
    const BsE = this.BsEff;
    const rr = T / Math.max(0.01, BsE);
    this.tension = rr; if (T > this.stats.maxT) this.stats.maxT = T; if (rr > this.stats.maxR) this.stats.maxR = rr;
    this.dragRatio = Dstatic / bsRated(k);
    if (rr >= 1.0) return this.end('LINE_BREAK', 'ラインが切れた！');
    if (rr >= FIGHT.BREAK_SOFT_RATIO) {
      const h = FIGHT.BREAK_SOFT_RATE * FTUNE.SOFT_BREAK_SCALE * Math.pow((rr - 0.85) / 0.15, 2);
      if (this.softWarned < 1) { this.softWarned = 1; this.ev('soft_warn', 'ラインが限界！'); }
      if (r.chance(h * dt)) return this.end('LINE_BREAK', 'ラインが切れた！（結び目）');
    } else this.softWarned = 0;

    // ----- 針外れ -----
    const base = sp.hookOut.base * FTUNE.HOOKOUT_SCALE;
    const hookSetF = 1.6 - this.hookSet;
    const barbF = this.barbless ? FIGHT.BARBLESS_HOOKOUT_MULT : 1;
    if (this.mode === 'headshake' && this.modeT > 0.14) {
      const p = base * hookSetF * this.hookSizeF * barbF * (1 + 0.8 * (this.nearSurface ? 1 : 0));
      if (r.chance(p)) return this.end('HOOK_OUT', 'バレた！（首振り）');
    }
    if (this.slackSec > 0) {
      const slackF = 1 + 3 * clamp01(this.slackSec / 0.5);
      const h = base * 0.8 * slackF * hookSetF * barbF;
      if (r.chance(h * dt)) return this.end('HOOK_OUT', 'バレた！（ラインが緩んだ）');
    }
    {
      const limit = sp.hookOut.mouthHoldRatio * this.Fsus * (0.8 + 0.4 * this.hookSet);
      if (T > limit * 0.85 && this.stats.steps % 15 === 0) this.ev('tear_warn', '口が切れそう！ドラグをゆるめて');
      if (T > limit) {
        const p = clamp01(0.5 * (T / limit - 1));
        if (r.chance(p * dt * 2)) return this.end('HOOK_OUT', 'バレた！（口切れ）');
      }
    }

    // ----- 終了 -----
    if (wedged && (this.wedgeT > 20 || this.D >= 0.95)) return this.end('STUCK_LOST', '根掛かりでラインが切れた…');
    if (this.S <= FIGHT.LAND_STAMINA && this.dist <= FIGHT.LAND_DIST_M) {
      const pOut = 0.5 * base * (this.S > 0.3 ? 1.8 : 1) * 0.6 * barbF;
      if (r.chance(pOut)) return this.end('HOOK_OUT', 'タモ入れで外れた…');
      return this.end('LANDED', '取り込み成功！');
    }
  }
  private end(res: FightResult, why: string) { this.result = res; this.reason = why; }

  /** 実時間 dt を固定刻みに分割して進める */
  advance(dtReal: number, inp: FightInput, ctxFn: () => FightCtx) {
    this.acc += Math.min(dtReal, 0.25);
    while (this.acc >= FIGHT.DT && !this.result) { this.acc -= FIGHT.DT; this.step(inp, ctxFn()); }
  }
  popEvents(): FightEvent[] { const e = this.events; this.events = []; return e; }
}

/** 針サイズ係数（FISH_DESIGN §4.6） */
export function hookSizeFactor(hookSize: number, ideal: number): number {
  return clamp(1 + 0.6 * Math.abs(Math.log(hookSize / ideal)), 1, 2);
}
