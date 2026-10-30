/**
 * 魚種データ（design/FISH_DATA.json を取り込み）。数値はゲームバランス用の初期値で、実際の生態・釣果を保証しない。
 * ここに「エサ取り」（小魚）を追加で定義している（FISH_DATA に無い、ウキ釣りの定番障害）。
 */
import raw from './FISH_DATA.json';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'legend';
export type BiteType = 'suck' | 'peck' | 'gulp' | 'chase' | 'mouth_and_spit' | 'peck_then_swallow' | 'mouth_and_hold';
export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';
export type ZoneKey = 'sand' | 'reef' | 'weed' | 'wall' | 'deep' | 'shallow';
export const ZONE_KEYS: ZoneKey[] = ['sand', 'reef', 'weed', 'wall', 'deep', 'shallow'];

export interface Species {
  id: string;
  nameJa: string;
  rarity: Rarity;
  methods: string[];
  depthRange: { min: number; max: number; preferredMin: number; preferredMax: number };
  tempRangeC: { min: number; max: number; optMin: number; optMax: number };
  zoneAffinity: Record<ZoneKey, number>;
  swim: { cruise: number; burst: number; refSizeCm: number };
  wariness: number;
  baits: Record<string, number>;
  tow: Record<TimeOfDay, number>;
  monthly: number[];
  currentPref: number; currentTol: number;
  senses: { visual: number; vibration: number; scent: number };
  senseRange: { visual: number; lateralLine: number; smell: number };
  lineVisSens: number; lightSens: number; noiseSens: number;
  inspectSec: [number, number];
  biteType: BiteType;
  strikeCommitP: number;
  fleeCooldownSec: [number, number];
  pull: { coef: number; exp: number; burstMult: number; typical: number };
  rockDiving: number;
  hookOut: { base: number; mouthHoldRatio: number };
  size: { minCm: number; typCm: number; maxCm: number; a: number; b: number; wTyp: number };
  fight: { staminaSec: number; headShakeFreq: number; runStyle: string; toothCut: boolean };
  schooling: boolean;
  /** 底付近にいる魚 */
  bottom: boolean;
  esatori?: boolean;
  gameBaseValue: number;
  price: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;
const SCHOOLING = new Set(['aji', 'saba', 'tachiuo', 'buri']);
const BOTTOM = new Set(['kasago', 'chinu', 'madai']);

function conv(s: Raw): Species {
  const baits: Record<string, number> = {};
  for (const b of s.baits) baits[b.id] = b.response;
  const bh = s.behavior;
  return {
    id: s.id, nameJa: s.nameJa, rarity: s.rarity, methods: s.methods,
    depthRange: s.depthRange, tempRangeC: s.tempRangeC,
    zoneAffinity: { sand: 0, reef: 0, weed: 0, wall: 0, deep: 0, shallow: 0, ...s.preferredSeabed.zoneAffinity },
    swim: { cruise: s.swimSpeed.cruise, burst: s.swimSpeed.burst, refSizeCm: s.swimSpeed.refSizeCm },
    wariness: s.wariness, baits,
    tow: s.activeHours.timeOfDayWeights, monthly: s.activeHours.monthlyActivity,
    currentPref: s.currentResponse.preferred, currentTol: s.currentResponse.tolerance,
    senses: { visual: s.lureResponse.senses.visual, vibration: s.lureResponse.senses.vibration, scent: s.lureResponse.senses.scent },
    senseRange: bh.senseRangeM,
    lineVisSens: bh.lineVisibilitySensitivity, lightSens: bh.lightSensitivity, noiseSens: bh.noiseSensitivity,
    inspectSec: [bh.inspectSec.min, bh.inspectSec.max],
    biteType: bh.biteType, strikeCommitP: bh.strikeCommitP,
    fleeCooldownSec: [bh.fleeCooldownSec.min, bh.fleeCooldownSec.max],
    pull: { coef: s.pullStrength.coef, exp: s.pullStrength.exponent, burstMult: s.pullStrength.burstMult, typical: s.pullStrength.sustainedKgf.typical },
    rockDiving: s.rockDivingTendency,
    hookOut: { base: s.hookOutChance.base, mouthHoldRatio: s.hookOutChance.mouthHoldRatio },
    size: { minCm: s.sizeRange.cm.min, typCm: s.sizeRange.cm.typical, maxCm: s.sizeRange.cm.max, a: s.sizeRange.lengthWeight.a, b: s.sizeRange.lengthWeight.b, wTyp: s.sizeRange.weightKg.typical },
    fight: { staminaSec: s.fight.staminaSec, headShakeFreq: s.fight.headShakeFreq, runStyle: s.fight.runStyle, toothCut: !!s.fight.toothCut },
    schooling: SCHOOLING.has(s.id), bottom: BOTTOM.has(s.id),
    gameBaseValue: s.gameBaseValue ?? 0, price: s.price,
  };
}

const ALL = (raw as Raw).species.map(conv) as Species[];

/** エサ取り（小型の外道。針には掛からず、エサだけ減らす） */
export const ESATORI: Species = {
  id: 'esatori', nameJa: 'エサ取り(小魚)', rarity: 'common', methods: ['float'],
  depthRange: { min: 0.3, max: 6, preferredMin: 0.5, preferredMax: 2.8 },
  tempRangeC: { min: 8, max: 32, optMin: 14, optMax: 28 },
  zoneAffinity: { sand: 0.7, reef: 0.5, weed: 0.5, wall: 0.9, deep: 0.05, shallow: 0.9 },
  swim: { cruise: 0.3, burst: 1.2, refSizeCm: 8 }, wariness: 0.1,
  baits: { amiebi: 0.95, okiami: 0.95, aoiso: 0.7, ebi_live: 0.6, sakana_strip: 0.7, ika_strip: 0.55, kani: 0.3, corn: 0.8, live_fish: 0.1, konoshiro_live: 0.1 },
  tow: { dawn: 0.5, day: 1, dusk: 0.6, night: 0.2 }, monthly: [0.5, 0.5, 0.6, 0.8, 0.9, 1, 1, 1, 1, 0.9, 0.7, 0.5],
  currentPref: 0.2, currentTol: 0.5,
  senses: { visual: 0.8, vibration: 0.5, scent: 0.8 }, senseRange: { visual: 4, lateralLine: 1.5, smell: 4 },
  lineVisSens: 0.1, lightSens: 0.1, noiseSens: 0.1,
  inspectSec: [0.2, 0.6], biteType: 'peck', strikeCommitP: 0.95, fleeCooldownSec: [1, 3],
  pull: { coef: 1, exp: 0.667, burstMult: 1.4, typical: 0.05 }, rockDiving: 0, hookOut: { base: 0.5, mouthHoldRatio: 1 },
  size: { minCm: 4, typCm: 7, maxCm: 12, a: 1.5e-5, b: 3, wTyp: 0.005 },
  fight: { staminaSec: 5, headShakeFreq: 0, runStyle: 'none', toothCut: false },
  schooling: true, bottom: false, esatori: true, gameBaseValue: 0, price: null,
};

export const SPECIES: Species[] = ALL;
export const SPECIES_BY_ID: Record<string, Species> = Object.fromEntries([...ALL, ESATORI].map((s) => [s.id, s]));
export const BAIT_CATALOG: Record<string, { nameJa: string; kind: string }> = (raw as Raw).catalog.baits;

export function lengthToWeightKg(sp: Species, cm: number): number { return sp.size.a * Math.pow(cm, sp.size.b); }
export function fSus(sp: Species, W: number): number { return sp.pull.coef * Math.pow(W, sp.pull.exp); }

export const RARITY_W: Record<Rarity, number> = { common: 1, uncommon: 0.4, rare: 0.12, legend: 0.03 };
