/** 海底ゾーン定義（Phase 2 で魚の生息判定に使う）。ここは型と名前だけ。計算は world/seabed.ts */
export const SeabedZone = { Sand: 0, Reef: 1, Weed: 2, Wall: 3, Deep: 4, Shallow: 5 } as const;
export type SeabedZoneId = (typeof SeabedZone)[keyof typeof SeabedZone];
export const SEABED_ZONE_NAMES: Record<number, { id: string; ja: string }> = {
  0: { id: 'sand', ja: '砂地' },
  1: { id: 'reef', ja: '根（岩礁）' },
  2: { id: 'weed', ja: '藻場' },
  3: { id: 'wall', ja: '岸壁際' },
  4: { id: 'deep', ja: '深場' },
  5: { id: 'shallow', ja: 'シャロー' },
};
