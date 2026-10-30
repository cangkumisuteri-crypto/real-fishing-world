/**
 * 魚シム（FISH_DESIGN §2–3）。idle → search → approach → inspect → strike → flee。
 * - エサ/ウキ周辺(NEAR_R)の魚だけフルのステートマシン、遠い魚は軽量（低頻度の回遊のみ）。
 * - 人口は「底質ゾーン×水深×魚種の好み」から生成し、釣り場（エサの位置）周辺に維持する。
 * - 純ロジック（three 非依存）。node でバランスシミュレーション可能。
 */
import { SIM } from '../data/tuning';
import { SPECIES, ESATORI, RARITY_W, ZONE_KEYS, lengthToWeightKg, type Species } from '../data/species';
import { activity, type Env } from './env';
import { Rng, clamp, clamp01 } from './rng';
import { IDEAL_HOOK } from './rigdata';
import { hookSizeFactor } from './fight';

export interface WorldQuery {
  isWater(x: number, z: number): boolean;
  depthAt(x: number, z: number): number;
  zoneAt(x: number, z: number): number;   // 0 sand 1 reef 2 weed 3 wall 4 deep 5 shallow
  tetraAt(x: number, z: number): boolean;
  holeAt(x: number, z: number): boolean;
}
export interface BaitState {
  x: number; z: number; depth: number;       // 水面からの深さ(m)
  life: number;                              // エサの残量 0..1
  dataId: string; scent: number; hookSize: number;
  action: 'drift' | 'retrieve';
  vib: number;                               // 水面の波紋・振動の強さ 0..1（着水直後など）
  onBottom: boolean;
  playerX: number; playerZ: number;
}
export type AgentState = 'idle' | 'search' | 'approach' | 'inspect' | 'strike' | 'flee' | 'biting';
export interface Agent {
  id: number; sp: Species; sizeCm: number; W: number; grp: number;
  x: number; z: number; y: number; hx: number; hz: number; hr: number;
  tx: number; tz: number; ty: number; wanderT: number;
  heading: number; speed: number;
  state: AgentState; timer: number; timer0: number; cooldown: number;
  s: number; convince: number; extended: boolean; ang: number; fleeWhy: string;
  A: number; farT: number; biteT: number; seenBait: boolean;
}
export type SimEvent =
  | { kind: 'bite'; agent: Agent }
  | { kind: 'nibble'; agent: Agent }
  | { kind: 'state'; agent: Agent; from: AgentState; to: AgentState; why?: string };

const K = 0.5; // 魚の縦方向の移動(m/s)
export class FishSim {
  agents: Agent[] = [];
  events: SimEvent[] = [];
  pressure = 0;
  center = { x: 0, z: 0 };
  private nextId = 1; private nextGrp = 1;
  private acc = 0; private actT = 0; private refillT = 0;
  private actCache: Record<string, number> = {};
  stats = { near: 0, far: 0, spawned: 0, byState: {} as Record<string, number>, spooks: 0, bites: 0, nibbles: 0 };
  env!: Env;
  boost = 1;
  constructor(public world: WorldQuery, public rng: Rng) {}

