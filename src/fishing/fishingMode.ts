/** 釣りモード（Phase 1 は「構え」まで。キャスト・ヒット・ファイトは Phase 2 以降）。 */
import type { FishingSite } from './spots';
export type PlayMode = 'move' | 'fish';
export interface FishingState { mode: PlayMode; site: FishingSite | null; method: 'float' | 'lure' | 'hole' }
export const FISHING_METHODS = [
  { id: 'float', ja: 'ウキ釣り', phase: 'Phase 2 で実装予定' },
  { id: 'lure', ja: 'ルアー', phase: 'Phase 4 で実装予定' },
  { id: 'hole', ja: '穴釣り', phase: 'Phase 4 で実装予定' },
] as const;
