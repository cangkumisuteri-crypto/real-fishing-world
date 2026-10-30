/** 仕掛け（ウキ・ハリ・エサ・ライン）のプリセット。Phase 2 は T0 タックル固定＋シンプルな選択肢。 */
import { FIGHT } from '../data/tuning';

export interface FloatDef { id: string; nameJa: string; short: string; buoyG: number; vis: number; castMaxM: number; sinkRate: number; note: string }
export const FLOATS: FloatDef[] = [
  { id: 'fS', nameJa: '小ウキ（敏感）', short: '小', buoyG: 0.8, vis: 0.7, castMaxM: 14, sinkRate: 0.25, note: '小さなアタリも出る。遠投は苦手。' },
  { id: 'fM', nameJa: '中ウキ（標準）', short: '中', buoyG: 1.5, vis: 0.9, castMaxM: 22, sinkRate: 0.4, note: 'バランス型。迷ったらこれ。' },
  { id: 'fL', nameJa: '大ウキ（遠投）', short: '大', buoyG: 3.0, vis: 1.0, castMaxM: 32, sinkRate: 0.6, note: 'よく飛ぶ。小さなアタリは出にくい。' },
];

export interface HookDef { id: string; nameJa: string; size: number }
export const HOOKS: HookDef[] = [
  { id: 'h5', nameJa: '小バリ（5号）', size: 5 },
  { id: 'h7', nameJa: '中バリ（7号）', size: 7 },
  { id: 'h10', nameJa: '大バリ（10号）', size: 10 },
];
/** 魚種ごとの「ちょうどいい針サイズ」（号） */
export const IDEAL_HOOK: Record<string, number> = { aji: 6, saba: 7, kasago: 8, mebaru: 5, chinu: 8, seabass: 10, tachiuo: 10, madai: 9, buri: 14, esatori: 3 };

export interface BaitDef {
  id: string; nameJa: string; short: string;
  /** FISH_DATA の baits ID */
  dataId: string;
  /** エサ取り1回あたりに減る量 */
  esatoriLoss: number;
  /** 見た目の色 */
  color: number;
  scent: number; // 匂いの強さ 0..1
  note: string;
}
export const BAITS: BaitDef[] = [
  { id: 'okiami', nameJa: 'オキアミ', short: 'オキアミ', dataId: 'okiami', esatoriLoss: 0.35, color: 0xff9a7a, scent: 0.7, note: '万能。エサ取りにも弱い。' },
  { id: 'aoiso', nameJa: 'アオイソメ', short: 'アオイソメ', dataId: 'aoiso', esatoriLoss: 0.14, color: 0xc0505a, scent: 0.9, note: 'エサ持ちが良い。根魚・メバルに。' },
  { id: 'ebi_live', nameJa: '活きエビ', short: '活きエビ', dataId: 'ebi_live', esatoriLoss: 0.2, color: 0xe8b890, scent: 0.6, note: 'メバル・カサゴ・チヌに効く。' },
  { id: 'sakana_strip', nameJa: '魚の切り身', short: '切り身', dataId: 'sakana_strip', esatoriLoss: 0.18, color: 0xd8e0e8, scent: 0.85, note: 'カサゴ・サバ・タチウオ向き。' },
  { id: 'ika_strip', nameJa: 'イカ短冊', short: 'イカ', dataId: 'ika_strip', esatoriLoss: 0.1, color: 0xf2eee0, scent: 0.5, note: '持ちが良い。根魚に。' },
  { id: 'corn', nameJa: 'コーン', short: 'コーン', dataId: 'corn', esatoriLoss: 0.3, color: 0xf2c63a, scent: 0.4, note: 'チヌ向き。エサ取りには弱い。' },
];

export interface Rig {
  floatId: string;
  /** ウキ下（m）= ウキから針まで */
  depthM: number;
  hookId: string;
  baitId: string;
}
export interface RigPreset { id: string; nameJa: string; desc: string; rig: Rig }
export const RIG_PRESETS: RigPreset[] = [
  { id: 'easy', nameJa: 'おまかせ（アジ・メバル）', desc: '小ウキ・ウキ下3m・小バリ・オキアミ', rig: { floatId: 'fS', depthM: 3, hookId: 'h5', baitId: 'okiami' } },
  { id: 'bottom', nameJa: '底狙い（カサゴ）', desc: '中ウキ・ウキ下4m・中バリ・アオイソメ', rig: { floatId: 'fM', depthM: 4, hookId: 'h7', baitId: 'aoiso' } },
  { id: 'far', nameJa: '遠投（チヌ・大物）', desc: '大ウキ・ウキ下3.5m・中バリ・コーン', rig: { floatId: 'fL', depthM: 3.5, hookId: 'h7', baitId: 'corn' } },
];
export const DEFAULT_RIG: Rig = { ...RIG_PRESETS[0].rig };
export const DEPTH_MIN = 0.5, DEPTH_MAX = 10, DEPTH_STEP = 0.5;

/** タックル（T0固定）。SYSTEMS.md の T0（ナイロン5lb/強度2.3kgf）に合わせる */
export interface Tackle {
  rodPowerKgf: number; reelPowerKgf: number; reelSpeed: number;
  lineLb: number; lineType: 'nylon' | 'fluoro' | 'PE' | 'wire'; knotQ: number; stretch: number; abrRes: number; lineVis: number; knotEff: number;
  dragMax: number;
}
export const T0: Tackle = {
  rodPowerKgf: 2.3, reelPowerKgf: 2.3, reelSpeed: 1.35,
  lineLb: 5, lineType: 'nylon', knotQ: 0.95, stretch: 0.25, abrRes: 0.6, lineVis: 0.6, knotEff: 0.75,
  dragMax: 2.3,
};
export const bsRated = (t: Tackle) => t.lineLb * FIGHT.LB_TO_KGF;
export const bsEffBase = (t: Tackle) => bsRated(t) * t.knotEff * t.knotQ;
/** ドラグ推奨帯（kgf） */
export const dragRecommended = (t: Tackle): [number, number] => [bsRated(t) * FIGHT.DRAG_RECOMMENDED[0], bsRated(t) * FIGHT.DRAG_RECOMMENDED[1]];
