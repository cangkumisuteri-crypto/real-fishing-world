/**
 * REAL FISHING WORLD — systems_draft.ts
 * ---------------------------------------------------------------------------
 * DRAFT / DESIGN SKETCH. 何処からも import されていない（src/ には未接続）。
 * 自己完結: 外部依存なし。型検査: design/ で `npx tsc --ignoreConfig --noEmit --strict --target ES2020 --lib ES2020,DOM,DOM.Iterable systems_draft.ts`
 *   （tsc 7 は tsconfig があるとファイル指定を拒否するため --ignoreConfig が必要。noUncheckedIndexedAccess / exactOptionalPropertyTypes /
 *   noUnusedLocals / noUnusedParameters を足しても通る）。
 * `enum` は使わない（isolatedModules 互換）。詳細な設計意図・数値の根拠・API調査は SYSTEMS.md。
 *
 * 目次
 *   0. 共通ユーティリティ
 *   1. セーブ: 型 / 検証 / マイグレーション / 安全な load・save / export・import
 *   2. ショップ: アイテムモデルとカタログ
 *   3. 経済: XP・価格・「装備は腕に勝てない」ための式
 *   4. 現実連動: RealWorldAdapter / OpenMeteo / JMA潮位 / DemoAdapter / Fallback
 */

// ===========================================================================
// 0. 共通
// ===========================================================================

export type SpeciesId = string;
export type ItemId = string;
/** src/data/fish.ts の FishMethod / Rarity と同じ値（自己完結のため複製。統合時に import へ置換） */
export type FishMethod = 'float' | 'lure' | 'hole';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legend';

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
const asNum = (v: unknown, d: number, lo = -Infinity, hi = Infinity): number =>
  typeof v === 'number' && Number.isFinite(v) ? clamp(v, lo, hi) : d;
const asInt = (v: unknown, d: number, lo = -Infinity, hi = Infinity): number =>
  Math.round(asNum(v, d, lo, hi));
const asStr = (v: unknown, d: string, maxLen = 64): string =>
  typeof v === 'string' ? v.slice(0, maxLen) : d;
const asBool = (v: unknown, d: boolean): boolean => (typeof v === 'boolean' ? v : d);
function oneOf<T extends string>(v: unknown, allowed: readonly T[], d: T): T {
  return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : d;
}

/** FNV-1a 32bit。改ざん防止ではなく「壊れ/途中書き」検知用の軽量チェックサム */
export function fnv1a32(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/** 決定論的PRNG（デモデータ用）。同じ seed → 同じ列 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ===========================================================================
// 1. セーブ
// ===========================================================================

export const SAVE_MAGIC = 'RFW-SAVE' as const;
export const CURRENT_SCHEMA_VERSION = 1;

export const STORAGE_KEYS = {
  primary: 'rfw.save',
  backup: 'rfw.save.bak',
  /** 壊れたデータの退避先: rfw.save.bad.<epochMs>（最大 MAX_QUARANTINE 個） */
  quarantinePrefix: 'rfw.save.bad.',
  /** 新しい版のデータを退避: rfw.save.newer.v<version> */
  newerPrefix: 'rfw.save.newer.v',
  probe: 'rfw.probe',
  rwCache: 'rfw.rwcache',
} as const;

export const MAX_QUARANTINE = 3;
export const MAX_CATCH_LOG = 300;
export const BACKUP_MIN_INTERVAL_MS = 5 * 60 * 1000;

// ---- 1.1 データ型（schemaVersion 1） ----

export type EquipSlot = 'rod' | 'reel' | 'line' | 'float' | 'hook' | 'sinker' | 'bait' | 'lure' | 'holeRig';
export const EQUIP_SLOTS: readonly EquipSlot[] = [
  'rod', 'reel', 'line', 'float', 'hook', 'sinker', 'bait', 'lure', 'holeRig',
];

export interface GearState {
  /** itemId → 所持数（耐久財は 1、消耗品は個数） */
  owned: Record<ItemId, number>;
  equipped: Partial<Record<EquipSlot, ItemId>>;
}

export interface ZukanEntry {
  firstCaughtAt: number;
  count: number;
  maxSizeCm: number;
  /** 0..1 */
  bestQuality: number;
}

export type CatchFate = 'sold' | 'released' | 'aquarium' | 'kept';
export type DataMode = 'live' | 'demo' | 'mixed';

export interface CatchRecord {
  id: string;
  at: number;
  speciesId: SpeciesId;
  sizeCm: number;
  quality: number;
  method: FishMethod;
  spotId: string;
  fate: CatchFate;
  earnedG: number;
  xp: number;
  /** その時の環境データが実データかデモか（将来の実釣果と混ぜないため必須） */
  dataMode: DataMode;
  hour: number;
}

export interface AquariumFish {
  uid: string;
  speciesId: SpeciesId;
  sizeCm: number;
  caughtAt: number;
  tankId: string;
  nickname: string;
}
export interface AquariumState {
  tanks: { id: string; name: string; capacity: number }[];
  fish: AquariumFish[];
}

export interface RegionSetting {
  kind: 'preset' | 'custom';
  presetId: string;
  /** 0.1° に丸めて保持・送信（プライバシー） */
  lat: number;
  lon: number;
}
export interface SettingsV1 {
  moveSpeed: number;
  cameraMode: 'first' | 'third';
  soundVolume: number;
  graphics: 'low' | 'mid' | 'high';
  dataMode: 'auto' | 'demo';
  region: RegionSetting;
  /** 気象庁 潮位表の地点記号（例 "QS"）。未設定なら Open-Meteo の潮位 */
  jmaTideStation: string;
  shareGps: boolean;
  lastExportAt: number | null;
}

export interface SaveDataV1 {
  profile: { playerId: string; createdAt: number; playTimeSec: number };
  money: number;
  lifetimeEarned: number;
  xp: number;
  /** xp から導出できる値。保存はするが load 時に必ず xp から再計算する */
  level: number;
  gear: GearState;
  zukan: Record<SpeciesId, ZukanEntry>;
  catchLog: CatchRecord[];
  aquarium: AquariumState;
  settings: SettingsV1;
  stats: { casts: number; catches: number; lineBreaks: number; releases: number };
}

/** 現行スキーマの別名。v2 を作るときはここを SaveDataV2 に差し替える */
export type CurrentSave = SaveDataV1;

export interface SaveEnvelope {
  magic: typeof SAVE_MAGIC;
  schemaVersion: number;
  /** 保存ごとに +1。別タブ/別端末の上書き検知に使う */
  rev: number;
  savedAt: number;
  appVersion: string;
  /** fnv1a32(JSON.stringify(data)) */
  checksum: string;
  data: unknown;
}

// ---- 1.2 新規データと検証（lenient sanitize） ----

export const DEFAULT_REGION: RegionSetting = { kind: 'preset', presetId: 'sagami', lat: 35.3, lon: 139.5 };

export function createNewSave(now: number, playerId: string): SaveDataV1 {
  return {
    profile: { playerId, createdAt: now, playTimeSec: 0 },
    money: 300,
    lifetimeEarned: 0,
    xp: 0,
    level: 1,
    gear: {
      owned: { rod_starter: 1, reel_starter: 1, line_starter: 1, hook_starter: 1, bait_okiami: 10 },
      equipped: { rod: 'rod_starter', reel: 'reel_starter', line: 'line_starter', hook: 'hook_starter', bait: 'bait_okiami' },
    },
    zukan: {},
    catchLog: [],
    aquarium: { tanks: [{ id: 'tank1', name: '水槽1', capacity: 6 }], fish: [] },
    settings: {
      moveSpeed: 1,
      cameraMode: 'first',
      soundVolume: 0.7,
      graphics: 'mid',
      dataMode: 'auto',
      region: { ...DEFAULT_REGION },
      jmaTideStation: '',
      shareGps: false,
      lastExportAt: null,
    },
    stats: { casts: 0, catches: 0, lineBreaks: 0, releases: 0 },
  };
}

export class SaveValidationError extends Error {}

/**
 * 未知の値 → SaveDataV1。壊れた「一部」は既定値/クランプで補修し、全体がオブジェクトでない
 * 場合のみ throw する。補修した場所は repairs に積む。
 */
export function sanitizeV1(raw: unknown, now: number, repairs: string[] = []): SaveDataV1 {
  if (!isRecord(raw)) throw new SaveValidationError('save data is not an object');
  const base = createNewSave(now, 'recovered');

  const prof = isRecord(raw.profile) ? raw.profile : {};
  if (!isRecord(raw.profile)) repairs.push('profile');
  const profile = {
    playerId: asStr(prof.playerId, base.profile.playerId, 40),
    createdAt: asNum(prof.createdAt, now, 0),
    playTimeSec: asNum(prof.playTimeSec, 0, 0, 1e9),
  };

  const xp = asInt(raw.xp, 0, 0, 1e9);
  if (typeof raw.xp !== 'number') repairs.push('xp');

  // gear
  const g = isRecord(raw.gear) ? raw.gear : {};
  const owned: Record<ItemId, number> = {};
  if (isRecord(g.owned)) {
    for (const k of Object.keys(g.owned)) {
      const n = asInt(g.owned[k], 0, 0, 9999);
      if (n > 0) owned[k.slice(0, 48)] = n;
    }
  } else {
    repairs.push('gear.owned');
    Object.assign(owned, base.gear.owned);
  }
  const equipped: Partial<Record<EquipSlot, ItemId>> = {};
  const eq = isRecord(g.equipped) ? g.equipped : {};
  for (const slot of EQUIP_SLOTS) {
    const id = eq[slot];
    // 所持していないものは装備扱いにしない（不整合/改ざん対策）
    if (typeof id === 'string' && (owned[id] ?? 0) > 0) equipped[slot] = id;
  }
  for (const slot of ['rod', 'reel', 'line'] as const) {
    if (!equipped[slot]) {
      const fb = base.gear.equipped[slot];
      if (fb !== undefined) {
        owned[fb] = Math.max(1, owned[fb] ?? 0);
        equipped[slot] = fb;
        repairs.push(`gear.equipped.${slot}`);
      }
    }
  }

  // zukan
  const zukan: Record<SpeciesId, ZukanEntry> = {};
  if (isRecord(raw.zukan)) {
    for (const k of Object.keys(raw.zukan)) {
      const e = raw.zukan[k];
      if (!isRecord(e)) { repairs.push(`zukan.${k}`); continue; }
      zukan[k.slice(0, 32)] = {
        firstCaughtAt: asNum(e.firstCaughtAt, now, 0),
        count: asInt(e.count, 1, 1, 1e7),
        maxSizeCm: asNum(e.maxSizeCm, 0, 0, 1000),
        bestQuality: asNum(e.bestQuality, 0, 0, 1),
      };
    }
  }

  // catch log（古い順 → 末尾 MAX_CATCH_LOG 件だけ保持）
  const log: CatchRecord[] = [];
  if (Array.isArray(raw.catchLog)) {
    for (const r of raw.catchLog as unknown[]) {
      if (!isRecord(r) || typeof r.speciesId !== 'string') { repairs.push('catchLog[]'); continue; }
      log.push({
        id: asStr(r.id, `c${log.length}`, 40),
        at: asNum(r.at, 0, 0),
        speciesId: r.speciesId.slice(0, 32),
        sizeCm: asNum(r.sizeCm, 0, 0, 1000),
        quality: asNum(r.quality, 0, 0, 1),
        method: oneOf<FishMethod>(r.method, ['float', 'lure', 'hole'], 'float'),
        spotId: asStr(r.spotId, 'unknown', 32),
        fate: oneOf<CatchFate>(r.fate, ['sold', 'released', 'aquarium', 'kept'], 'kept'),
        earnedG: asInt(r.earnedG, 0, 0, 1e9),
        xp: asInt(r.xp, 0, 0, 1e6),
        dataMode: oneOf<DataMode>(r.dataMode, ['live', 'demo', 'mixed'], 'demo'),
        hour: asInt(r.hour, 0, 0, 23),
      });
    }
  }

  // aquarium
  const aq = isRecord(raw.aquarium) ? raw.aquarium : {};
  const tanks: AquariumState['tanks'] = [];
  if (Array.isArray(aq.tanks)) {
    for (const t of aq.tanks as unknown[]) {
      if (isRecord(t)) tanks.push({ id: asStr(t.id, `tank${tanks.length + 1}`, 24), name: asStr(t.name, '水槽', 24), capacity: asInt(t.capacity, 6, 1, 100) });
    }
  }
  if (tanks.length === 0) tanks.push(...base.aquarium.tanks);
  const firstTank = tanks[0]?.id ?? 'tank1';
  const fish: AquariumFish[] = [];
  if (Array.isArray(aq.fish)) {
    for (const f of aq.fish as unknown[]) {
      if (!isRecord(f) || typeof f.speciesId !== 'string') continue;
      const tankId = asStr(f.tankId, firstTank, 24);
      fish.push({
        uid: asStr(f.uid, `f${fish.length}`, 40),
        speciesId: f.speciesId.slice(0, 32),
        sizeCm: asNum(f.sizeCm, 0, 0, 1000),
        caughtAt: asNum(f.caughtAt, 0, 0),
        tankId: tanks.some((t) => t.id === tankId) ? tankId : firstTank,
        nickname: asStr(f.nickname, '', 24),
      });
    }
  }

  // settings
  const s = isRecord(raw.settings) ? raw.settings : {};
  const rg = isRecord(s.region) ? s.region : {};
  const settings: SettingsV1 = {
    moveSpeed: asNum(s.moveSpeed, 1, 0.5, 2),
    cameraMode: oneOf(s.cameraMode, ['first', 'third'] as const, 'first'),
    soundVolume: asNum(s.soundVolume, 0.7, 0, 1),
    graphics: oneOf(s.graphics, ['low', 'mid', 'high'] as const, 'mid'),
    dataMode: oneOf(s.dataMode, ['auto', 'demo'] as const, 'auto'),
    region: {
      kind: oneOf(rg.kind, ['preset', 'custom'] as const, 'preset'),
      presetId: asStr(rg.presetId, DEFAULT_REGION.presetId, 24),
      lat: Math.round(asNum(rg.lat, DEFAULT_REGION.lat, -90, 90) * 10) / 10,
      lon: Math.round(asNum(rg.lon, DEFAULT_REGION.lon, -180, 180) * 10) / 10,
    },
    jmaTideStation: asStr(s.jmaTideStation, '', 4),
    shareGps: asBool(s.shareGps, false),
    lastExportAt: typeof s.lastExportAt === 'number' && Number.isFinite(s.lastExportAt) ? s.lastExportAt : null,
  };

  const st = isRecord(raw.stats) ? raw.stats : {};
  return {
    profile,
    money: asInt(raw.money, base.money, 0, 1e9),
    lifetimeEarned: asInt(raw.lifetimeEarned, 0, 0, 1e12),
    xp,
    level: levelFromXp(xp), // 常に xp から再計算
    gear: { owned, equipped },
    zukan,
    catchLog: log.slice(-MAX_CATCH_LOG),
    aquarium: { tanks, fish },
    settings,
    stats: {
      casts: asInt(st.casts, 0, 0, 1e9),
      catches: asInt(st.catches, 0, 0, 1e9),
      lineBreaks: asInt(st.lineBreaks, 0, 0, 1e9),
      releases: asInt(st.releases, 0, 0, 1e9),
    },
  };
}

