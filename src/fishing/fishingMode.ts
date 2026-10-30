/** 釣りモード（ウキ釣りは Phase 2 で実装。ルアー・穴釣りは今後）。 */
import type { FishingSite } from './spots';
export type PlayMode = 'move' | 'fish';
export interface FishingState { mode: PlayMode; site: FishingSite | null; method: 'float' | 'lure' | 'hole' }
export const FISHING_METHODS = [
  { id: 'float', ja: 'ウキ釣り', phase: '実装済み（Phase 2）' },
  { id: 'lure', ja: 'ルアー', phase: 'Phase 4 で実装予定' },
  { id: 'hole', ja: '穴釣り', phase: 'Phase 4 で実装予定' },
] as const;