  /* ---------- 人口 ---------- */
  private sampleSpawn(cx: number, cz: number, r0: number, r1: number): { x: number; z: number } | null {
    for (let i = 0; i < 40; i++) {
      const r = r0 + (r1 - r0) * Math.pow(this.rng.next(), 1.5), a = this.rng.u(0, Math.PI * 2);
      const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
      if (!this.world.isWater(x, z) || this.world.depthAt(x, z) < 0.7) continue;
      if (this.world.tetraAt(x, z) && !this.world.holeAt(x, z)) continue;
      return { x, z };
    }
    return null;
  }
  private pickSpecies(x: number, z: number, esatori: boolean): Species | null {
    const d = this.world.depthAt(x, z), zk = ZONE_KEYS[this.world.zoneAt(x, z)] ?? 'sand';
    if (esatori) return d <= 6 ? ESATORI : null;
    let tot = 0; const w: number[] = [];
    for (const sp of SPECIES) {
      let v = sp.zoneAffinity[zk] * RARITY_W[sp.rarity];
      if (d < sp.depthRange.min) v = 0; else if (d < sp.depthRange.preferredMin) v *= 0.5;
      if (this.world.holeAt(x, z) && sp.id === 'kasago') v *= 3;
      if (sp.id === 'buri' || sp.id === 'madai') v *= d >= 6 ? 1 : 0.15;
      w.push(v); tot += v;
    }
    if (tot <= 0) return null;
    let u = this.rng.next() * tot;
    for (let i = 0; i < SPECIES.length; i++) { u -= w[i]; if (u <= 0) return SPECIES[i]; }
    return SPECIES[0];
  }
  private sampleSize(sp: Species): number {
    const z = this.rng.n01();
    return clamp(sp.size.typCm * Math.exp(0.26 * z), sp.size.minCm, sp.size.maxCm);
  }
  private spawnAt(x: number, z: number, sp: Species, grp: number) {
    const rng = this.rng, d = this.world.depthAt(x, z);
    const sizeCm = this.sampleSize(sp);
    let y: number;
    if (sp.bottom) y = d - rng.u(0.2, 0.6);
    else y = clamp(rng.u(sp.depthRange.preferredMin, sp.depthRange.preferredMax), 0.4, d - 0.3);
    y = clamp(y, 0.3, Math.max(0.35, d - 0.2));
    const a: Agent = {
      id: this.nextId++, sp, sizeCm, W: lengthToWeightKg(sp, sizeCm), grp,
      x, z, y, hx: x, hz: z, hr: sp.bottom ? 4 : 9, tx: x, tz: z, ty: y, wanderT: rng.u(0, 4),
      heading: rng.u(0, 6.28), speed: 0, state: 'idle', timer: 0, timer0: 0, cooldown: rng.u(0, 5),
      s: 0, convince: 0, extended: false, ang: rng.u(0, 6.28), fleeWhy: '', A: 0.3, farT: rng.u(0, 1), biteT: 0, seenBait: false,
    };
    this.agents.push(a); this.stats.spawned++;
    return a;
  }
  /** 釣り場(cx,cz)周辺に個体数を維持。初回は全域、以降は外周のみ補充（目の前に湧かないように） */
  populate(cx: number, cz: number, initial = false) {
    this.center.x = cx; this.center.z = cz;
    // 遠すぎる魚は除去（軽量シム：別の場所の魚は覚えていない）
    for (let i = this.agents.length - 1; i >= 0; i--) {
      const a = this.agents[i];
      if (a.state === 'biting') continue;
      if (Math.hypot(a.x - cx, a.z - cz) > SIM.POP_R + 14) this.agents.splice(i, 1);
    }
    let nReal = 0, nEsa = 0;
    for (const a of this.agents) a.sp.esatori ? nEsa++ : nReal++;
    const r0 = initial ? 0 : 12, r1 = SIM.POP_R;
    let guard = 0;
    while (nReal < SIM.POP_N && guard++ < 120) {
      const p = this.sampleSpawn(cx, cz, r0, r1); if (!p) continue;
      const sp = this.pickSpecies(p.x, p.z, false); if (!sp) continue;
      if (sp.schooling) {
        const grp = this.nextGrp++, n = 2 + Math.floor(this.rng.next() * 3);
        for (let k = 0; k < n && nReal < SIM.POP_N + 2; k++) {
          const q = { x: p.x + this.rng.u(-2.5, 2.5), z: p.z + this.rng.u(-2.5, 2.5) };
          if (this.world.isWater(q.x, q.z) && this.world.depthAt(q.x, q.z) > 0.8) { this.spawnAt(q.x, q.z, sp, grp); nReal++; }
        }
      } else { this.spawnAt(p.x, p.z, sp, 0); nReal++; }
    }
    guard = 0;
    while (nEsa < SIM.ESATORI_N && guard++ < 60) {
      const p = this.sampleSpawn(cx, cz, r0, Math.min(r1, 22)); if (!p) continue;
      if (this.world.depthAt(p.x, p.z) > 6) continue;
      const sp = this.pickSpecies(p.x, p.z, true); if (!sp) continue;
      this.spawnAt(p.x, p.z, sp, this.nextGrp++); nEsa++;
    }
  }