// ---- 1.3 マイグレーションチェーン ----

/** from バージョンのデータ → from+1 のデータ。純関数（入力を破壊しない） */
export type Migration = (old: Record<string, unknown>) => Record<string, unknown>;

/**
 * キー = 「移行元」バージョン。0 = エンベロープ無しの旧プロトタイプ形式（money / xp 程度を想定）。
 *
 * 例（将来 v2 で settings.language を追加する場合）:
 *   1: (d) => ({ ...d, settings: { ...(d.settings as object), language: 'ja' } }),
 * 追加後は CURRENT_SCHEMA_VERSION を 2 にし、sanitizeV1 を sanitizeV2 に拡張する。
 * 旧スキーマの検証関数は残さない（必ず最新まで migrate してから sanitize する）。
 */
export const MIGRATIONS: Readonly<Record<number, Migration>> = {
  0: (old) => ({
    money: old.money,
    xp: old.xp,
    gear: old.gear,
    zukan: old.zukan,
    settings: old.settings,
  }),
};

export class MigrationError extends Error {}

/** data を fromVersion から CURRENT_SCHEMA_VERSION まで順に移行する。新しい版は拒否 */
export function migrate(fromVersion: number, data: unknown): { data: Record<string, unknown>; steps: number[] } {
  if (!Number.isInteger(fromVersion) || fromVersion < 0) throw new MigrationError(`invalid version ${String(fromVersion)}`);
  if (fromVersion > CURRENT_SCHEMA_VERSION) throw new MigrationError(`newer version ${fromVersion} > ${CURRENT_SCHEMA_VERSION}`);
  if (!isRecord(data)) throw new MigrationError('data is not an object');
  let cur = JSON.parse(JSON.stringify(data)) as Record<string, unknown>;
  const steps: number[] = [];
  for (let v = fromVersion; v < CURRENT_SCHEMA_VERSION; v++) {
    const step = MIGRATIONS[v];
    if (!step) throw new MigrationError(`missing migration ${v} -> ${v + 1}`);
    cur = step(cur);
    steps.push(v);
  }
  return { data: cur, steps };
}

// ---- 1.4 ストレージ抽象 ----

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  key(index: number): string | null;
  readonly length: number;
}

/** private mode / Storage 拒否時の代替。メモリのみ（リロードで消える → UIで警告必須） */
export class MemoryStorage implements StorageLike {
  private m = new Map<string, string>();
  get length(): number { return this.m.size; }
  getItem(k: string): string | null { return this.m.get(k) ?? null; }
  setItem(k: string, v: string): void { this.m.set(k, v); }
  removeItem(k: string): void { this.m.delete(k); }
  key(i: number): string | null { return Array.from(this.m.keys())[i] ?? null; }
}

/** localStorage が使えるか実際に書いて確かめる（Safari の private/ITP/拒否設定対策） */
export function probeStorage(): StorageLike | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    localStorage.setItem(STORAGE_KEYS.probe, '1');
    if (localStorage.getItem(STORAGE_KEYS.probe) !== '1') return null;
    localStorage.removeItem(STORAGE_KEYS.probe);
    return localStorage;
  } catch {
    return null;
  }
}

export function isQuotaError(e: unknown): boolean {
  if (typeof e !== 'object' || e === null) return false;
  const err = e as { name?: unknown; code?: unknown };
  return err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED' || err.code === 22 || err.code === 1014;
}

// ---- 1.5 SaveManager ----

export type NoticeCode =
  | 'MIGRATED' | 'REPAIRED_FIELDS' | 'CORRUPT_QUARANTINED' | 'RESTORED_FROM_BACKUP'
  | 'NEWER_VERSION_LOCKED' | 'STORAGE_UNAVAILABLE' | 'QUOTA_TRIMMED' | 'BACKUP_FAILED' | 'CONFLICT';
export interface SaveNotice { code: NoticeCode; severity: 'info' | 'warn' | 'error'; detail: string }

export type LoadStatus = 'ok' | 'fresh' | 'restored' | 'newer-version' | 'storage-unavailable';
export interface LoadResult {
  status: LoadStatus;
  save: SaveDataV1;
  rev: number;
  /** true の間 save() は何も書かない（新しい版のデータを守る） */
  writeLocked: boolean;
  /** true ならメモリのみ。「この端末では保存できません」をUIに出す */
  volatile: boolean;
  notices: SaveNotice[];
}

export type SaveFailReason = 'locked-newer-version' | 'conflict' | 'quota' | 'storage-error' | 'verify-failed';
export type SaveOutcome =
  | { ok: true; rev: number; volatile: boolean; notices: SaveNotice[] }
  | { ok: false; reason: SaveFailReason; detail: string; notices: SaveNotice[] };

export interface SaveManagerOptions {
  now?: () => number;
  appVersion?: string;
  newPlayerId?: () => string;
}

export interface ImportPreview {
  save: SaveDataV1;
  fromVersion: number;
  savedAt: number;
  repairs: string[];
}

interface ParsedRaw {
  env: SaveEnvelope;
  /** checksum 一致（v0 の無印データは true 扱い） */
  checksumOk: boolean;
}

type ReadOutcome =
  | { kind: 'ok'; save: SaveDataV1; rev: number }
  | { kind: 'newer'; version: number }
  | { kind: 'bad' };

export class SaveManager {
  private readonly store: StorageLike;
  private readonly volatile: boolean;
  private readonly now: () => number;
  private readonly appVersion: string;
  private readonly newId: () => string;
  private rev = 0;
  private locked = false;
  private lastBackupAt = 0;

  /** storage に null（probeStorage 失敗）を渡すとメモリ保存へ縮退する */
  constructor(storage: StorageLike | null, opts: SaveManagerOptions = {}) {
    this.volatile = storage === null;
    this.store = storage ?? new MemoryStorage();
    this.now = opts.now ?? ((): number => Date.now());
    this.appVersion = opts.appVersion ?? '0.0.0-draft';
    this.newId = opts.newPlayerId ?? ((): string => 'p' + Math.floor(Math.random() * 0xffffffff).toString(36) + this.now().toString(36));
  }

  isWriteLocked(): boolean { return this.locked; }
  isVolatile(): boolean { return this.volatile; }

  /** 起動時に1回。例外は投げない */
  load(): LoadResult {
    const notices: SaveNotice[] = [];
    const now = this.now();
    if (this.volatile) {
      notices.push({ code: 'STORAGE_UNAVAILABLE', severity: 'warn', detail: 'localStorage を使えません（プライベートブラウズ等）。進行は保存されません。書き出しで控えを取ってください。' });
    }

    const rawPrimary = this.safeGet(STORAGE_KEYS.primary);
    if (rawPrimary === null) {
      return this.result(this.volatile ? 'storage-unavailable' : 'fresh', createNewSave(now, this.newId()), notices);
    }

    const primary = this.tryRead(rawPrimary, now, notices, 'primary');
    if (primary.kind === 'newer') return this.lockNewer(primary.version, notices);
    if (primary.kind === 'ok') return this.result('ok', primary.save, notices, primary.rev);

    // primary が壊れている → 隔離（削除しない）してバックアップを試す
    this.quarantine(rawPrimary, notices);
    const rawBak = this.safeGet(STORAGE_KEYS.backup);
    if (rawBak !== null) {
      const bak = this.tryRead(rawBak, now, notices, 'backup');
      if (bak.kind === 'newer') return this.lockNewer(bak.version, notices);
      if (bak.kind === 'ok') {
        notices.push({ code: 'RESTORED_FROM_BACKUP', severity: 'warn', detail: 'セーブデータが壊れていたため、直前のバックアップから復元しました。' });
        return this.result('restored', bak.save, notices, bak.rev);
      }
    }
    // どちらも駄目: 新規で続行。壊れた生データは隔離済みで、primary キーも次の保存まで触らない
    return this.result('fresh', createNewSave(now, this.newId()), notices);
  }

  /** 保存。呼び出し側は戻り値を必ず見て、ok でなければ UI に出す */
  save(data: SaveDataV1): SaveOutcome {
    const notices: SaveNotice[] = [];
    if (this.locked) {
      return { ok: false, reason: 'locked-newer-version', detail: '新しい版のデータが保存されているため上書きしません。', notices };
    }
    const now = this.now();
    const existingRaw = this.safeGet(STORAGE_KEYS.primary);
    let existingValid: string | null = null;
    if (existingRaw !== null) {
      const p = this.parseRaw(existingRaw);
      if (p && p.env.schemaVersion > CURRENT_SCHEMA_VERSION) {
        this.locked = true;
        return { ok: false, reason: 'locked-newer-version', detail: `別のタブ/端末が v${p.env.schemaVersion} で保存しました。`, notices };
      }
      if (p && p.env.rev > this.rev) {
        notices.push({ code: 'CONFLICT', severity: 'error', detail: '別のタブで先に保存されています。再読み込みしてください。' });
        return { ok: false, reason: 'conflict', detail: `stored rev ${p.env.rev} > memory rev ${this.rev}`, notices };
      }
      if (p && p.checksumOk && p.env.schemaVersion === CURRENT_SCHEMA_VERSION) existingValid = existingRaw;
    }

    const clean = sanitizeV1(data, now);
    const nextRev = this.rev + 1;
    let raw = this.serialize(clean, nextRev, now);

    // 直前の「正常な」世代をバックアップ（頻度制限つき）。壊れた世代はバックアップにしない
    if (existingValid !== null && now - this.lastBackupAt >= BACKUP_MIN_INTERVAL_MS) {
      try { this.store.setItem(STORAGE_KEYS.backup, existingValid); this.lastBackupAt = now; }
      catch (e) { notices.push({ code: 'BACKUP_FAILED', severity: 'warn', detail: String(e) }); }
    }

    try {
      this.store.setItem(STORAGE_KEYS.primary, raw);
    } catch (e) {
      if (!isQuotaError(e)) return { ok: false, reason: 'storage-error', detail: String(e), notices };
      // 容量超過: 隔離データを捨て → 釣果ログを圧縮 して1回だけ再試行
      this.dropQuarantine();
      raw = this.serialize({ ...clean, catchLog: clean.catchLog.slice(-100) }, nextRev, now);
      try {
        this.store.setItem(STORAGE_KEYS.primary, raw);
        notices.push({ code: 'QUOTA_TRIMMED', severity: 'warn', detail: '保存容量が不足したため釣果履歴を直近100件に圧縮しました。書き出しで控えを取ってください。' });
      } catch (e2) {
        return { ok: false, reason: isQuotaError(e2) ? 'quota' : 'storage-error', detail: String(e2), notices };
      }
    }

    // 読み戻し検証（書き込み失敗/切り詰め対策）
    if (this.safeGet(STORAGE_KEYS.primary) !== raw) {
      if (existingRaw !== null) { try { this.store.setItem(STORAGE_KEYS.primary, existingRaw); } catch { /* 復旧不能でも既存を壊さないよう最善を尽くす */ } }
      return { ok: false, reason: 'verify-failed', detail: 'read-back mismatch', notices };
    }
    this.rev = nextRev;
    return { ok: true, rev: nextRev, volatile: this.volatile, notices };
  }

  // ---- 新しい版のデータの扱い（ユーザー操作でのみ解除） ----

  /**
   * 新しい版のデータを別キーへ退避してから新規で始める。退避に失敗したら何もしない（データを守る）。
   * 呼び出し前に UI で確認を取ること。
   */
  archiveNewerAndStartFresh(): SaveOutcome {
    const notices: SaveNotice[] = [];
    const raw = this.safeGet(STORAGE_KEYS.primary);
    if (raw === null) { this.locked = false; return { ok: true, rev: this.rev, volatile: this.volatile, notices }; }
    const p = this.parseRaw(raw);
    const ver = p ? p.env.schemaVersion : 0;
    try { this.store.setItem(`${STORAGE_KEYS.newerPrefix}${ver}`, raw); }
    catch (e) { return { ok: false, reason: isQuotaError(e) ? 'quota' : 'storage-error', detail: String(e), notices }; }
    this.store.removeItem(STORAGE_KEYS.primary);
    this.locked = false;
    this.rev = 0;
    return { ok: true, rev: 0, volatile: this.volatile, notices };
  }

  // ---- export / import ----

  /** 書き出し用テキスト（エンベロープ付きJSON）。ファイル保存 / クリップボード / 共有シートに渡す */
  exportText(data: SaveDataV1): string {
    const now = this.now();
    return this.serialize(sanitizeV1(data, now), this.rev, now);
  }

