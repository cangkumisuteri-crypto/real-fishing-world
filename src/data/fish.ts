/**
 * ★ PLACEHOLDER（Phase 2 で本実装）★
 * 魚種データモデルの雛形。Phase 1 ではゲームロジックから一切使われていない。
 * 数値はすべて仮の初期値で、実際の生態・釣果を保証するものではない（ゲーム内モデル）。
 */
import { SeabedZone, type SeabedZoneId } from './seabed';

export type FishMethod = 'float' | 'lure' | 'hole';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legend';

export interface FishSpecies {
  id: string;
  nameJa: string;
  /** 好む海底ゾーン */
  zones: SeabedZoneId[];
  /** 生息水深 (m) [min,max] */
  depthRange: [number, number];
  /** 活性が高い時間帯（時） [開始,終了]（跨ぎ可）。複数可 */
  activeHours: [number, number][];
  /** 適水温 (℃) [min,max] */
  tempRange: [number, number];
  /** 有効な釣法 */
  methods: FishMethod[];
  /** 警戒心 0-1 */
  wariness: number;
  /** サイズ cm [min, 通常最大, 超大型] */
  sizeCm: [number, number, number];
  /** 引きの強さ 0-1（ファイト用） */
  power: number;
  rarity: Rarity;
  /** 基本売価（ゲーム内通貨 ※実際のお金ではない） */
  baseValue: number;
  /** 必要仕掛け強度 0-1 */
  minTackle: number;
}

const Z = SeabedZone;
export const FISH_PLACEHOLDER = true;
export const FISH_SPECIES: FishSpecies[] = [
  { id: 'aji', nameJa: 'アジ', zones: [Z.Sand, Z.Wall, Z.Shallow], depthRange: [1, 8], activeHours: [[4, 8], [16, 21]], tempRange: [14, 26], methods: ['float', 'lure'], wariness: 0.3, sizeCm: [12, 25, 40], power: 0.2, rarity: 'common', baseValue: 40, minTackle: 0.1 },
  { id: 'saba', nameJa: 'サバ', zones: [Z.Deep, Z.Wall], depthRange: [2, 12], activeHours: [[5, 9], [16, 20]], tempRange: [14, 25], methods: ['float', 'lure'], wariness: 0.3, sizeCm: [20, 35, 50], power: 0.35, rarity: 'common', baseValue: 50, minTackle: 0.2 },
  { id: 'kasago', nameJa: 'カサゴ', zones: [Z.Reef, Z.Wall], depthRange: [1, 10], activeHours: [[0, 24]], tempRange: [10, 25], methods: ['hole', 'lure', 'float'], wariness: 0.25, sizeCm: [12, 22, 35], power: 0.3, rarity: 'common', baseValue: 80, minTackle: 0.1 },
  { id: 'mebaru', nameJa: 'メバル', zones: [Z.Weed, Z.Reef, Z.Wall], depthRange: [1, 8], activeHours: [[17, 24], [0, 5]], tempRange: [8, 20], methods: ['float', 'lure'], wariness: 0.4, sizeCm: [12, 22, 32], power: 0.25, rarity: 'common', baseValue: 90, minTackle: 0.1 },
  { id: 'chinu', nameJa: 'チヌ（クロダイ）', zones: [Z.Reef, Z.Weed, Z.Wall, Z.Shallow], depthRange: [1, 7], activeHours: [[5, 10], [17, 22]], tempRange: [12, 28], methods: ['float', 'lure'], wariness: 0.7, sizeCm: [25, 40, 60], power: 0.55, rarity: 'uncommon', baseValue: 220, minTackle: 0.35 },
  { id: 'seabass', nameJa: 'シーバス', zones: [Z.Wall, Z.Shallow, Z.Reef], depthRange: [1, 10], activeHours: [[17, 24], [0, 6]], tempRange: [12, 27], methods: ['lure', 'float'], wariness: 0.6, sizeCm: [40, 70, 100], power: 0.7, rarity: 'uncommon', baseValue: 350, minTackle: 0.5 },
  { id: 'tachiuo', nameJa: 'タチウオ', zones: [Z.Deep, Z.Wall], depthRange: [3, 20], activeHours: [[17, 23], [3, 6]], tempRange: [16, 27], methods: ['lure', 'float'], wariness: 0.5, sizeCm: [70, 100, 140], power: 0.5, rarity: 'uncommon', baseValue: 320, minTackle: 0.4 },
  { id: 'madai', nameJa: 'マダイ', zones: [Z.Reef, Z.Deep], depthRange: [5, 30], activeHours: [[4, 9], [16, 20]], tempRange: [13, 26], methods: ['float', 'lure'], wariness: 0.7, sizeCm: [25, 50, 90], power: 0.75, rarity: 'rare', baseValue: 700, minTackle: 0.6 },
  { id: 'buri', nameJa: 'ブリ', zones: [Z.Deep], depthRange: [5, 40], activeHours: [[4, 9], [15, 19]], tempRange: [13, 24], methods: ['lure', 'float'], wariness: 0.5, sizeCm: [50, 80, 120], power: 0.95, rarity: 'rare', baseValue: 900, minTackle: 0.8 },
];