  popEvents(): SimEvent[] { const e = this.events; this.events = []; return e; }
  /** QA用: 指定の魚をエサの位置にスポーンさせる（strike 状態へ） */
  spawnForced(sp: Species, cm: number, x: number, z: number, y: number): Agent {
    const a = this.spawnAt(x, z, sp, 0);
    a.sizeCm = cm; a.W = lengthToWeightKg(sp, cm); a.y = y; a.state = 'biting'; a.biteT = 0;
    return a;
  }

  /* ---------- 更新 ---------- */
  update(dt: number, bait: BaitState | null, env: Env, noise: number) {
    this.env = env;
    this.pressure = Math.max(0, this.pressure - SIM.BASE_PRESSURE_DECAY * dt);
    this.actT -= dt;
    if (this.actT <= 0) { this.actT = 1; for (const sp of [...SPECIES, ESATORI]) this.actCache[sp.id] = activity(sp, env, this.pressure); }
    this.refillT -= dt;
    if (this.refillT <= 0) { this.refillT = 4; this.populate(bait ? bait.x : this.center.x, bait ? bait.z : this.center.z); }
    this.acc += dt;
    let n = 0;
    while (this.acc >= SIM.TICK && n++ < 5) { this.acc -= SIM.TICK; this.tick(SIM.TICK, bait, env, noise); }
    if (n >= 5) this.acc = 0;
  }

  private tick(dt: number, bait: BaitState | null, env: Env, noise: number) {
    let near = 0, far = 0;
    const by: Record<string, number> = {};
    for (let i = 0; i < this.agents.length; i++) {
      const a = this.agents[i];
      a.A = this.actCache[a.sp.id] ?? 0.3;
      by[a.state] = (by[a.state] ?? 0) + 1;
      const dBait = bait ? Math.hypot(a.x - bait.x, a.z - bait.z) : 1e9;
      const isNear = bait != null && (dBait <= SIM.NEAR_R || a.state === 'biting' || (a.state !== 'idle' && a.state !== 'search'));
      if (isNear) { near++; this.tickNear(a, dt, bait!, env, noise); }
      else {
        far++;
        a.farT += dt;
        if (a.farT >= SIM.FAR_TICK) { const d = a.farT; a.farT = 0; this.wander(a, d, 1, bait); if (a.cooldown > 0) a.cooldown -= d; }
      }
    }
    this.stats.near = near; this.stats.far = far; this.stats.byState = by;
  }