  /** 取り込み前の検証とプレビュー。この段階では何も書かない */
  prepareImport(text: string): { ok: true; preview: ImportPreview } | { ok: false; error: string } {
    const now = this.now();
    const p = this.parseRaw(text);
    if (!p) return { ok: false, error: 'セーブデータの形式ではありません。' };
    if (!p.checksumOk) return { ok: false, error: 'チェックサムが一致しません（壊れているか、編集されています）。' };
    if (p.env.schemaVersion > CURRENT_SCHEMA_VERSION) {
      return { ok: false, error: `このデータは新しい版(v${p.env.schemaVersion})です。アプリを更新してから取り込んでください。` };
    }
    try {
      const m = migrate(p.env.schemaVersion, p.env.data);
      const repairs: string[] = [];
      const save = sanitizeV1(m.data, now, repairs);
      return { ok: true, preview: { save, fromVersion: p.env.schemaVersion, savedAt: p.env.savedAt, repairs } };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  }

  /** プレビューをユーザーが承認した後に呼ぶ。現在のデータはバックアップへ退避してから置換 */
  commitImport(preview: ImportPreview): SaveOutcome {
    const notices: SaveNotice[] = [];
    const cur = this.safeGet(STORAGE_KEYS.primary);
    if (cur !== null) {
      const p = this.parseRaw(cur);
      if (p && p.env.schemaVersion > CURRENT_SCHEMA_VERSION) {
        // 新しい版のデータは取り込みでも上書きしない。先に archiveNewerAndStartFresh() が必要
        return { ok: false, reason: 'locked-newer-version', detail: '新しい版のデータが残っています。', notices };
      }
      if (p && p.checksumOk) {
        try { this.store.setItem(STORAGE_KEYS.backup, cur); this.lastBackupAt = this.now(); }
        catch (e) { return { ok: false, reason: isQuotaError(e) ? 'quota' : 'storage-error', detail: 'バックアップに失敗したため取り込みを中止: ' + String(e), notices }; }
        this.rev = Math.max(this.rev, p.env.rev); // 競合判定を通すため（ユーザーが承認済み）
      }
    }
    this.locked = false;
    return this.save(preview.save);
  }

  // ---- 内部 ----

  private result(status: LoadStatus, save: SaveDataV1, notices: SaveNotice[], rev = 0): LoadResult {
    this.rev = rev;
    return { status, save, rev, writeLocked: this.locked, volatile: this.volatile, notices };
  }

  /** 新しい版のデータは一切変更しない。一時的な新規データで遊べるが保存されない */
  private lockNewer(version: number, notices: SaveNotice[]): LoadResult {
    this.locked = true;
    notices.push({ code: 'NEWER_VERSION_LOCKED', severity: 'error', detail: `保存データは新しい版(v${version})です。アプリを更新してください。それまで保存せず、データには触れません。` });
    return this.result('newer-version', createNewSave(this.now(), this.newId()), notices);
  }

  private tryRead(raw: string, now: number, notices: SaveNotice[], label: string): ReadOutcome {
    const p = this.parseRaw(raw);
    if (!p) return { kind: 'bad' };
    if (p.env.schemaVersion > CURRENT_SCHEMA_VERSION) return { kind: 'newer', version: p.env.schemaVersion };
    if (!p.checksumOk) return { kind: 'bad' };
    try {
      const m = migrate(p.env.schemaVersion, p.env.data);
      const repairs: string[] = [];
      const save = sanitizeV1(m.data, now, repairs);
      if (m.steps.length > 0) {
        notices.push({ code: 'MIGRATED', severity: 'info', detail: `${label}: v${p.env.schemaVersion} → v${CURRENT_SCHEMA_VERSION}` });
        // 移行前の世代は必ず backup に残す（以後 5 分間は backup を更新しない）
        try { this.store.setItem(STORAGE_KEYS.backup, raw); this.lastBackupAt = this.now(); } catch { /* 容量不足でも続行 */ }
      }
      if (repairs.length > 0) notices.push({ code: 'REPAIRED_FIELDS', severity: 'warn', detail: `${label}: ${repairs.slice(0, 5).join(', ')}` });
      return { kind: 'ok', save, rev: p.env.rev };
    } catch {
      return { kind: 'bad' };
    }
  }

  /** エンベロープ（無ければ v0 とみなして包む）。JSON として読めなければ null */
  private parseRaw(raw: string): ParsedRaw | null {
    let j: unknown;
    try { j = JSON.parse(raw); } catch { return null; }
    if (!isRecord(j)) return null;
    if (j.magic === SAVE_MAGIC && typeof j.schemaVersion === 'number' && 'data' in j) {
      const env: SaveEnvelope = {
        magic: SAVE_MAGIC,
        schemaVersion: Math.floor(j.schemaVersion),
        rev: asInt(j.rev, 0, 0, 1e12),
        savedAt: asNum(j.savedAt, 0, 0),
        appVersion: asStr(j.appVersion, '', 32),
        checksum: asStr(j.checksum, '', 16),
        data: j.data,
      };
      return { env, checksumOk: env.checksum === fnv1a32(JSON.stringify(env.data)) };
    }
    // 旧プロトタイプ: エンベロープ無しのオブジェクト = v0
    if (typeof j.money === 'number' || typeof j.xp === 'number') {
      return { env: { magic: SAVE_MAGIC, schemaVersion: 0, rev: 0, savedAt: 0, appVersion: '', checksum: '', data: j }, checksumOk: true };
    }
    return null;
  }

  private serialize(data: SaveDataV1, rev: number, now: number): string {
    const env: SaveEnvelope = {
      magic: SAVE_MAGIC,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      rev,
      savedAt: now,
      appVersion: this.appVersion,
      checksum: fnv1a32(JSON.stringify(data)),
      data,
    };
    return JSON.stringify(env);
  }

  private safeGet(key: string): string | null {
    try { return this.store.getItem(key); } catch { return null; }
  }

  private quarantine(raw: string, notices: SaveNotice[]): void {
    try {
      this.store.setItem(`${STORAGE_KEYS.quarantinePrefix}${this.now()}`, raw);
      this.pruneQuarantine();
      notices.push({ code: 'CORRUPT_QUARANTINED', severity: 'warn', detail: '壊れたセーブデータを退避しました（削除していません）。' });
    } catch {
      notices.push({ code: 'CORRUPT_QUARANTINED', severity: 'error', detail: '壊れたデータを退避できませんでした（容量不足）。元のデータは次の保存まで残ります。' });
    }
  }

  private quarantineKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.store.length; i++) {
      const k = this.store.key(i);
      if (k !== null && k.startsWith(STORAGE_KEYS.quarantinePrefix)) keys.push(k);
    }
    return keys.sort();
  }
  private pruneQuarantine(): void {
    const keys = this.quarantineKeys();
    while (keys.length > MAX_QUARANTINE) {
      const k = keys.shift();
      if (k !== undefined) this.store.removeItem(k);
    }
  }
  private dropQuarantine(): void {
    for (const k of this.quarantineKeys()) this.store.removeItem(k);
  }
}

/**
 * iOS Safari は pagehide / visibilitychange(hidden) が最後に確実に来るイベント
 * （beforeunload は来ないことが多い）。保存はイベント駆動 + 定期（30秒）。
 */
export function installAutosave(mgr: SaveManager, getData: () => SaveDataV1, onOutcome: (o: SaveOutcome) => void): () => void {
  const run = (): void => onOutcome(mgr.save(getData()));
  const onHide = (): void => { if (document.visibilityState === 'hidden') run(); };
  document.addEventListener('visibilitychange', onHide);
  window.addEventListener('pagehide', run);
  const timer = window.setInterval(run, 30_000);
  return () => {
    document.removeEventListener('visibilitychange', onHide);
    window.removeEventListener('pagehide', run);
    window.clearInterval(timer);
  };
}

// ===========================================================================
// 2. ショップ — アイテムモデル
// ===========================================================================
// 方針: 道具の「物理量」(kgf / lb) は FISH_DESIGN.md のファイトモデル（rod.powerKgf / reelPower /
// line.lb ...）にそのまま渡せる単位で持つ。ただし T4 で最強の魚（ブリ大型 F_sus≈17.8kgf）を
// 余裕で扱える水準に達し、T5 は「快適さ」だけが伸びる（強さは頭打ち）。
// 餌・ルアーは FISH_DATA.json の catalog id（amiebi / sabiki ...）をそのまま使う。魚ごとの
// 反応（response）は魚側のデータ＝プレイヤーの「知識」。アイテム側は品質倍率（最大 +15%）のみ。

export type Tier = 0 | 1 | 2 | 3 | 4 | 5;
export type LineType = 'nylon' | 'fluoro' | 'pe';
export type BaitCatalogId =
  | 'amiebi' | 'okiami' | 'aoiso' | 'ebi_live' | 'sakana_strip' | 'ika_strip' | 'kani' | 'corn' | 'live_fish' | 'konoshiro_live';
export type LureCatalogId =
  | 'sabiki' | 'jighead_worm' | 'minnow' | 'vibration' | 'topwater' | 'metal_jig' | 'wind_jig' | 'tenya' | 'tairubber' | 'bukuri' | 'crab_lure';

interface ItemBase {
  id: ItemId;
  nameJa: string;
  tier: Tier;
  /** G（ゲーム内通貨）。実際のお金ではない */
  price: number;
  /** 購入に必要なレベル */
  minLevel: number;
  /** 耐久財の売却額 = price × SELL_BACK_RATIO */
  note?: string;
}
export interface RodItem extends ItemBase {
  slot: 'rod';
  /** 持ち上げ力 [kgf]（ファイトの rodLift に使用） */
  powerKgf: number;
  castDistanceM: number;
  /** タイミング窓への寄与（合算 → 逓減してキャップ） */
  windowBonus: number;
}
export interface ReelItem extends ItemBase {
  slot: 'reel';
  reelPowerKgf: number;
  reelSpeed: number;
  dragMaxKgf: number;
  windowBonus: number;
}
export interface LineItem extends ItemBase {
  slot: 'line';
  lineType: LineType;
  lb: number;
  /** 定格強度 [kgf] = lb × 0.4536 */
  ratedKgf: number;
  /** 伸び 0..1（大きいほど緩衝） */
  stretch: number;
  /** 0 = 見えにくい .. 1 = 目立つ。警戒心の高い魚で効く（上限つき） */
  visibility: number;
}
export interface FloatItem extends ItemBase { slot: 'float'; windowBonus: number; nightVisible: boolean }
export interface HookItem extends ItemBase { slot: 'hook'; windowBonus: number; hookOutMult: number }
export interface SinkerItem extends ItemBase { slot: 'sinker'; showsDepth: boolean }
export interface HoleRigItem extends ItemBase { slot: 'holeRig'; windowBonus: number }
export interface BaitItem extends ItemBase {
  slot: 'bait';
  catalogId: BaitCatalogId;
  packSize: number;
  /** 1回のキャストで消費する個数（活き餌は1匹で複数回） */
  usePerCast: number;
  /** 品質倍率 1.0..1.15（鮮度など）。魚ごとの反応は FISH_DATA 側 */
  qualityMult: number;
}
export interface LureItem extends ItemBase {
  slot: 'lure';
  catalogId: LureCatalogId;
  /** ロストしやすさ（1キャストあたりのロスト確率） */
  lossPerCast: number;
  qualityMult: number;
}
export type ShopItem = RodItem | ReelItem | LineItem | FloatItem | HookItem | SinkerItem | HoleRigItem | BaitItem | LureItem;

/** ティア別の価格レンジ（耐久財 1 点あたり）。カタログはこの範囲に収める（テストで検証） */
export const TIER_PRICE_RANGE: Readonly<Record<Tier, readonly [number, number]>> = {
  0: [0, 0],
  1: [80, 1500],
  2: [300, 6000],
  3: [1500, 22000],
  4: [4000, 75000],
  5: [30000, 260000],
};
/** ティア購入に必要なレベル */
export const TIER_UNLOCK_LEVEL: Readonly<Record<Tier, number>> = { 0: 1, 1: 3, 2: 8, 3: 16, 4: 28, 5: 50 };
export const SELL_BACK_RATIO = 0.4;
/** 強さ(0..1)換算: min(rod, reel, line) [kgf] / STRENGTH_REF_KGF。10kgf で 1.0 */
export const STRENGTH_REF_KGF = 10;

const item = <T extends ShopItem>(x: T): T => x;
const LB = 0.4536;

