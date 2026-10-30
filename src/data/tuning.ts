/** ファイトコア定数（FISH_DESIGN §4.0）と、シム全体のチューニング値。QA/バランス調整はここだけ触る。 */
export const FIGHT = {
  DT: 1 / 30,
  LB_TO_KGF: 0.4536,
  PULL_EXP: 0.667,
  LENGTH_STRETCH_REF_M: 30,
  DRAG_STICTION: 1.0,
  DRAG_DYN_RATIO: 0.85,
  DRAG_RECOMMENDED: [0.25, 0.33] as const,
  DRAG_HEAT_RATE: 0.004,
  ROD_CUSHION_MAX: 0.30,
  ROD_IDEAL_ANGLE: 50, ROD_ANGLE_SIGMA: 25,
  ROD_OVERHEAD_PENALTY: 1.15,
  SLACK_THRESHOLD_T: 0.08,
  BREAK_SOFT_RATIO: 0.85,
  BREAK_SOFT_RATE: 2.0,
  ABR_K: 0.04,
  ABR_STRENGTH_LOSS: 0.85,
  DIVE_BASE_HAZARD: 0.5,
  DIVE_NEAR_M: 4,
  STAMINA_BASE_RATE: 0.25,
  STAMINA_PRESSURE_RATE: 1.2,
  STAMINA_REST_RECOVER: 0.03,
  LAND_STAMINA: 0.20, LAND_DIST_M: 2.0,
  BARBLESS_HOOKOUT_MULT: 2.2,
} as const;

/** 魚シム（FISH_DESIGN §2–3）の係数 */
export const SIM = {
  TICK: 0.1,            // 魚シムの刻み(s)
  FAR_TICK: 1.0,        // 遠くの魚の刻み(s)（軽量シム）
  NEAR_R: 22,           // これ以内の魚だけ完全なステートマシンを回す
  POP_R: 30,            // 魚を配置する半径(m)
  POP_N: 34,            // 目標個体数（エサ取り込み）
  ESATORI_N: 9,
  K_SEARCH: 0.25,       // 設計値 0.25/s
  SUSPICION_SCALE: 1.0,
  STIM_GAIN: 1.0,
  DEMO_WATER_C: 18,     // デモ水温（実海況は未連動）
  DEMO_MONTH_BLEND: 0.5, // 月別活性を平坦側に寄せる(0=平坦,1=データ通り)
  ATTRACT: 0.5,
  TOD_FLOOR: 0.4,    // デモ用: 時間帯重みの下限
  CONV_K: 4.5,       // 確信の上昇係数（FISH_DESIGN は 2.0。バランス調整用）
  BEGINNER_WINDOW: 1.8, // 合わせ窓の倍率（初心者救済）
  HOOK_BASE_FLOAT: 0.8,
  BASE_PRESSURE_DECAY: 0.003,
} as const;

/** 経済・成長は Phase 2 では未実装（デモ） */
export const DEMO = { baitInfinite: true } as const;

/** ファイトの追加チューニング（バランス用） */
export const FTUNE = {
  LOCK_K: 0.35,           // 根に入った魚の抵抗 F_lock = LOCK_K·F_sus·(1+rockDiving)
  PUSH: 0.25,             // 巻き込み圧: T = F_eff + PUSH·reel·(P_cap−F_eff)
  HOOKOUT_SCALE: 0.3,     // 首振り等でのバラシ確率の全体スケール（初心者救済）
  DIVE_SCALE: 0.5,        // 根潜りハザードのスケール
  SOFT_BREAK_SCALE: 1.0,
  STAMINA_SCALE: 1.0,
  START_CRUISE: [0.9, 1.8] as const,
  ABR_SCALE: 0.4,
} as const;