  /* ---------- 移動 ---------- */
  private tryMove(a: Agent, nx: number, nz: number): boolean {
    const w = this.world;
    if (w.isWater(nx, nz) && (!w.tetraAt(nx, nz) || w.holeAt(nx, nz))) { a.x = nx; a.z = nz; return true; }
    if (w.isWater(nx, a.z) && !w.tetraAt(nx, a.z)) { a.x = nx; return true; }
    if (w.isWater(a.x, nz) && !w.tetraAt(a.x, nz)) { a.z = nz; return true; }
    return false;
  }
  private fixDepth(a: Agent, dy: number) {
    const d = this.world.depthAt(a.x, a.z);
    const target = clamp(a.ty, 0.25, Math.max(0.3, d - 0.2));
    const step = K * dy;
    a.y += clamp(target - a.y, -step, step);
    if (a.y > d - 0.15) a.y = Math.max(0.25, d - 0.15);
  }
  private vf(a: Agent) { return Math.pow(a.sizeCm / a.sp.swim.refSizeCm, 0.5); }
  private wander(a: Agent, dt: number, speedMul: number, bait: BaitState | null = null) {
    a.wanderT -= dt;
    if (a.wanderT <= 0) {
      a.wanderT = this.rng.u(3, 8);
      const ang = this.rng.u(0, 6.28), r = Math.sqrt(this.rng.next()) * a.hr;
      a.tx = a.hx + Math.cos(ang) * r; a.tz = a.hz + Math.sin(ang) * r;
      // 回遊の偏り: エサの匂い・波紋に誘われて、活性の高い魚は釣り場付近を回遊しやすい
      if (bait && a.A > 0.25 && !a.sp.esatori && this.rng.chance(SIM.ATTRACT * a.A)) {
        const rr = this.rng.u(0.5, 6), aa = this.rng.u(0, 6.28);
        a.tx = bait.x + Math.cos(aa) * rr; a.tz = bait.z + Math.sin(aa) * rr;
      } else if (bait && a.sp.esatori && this.rng.chance(SIM.ATTRACT)) {
        const rr = this.rng.u(0.5, 5), aa = this.rng.u(0, 6.28);
        a.tx = bait.x + Math.cos(aa) * rr; a.tz = bait.z + Math.sin(aa) * rr;
      }
      const d = this.world.depthAt(a.tx, a.tz);
      a.ty = a.sp.bottom ? d - this.rng.u(0.2, 0.6) : this.rng.u(a.sp.depthRange.preferredMin, a.sp.depthRange.preferredMax);
      if (!this.world.isWater(a.tx, a.tz)) { a.tx = a.hx; a.tz = a.hz; a.ty = a.y; }
    }
    const dx = a.tx - a.x, dz = a.tz - a.z, d = Math.hypot(dx, dz);
    const sp = a.sp.swim.cruise * this.vf(a) * speedMul;
    if (d > 0.3) {
      a.heading = Math.atan2(dz, dx);
      const st = Math.min(d, sp * dt);
      if (!this.tryMove(a, a.x + (dx / d) * st, a.z + (dz / d) * st)) a.wanderT = 0;
      a.speed = sp;
    } else a.speed = 0;
    this.fixDepth(a, dt);
  }

  /* ---------- 刺激・疑い ---------- */
  stimulus(a: Agent, b: BaitState, env: Env): number {
    const sp = a.sp;
    const dx = a.x - b.x, dz = a.z - b.z, dy = a.y - b.depth;
    const d = Math.hypot(dx, dz, dy);
    let r = sp.baits[b.dataId] ?? 0.05;
    r *= 0.25 + 0.75 * clamp01(b.life); if (b.life <= 0.03) r = 0.03;
    const actionMatch = b.action === 'drift' ? 0.8 : 0.4;
    const lightVisF = 1 + 0.3 * sp.lightSens * (1 - env.daylight);
    const vis = clamp01(1 - d / sp.senseRange.visual) * env.clarity * lightVisF;
    const lat = clamp01(1 - d / sp.senseRange.lateralLine) * clamp(0.25 + b.vib, 0, 1);
    const down = (dx * env.curDirX + dz * env.curDirZ) > 0 ? 1 + 0.4 * env.current : 1;
    const smell = clamp01(1 - d / sp.senseRange.smell) * b.scent * down;
    const gain = Math.max(vis * sp.senses.visual, lat * sp.senses.vibration, smell * sp.senses.scent);
    const vertTol = (0.6 + 1.4 * (1 - sp.wariness)) * (sp.bottom ? 0.7 : 1);
    const depthF = Math.exp(-(dy * dy) / (vertTol * vertTol));
    const hookF = 1 / Math.pow(hookSizeFactor(b.hookSize, IDEAL_HOOK[sp.id] ?? 7), 0.8);
    return r * Math.pow(actionMatch, 0.7) * gain * depthF * hookF * SIM.STIM_GAIN;
  }
  private suspicionRate(a: Agent, b: BaitState, env: Env, noise: number): number {
    const sp = a.sp, w = sp.wariness;
    const d = Math.hypot(a.x - b.x, a.z - b.z, a.y - b.depth);
    const prox = clamp01(1 - d / 3);
    const lineVis = 0.6 * env.clarity * (1 - 0.5 * clamp01(a.y / 10)) * prox;
    const light = env.daylight * 0.5;
    const unnatural = (1 - (b.action === 'drift' ? 0.8 : 0.4)) * 0.5;
    const shadow = Math.hypot(b.x - b.playerX, b.z - b.playerZ) < 4 ? env.daylight * 0.5 : 0;
    const ds = w * (lineVis * sp.lineVisSens + noise * sp.noiseSens + light * sp.lightSens + unnatural + shadow * 0.6) * SIM.SUSPICION_SCALE - 0.15 * (1 - w);
    return ds;
  }