export const SHOP_CATALOG: readonly ShopItem[] = [
  // --- 竿 ---
  item<RodItem>({ id: 'rod_starter', slot: 'rod', nameJa: '初心者ロッド', tier: 0, price: 0, minLevel: 1, powerKgf: 2.5, castDistanceM: 15, windowBonus: 0 }),
  item<RodItem>({ id: 'rod_t1', slot: 'rod', nameJa: 'コンパクトロッド', tier: 1, price: 540, minLevel: 3, powerKgf: 3.5, castDistanceM: 25, windowBonus: 0.02 }),
  item<RodItem>({ id: 'rod_t2', slot: 'rod', nameJa: '万能磯竿 1.5号', tier: 2, price: 2000, minLevel: 8, powerKgf: 5.5, castDistanceM: 40, windowBonus: 0.04 }),
  item<RodItem>({ id: 'rod_t3', slot: 'rod', nameJa: 'シーバス/ロックフィッシュロッド', tier: 3, price: 11000, minLevel: 16, powerKgf: 8, castDistanceM: 60, windowBonus: 0.06 }),
  item<RodItem>({ id: 'rod_t4', slot: 'rod', nameJa: '高感度カーボンロッド', tier: 4, price: 39000, minLevel: 28, powerKgf: 11, castDistanceM: 75, windowBonus: 0.08 }),
  item<RodItem>({ id: 'rod_t5', slot: 'rod', nameJa: '匠のチタンガイドロッド', tier: 5, price: 224000, minLevel: 50, powerKgf: 12, castDistanceM: 80, windowBonus: 0.09, note: '強さは T4 と同等。感度と軽さだけ' }),
  // --- リール ---
  item<ReelItem>({ id: 'reel_starter', slot: 'reel', nameJa: '初心者リール', tier: 0, price: 0, minLevel: 1, reelPowerKgf: 2.5, reelSpeed: 0.8, dragMaxKgf: 1.0, windowBonus: 0 }),
  item<ReelItem>({ id: 'reel_t1', slot: 'reel', nameJa: 'スピニング 2000', tier: 1, price: 420, minLevel: 3, reelPowerKgf: 3.5, reelSpeed: 0.9, dragMaxKgf: 1.4, windowBonus: 0.01 }),
  item<ReelItem>({ id: 'reel_t2', slot: 'reel', nameJa: 'スピニング 2500 ボールベアリング', tier: 2, price: 1500, minLevel: 8, reelPowerKgf: 5.5, reelSpeed: 1.0, dragMaxKgf: 2.2, windowBonus: 0.02 }),
  item<ReelItem>({ id: 'reel_t3', slot: 'reel', nameJa: 'スピニング 3000 防水ドラグ', tier: 3, price: 8400, minLevel: 16, reelPowerKgf: 8, reelSpeed: 1.1, dragMaxKgf: 3.5, windowBonus: 0.03 }),
  item<ReelItem>({ id: 'reel_t4', slot: 'reel', nameJa: 'スピニング 4000 ハイギア', tier: 4, price: 31000, minLevel: 28, reelPowerKgf: 11, reelSpeed: 1.2, dragMaxKgf: 5, windowBonus: 0.04 }),
  item<ReelItem>({ id: 'reel_t5', slot: 'reel', nameJa: '匠の精密リール', tier: 5, price: 160000, minLevel: 50, reelPowerKgf: 12, reelSpeed: 1.25, dragMaxKgf: 6, windowBonus: 0.045, note: '強さは T4 と同等。ドラグの滑らかさだけ' }),
  // --- ライン ---
  item<LineItem>({ id: 'line_starter', slot: 'line', nameJa: 'ナイロン 5lb', tier: 0, price: 0, minLevel: 1, lineType: 'nylon', lb: 5, ratedKgf: 5 * LB, stretch: 0.28, visibility: 0.8 }),
  item<LineItem>({ id: 'line_t1', slot: 'line', nameJa: 'ナイロン 6lb', tier: 1, price: 150, minLevel: 3, lineType: 'nylon', lb: 6, ratedKgf: 6 * LB, stretch: 0.28, visibility: 0.7 }),
  item<LineItem>({ id: 'line_t2', slot: 'line', nameJa: 'フロロ 8lb', tier: 2, price: 500, minLevel: 8, lineType: 'fluoro', lb: 8, ratedKgf: 8 * LB, stretch: 0.2, visibility: 0.4 }),
  item<LineItem>({ id: 'line_t3', slot: 'line', nameJa: 'フロロ 16lb', tier: 3, price: 2600, minLevel: 16, lineType: 'fluoro', lb: 16, ratedKgf: 16 * LB, stretch: 0.2, visibility: 0.4 }),
  item<LineItem>({ id: 'line_t4', slot: 'line', nameJa: 'PE+フロロリーダー 30lb', tier: 4, price: 8100, minLevel: 28, lineType: 'pe', lb: 30, ratedKgf: 30 * LB, stretch: 0.05, visibility: 0.3 }),
  item<LineItem>({ id: 'line_t5', slot: 'line', nameJa: 'PE 高強度 40lb', tier: 5, price: 46000, minLevel: 50, lineType: 'pe', lb: 40, ratedKgf: 40 * LB, stretch: 0.04, visibility: 0.25, note: '必要以上の強さ。摩耗に強いだけ' }),
  // --- ウキ / 針 / オモリ / 穴釣り仕掛け ---
  item<FloatItem>({ id: 'float_starter', slot: 'float', nameJa: '棒ウキ', tier: 0, price: 0, minLevel: 1, windowBonus: 0, nightVisible: false }),
  item<FloatItem>({ id: 'float_t1', slot: 'float', nameJa: '視認性ウキ', tier: 1, price: 150, minLevel: 3, windowBonus: 0.01, nightVisible: false }),
  item<FloatItem>({ id: 'float_t2', slot: 'float', nameJa: '円錐ウキ（高感度）', tier: 2, price: 500, minLevel: 8, windowBonus: 0.02, nightVisible: false }),
  item<FloatItem>({ id: 'float_t3', slot: 'float', nameJa: '電気ウキ', tier: 3, price: 2400, minLevel: 16, windowBonus: 0.03, nightVisible: true, note: '夜でも見える（快適さ）' }),
  item<HookItem>({ id: 'hook_starter', slot: 'hook', nameJa: '標準針', tier: 0, price: 0, minLevel: 1, windowBonus: 0, hookOutMult: 1 }),
  item<HookItem>({ id: 'hook_t1', slot: 'hook', nameJa: '返しの浅い針', tier: 1, price: 90, minLevel: 3, windowBonus: 0.005, hookOutMult: 0.97 }),
  item<HookItem>({ id: 'hook_t2', slot: 'hook', nameJa: '化学研磨針', tier: 2, price: 330, minLevel: 8, windowBonus: 0.01, hookOutMult: 0.94 }),
  item<HookItem>({ id: 'hook_t3', slot: 'hook', nameJa: '極細軸フック', tier: 3, price: 1600, minLevel: 16, windowBonus: 0.015, hookOutMult: 0.92 }),
  item<HookItem>({ id: 'hook_t4', slot: 'hook', nameJa: '匠の手研ぎ針', tier: 4, price: 5100, minLevel: 28, windowBonus: 0.02, hookOutMult: 0.9 }),
  item<SinkerItem>({ id: 'sinker_starter', slot: 'sinker', nameJa: 'ガン玉', tier: 0, price: 0, minLevel: 1, showsDepth: false }),
  item<SinkerItem>({ id: 'sinker_t2', slot: 'sinker', nameJa: '水深センサー付きオモリ', tier: 2, price: 660, minLevel: 8, showsDepth: true, note: '快適さ。釣れ方は変わらない' }),
  item<HoleRigItem>({ id: 'holerig_t1', slot: 'holeRig', nameJa: '穴釣り仕掛け', tier: 1, price: 360, minLevel: 3, windowBonus: 0.01 }),
  item<HoleRigItem>({ id: 'holerig_t2', slot: 'holeRig', nameJa: 'ブラクリ 重量違いセット', tier: 2, price: 1300, minLevel: 8, windowBonus: 0.02 }),
  // --- 餌（消耗品。catalogId は FISH_DATA.json catalog.baits と一致）---
  item<BaitItem>({ id: 'bait_okiami', slot: 'bait', nameJa: 'オキアミ（冷凍）', tier: 0, price: 20, minLevel: 1, catalogId: 'okiami', packSize: 10, usePerCast: 1, qualityMult: 1.0 }),
  item<BaitItem>({ id: 'bait_amiebi', slot: 'bait', nameJa: 'アミエビ（コマセ）', tier: 0, price: 30, minLevel: 1, catalogId: 'amiebi', packSize: 10, usePerCast: 1, qualityMult: 1.0 }),
  item<BaitItem>({ id: 'bait_corn', slot: 'bait', nameJa: 'コーン', tier: 1, price: 25, minLevel: 3, catalogId: 'corn', packSize: 10, usePerCast: 1, qualityMult: 1.0 }),
  item<BaitItem>({ id: 'bait_aoiso', slot: 'bait', nameJa: 'アオイソメ', tier: 1, price: 60, minLevel: 3, catalogId: 'aoiso', packSize: 10, usePerCast: 1, qualityMult: 1.05 }),
  item<BaitItem>({ id: 'bait_sakana_strip', slot: 'bait', nameJa: '魚の切り身', tier: 1, price: 60, minLevel: 3, catalogId: 'sakana_strip', packSize: 10, usePerCast: 1, qualityMult: 1.0 }),
  item<BaitItem>({ id: 'bait_ika_strip', slot: 'bait', nameJa: 'イカの切り身', tier: 1, price: 70, minLevel: 3, catalogId: 'ika_strip', packSize: 10, usePerCast: 1, qualityMult: 1.0 }),
  item<BaitItem>({ id: 'bait_kani', slot: 'bait', nameJa: 'カニ', tier: 2, price: 120, minLevel: 8, catalogId: 'kani', packSize: 10, usePerCast: 1, qualityMult: 1.05 }),
  item<BaitItem>({ id: 'bait_ebi_live', slot: 'bait', nameJa: '活きエビ', tier: 2, price: 250, minLevel: 8, catalogId: 'ebi_live', packSize: 10, usePerCast: 0.34, qualityMult: 1.1 }),
  item<BaitItem>({ id: 'bait_konoshiro_live', slot: 'bait', nameJa: '活きコノシロ', tier: 3, price: 400, minLevel: 16, catalogId: 'konoshiro_live', packSize: 5, usePerCast: 0.2, qualityMult: 1.1 }),
  item<BaitItem>({ id: 'bait_live_fish', slot: 'bait', nameJa: '活き小魚（泳がせ）', tier: 3, price: 600, minLevel: 16, catalogId: 'live_fish', packSize: 5, usePerCast: 0.2, qualityMult: 1.15 }),
  // --- ルアー（catalogId は FISH_DATA.json catalog.lures と一致）---
  item<LureItem>({ id: 'lure_sabiki', slot: 'lure', nameJa: 'サビキ仕掛け', tier: 1, price: 250, minLevel: 3, catalogId: 'sabiki', lossPerCast: 0.01, qualityMult: 1.0 }),
  item<LureItem>({ id: 'lure_jighead_worm', slot: 'lure', nameJa: 'ジグヘッド＋ワーム', tier: 1, price: 450, minLevel: 3, catalogId: 'jighead_worm', lossPerCast: 0.02, qualityMult: 1.0 }),
  item<LureItem>({ id: 'lure_bukuri', slot: 'lure', nameJa: 'ブラクリ', tier: 1, price: 350, minLevel: 3, catalogId: 'bukuri', lossPerCast: 0.02, qualityMult: 1.0 }),
  item<LureItem>({ id: 'lure_crab', slot: 'lure', nameJa: 'カニ型ルアー', tier: 2, price: 1400, minLevel: 8, catalogId: 'crab_lure', lossPerCast: 0.02, qualityMult: 1.05 }),
  item<LureItem>({ id: 'lure_vibration', slot: 'lure', nameJa: 'バイブレーション', tier: 2, price: 1500, minLevel: 8, catalogId: 'vibration', lossPerCast: 0.03, qualityMult: 1.05 }),
  item<LureItem>({ id: 'lure_wind_jig', slot: 'lure', nameJa: 'ワインドジグ', tier: 2, price: 1800, minLevel: 8, catalogId: 'wind_jig', lossPerCast: 0.03, qualityMult: 1.05 }),
  item<LureItem>({ id: 'lure_minnow', slot: 'lure', nameJa: 'ミノー', tier: 3, price: 3600, minLevel: 16, catalogId: 'minnow', lossPerCast: 0.02, qualityMult: 1.1 }),
  item<LureItem>({ id: 'lure_topwater', slot: 'lure', nameJa: 'トップウォーター', tier: 3, price: 3200, minLevel: 16, catalogId: 'topwater', lossPerCast: 0.02, qualityMult: 1.1 }),
  item<LureItem>({ id: 'lure_tenya', slot: 'lure', nameJa: 'テンヤ', tier: 3, price: 2800, minLevel: 16, catalogId: 'tenya', lossPerCast: 0.03, qualityMult: 1.1 }),
  item<LureItem>({ id: 'lure_tairubber', slot: 'lure', nameJa: 'タイラバ', tier: 3, price: 3500, minLevel: 16, catalogId: 'tairubber', lossPerCast: 0.02, qualityMult: 1.1 }),
  item<LureItem>({ id: 'lure_metal_jig', slot: 'lure', nameJa: 'メタルジグ', tier: 4, price: 4500, minLevel: 28, catalogId: 'metal_jig', lossPerCast: 0.03, qualityMult: 1.15 }),
];

const CATALOG_INDEX: ReadonlyMap<ItemId, ShopItem> = new Map(SHOP_CATALOG.map((i): [ItemId, ShopItem] => [i.id, i]));
export function getItem(id: ItemId): ShopItem | undefined { return CATALOG_INDEX.get(id); }

export type PurchaseCheck =
  | { ok: true; totalPrice: number }
  | { ok: false; reason: 'unknown-item' | 'level' | 'money' | 'already-owned' | 'quantity'; need?: number };

/** 消耗品は qty 個（パック数）購入可。耐久財は 1 回のみ */
export function canPurchase(save: SaveDataV1, itemId: ItemId, qty = 1): PurchaseCheck {
  const it = getItem(itemId);
  if (!it) return { ok: false, reason: 'unknown-item' };
  if (!Number.isInteger(qty) || qty < 1 || qty > 99) return { ok: false, reason: 'quantity' };
  const consumable = it.slot === 'bait';
  if (!consumable && qty !== 1) return { ok: false, reason: 'quantity' };
  if (!consumable && (save.gear.owned[itemId] ?? 0) > 0) return { ok: false, reason: 'already-owned' };
  if (save.level < it.minLevel) return { ok: false, reason: 'level', need: it.minLevel };
  const total = it.price * qty;
  if (save.money < total) return { ok: false, reason: 'money', need: total - save.money };
  return { ok: true, totalPrice: total };
}

/** 純粋関数: 購入後のセーブを返す（入力は変更しない）。UIは canPurchase → applyPurchase → save */
export function applyPurchase(save: SaveDataV1, itemId: ItemId, qty = 1): SaveDataV1 | null {
  const chk = canPurchase(save, itemId, qty);
  const it = getItem(itemId);
  if (!chk.ok || !it) return null;
  const owned = { ...save.gear.owned };
  owned[itemId] = (owned[itemId] ?? 0) + (it.slot === 'bait' ? qty * it.packSize : 1);
  return { ...save, money: save.money - chk.totalPrice, gear: { ...save.gear, owned } };
}

// ---- 装備 → タックル性能 ----

/** タイミング窓の拡大の上限（+20%）。これ以上は何を買っても伸びない */
export const WINDOW_BONUS_CAP = 0.2;
/** 食いの品質倍率の上限（餌/ルアー/ラインの合算） */
export const BITE_GEAR_CAP = 1.15;

export interface TackleStats {
  /** min(rod, reel, line) [kgf] */
  weakestKgf: number;
  /** 0..1。魚の minTackle と比較（足りないと急激に不利） */
  strength01: number;
  /** タイミング窓の拡大率 0..WINDOW_BONUS_CAP */
  windowBonus: number;
  /** 食いの品質倍率 1..BITE_GEAR_CAP */
  biteGearMult: number;
  castDistanceM: number;
  reelSpeed: number;
  dragMaxKgf: number;
  hookOutMult: number;
  lineLb: number;
  lineType: LineType;
  lineStretch: number;
  lineVisibility: number;
  baitCatalogId: BaitCatalogId | null;
  lureCatalogId: LureCatalogId | null;
}

export function computeTackle(gear: GearState): TackleStats {
  const get = <S extends ShopItem['slot']>(slot: S): Extract<ShopItem, { slot: S }> | undefined => {
    const id = gear.equipped[slot];
    const it = id !== undefined ? getItem(id) : undefined;
    return it !== undefined && it.slot === slot ? (it as Extract<ShopItem, { slot: S }>) : undefined;
  };
  const rod = get('rod'); const reel = get('reel'); const line = get('line');
  const fl = get('float'); const hook = get('hook'); const hr = get('holeRig');
  const bait = get('bait'); const lure = get('lure');

  const rodKgf = rod?.powerKgf ?? 1; const reelKgf = reel?.reelPowerKgf ?? 1; const lineKgf = line?.ratedKgf ?? 1;
  const weakest = Math.min(rodKgf, reelKgf, lineKgf);

  // 窓ボーナス: 合算 → 漸近キャップ（tanh）。T5 フルセットでもほぼ CAP に張り付く
  const raw = (rod?.windowBonus ?? 0) + (reel?.windowBonus ?? 0) + (fl?.windowBonus ?? 0) + (hook?.windowBonus ?? 0) + (hr?.windowBonus ?? 0);
  const windowBonus = WINDOW_BONUS_CAP * Math.tanh(raw / WINDOW_BONUS_CAP);

  const lineStealth = 1 + 0.06 * (1 - (line?.visibility ?? 1)); // 最大 +6%
  const qual = Math.max(bait?.qualityMult ?? 1, lure?.qualityMult ?? 1);
  const biteGearMult = Math.min(BITE_GEAR_CAP, qual * lineStealth);

  return {
    weakestKgf: weakest,
    strength01: clamp(weakest / STRENGTH_REF_KGF, 0, 1),
    windowBonus,
    biteGearMult,
    castDistanceM: rod?.castDistanceM ?? 10,
    reelSpeed: reel?.reelSpeed ?? 0.7,
    dragMaxKgf: reel?.dragMaxKgf ?? 0.8,
    hookOutMult: hook?.hookOutMult ?? 1,
    lineLb: line?.lb ?? 3,
    lineType: line?.lineType ?? 'nylon',
    lineStretch: line?.stretch ?? 0.28,
    lineVisibility: line?.visibility ?? 1,
    baitCatalogId: bait?.catalogId ?? null,
    lureCatalogId: lure?.catalogId ?? null,
  };
}

