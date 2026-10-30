/** 釣りに効く環境（デモ値）。実際の気象・潮汐データとは連動していない（ゲーム内モデル）。 */
import { SIM } from '../data/tuning';
import { clamp01, lerp } from './rng';
import type { Species, TimeOfDay } from '../data/species';

export interface Env {
  hour: number;
  month: number;       // 1..12
  tempC: number;
  tidePhase: number;   // 0..1
  tideMove: number;    // 0..1 潮止まり0 / 中潮1
  current: number;     // 正規化流速 0..1
  curDirX: number; curDirZ: number; // 流れの向き（単位ベクトル, x=東,z=南）
  windMs: number; windDirX: number; windDirZ: number;
  clarity: number;     // 0..1 透明度
  daylight: number;    // 0 夜 .. 1 昼
  overcast: number;
  /** デモ値であることを明示（図鑑/ログの dataMode 用） */
  demo: true;
}

export function makeEnv(hour: number, month = new Date().getMonth() + 1): Env {
  const tidePhase = ((hour / 12.42) % 1 + 1) % 1;
  const tideMove = Math.abs(Math.sin(2 * Math.PI * tidePhase));
  const current = clamp01(0.12 + 0.5 * tideMove);
  const ebb = tidePhase < 0.5 ? 1 : -1;
  const ang = 0.35;
  const daylight = clamp01((Math.cos((hour - 12.5) / 24 * 2 * Math.PI) + 0.35) / 1.1);
  return {
    hour, month, tempC: SIM.DEMO_WATER_C + 0.6 * Math.sin((hour - 14) / 24 * 2 * Math.PI),
    tidePhase, tideMove, current,
    curDirX: Math.cos(ang) * ebb, curDirZ: Math.sin(ang) * ebb,
    windMs: 3.5, windDirX: 0.7, windDirZ: -0.7,
    clarity: lerp(0.65, 0.9, daylight), daylight, overcast: 0.2, demo: true,
  };
}

export function todOf(h: number): TimeOfDay {
  h = ((h % 24) + 24) % 24;
  if (h >= 4 && h < 7) return 'dawn';
  if (h >= 7 && h < 16) return 'day';
  if (h >= 16 && h < 19) return 'dusk';
  return 'night';
}
export const TOD_JA: Record<TimeOfDay, string> = { dawn: '朝まずめ', day: '日中', dusk: '夕まずめ', night: '夜' };

/** 時間帯重み（区間境界±30分で線形補間） */
export function timeW(sp: Species, hour: number): number {
  const b = [4, 7, 16, 19]; // 境界
  const names: TimeOfDay[] = ['night', 'dawn', 'day', 'dusk', 'night'];
  const h = ((hour % 24) + 24) % 24;
  for (let i = 0; i < 4; i++) {
    const d = h - b[i];
    if (Math.abs(d) <= 0.5) {
      const t = (d + 0.5);
      return lerp(sp.tow[names[i]], sp.tow[names[i + 1]], t);
    }
  }
  return sp.tow[todOf(h)];
}

function trapezoid(t: number, mn: number, o1: number, o2: number, mx: number): number {
  if (t <= mn || t >= mx) return 0.05;
  if (t >= o1 && t <= o2) return 1;
  if (t < o1) return Math.max(0.05, (t - mn) / (o1 - mn));
  return Math.max(0.05, (mx - t) / (mx - o2));
}

/** 活性 A（FISH_DESIGN §2.1）。pressure は釣り人圧力 0..1+ */
export function activity(sp: Species, env: Env, pressure = 0): number {
  const tw = Math.max(timeW(sp, env.hour), SIM.TOD_FLOOR); // デモ: 時間帯で全く釣れなくならないよう下限
  const mRaw = sp.monthly[(env.month - 1 + 12) % 12] ?? 0.5;
  const mw = lerp(1, mRaw, SIM.DEMO_MONTH_BLEND);
  const tr = sp.tempRangeC;
  const tempF = trapezoid(env.tempC, tr.min, tr.optMin, tr.optMax, tr.max);
  const tideF = 0.4 + 0.6 * env.tideMove;
  const dc = env.current - sp.currentPref;
  const currentF = Math.max(0.2, Math.exp(-(dc * dc) / (2 * sp.currentTol * sp.currentTol)));
  const weatherF = 1 + 0.15 * env.overcast;
  const A = clamp01(tw * mw * tempF * tideF * currentF * weatherF);
  return A * (1 - 0.5 * clamp01(pressure));
}