  /* ---------- 状態遷移 ---------- */
  private setState(a: Agent, to: AgentState, why?: string) {
    const from = a.state; a.state = to;
    this.events.push({ kind: 'state', agent: a, from, to, why });
  }
  private flee(a: Agent, why: 'spook' | 'lose_interest' | 'miss', b: BaitState | null) {
    const sp = a.sp, r = this.rng;
    a.fleeWhy = why;
    a.heading = b ? Math.atan2(a.z - b.z, a.x - b.x) + r.u(-0.6, 0.6) : r.u(0, 6.28);
    a.speed = (why === 'lose_interest' ? sp.swim.cruise * 1.4 : sp.swim.burst) * this.vf(a);
    a.timer = why === 'spook' ? r.u(1.2, 2.2) : why === 'miss' ? 1 : 2.5;
    a.cooldown = r.u(sp.fleeCooldownSec[0], sp.fleeCooldownSec[1]) * (1 + this.pressure);
    if (why === 'spook') {
      this.pressure += 0.15; this.stats.spooks++;
      if (a.grp) for (const o of this.agents) if (o !== a && o.grp === a.grp && Math.hypot(o.x - a.x, o.z - a.z) < 10) o.s = clamp01(o.s + 0.3);
    }
    a.s = 0; a.convince = 0;
    this.setState(a, 'flee', why);
  }
  /** セッションからの結果通知（bite → 針掛かり or 見切り） */
  finishBite(a: Agent, outcome: 'hooked' | 'miss' | 'ate', bait: BaitState | null) {
    if (outcome === 'hooked') { const i = this.agents.indexOf(a); if (i >= 0) this.agents.splice(i, 1); return; }
    this.flee(a, 'miss', bait);
  }