// ===========================================================================
// 3. 経済 — XP / 価格 / 「装備は腕に勝てない」
// ===========================================================================

/** 魚種の経済パラメータ（FISH_DATA.json / FISH_DESIGN.md の値を転記。統合時は JSON から生成） */
export interface SpeciesEcon {
  id: SpeciesId;
  rarity: Rarity;
  /** = FISH_DATA gameBaseValue = fish.ts baseValue */
  baseValue: number;
  typicalCm: number;
  maxCm: number;
  /** FISH_DATA legacy.minTackle */
  minTackle: number;
  /** 0..1。合わせ窓/ファイト窓の狭さ（wariness から導出） */
  difficulty: number;
  /** この魚を主目的にできるレベル目安（出現はこれ未満でも低確率で有り得る） */
  unlockLevel: number;
}
export const SPECIES_ECON: readonly SpeciesEcon[] = [
  { id: 'aji', rarity: 'common', baseValue: 40, typicalCm: 20, maxCm: 40, minTackle: 0.1, difficulty: 0.25, unlockLevel: 1 },
  { id: 'saba', rarity: 'common', baseValue: 50, typicalCm: 30, maxCm: 50, minTackle: 0.2, difficulty: 0.3, unlockLevel: 3 },
  { id: 'kasago', rarity: 'common', baseValue: 80, typicalCm: 22, maxCm: 35, minTackle: 0.1, difficulty: 0.35, unlockLevel: 4 },
  { id: 'mebaru', rarity: 'common', baseValue: 90, typicalCm: 20, maxCm: 32, minTackle: 0.1, difficulty: 0.4, unlockLevel: 7 },
  { id: 'chinu', rarity: 'uncommon', baseValue: 220, typicalCm: 40, maxCm: 65, minTackle: 0.35, difficulty: 0.6, unlockLevel: 10 },
  { id: 'seabass', rarity: 'uncommon', baseValue: 350, typicalCm: 70, maxCm: 100, minTackle: 0.5, difficulty: 0.6, unlockLevel: 16 },
  { id: 'tachiuo', rarity: 'uncommon', baseValue: 320, typicalCm: 95, maxCm: 140, minTackle: 0.4, difficulty: 0.5, unlockLevel: 20 },
  { id: 'madai', rarity: 'rare', baseValue: 700, typicalCm: 50, maxCm: 90, minTackle: 0.6, difficulty: 0.7, unlockLevel: 28 },
  { id: 'buri', rarity: 'rare', baseValue: 900, typicalCm: 80, maxCm: 120, minTackle: 0.8, difficulty: 0.65, unlockLevel: 36 },
];
export function getSpeciesEcon(id: SpeciesId): SpeciesEcon | undefined { return SPECIES_ECON.find((s) => s.id === id); }

// ---- 3.1 XP ----

/** レベル L → L+1 に必要な XP */
export function xpToNext(level: number): number {
  return Math.round(40 + 10 * Math.pow(Math.max(1, level), 1.65));
}
export const MAX_LEVEL = 99;
/** レベル L に到達するまでの累計 XP（L=1 → 0） */
export function cumulativeXp(level: number): number {
  let sum = 0;
  for (let l = 1; l < level; l++) sum += xpToNext(l);
  return sum;
}
export function levelFromXp(xp: number): number {
  let l = 1; let rest = Math.max(0, xp);
  while (l < MAX_LEVEL) {
    const need = xpToNext(l);
    if (rest < need) break;
    rest -= need; l++;
  }
  return l;
}

const RARITY_XP: Readonly<Record<Rarity, number>> = { common: 1, uncommon: 1.6, rare: 2.6, legend: 5 };
export const FIRST_CATCH_XP_BONUS = 1.5; // 図鑑初登録は基礎XPの +150%

/** 1 匹の釣果 XP。サイズが大きいほど・初めての魚ほど多い。装備には依存しない */
export function catchXp(sp: SpeciesEcon, sizeCm: number, quality: number, firstTime: boolean): number {
  const base = (8 + 0.07 * sp.baseValue) * RARITY_XP[sp.rarity];
  const sizeMult = clamp(sizeCm / sp.typicalCm, 0.5, 2.5);
  const qMult = 0.9 + 0.2 * clamp(quality, 0, 1);
  return Math.max(1, Math.round(base * sizeMult * qMult * (firstTime ? 1 + FIRST_CATCH_XP_BONUS : 1)));
}

// ---- 3.2 売価 ----

export function sizeFactor(sizeCm: number, sp: SpeciesEcon): number {
  return clamp(Math.pow(sizeCm / sp.typicalCm, 1.5), 0.35, 3.5);
}
/** 同じ魚をその日に売った匹数 n に対する値崩れ（11匹目から -2.5%/匹、下限 35%）。毎日リセット */
export function dailySaturation(soldTodaySameSpecies: number): number {
  const over = Math.max(0, soldTodaySameSpecies - 10);
  return Math.max(0.35, 1 - 0.025 * over);
}
/** 売価。**装備は一切関与しない**（腕=質とサイズ・知識=魚選びだけが価格を決める） */
export function sellPrice(sp: SpeciesEcon, sizeCm: number, quality: number, soldTodaySameSpecies: number): number {
  return Math.max(1, Math.round(sp.baseValue * sizeFactor(sizeCm, sp) * (0.9 + 0.2 * clamp(quality, 0, 1)) * dailySaturation(soldTodaySameSpecies)));
}

// ---- 3.3 腕（タイミング）> 道具 ----

export interface SkillProfile {
  nameJa: string;
  /** 合わせ/ファイト操作のタイミング誤差 σ [ms]（ガウス近似） */
  sigmaMs: number;
  /** 場所・時間・餌・ルアー選択の「知識」倍率 0.3..1.8（biteRate に乗る） */
  knowledge: number;
}
export const SKILL_NOVICE: SkillProfile = { nameJa: '初心者', sigmaMs: 260, knowledge: 0.7 };
export const SKILL_AVERAGE: SkillProfile = { nameJa: '中級', sigmaMs: 170, knowledge: 1.0 };
export const SKILL_EXPERT: SkillProfile = { nameJa: '上級', sigmaMs: 95, knowledge: 1.4 };

/** 誤差関数 erf（Abramowitz-Stegun 7.1.26, 最大誤差 1.5e-7） */
export function erf(x: number): number {
  const s = x < 0 ? -1 : 1; const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
}
/** 窓の半幅 h [ms] に対し、誤差 N(0,σ²) が窓内に入る確率 */
export function inWindowProb(halfWidthMs: number, sigmaMs: number): number {
  return erf(halfWidthMs / (Math.max(1, sigmaMs) * Math.SQRT2));
}

/** 合わせ（フッキング）の窓 全幅 [ms]。難しい魚ほど狭く、道具は最大 +20% */
export function hookWindowMs(difficulty: number, t: Pick<TackleStats, 'windowBonus'>): number {
  return (800 - 400 * clamp(difficulty, 0, 1)) * (1 + t.windowBonus);
}
/** ファイト中の「張力を適正帯に保つ」窓 全幅 [ms 換算] */
export function fightWindowMs(difficulty: number, t: Pick<TackleStats, 'windowBonus'>): number {
  return (1100 - 500 * clamp(difficulty, 0, 1)) * (1 + t.windowBonus);
}
/** タックル強度ゲート。不足分 0.2 で 0（ライン切れ必至）。余剰は無価値（上限1） */
export function tackleGate(strength01: number, minTackle: number): number {
  return clamp(1 - 5 * Math.max(0, minTackle - strength01), 0, 1);
}
/** 取り込み成功率（針掛かり × ファイト）。口切れ等は hookOutMult で微調整 */
export function landProbability(sp: SpeciesEcon, skill: SkillProfile, t: TackleStats): number {
  const hook = inWindowProb(hookWindowMs(sp.difficulty, t) / 2, skill.sigmaMs);
  const fight = inWindowProb(fightWindowMs(sp.difficulty, t) / 2, skill.sigmaMs * 1.5);
  // 針外れ（口切れ等）: 標準針で -10%、針の質で最大 -9%（hookOutMult 0.9 → -9%）まで緩和 = 差は 1pt 以下
  const hookKeep = 1 - 0.1 * clamp(t.hookOutMult, 0.5, 1.2);
  return clamp(hook * fight * tackleGate(t.strength01, sp.minTackle) * hookKeep, 0, 1);
}

// ---- 3.4 食い（バイト）: 知識が主役、道具は +15% まで ----

export const BASE_BITES_PER_HOUR = 30;
export const CASTS_PER_HOUR = 60;
export const KNOWLEDGE_MIN = 0.3;
export const KNOWLEDGE_MAX = 1.8;

/**
 * 1時間あたりのアタリ回数。knowledge は「魚の活性（時間帯/水温/潮）× 場所（海底ゾーン）×
 * 餌/ルアー反応（FISH_DATA response）」を掛けた 0.3..1.8。gear は BITE_GEAR_CAP(1.15) で頭打ち。
 */
export function biteRate(knowledge: number, t: Pick<TackleStats, 'biteGearMult'>): number {
  return BASE_BITES_PER_HOUR * clamp(knowledge, KNOWLEDGE_MIN, KNOWLEDGE_MAX) * Math.min(BITE_GEAR_CAP, t.biteGearMult);
}

// ---- 3.5 期待収入と所要時間（バランス検証用） ----

export const SELL_FRACTION = 0.8; // 釣った魚のうち売る割合（残りはリリース/水槽/図鑑）

/** レベル別の平均売価（その時点で主に狙う魚: 解禁済みの上位3魚種の平均 base × 平均サイズ係数） */
export function bracketValueG(level: number): number {
  const open = SPECIES_ECON.filter((s) => s.unlockLevel <= level);
  const top = open.slice(-3);
  const sum = top.reduce((a, s) => a + s.baseValue, 0);
  return (sum / Math.max(1, top.length)) * 1.1;
}
/** 期待釣果魚種（狙う3種）の平均 land 確率 */
export function avgLandProbability(level: number, skill: SkillProfile, t: TackleStats): number {
  const top = SPECIES_ECON.filter((s) => s.unlockLevel <= level).slice(-3);
  return top.reduce((a, s) => a + landProbability(s, skill, t), 0) / Math.max(1, top.length);
}
/** 1時間の期待収入 [G]（消耗品費控除前） */
export function expectedIncomePerHour(level: number, skill: SkillProfile, t: TackleStats): number {
  return biteRate(skill.knowledge, t) * avgLandProbability(level, skill, t) * bracketValueG(level) * SELL_FRACTION;
}
export function hoursToAfford(price: number, incomePerHour: number): number {
  return incomePerHour > 0 ? price / incomePerHour : Infinity;
}

// ---- 3.6 進行シミュレーション（バランス検証。ゲーム本体では使わない）----

/** ティアごとの標準的な餌（ここで消耗品コストを見積る） */
export const DEFAULT_BAIT_BY_TIER: Readonly<Record<Tier, ItemId>> = {
  0: 'bait_okiami', 1: 'bait_aoiso', 2: 'bait_ebi_live', 3: 'bait_live_fish', 4: 'bait_live_fish', 5: 'bait_live_fish',
};
/** 1 アタリあたりの餌コスト [G]。アタリ（=餌を取られる）ごとに消費し、他に 5 回/時の空消費 */
export function baitCostPerBite(baitId: ItemId): number {
  const b = getItem(baitId);
  return b && b.slot === 'bait' ? (b.price / b.packSize) * b.usePerCast : 0;
}
export const IDLE_BAIT_USES_PER_HOUR = 5;

/** 各ティアの標準装備（コア3点 + 針 + ウキ/穴釣り仕掛け）。カタログに無いスロットは前ティアを使う */
export function tierGear(tier: Tier): GearState {
  const ids: ItemId[] = [];
  for (const slot of ['rod', 'reel', 'line', 'hook', 'float', 'holeRig', 'sinker'] as const) {
    for (let t = tier; t >= 0; t--) {
      const id = SHOP_CATALOG.find((i) => i.slot === slot && i.tier === t)?.id;
      if (id) { ids.push(id); break; }
    }
  }
  const owned: Record<ItemId, number> = {};
  const equipped: Partial<Record<EquipSlot, ItemId>> = {};
  for (const id of ids) {
    const it = getItem(id);
    if (it) { owned[id] = 1; equipped[it.slot] = id; }
  }
  const bait = DEFAULT_BAIT_BY_TIER[tier];
  owned[bait] = 10; equipped.bait = bait;
  return { owned, equipped };
}
/** ティア購入に必要な合計金額（そのティアで新規に必要な耐久財。前ティアの売却は考慮しない） */
export function tierSetPrice(tier: Tier): number {
  const g = tierGear(tier);
  let sum = 0;
  for (const slot of EQUIP_SLOTS) {
    const id = g.equipped[slot];
    const it = id ? getItem(id) : undefined;
    if (it && it.slot !== 'bait' && it.tier === tier) sum += it.price;
  }
  return sum;
}

export function avgCatchXp(level: number): number {
  const top = SPECIES_ECON.filter((s) => s.unlockLevel <= level).slice(-3);
  return top.reduce((a, s) => a + catchXp(s, s.typicalCm, 0.5, false), 0) / Math.max(1, top.length);
}

export interface ProgressPoint { hour: number; level: number; money: number; tier: Tier; incomePerHour: number }
export interface ProgressResult {
  points: ProgressPoint[];
  /** tier → そのティアを購入できた時刻 [h]（未到達は null） */
  tierAtHour: Record<Tier, number | null>;
  levelAtHour: Record<number, number | null>;
}
/** 1/4時間刻み。方針: 買える最上位ティアを即購入（所持金が足りて Lv 条件を満たしたとき） */
export function simulateProgress(skill: SkillProfile, hours: number, stepH = 0.25): ProgressResult {
  let level = 1; let xp = 0; let money = createNewSave(0, 'sim').money; let tier: Tier = 0;
  const tierAtHour: Record<Tier, number | null> = { 0: 0, 1: null, 2: null, 3: null, 4: null, 5: null };
  const levelAtHour: Record<number, number | null> = {};
  for (const l of [3, 5, 8, 10, 16, 22, 28, 35, 45, 60]) levelAtHour[l] = null;
  const points: ProgressPoint[] = [];
  for (let h = 0; h < hours; h += stepH) {
    const tk = computeTackle(tierGear(tier));
    const bites = biteRate(skill.knowledge, tk);
    const land = avgLandProbability(level, skill, tk);
    const catches = bites * land;
    const gross = catches * bracketValueG(level) * SELL_FRACTION;
    const bait = (bites + IDLE_BAIT_USES_PER_HOUR) * baitCostPerBite(DEFAULT_BAIT_BY_TIER[tier]);
    const net = gross - bait;
    money += net * stepH;
    xp += catches * avgCatchXp(level) * stepH;
    level = levelFromXp(xp);
    for (const l of Object.keys(levelAtHour)) { const n = Number(l); if (levelAtHour[n] === null && level >= n) levelAtHour[n] = Math.round(h * 100) / 100; }
    for (let t = 5; t > tier; t--) {
      const tt = t as Tier; const price = tierSetPrice(tt);
      if (level >= TIER_UNLOCK_LEVEL[tt] && money >= price) { money -= price; tier = tt; tierAtHour[tt] = Math.round(h * 100) / 100; break; }
    }
    if (Math.abs(h % 1) < 1e-9) points.push({ hour: h, level, money: Math.round(money), tier, incomePerHour: Math.round(net) });
  }
  return { points, tierAtHour, levelAtHour };
}

// ===========================================================================
// 4. 現実連動データ — RealWorldAdapter
// ===========================================================================
// 方針: (1) すべての値に出所(source)と取得時刻を付ける。(2) 実データが取れなければ
// 決定論的な DEMO に落とし、UI に必ず「DEMO」バッジを出す。(3) 海況は航行・安全判断に使えない
// （Open-Meteo の注意書き）ため、UI に免責を常設する。(4) CORS の単純 GET のみ（プリフライト回避）。
// (5) 位置は 0.1°（約 11km）に丸めて送る。

export type DataSource = 'live' | 'cache' | 'calc' | 'demo';

export interface Field<T> {
  value: T | null;
  source: DataSource;
  /** 取得時刻 (epoch ms)。calc / demo は null */
  fetchedAt: number | null;
  provider: string;
}

export interface WeatherNow { tempC: number; weatherCode: number; cloudPct: number; precipMm: number; pressureHpa: number }
export interface WindNow { speedMs: number; gustMs: number; dirDeg: number }
export interface WaveNow { heightM: number; periodS: number; dirDeg: number }
export type DayPhase = 'night' | 'dawn' | 'day' | 'dusk';
export interface SunInfo {
  sunriseMs: number | null;
  sunsetMs: number | null;
  phase: DayPhase;
  /** 極夜/白夜 */
  polar: 'none' | 'polar-day' | 'polar-night';
}
export interface TideExtreme { atMs: number; kind: 'high' | 'low'; heightM: number }
export type SpringNeap = 'spring' | 'middle' | 'neap';
export interface TideState {
  datum: 'MSL' | 'JMA-chart-datum' | 'relative';
  levelM: number;
  trend: 'rising' | 'falling' | 'slack';
  /** 0 = 干潮 .. 1 = 満潮（前後の極値の間の位置） */
  level01: number;
  prev: TideExtreme | null;
  next: TideExtreme | null;
  rangeM: number;
  springNeap: SpringNeap;
  moonAgeDays: number;
}
export interface LocalTime {
  epochMs: number;
  utcOffsetSec: number;
  /** 'YYYY-MM-DDTHH:mm' 現地時刻 */
  iso: string;
  hour: number;
  minute: number;
  source: 'device' | 'api';
}

export type SnapshotMode = 'live' | 'cache' | 'partial' | 'demo';
export interface DataBadge {
  /** UI に出す文字。mode === 'demo' のときは必ず 'DEMO' */
  label: 'LIVE' | 'CACHE' | 'PARTIAL' | 'DEMO';
  mustShow: boolean;
  tooltipJa: string;
}
export interface Attribution { name: string; url: string; license: string; textJa: string }

export interface WorldSnapshot {
  location: { lat: number; lon: number };
  localTime: LocalTime;
  weather: Field<WeatherNow>;
  wind: Field<WindNow>;
  waves: Field<WaveNow>;
  seaTempC: Field<number>;
  tide: Field<TideState>;
  sun: Field<SunInfo>;
  moonAgeDays: number;
  mode: SnapshotMode;
  badge: DataBadge;
  attributions: Attribution[];
  /** 常設の免責（海況・潮位は航行/安全判断に使用不可） */
  disclaimerJa: string;
  notes: string[];
}

export interface SnapshotRequest {
  lat: number;
  lon: number;
  nowMs: number;
  /** 気象庁 潮位表の地点記号（例 'QS'）。指定時のみ JMA を使う（日本国内用） */
  jmaStation?: string;
  signal?: AbortSignal;
}

export interface RealWorldAdapter {
  readonly id: string;
  readonly attributions: readonly Attribution[];
  getSnapshot(req: SnapshotRequest): Promise<WorldSnapshot>;
}

export const DISCLAIMER_JA =
  'ゲーム内の演出用データです。海況・潮位は航行や釣行の安全判断に使用しないでください。実際の釣果を保証するものではありません。';

export const ATTR_OPEN_METEO: Attribution = {
  name: 'Open-Meteo.com', url: 'https://open-meteo.com/', license: 'CC BY 4.0（無料枠は非商用）',
  textJa: '気象・海況データ: Open-Meteo.com (CC BY 4.0)',
};
export const ATTR_JMA: Attribution = {
  name: '気象庁 潮位表', url: 'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/', license: '政府標準利用規約（第2.0版）/ CC BY 4.0 互換',
  textJa: '潮位: 気象庁「潮位表」を加工して作成',
};

// ---- 4.1 時刻・太陽・月 ----

const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;
const pad2 = (n: number): string => (n < 10 ? '0' : '') + String(n);

export function localTimeFromOffset(epochMs: number, utcOffsetSec: number, source: 'device' | 'api'): LocalTime {
  const d = new Date(epochMs + utcOffsetSec * 1000);
  const iso = `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`;
  return { epochMs, utcOffsetSec, iso, hour: d.getUTCHours(), minute: d.getUTCMinutes(), source };
}
/** 端末の時計とタイムゾーン（オフライン時の既定）。オフセットは設定地の経度から概算してもよい */
export function deviceTime(epochMs: number): LocalTime {
  return localTimeFromOffset(epochMs, -new Date(epochMs).getTimezoneOffset() * 60, 'device');
}