  private tickNear(a: Agent, dt: number, b: BaitState, env: Env, noise: number) {
    const sp = a.sp, r = this.rng;
    if (a.cooldown > 0 && a.state === 'idle') a.cooldown -= dt;
    switch (a.state) {
      case 'idle': {
        this.wander(a, dt, 1, b);
        if (a.cooldown > 0) break;
        const dBait = Math.hypot(a.x - b.x, a.z - b.z, a.y - b.depth);
        const near = dBait < Math.max(sp.senseRange.smell, sp.senseRange.visual);
        const p = a.A * SIM.K_SEARCH * (near ? 3 : 1) * dt * this.boost;
        if (r.chance(p)) { a.timer = r.u(20, 60); this.setState(a, 'search'); }
        break;
      }
      case 'search': {
        this.wander(a, dt, 1.1, b);
        const stim = this.stimulus(a, b, env);
        if (stim >= 0.02 && r.chance(clamp01(stim * a.A * 2 * this.boost) * dt)) { a.seenBait = true; this.setState(a, 'approach'); a.s = Math.max(0, a.s); break; }
        a.timer -= dt;
        if (a.timer <= 0) { a.cooldown = 1; this.setState(a, 'idle'); }
        break;
      }
      case 'approach': {
        a.s = clamp01(a.s + this.suspicionRate(a, b, env, noise) * dt);
        if (a.s >= 1) { this.flee(a, 'spook', b); break; }
        const stim = this.stimulus(a, b, env);
        if (stim < 0.01) { a.timer -= dt * 2; if (a.timer <= 0) { a.cooldown = 1; this.setState(a, 'idle'); break; } }
        const dx = b.x - a.x, dz = b.z - a.z, dh = Math.hypot(dx, dz);
        const sp0 = (sp.biteType === 'chase' ? sp.swim.burst * 0.5 : sp.swim.cruise * 2) * this.vf(a);
        const dd = Math.hypot(dh, a.y - b.depth);
        const dInspect = 0.4 + 0.5 * a.sizeCm / 100;
        if (dd <= dInspect + 0.15) {
          a.convince = 0;
          a.timer0 = a.timer = r.u(sp.inspectSec[0], sp.inspectSec[1]) * (0.6 + 0.8 * sp.wariness) / (0.5 + a.A);
          a.extended = false; a.ang = Math.atan2(a.z - b.z, a.x - b.x);
          this.setState(a, 'inspect'); break;
        }
        a.heading = Math.atan2(dz, dx); a.speed = sp0;
        const st = Math.min(dh, sp0 * dt);
        if (dh > 0.01) this.tryMove(a, a.x + (dx / dh) * st, a.z + (dz / dh) * st);
        a.ty = b.depth; this.fixDepth(a, dt * 1.6);
        break;
      }
      case 'inspect': {
        const stim = this.stimulus(a, b, env);
        a.s = clamp01(a.s + this.suspicionRate(a, b, env, noise) * dt);
        a.convince = clamp01(a.convince + (stim * (0.3 + 0.7 * a.A) * SIM.CONV_K - 0.6 * a.s) * dt);
        // 旋回
        const rad = 0.4 + 0.5 * a.sizeCm / 100;
        a.ang += (sp.swim.cruise * this.vf(a) / Math.max(0.3, rad)) * dt;
        const nx = b.x + Math.cos(a.ang) * rad, nz = b.z + Math.sin(a.ang) * rad;
        this.tryMove(a, nx, nz); a.ty = b.depth; this.fixDepth(a, dt * 2);
        if (a.s >= 1) { this.flee(a, 'spook', b); break; }
        if (a.convince >= 0.6 + 0.4 * sp.wariness) { this.setState(a, 'strike'); break; }
        a.timer -= dt;
        if (a.timer <= 0) {
          if (a.convince >= 0.5 && !a.extended) { a.extended = true; a.timer = 0.5 * a.timer0; }
          else { this.flee(a, 'lose_interest', b); }
        }
        break;
      }
      case 'strike': {
        if (sp.esatori) {
          this.events.push({ kind: 'nibble', agent: a }); this.stats.nibbles++;
          a.cooldown = r.u(1.5, 4.5); a.s = 0; a.convince = 0; a.heading = r.u(0, 6.28); a.speed = 0.8; a.timer = 0.6;
          this.setState(a, 'flee', 'nibble'); a.fleeWhy = 'nibble'; break;
        }
        if (!r.chance(sp.strikeCommitP)) { this.flee(a, 'miss', b); break; }
        a.biteT = 0; this.stats.bites++;
        this.setState(a, 'biting');
        this.events.push({ kind: 'bite', agent: a });
        break;
      }
      case 'biting': {
        // セッションが処理するまで待機（安全弁 8s）
        a.biteT += dt; a.x += (b.x - a.x) * 0.5; a.z += (b.z - a.z) * 0.5; a.y += (b.depth - a.y) * 0.5;
        if (a.biteT > 8) this.flee(a, 'miss', b);
        break;
      }
      case 'flee': {
        const st = a.speed * dt;
        this.tryMove(a, a.x + Math.cos(a.heading) * st, a.z + Math.sin(a.heading) * st);
        a.timer -= dt;
        a.speed *= 0.97;
        if (a.timer <= 0) { a.hx = a.x; a.hz = a.z; this.setState(a, 'idle'); }
        break;
      }
    }
  }
}