/** Ed Williams "Almanac for Computers" 方式。UT 時刻(epoch ms)を返す。昼/夜が来ない日は null */
export function solarCrossing(localDateUtcMidnightMs: number, lat: number, lon: number, rising: boolean): number | null {
  const rad = Math.PI / 180;
  const d = new Date(localDateUtcMidnightMs);
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const N = Math.floor((localDateUtcMidnightMs - start) / DAY_MS);
  const lngHour = lon / 15;
  const t = N + ((rising ? 6 : 18) - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
  L = ((L % 360) + 360) % 360;
  let RA = Math.atan(0.91764 * Math.tan(L * rad)) / rad;
  RA = ((RA % 360) + 360) % 360;
  RA += Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90;
  RA /= 15;
  const sinDec = 0.39782 * Math.sin(L * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
  if (cosH > 1 || cosH < -1) return null;
  const H = (rising ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad) / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  let ut = (T - lngHour) % 24;
  if (ut < 0) ut += 24;
  let ms = localDateUtcMidnightMs + ut * HOUR_MS;
  // その地点の「太陽正午」から ±12h 以内に収める（日付ずれ補正）
  const noon = localDateUtcMidnightMs + (12 - lngHour) * HOUR_MS;
  while (ms - noon > 12 * HOUR_MS) ms -= DAY_MS;
  while (noon - ms > 12 * HOUR_MS) ms += DAY_MS;
  return ms;
}

/** 日の出/日の入（端末だけで計算）。精度は数分。API が使えない時の 'calc' ソース */
export function computeSunInfo(nowMs: number, lat: number, lon: number, utcOffsetSec: number): SunInfo {
  const lt = new Date(nowMs + utcOffsetSec * 1000);
  const dayUtc = Date.UTC(lt.getUTCFullYear(), lt.getUTCMonth(), lt.getUTCDate());
  const sr = solarCrossing(dayUtc, lat, lon, true);
  const ss = solarCrossing(dayUtc, lat, lon, false);
  if (sr === null || ss === null) {
    // 白夜/極夜: 簡易に北半球の季節で判定
    const month = lt.getUTCMonth();
    const summer = lat >= 0 ? month >= 3 && month <= 8 : !(month >= 3 && month <= 8);
    return { sunriseMs: null, sunsetMs: null, phase: summer ? 'day' : 'night', polar: summer ? 'polar-day' : 'polar-night' };
  }
  return { sunriseMs: sr, sunsetMs: ss, phase: dayPhase(nowMs, sr, ss), polar: 'none' };
}
/** dawn = 日の出の 60 分前〜90 分後 / dusk = 日没の 90 分前〜60 分後（FISH_DESIGN の dawn/dusk と同義） */
export function dayPhase(nowMs: number, sunriseMs: number, sunsetMs: number): DayPhase {
  if (nowMs >= sunriseMs - HOUR_MS && nowMs < sunriseMs + 1.5 * HOUR_MS) return 'dawn';
  if (nowMs >= sunsetMs - 1.5 * HOUR_MS && nowMs < sunsetMs + HOUR_MS) return 'dusk';
  if (nowMs >= sunriseMs && nowMs < sunsetMs) return 'day';
  return 'night';
}

const SYNODIC_DAYS = 29.530588853;
const NEW_MOON_REF_MS = Date.UTC(2000, 0, 6, 18, 14);
/** 月齢（0=新月, ~14.77=満月）。平均朔望月による近似で誤差 ±0.5 日程度 */
export function moonAgeDays(epochMs: number): number {
  const age = ((epochMs - NEW_MOON_REF_MS) / DAY_MS) % SYNODIC_DAYS;
  return age < 0 ? age + SYNODIC_DAYS : age;
}
/** 大潮/中潮/小潮の目安（新月・満月の ±2 日 = 大潮、上下弦の ±2 日 = 小潮）。地域差あり */
export function springNeapFromMoon(age: number): SpringNeap {
  const half = SYNODIC_DAYS / 2;
  const toSyzygy = Math.min(age % half, half - (age % half));
  if (toSyzygy <= 2) return 'spring';
  const toQuad = Math.abs((age % half) - half / 2);
  return toQuad <= 2 ? 'neap' : 'middle';
}

// ---- 4.2 潮位: 極値列 → 現在状態 ----

/** 時系列(1時間毎など)から極大/極小を検出（放物線補間）。端点は対象外 */
export function findExtremes(series: readonly { tMs: number; v: number }[]): TideExtreme[] {
  const out: TideExtreme[] = [];
  for (let i = 1; i < series.length - 1; i++) {
    const a = series[i - 1]; const b = series[i]; const c = series[i + 1];
    if (!a || !b || !c) continue;
    const isHigh = b.v > a.v && b.v >= c.v;
    const isLow = b.v < a.v && b.v <= c.v;
    if (!isHigh && !isLow) continue;
    const denom = a.v - 2 * b.v + c.v;
    const off = denom !== 0 ? clamp(0.5 * (a.v - c.v) / denom, -0.5, 0.5) : 0;
    const step = c.tMs - b.tMs;
    out.push({ atMs: Math.round(b.tMs + off * step), kind: isHigh ? 'high' : 'low', heightM: b.v - 0.25 * (a.v - c.v) * off });
  }
  return out;
}

/** 極値列から cos 補間で現在の潮位・傾向・位相を求める。極値が前後に無ければ null */
export function deriveTideState(extremes: readonly TideExtreme[], nowMs: number, datum: TideState['datum']): TideState | null {
  const sorted = [...extremes].sort((x, y) => x.atMs - y.atMs);
  let prev: TideExtreme | null = null; let next: TideExtreme | null = null;
  for (const e of sorted) {
    if (e.atMs <= nowMs) prev = e;
    else { next = e; break; }
  }
  if (!prev || !next) return null;
  const f = (nowMs - prev.atMs) / (next.atMs - prev.atMs);
  const s = (1 - Math.cos(Math.PI * f)) / 2;
  const levelM = prev.heightM + (next.heightM - prev.heightM) * s;
  const range = Math.abs(next.heightM - prev.heightM);
  const rising = next.heightM > prev.heightM;
  const slackNear = f < 0.08 || f > 0.92; // 極値の前後は動きが緩い（止まり）
  const level01 = rising ? s : 1 - s;
  const age = moonAgeDays(nowMs);
  return {
    datum, levelM, trend: slackNear ? 'slack' : rising ? 'rising' : 'falling', level01, prev, next,
    rangeM: range, springNeap: springNeapFromMoon(age), moonAgeDays: age,
  };
}

// ---- 4.3 バッジ / モード判定 ----

function fieldsOf(s: Pick<WorldSnapshot, 'weather' | 'wind' | 'waves' | 'seaTempC' | 'tide'>): Field<unknown>[] {
  return [s.weather, s.wind, s.waves, s.seaTempC, s.tide];
}
/** calc（端末計算の太陽・月）は中立。live/cache と demo の混在状況で決める */
export function computeMode(s: Pick<WorldSnapshot, 'weather' | 'wind' | 'waves' | 'seaTempC' | 'tide'>): SnapshotMode {
  const fs = fieldsOf(s);
  const demo = fs.filter((f) => f.source === 'demo' || f.value === null).length;
  const cache = fs.filter((f) => f.source === 'cache').length;
  if (demo === fs.length) return 'demo';
  if (demo > 0) return 'partial';
  return cache > 0 ? 'cache' : 'live';
}
export function badgeFor(mode: SnapshotMode): DataBadge {
  switch (mode) {
    case 'live': return { label: 'LIVE', mustShow: false, tooltipJa: '現在の実データ（Open-Meteo 等）です。' };
    case 'cache': return { label: 'CACHE', mustShow: true, tooltipJa: '直近に取得した実データ（通信できないため保存分）を表示しています。' };
    case 'partial': return { label: 'PARTIAL', mustShow: true, tooltipJa: '一部がデモ値です。実データが取れなかった項目はデモ値で補っています。' };
    case 'demo': return { label: 'DEMO', mustShow: true, tooltipJa: 'デモデータです。実際の天気・潮ではありません（オフラインまたは取得失敗）。' };
  }
}

// ---- 4.4 通信ユーティリティ: タイムアウト / キャッシュ / 予算 / サーキットブレーカ ----

export class HttpError extends Error {
  readonly kind: 'timeout' | 'network' | 'http' | 'parse' | 'budget' | 'circuit' | 'abort';
  readonly status: number;
  readonly retryAfterSec: number | null;
  constructor(kind: HttpError['kind'], message: string, status = 0, retryAfterSec: number | null = null) {
    super(message);
    this.kind = kind; this.status = status; this.retryAfterSec = retryAfterSec;
  }
}

export type FetchLike = (url: string, init?: { signal?: AbortSignal }) => Promise<{
  ok: boolean; status: number; headers: { get(name: string): string | null }; text(): Promise<string>;
}>;
const defaultFetch: FetchLike = (url, init) => fetch(url, init);

/** 単純 GET（カスタムヘッダ無し = CORS プリフライト無し）。タイムアウトと外部 abort に対応 */
export async function fetchTextWithTimeout(fetcher: FetchLike, url: string, timeoutMs: number, external?: AbortSignal): Promise<string> {
  const ctl = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => { timedOut = true; ctl.abort(); }, timeoutMs);
  const onExt = (): void => ctl.abort();
  if (external) {
    if (external.aborted) ctl.abort();
    else external.addEventListener('abort', onExt, { once: true });
  }
  try {
    const res = await fetcher(url, { signal: ctl.signal });
    if (!res.ok) {
      const ra = Number(res.headers.get('Retry-After'));
      throw new HttpError('http', `HTTP ${res.status}`, res.status, Number.isFinite(ra) && ra > 0 ? ra : null);
    }
    return await res.text();
  } catch (e) {
    if (e instanceof HttpError) throw e;
    if (timedOut) throw new HttpError('timeout', `timeout ${timeoutMs}ms`);
    if (external?.aborted) throw new HttpError('abort', 'aborted');
    throw new HttpError('network', e instanceof Error ? e.message : String(e));
  } finally {
    clearTimeout(timer);
    external?.removeEventListener('abort', onExt);
  }
}

export interface CacheEntry<T> { at: number; value: T }
/** TTL（新鮮）と stale 許容の2段階。persist に StorageLike を渡すと再起動後も使える */
export class TtlCache<T> {
  private readonly mem = new Map<string, CacheEntry<T>>();
  private readonly storage: StorageLike | null;
  private readonly storageKey: string;
  constructor(storage: StorageLike | null, storageKey: string) {
    this.storage = storage; this.storageKey = storageKey;
    this.hydrate();
  }
  get(key: string, nowMs: number, maxAgeMs: number): CacheEntry<T> | null {
    const e = this.mem.get(key);
    return e && nowMs - e.at <= maxAgeMs && e.at <= nowMs + 5 * 60_000 ? e : null;
  }
  set(key: string, nowMs: number, value: T): void {
    this.mem.set(key, { at: nowMs, value });
    while (this.mem.size > 8) {
      const first = this.mem.keys().next();
      if (first.done) break;
      this.mem.delete(first.value);
    }
    this.persist();
  }
  private hydrate(): void {
    if (!this.storage) return;
    try {
      const raw = this.storage.getItem(this.storageKey);
      if (!raw) return;
      const j: unknown = JSON.parse(raw);
      if (!isRecord(j)) return;
      for (const k of Object.keys(j)) {
        const e = j[k];
        if (isRecord(e) && typeof e.at === 'number') this.mem.set(k, { at: e.at, value: e.value as T });
      }
    } catch { /* 壊れたキャッシュは無視（セーブには影響しない） */ }
  }
  private persist(): void {
    if (!this.storage) return;
    try {
      const o: Record<string, CacheEntry<T>> = {};
      this.mem.forEach((v, k) => { o[k] = v; });
      this.storage.setItem(this.storageKey, JSON.stringify(o));
    } catch { /* 容量不足でもゲームは続行 */ }
  }
}

export interface GateOptions {
  /** 1時間あたりの上限リクエスト数（Open-Meteo 無料枠 5,000/h に対し十分小さく） */
  maxPerHour: number;
  /** 連続失敗でブレーカを開く回数 */
  failThreshold: number;
  openMs: number;
  maxOpenMs: number;
}
export const DEFAULT_GATE: GateOptions = { maxPerHour: 60, failThreshold: 3, openMs: 5 * 60_000, maxOpenMs: 30 * 60_000 };

/** 同一キーの同時リクエストを1本化（single-flight）+ 予算 + サーキットブレーカ + Retry-After 尊重 */
export class RequestGate {
  private readonly opt: GateOptions;
  private readonly now: () => number;
  private inflight = new Map<string, Promise<string>>();
  private stamps: number[] = [];
  private fails = 0;
  private openUntil = 0;
  private openLen: number;
  constructor(opt: GateOptions = DEFAULT_GATE, now: () => number = (): number => Date.now()) {
    this.opt = opt; this.now = now; this.openLen = opt.openMs;
  }
  run(key: string, task: () => Promise<string>): Promise<string> {
    const t = this.now();
    if (t < this.openUntil) return Promise.reject(new HttpError('circuit', `circuit open for ${Math.ceil((this.openUntil - t) / 1000)}s`));
    const existing = this.inflight.get(key);
    if (existing) return existing;
    this.stamps = this.stamps.filter((s) => t - s < HOUR_MS);
    if (this.stamps.length >= this.opt.maxPerHour) return Promise.reject(new HttpError('budget', 'hourly request budget exhausted'));
    this.stamps.push(t);
    const p = task().then(
      (v) => { this.fails = 0; this.openLen = this.opt.openMs; this.inflight.delete(key); return v; },
      (e: unknown) => {
        this.inflight.delete(key);
        this.onFail(e);
        throw e;
      },
    );
    this.inflight.set(key, p);
    return p;
  }
  private onFail(e: unknown): void {
    const t = this.now();
    if (e instanceof HttpError && e.kind === 'abort') return; // 呼び出し側都合のキャンセルは失敗に数えない
    if (e instanceof HttpError && e.status === 429) {
      const wait = Math.max(e.retryAfterSec !== null ? e.retryAfterSec * 1000 : 0, this.opt.openMs);
      this.openUntil = t + Math.min(wait, this.opt.maxOpenMs);
      return;
    }
    this.fails++;
    if (this.fails >= this.opt.failThreshold) {
      this.openUntil = t + this.openLen;
      this.openLen = Math.min(this.openLen * 2, this.opt.maxOpenMs);
      this.fails = 0;
    }
  }
}

// ---- 4.5 Open-Meteo 実装（forecast + marine）----

export const OPEN_METEO_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
export const OPEN_METEO_MARINE_URL = 'https://marine-api.open-meteo.com/v1/marine';
/** 位置は 0.1° に丸める（プライバシー + キャッシュヒット率） */
export const roundLoc = (v: number): number => Math.round(v * 10) / 10;

export function buildForecastUrl(lat: number, lon: number): string {
  const p = [
    `latitude=${lat.toFixed(1)}`, `longitude=${lon.toFixed(1)}`,
    'current=temperature_2m,weather_code,cloud_cover,precipitation,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    'daily=sunrise,sunset', 'timezone=auto', 'wind_speed_unit=ms', 'forecast_days=2', 'timeformat=unixtime',
  ];
  return `${OPEN_METEO_FORECAST_URL}?${p.join('&')}`;
}
export function buildMarineUrl(lat: number, lon: number): string {
  const p = [
    `latitude=${lat.toFixed(1)}`, `longitude=${lon.toFixed(1)}`,
    'current=wave_height,wave_period,wave_direction,sea_surface_temperature,sea_level_height_msl',
    'hourly=sea_level_height_msl', 'timezone=auto', 'forecast_days=2', 'timeformat=unixtime',
  ];
  return `${OPEN_METEO_MARINE_URL}?${p.join('&')}`;
}

interface ParsedForecast { utcOffsetSec: number; weather: WeatherNow | null; wind: WindNow | null; sun: SunInfo | null; timeMs: number | null }
interface ParsedMarine { utcOffsetSec: number; waves: WaveNow | null; seaTempC: number | null; levelSeries: { tMs: number; v: number }[] }

const numOrNull = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const numArr = (v: unknown): (number | null)[] => (Array.isArray(v) ? (v as unknown[]).map(numOrNull) : []);

export function parseForecast(json: unknown, nowMs: number): ParsedForecast {
  if (!isRecord(json)) throw new HttpError('parse', 'forecast: not an object');
  const off = asInt(json.utc_offset_seconds, 0, -50400, 57600);
  const cur = isRecord(json.current) ? json.current : null;
  let weather: WeatherNow | null = null; let wind: WindNow | null = null; let timeMs: number | null = null;
  if (cur) {
    const t = numOrNull(cur.time); timeMs = t !== null ? t * 1000 : null;
    const temp = numOrNull(cur.temperature_2m); const ws = numOrNull(cur.wind_speed_10m);
    if (temp !== null) {
      weather = {
        tempC: temp, weatherCode: asInt(cur.weather_code, 0, 0, 99), cloudPct: asNum(cur.cloud_cover, 0, 0, 100),
        precipMm: asNum(cur.precipitation, 0, 0, 500), pressureHpa: asNum(cur.pressure_msl, 1013, 800, 1100),
      };
    }
    if (ws !== null) {
      const speed = clamp(ws, 0, 80);
      // 観測された異常: gust < speed のことがある → 突風は平均風速以上に補正
      wind = { speedMs: speed, gustMs: Math.max(speed, asNum(cur.wind_gusts_10m, speed, 0, 120)), dirDeg: asNum(cur.wind_direction_10m, 0, 0, 360) };
    }
  }
  // 日の出/日の入: daily.time（現地0時の epoch）が現在を含む日を選ぶ
  let sun: SunInfo | null = null;
  const daily = isRecord(json.daily) ? json.daily : null;
  if (daily) {
    const times = numArr(daily.time); const sr = numArr(daily.sunrise); const ss = numArr(daily.sunset);
    for (let i = 0; i < times.length; i++) {
      const t0 = times[i]; const r = sr[i]; const s = ss[i];
      if (t0 === null || t0 === undefined || r === null || r === undefined || s === null || s === undefined) continue;
      if (nowMs >= t0 * 1000 && nowMs < t0 * 1000 + DAY_MS) {
        sun = { sunriseMs: r * 1000, sunsetMs: s * 1000, phase: dayPhase(nowMs, r * 1000, s * 1000), polar: 'none' };
        break;
      }
    }
  }
  return { utcOffsetSec: off, weather, wind, sun, timeMs };
}

export function parseMarine(json: unknown): ParsedMarine {
  if (!isRecord(json)) throw new HttpError('parse', 'marine: not an object');
  const off = asInt(json.utc_offset_seconds, 0, -50400, 57600);
  const cur = isRecord(json.current) ? json.current : null;
  let waves: WaveNow | null = null; let seaTempC: number | null = null;
  if (cur) {
    const h = numOrNull(cur.wave_height);
    if (h !== null) waves = { heightM: clamp(h, 0, 30), periodS: asNum(cur.wave_period, 0, 0, 40), dirDeg: asNum(cur.wave_direction, 0, 0, 360) };
    const st = numOrNull(cur.sea_surface_temperature);
    if (st !== null && st > -3 && st < 40) seaTempC = st;
  }
  const series: { tMs: number; v: number }[] = [];
  const hourly = isRecord(json.hourly) ? json.hourly : null;
  if (hourly) {
    const t = numArr(hourly.time); const v = numArr(hourly.sea_level_height_msl);
    for (let i = 0; i < t.length; i++) {
      const ti = t[i]; const vi = v[i];
      if (ti !== null && ti !== undefined && vi !== null && vi !== undefined) series.push({ tMs: ti * 1000, v: vi });
    }
  }
  return { utcOffsetSec: off, waves, seaTempC, levelSeries: series };
}

export interface AdapterDeps {
  fetcher?: FetchLike;
  storage?: StorageLike | null;
  now?: () => number;
  gate?: RequestGate;
  timeoutMs?: number;
}

const FORECAST_FRESH_MS = 15 * 60_000;
const FORECAST_STALE_MS = 3 * HOUR_MS;
const MARINE_FRESH_MS = 30 * 60_000;
const MARINE_STALE_MS = 6 * HOUR_MS;
const JMA_FRESH_MS = 12 * HOUR_MS;
/** 気象庁の潮位表は常に JST */
const JMA_UTC_OFFSET_SEC = 9 * 3600;

function emptyField<T>(provider: string): Field<T> { return { value: null, source: 'live', fetchedAt: null, provider }; }

export class OpenMeteoAdapter implements RealWorldAdapter {
  readonly id = 'open-meteo';
  readonly attributions: readonly Attribution[];
  private readonly fetcher: FetchLike;
  private readonly gate: RequestGate;
  private readonly timeoutMs: number;
  private readonly cacheF: TtlCache<string>;
  private readonly cacheM: TtlCache<string>;
  private readonly jma: JmaTideProvider;

  constructor(deps: AdapterDeps = {}) {
    this.fetcher = deps.fetcher ?? defaultFetch;
    this.gate = deps.gate ?? new RequestGate(DEFAULT_GATE, deps.now);
    this.timeoutMs = deps.timeoutMs ?? 6000;
    const st = deps.storage ?? null;
    this.cacheF = new TtlCache<string>(st, STORAGE_KEYS.rwCache + '.f');
    this.cacheM = new TtlCache<string>(st, STORAGE_KEYS.rwCache + '.m');
    this.jma = new JmaTideProvider(this.fetcher, this.gate, this.timeoutMs, new TtlCache<string>(st, STORAGE_KEYS.rwCache + '.j'));
    this.attributions = [ATTR_OPEN_METEO, ATTR_JMA];
  }

  async getSnapshot(req: SnapshotRequest): Promise<WorldSnapshot> {
    const lat = roundLoc(clamp(req.lat, -90, 90)); const lon = roundLoc(clamp(req.lon, -180, 180));
    const now = req.nowMs;
    const key = `${lat.toFixed(1)},${lon.toFixed(1)}`;
    const notes: string[] = [];

    const [fc, mr] = await Promise.all([
      this.fetchJson(this.cacheF, 'f:' + key, buildForecastUrl(lat, lon), now, FORECAST_FRESH_MS, FORECAST_STALE_MS, req.signal),
      this.fetchJson(this.cacheM, 'm:' + key, buildMarineUrl(lat, lon), now, MARINE_FRESH_MS, MARINE_STALE_MS, req.signal),
    ]);

    let forecast: ParsedForecast | null = null; let marine: ParsedMarine | null = null;
    if (fc.ok) { try { forecast = parseForecast(fc.json, now); } catch (e) { notes.push('forecast parse: ' + String(e)); } } else notes.push('forecast: ' + fc.err);
    if (mr.ok) { try { marine = parseMarine(mr.json); } catch (e) { notes.push('marine parse: ' + String(e)); } } else notes.push('marine: ' + mr.err);

    const off = forecast?.utcOffsetSec ?? marine?.utcOffsetSec ?? deviceTime(now).utcOffsetSec;
    const localTime = localTimeFromOffset(now, off, forecast || marine ? 'api' : 'device');
    const mk = <T>(value: T | null, r: { ok: boolean; src: DataSource; at: number | null }, provider: string): Field<T> =>
      value === null ? emptyField<T>(provider) : { value, source: r.ok ? r.src : 'live', fetchedAt: r.at, provider };

    const weather = mk(forecast?.weather ?? null, fc.ok ? fc : failed(), 'open-meteo');
    const wind = mk(forecast?.wind ?? null, fc.ok ? fc : failed(), 'open-meteo');
    const waves = mk(marine?.waves ?? null, mr.ok ? mr : failed(), 'open-meteo-marine');
    const seaTemp = mk(marine?.seaTempC ?? null, mr.ok ? mr : failed(), 'open-meteo-marine');

    // 太陽: API があれば優先、無ければ端末計算（'calc'）。月齢は常に計算
    let sun: Field<SunInfo>;
    if (forecast?.sun) sun = mk(forecast.sun, fc.ok ? fc : failed(), 'open-meteo');
    else sun = { value: computeSunInfo(now, lat, lon, off), source: 'calc', fetchedAt: null, provider: 'local-astronomy' };

    // 潮: 日本で局が指定されていれば JMA 優先、無ければ Open-Meteo の sea_level_height_msl から極値を検出
    let tide: Field<TideState> = emptyField<TideState>('none');
    if (req.jmaStation) {
      const j = await this.jma.getTide(req.jmaStation, now, off, req.signal);
      if (j.value) tide = j; else notes.push('jma: ' + j.provider);
    }
    if (tide.value === null && marine && marine.levelSeries.length >= 5) {
      const st = deriveTideState(findExtremes(marine.levelSeries), now, 'MSL');
      if (st) tide = { value: st, source: mr.ok ? mr.src : 'live', fetchedAt: mr.ok ? mr.at : null, provider: 'open-meteo-marine(sea_level_height_msl)' };
      else notes.push('tide: no bracketing extremes');
    }

    const partial = { weather, wind, waves, seaTempC: seaTemp, tide };
    const mode = computeMode(partial);
    return {
      location: { lat, lon }, localTime, ...partial, sun, moonAgeDays: moonAgeDays(now),
      mode, badge: badgeFor(mode), attributions: [...this.attributions], disclaimerJa: DISCLAIMER_JA, notes,
    };
  }

  private async fetchJson(
    cache: TtlCache<string>, key: string, url: string, now: number, freshMs: number, staleMs: number, signal?: AbortSignal,
  ): Promise<{ ok: true; json: unknown; src: DataSource; at: number | null } | { ok: false; err: string; src: DataSource; at: number | null }> {
    const fresh = cache.get(key, now, freshMs);
    if (fresh) return this.parsed(fresh.value, 'cache', fresh.at);
    try {
      const text = await this.gate.run(key, () => fetchTextWithTimeout(this.fetcher, url, this.timeoutMs, signal));
      cache.set(key, now, text);
      return this.parsed(text, 'live', now);
    } catch (e) {
      const stale = cache.get(key, now, staleMs);
      if (stale) return this.parsed(stale.value, 'cache', stale.at);
      return { ok: false, err: e instanceof Error ? e.message : String(e), src: 'live', at: null };
    }
  }
  private parsed(text: string, src: DataSource, at: number): { ok: true; json: unknown; src: DataSource; at: number | null } | { ok: false; err: string; src: DataSource; at: number | null } {
    try { return { ok: true, json: JSON.parse(text) as unknown, src, at }; }
    catch { return { ok: false, err: 'invalid json', src, at }; }
  }
}
function failed(): { ok: boolean; src: DataSource; at: number | null } { return { ok: false, src: 'live', at: null }; }

// ---- 4.6 気象庁 潮位表（テキスト）----

/**
 * https://www.data.jma.go.jp/kaiyou/data/db/tide/suisan/txt/{YYYY}/{CODE}.txt （CORS: *）
 * 1行=1日、固定長 136 桁: [0,72) 毎時潮位 24×3桁(cm) / [72,78) yy mm dd 各2桁 / [78,80) 地点記号 /
 * [80,108) 満潮 4×(HHMM 4桁 + 潮位 3桁) / [108,136) 干潮 同形式。欠測=9999 / 999。時刻は JST。
 * 潮位は「潮位表基準面」からの cm（東京湾平均海面ではない）→ datum 'JMA-chart-datum'。
 */
export function parseJmaTideText(text: string, utcOffsetSec: number): TideExtreme[] {
  const out: TideExtreme[] = [];
  for (const line of text.split('\n')) {
    if (line.length < 136) continue;
    const yy = parseInt(line.slice(72, 74), 10); const mm = parseInt(line.slice(74, 76), 10); const dd = parseInt(line.slice(76, 78), 10);
    if (!Number.isFinite(yy) || !Number.isFinite(mm) || !Number.isFinite(dd)) continue;
    const dayUtc = Date.UTC(2000 + yy, mm - 1, dd);
    const readBlock = (start: number, kind: 'high' | 'low'): void => {
      for (let i = 0; i < 4; i++) {
        const seg = line.slice(start + i * 7, start + i * 7 + 7);
        const hh = parseInt(seg.slice(0, 2), 10); const mi = parseInt(seg.slice(2, 4), 10); const h = parseInt(seg.slice(4, 7), 10);
        if (!Number.isFinite(hh) || !Number.isFinite(mi) || !Number.isFinite(h) || hh > 24 || mi > 59 || h >= 999) continue;
        out.push({ atMs: dayUtc + (hh * 60 + mi) * 60_000 - utcOffsetSec * 1000, kind, heightM: h / 100 });
      }
    };
    readBlock(80, 'high'); readBlock(108, 'low');
  }
  return out.sort((a, b) => a.atMs - b.atMs);
}

export class JmaTideProvider {
  private readonly fetcher: FetchLike;
  private readonly gate: RequestGate;
  private readonly timeoutMs: number;
  private readonly cache: TtlCache<string>;
  constructor(fetcher: FetchLike, gate: RequestGate, timeoutMs: number, cache: TtlCache<string>) {
    this.fetcher = fetcher; this.gate = gate; this.timeoutMs = timeoutMs; this.cache = cache;
  }
  /** 失敗時は value=null で provider に理由を入れる */
  async getTide(station: string, nowMs: number, utcOffsetSec: number, signal?: AbortSignal): Promise<Field<TideState>> {
    const code = station.trim().toUpperCase();
    if (!/^[A-Z0-9]{2}$/.test(code)) return { value: null, source: 'live', fetchedAt: null, provider: 'bad station code' };
    const year = new Date(nowMs + utcOffsetSec * 1000).getUTCFullYear();
    const url = `https://www.data.jma.go.jp/kaiyou/data/db/tide/suisan/txt/${year}/${code}.txt`;
    const key = `jma:${year}:${code}`;
    let text: string; let src: DataSource = 'live'; let at = nowMs;
    const fresh = this.cache.get(key, nowMs, JMA_FRESH_MS);
    if (fresh) { text = fresh.value; src = 'cache'; at = fresh.at; }
    else {
      try {
        text = await this.gate.run(key, () => fetchTextWithTimeout(this.fetcher, url, this.timeoutMs, signal));
        this.cache.set(key, nowMs, text);
      } catch (e) {
        const stale = this.cache.get(key, nowMs, 40 * DAY_MS); // 年間表は古くても潮は変わらない
        if (!stale) return { value: null, source: 'live', fetchedAt: null, provider: e instanceof Error ? e.message : String(e) };
        text = stale.value; src = 'cache'; at = stale.at;
      }
    }
    const st = deriveTideState(parseJmaTideText(text, JMA_UTC_OFFSET_SEC), nowMs, 'JMA-chart-datum');
    if (!st) return { value: null, source: src, fetchedAt: at, provider: 'jma: no bracketing extremes (year boundary?)' };
    return { value: st, source: src, fetchedAt: at, provider: `jma-tide-table:${code}` };
  }
}

// ---- 4.7 DEMO（決定論的）----

function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}

/** M2 分潮のみの理論潮位。位相は月齢で決まる近似（地点差は無視）→ 必ず DEMO 扱い */
export function demoTideExtremes(nowMs: number): TideExtreme[] {
  const T = 12.4206012 * HOUR_MS;
  const out: TideExtreme[] = [];
  const base = Math.floor(nowMs / T) * T;
  for (let k = -3; k <= 5; k++) {
    for (const half of [0, 0.5]) {
      const t = base + (k + half) * T;
      const a = moonAgeDays(t);
      const amp = 0.55 * (1 + 0.35 * Math.cos((4 * Math.PI * a) / SYNODIC_DAYS)) * 0.5 + 0.2;
      out.push({ atMs: Math.round(t), kind: half === 0 ? 'high' : 'low', heightM: half === 0 ? amp : -amp });
    }
  }
  return out.sort((x, y) => x.atMs - y.atMs);
}

export class DemoAdapter implements RealWorldAdapter {
  readonly id = 'demo';
  readonly attributions: readonly Attribution[] = [];
  private readonly utcOffsetSec: number | null;
  constructor(utcOffsetSec: number | null = null) { this.utcOffsetSec = utcOffsetSec; }

  getSnapshot(req: SnapshotRequest): Promise<WorldSnapshot> {
    return Promise.resolve(this.build(req));
  }

  /** 同じ (地点, 現地の日付, 時刻) → 常に同じ値。乱数は日単位のシード、時刻内は正弦で滑らかに変化 */
  build(req: SnapshotRequest): WorldSnapshot {
    const lat = roundLoc(req.lat); const lon = roundLoc(req.lon);
    const now = req.nowMs;
    const off = this.utcOffsetSec ?? Math.round(lon / 15) * 3600;
    const lt = localTimeFromOffset(now, off, 'device');
    const d = new Date(now + off * 1000);
    const dayKey = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
    const doy = Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 0)) / DAY_MS);
    const rnd = mulberry32(hashStr(`${dayKey}|${lat.toFixed(1)}|${lon.toFixed(1)}`));
    const hourF = lt.hour + lt.minute / 60;
    const hemi = lat >= 0 ? 1 : -1;
    const season = Math.cos((2 * Math.PI * (doy - 205)) / 365) * hemi; // 北半球は 7月下旬が最暖
    const dayVar = rnd() * 6 - 3;
    const airTemp = 16 - 0.18 * Math.abs(lat - 35) + 9 * season + dayVar + 3.5 * Math.sin((2 * Math.PI * (hourF - 9)) / 24);
    const seaTemp = 17 - 0.2 * Math.abs(lat - 35) + 6.5 * Math.cos((2 * Math.PI * (doy - 235)) / 365) * hemi + (rnd() - 0.5);
    const windBase = 2 + rnd() * 5;
    const windSpeed = Math.max(0, windBase + 1.5 * Math.sin((2 * Math.PI * (hourF - 13)) / 24));
    const waveH = clamp(0.25 + windSpeed * 0.12 + rnd() * 0.4, 0.1, 3);
    const cloud = Math.round(rnd() * 100);
    const code = cloud < 25 ? 0 : cloud < 60 ? 2 : cloud < 85 ? 3 : 61;
    const asDemo = <T>(v: T): Field<T> => ({ value: v, source: 'demo', fetchedAt: null, provider: 'demo' });

    const sunInfo = computeSunInfo(now, lat, lon, off);
    const tide = deriveTideState(demoTideExtremes(now), now, 'relative');
    const partial = {
      weather: asDemo<WeatherNow>({ tempC: Math.round(airTemp * 10) / 10, weatherCode: code, cloudPct: cloud, precipMm: code === 61 ? 0.5 : 0, pressureHpa: 1010 + Math.round(rnd() * 12) }),
      wind: asDemo<WindNow>({ speedMs: Math.round(windSpeed * 10) / 10, gustMs: Math.round(windSpeed * 14) / 10, dirDeg: Math.floor(rnd() * 360) }),
      waves: asDemo<WaveNow>({ heightM: Math.round(waveH * 10) / 10, periodS: Math.round((4 + waveH * 2) * 10) / 10, dirDeg: Math.floor(rnd() * 360) }),
      seaTempC: asDemo<number>(Math.round(seaTemp * 10) / 10),
      tide: tide ? asDemo<TideState>(tide) : emptyField<TideState>('demo'),
    };
    const mode = computeMode(partial); // 全項目 demo → 'demo'
    return {
      location: { lat, lon }, localTime: lt, ...partial,
      sun: { value: sunInfo, source: 'calc', fetchedAt: null, provider: 'local-astronomy' },
      moonAgeDays: moonAgeDays(now), mode, badge: badgeFor(mode), attributions: [], disclaimerJa: DISCLAIMER_JA,
      notes: ['DEMO: deterministic synthetic data. Not real weather.'],
    };
  }
}

// ---- 4.8 フォールバック合成 + ファクトリ ----

/** primary の欠けた項目だけを fallback（DEMO）で補う。補った項目は source='demo' のままなので PARTIAL/DEMO バッジになる */
export class FallbackAdapter implements RealWorldAdapter {
  readonly id: string;
  readonly attributions: readonly Attribution[];
  private readonly primary: RealWorldAdapter;
  private readonly fallback: DemoAdapter;
  constructor(primary: RealWorldAdapter, fallback: DemoAdapter) {
    this.primary = primary; this.fallback = fallback;
    this.id = `${primary.id}+${fallback.id}`; this.attributions = primary.attributions;
  }
  async getSnapshot(req: SnapshotRequest): Promise<WorldSnapshot> {
    let p: WorldSnapshot | null = null;
    try { p = await this.primary.getSnapshot(req); } catch { p = null; }
    const demo = this.fallback.build(req);
    if (!p) return { ...demo, notes: [...demo.notes, 'primary adapter threw'] };
    const pick = <T>(a: Field<T>, b: Field<T>): Field<T> => (a.value !== null ? a : b);
    const merged = {
      weather: pick(p.weather, demo.weather), wind: pick(p.wind, demo.wind), waves: pick(p.waves, demo.waves),
      seaTempC: pick(p.seaTempC, demo.seaTempC), tide: pick(p.tide, demo.tide),
    };
    const mode = computeMode(merged);
    return { ...p, ...merged, sun: pick(p.sun, demo.sun), mode, badge: badgeFor(mode) };
  }
}

export interface AdapterFactoryDeps extends AdapterDeps { demoUtcOffsetSec?: number | null }
export function createAdapter(settings: Pick<SettingsV1, 'dataMode'>, deps: AdapterFactoryDeps = {}): RealWorldAdapter {
  const demo = new DemoAdapter(deps.demoUtcOffsetSec ?? null);
  if (settings.dataMode === 'demo') return demo;
  return new FallbackAdapter(new OpenMeteoAdapter(deps), demo);
}
