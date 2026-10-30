/**
 * バージョン付きセーブ（localStorage）。v1 → v2 へ同じキーのまま移行する（実機の既存セーブを壊さない）。
 * 失敗しても例外を外へ出さない。破損データは削除せず隔離キーに退避する。新しいバージョンのデータは上書きしない。
 */
import type { Rig } from '../fishing/rigdata';

export type QualityId = 'low' | 'mid' | 'high';
export interface Settings {
  quality: QualityId;
  moveSpeed: number; // 0.6 .. 1.6 （1.0 = 歩き 3.0 m/s）
  lookSens: number; // 0.5 .. 2.0
  hints: boolean; // 釣り場マーカー表示（任意のヒント）
  camera: 'first' | 'third';
  alwaysRun: boolean; // 常に走る（起動時に走りロックをONにする）
  sound: boolean; // 効果音
  vibration: boolean; // 振動・画面の揺れ
  auto: boolean; // おまかせ釣り（自動キャスト・自動合わせ・自動ファイト）
  assist: boolean; // ファイトアシスト（ドラグ・竿角度を自動。OFF=自分で操作）
  oneHand: 'off' | 'right' | 'left'; // 片手レイアウト（釣りUIを片側の親指に寄せる）
  castPower: number; // 前回のキャスト強さ（0=未投入）。クイック再投入に使う
  modeChosen: boolean; // 初回の「自分で/おまかせ」選択済み
  tutStep: number; // 0..4（4=完了 or スキップ）
  seenHints: string[]; // 表示済みの一回きりヒント
}
export interface CatchLogEntry {
  id: string; at: number; speciesId: string; sizeCm: number; weightKg: number; quality: number; method: 'float';
  spotId: string; fate: 'keep' | 'release'; earnedG: number; xp: number; dataMode: 'demo' | 'live' | 'mixed'; hour: number;
}
export interface ZukanEntry { firstCaughtAt: number; count: number; maxSizeCm: number; bestQuality: number }
export interface Stats { casts: number; bites: number; catches: number; lineBreaks: number; hookOuts: number; releases: number }
export const SAVE_VERSION = 2;
export interface SaveData {
  version: 2;
  settings: Settings;
  position: { x: number; z: number; yaw: number } | null;
  profile: { createdAt: number };
  money: number; xp: number; level: number; // Phase 2 では未使用（SYSTEMS.md の項目だけ先に確保）
  zukan: Record<string, ZukanEntry>;
  catchLog: CatchLogEntry[]; // 直近300件
  stats: Stats;
  lastRig: Rig | null;
}
export const SAVE_KEY = 'realFishingWorld.save';
export const CORRUPT_KEY = 'realFishingWorld.save.corrupt';
export const V1_BACKUP_KEY = 'realFishingWorld.save.v1backup';
export const CATCHLOG_MAX = 300;

export function defaultSettings(isIOS: boolean): Settings {
  return { quality: isIOS ? 'mid' : 'high', moveSpeed: 1.0, lookSens: 1.0, hints: true, camera: 'first', alwaysRun: false, sound: true, vibration: true, auto: false, assist: true, oneHand: 'off', castPower: 0, modeChosen: false, tutStep: 0, seenHints: [] };
}
export function defaultSave(isIOS: boolean): SaveData {
  return {
    version: 2, settings: defaultSettings(isIOS), position: null, profile: { createdAt: Date.now() }, money: 300, xp: 0, level: 1,
    zukan: {}, catchLog: [], stats: { casts: 0, bites: 0, catches: 0, lineBreaks: 0, hookOuts: 0, releases: 0 }, lastRig: null,
  };
}
export interface LoadResult { data: SaveData; status: 'new' | 'loaded' | 'migrated' | 'reset' | 'unavailable' | 'locked'; note: string; repairs: string[] }

/** 書き込みロック（新しいバージョンのデータを検出したとき、または退避に失敗したとき） */
let writeLocked = false;
export const isWriteLocked = () => writeLocked;

const num = (v: unknown, lo: number, hi: number, d: number) => (typeof v === 'number' && isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);
const isObj = (v: unknown): v is Record<string, any> => !!v && typeof v === 'object' && !Array.isArray(v);

function parseSettings(s: any, def: Settings, repairs: string[]): Settings {
  s = isObj(s) ? s : (repairs.push('settings'), {});
  return {
    quality: s.quality === 'low' || s.quality === 'mid' || s.quality === 'high' ? s.quality : def.quality,
    moveSpeed: num(s.moveSpeed, 0.6, 1.6, 1),
    lookSens: num(s.lookSens, 0.5, 2, 1),
    hints: typeof s.hints === 'boolean' ? s.hints : true,
    camera: s.camera === 'third' ? 'third' : 'first',
    alwaysRun: typeof s.alwaysRun === 'boolean' ? s.alwaysRun : false,
    sound: typeof s.sound === 'boolean' ? s.sound : true,
    vibration: typeof s.vibration === 'boolean' ? s.vibration : true,
    auto: typeof s.auto === 'boolean' ? s.auto : false,
    assist: typeof s.assist === 'boolean' ? s.assist : true,
    oneHand: s.oneHand === 'right' || s.oneHand === 'left' ? s.oneHand : 'off',
    castPower: num(s.castPower, 0, 1, 0),
    // 既存プレイヤー（旧セーブ）には初回選択・チュートリアルを出さない（modeChosen/tutStep が無い＝v0.2.0 のデータ）
    modeChosen: typeof s.modeChosen === 'boolean' ? s.modeChosen : false,
    tutStep: Math.round(num(s.tutStep, 0, 4, 0)),
    seenHints: Array.isArray(s.seenHints) ? s.seenHints.filter((x: unknown) => typeof x === 'string').slice(0, 40) : [],
  };
}
function parsePosition(p: any): SaveData['position'] {
  if (isObj(p) && typeof p.x === 'number' && typeof p.z === 'number' && isFinite(p.x) && isFinite(p.z)) return { x: p.x, z: p.z, yaw: num(p.yaw, -1e3, 1e3, 0) };
  return null;
}
function parseRig(r: any): Rig | null {
  if (!isObj(r)) return null;
  if (typeof r.floatId !== 'string' || typeof r.hookId !== 'string' || typeof r.baitId !== 'string') return null;
  return { floatId: r.floatId, hookId: r.hookId, baitId: r.baitId, depthM: num(r.depthM, 0.5, 10, 3) };
}
/** 版ごとの移行（1つずつ上げる）。未知フィールドは捨て、壊れた項目だけ既定値に直す。 */
const MIGRATIONS: Record<number, (j: any, isIOS: boolean, repairs: string[]) => any> = {
  1: (j, isIOS, repairs) => ({ ...j, version: 2, settings: parseSettings(j.settings, defaultSettings(isIOS), repairs), profile: { createdAt: Date.now() }, money: 300, xp: 0, level: 1, zukan: {}, catchLog: [], stats: { casts: 0, bites: 0, catches: 0, lineBreaks: 0, hookOuts: 0, releases: 0 }, lastRig: null }),
};
function sanitizeV2(j: any, isIOS: boolean, repairs: string[]): SaveData {
  const def = defaultSave(isIOS);
  const zukan: Record<string, ZukanEntry> = {};
  if (isObj(j.zukan)) for (const [k, v] of Object.entries(j.zukan)) {
    if (!isObj(v)) { repairs.push('zukan:' + k); continue; }
    zukan[k] = { firstCaughtAt: num(v.firstCaughtAt, 0, 1e15, 0), count: Math.round(num(v.count, 0, 1e7, 1)), maxSizeCm: num(v.maxSizeCm, 0, 1000, 0), bestQuality: num(v.bestQuality, 0, 1, 0.5) };
  } else if (j.zukan !== undefined) repairs.push('zukan');
  const log: CatchLogEntry[] = [];
  if (Array.isArray(j.catchLog)) for (const e of j.catchLog.slice(-CATCHLOG_MAX)) {
    if (!isObj(e) || typeof e.speciesId !== 'string') { repairs.push('catchLog'); continue; }
    log.push({ id: String(e.id ?? e.at ?? log.length), at: num(e.at, 0, 1e15, 0), speciesId: e.speciesId, sizeCm: num(e.sizeCm, 0, 1000, 0), weightKg: num(e.weightKg, 0, 5000, 0), quality: num(e.quality, 0, 1, 0.5), method: 'float', spotId: typeof e.spotId === 'string' ? e.spotId : 'free', fate: e.fate === 'release' ? 'release' : 'keep', earnedG: num(e.earnedG, 0, 1e9, 0), xp: num(e.xp, 0, 1e9, 0), dataMode: e.dataMode === 'live' || e.dataMode === 'mixed' ? e.dataMode : 'demo', hour: num(e.hour, 0, 24, 12) });
  } else if (j.catchLog !== undefined) repairs.push('catchLog');
  const st = isObj(j.stats) ? j.stats : {};
  return {
    version: 2, settings: parseSettings(j.settings, def.settings, repairs), position: parsePosition(j.position),
    profile: { createdAt: num(j.profile?.createdAt, 0, 1e15, def.profile.createdAt) },
    money: Math.round(num(j.money, 0, 1e9, 300)), xp: Math.round(num(j.xp, 0, 1e9, 0)), level: Math.round(num(j.level, 1, 999, 1)),
    zukan, catchLog: log,
    stats: { casts: num(st.casts, 0, 1e9, 0), bites: num(st.bites, 0, 1e9, 0), catches: num(st.catches, 0, 1e9, 0), lineBreaks: num(st.lineBreaks, 0, 1e9, 0), hookOuts: num(st.hookOuts, 0, 1e9, 0), releases: num(st.releases, 0, 1e9, 0) },
    lastRig: parseRig(j.lastRig),
  };
}
/** 純粋関数：生のJSON文字列を読み、移行して SaveData を返す（テスト用に export）。 */
export function parseSave(raw: string, isIOS: boolean): { data: SaveData; migrated: boolean; newer: boolean; repairs: string[] } {
  const repairs: string[] = [];
  let j = JSON.parse(raw);
  if (!isObj(j) || typeof j.version !== 'number' || !isFinite(j.version)) throw new Error('no version');
  if (j.version > SAVE_VERSION) return { data: defaultSave(isIOS), migrated: false, newer: true, repairs };
  let migrated = false;
  while (j.version < SAVE_VERSION) {
    const m = MIGRATIONS[j.version]; if (!m) throw new Error('no migration from v' + j.version);
    j = m(j, isIOS, repairs); migrated = true;
  }
  return { data: sanitizeV2(j, isIOS, repairs), migrated, newer: false, repairs };
}

export function loadSave(isIOS: boolean): LoadResult {
  const def = defaultSave(isIOS);
  let raw: string | null = null;
  try { raw = localStorage.getItem(SAVE_KEY); } catch (e) { return { data: def, status: 'unavailable', note: 'この環境では保存できません（プライベートブラウズ等）。', repairs: [] }; }
  if (!raw) return { data: def, status: 'new', note: '', repairs: [] };
  try {
    const r = parseSave(raw, isIOS);
    if (r.newer) { writeLocked = true; return { data: def, status: 'locked', note: '新しいバージョンのセーブデータがあるため、上書きしません（この版では保存されません）。', repairs: [] }; }
    if (r.migrated) { try { if (!localStorage.getItem(V1_BACKUP_KEY)) localStorage.setItem(V1_BACKUP_KEY, raw); } catch { /* ignore */ } }
    return { data: r.data, status: r.migrated ? 'migrated' : 'loaded', note: r.repairs.length ? '一部のセーブ項目を修復しました。' : '', repairs: r.repairs };
  } catch (e) {
    // 破損：削除せず隔離（調査・復旧用）。退避できなければ上書きもしない
    let ok = false;
    try { localStorage.setItem(CORRUPT_KEY, raw); ok = true; } catch { /* ignore */ }
    if (ok) { try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ } } else writeLocked = true;
    return { data: def, status: 'reset', note: 'セーブデータが壊れていたため初期化しました（元データは隔離保存）。', repairs: [] };
  }
}
export function writeSave(d: SaveData): boolean {
  if (writeLocked) return false;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); return true; } catch { return false; }
}
export function clearSave(): boolean {
  try { localStorage.removeItem(SAVE_KEY); return true; } catch { return false; }
}

/* ---------- 釣果の記録（純粋関数） ---------- */
export interface CatchInput { speciesId: string; sizeCm: number; weightKg: number; quality: number; hour: number; at: number }
export function recordCatch(d: SaveData, c: CatchInput, spotId: string): { entry: CatchLogEntry; first: boolean; newMax: boolean } {
  const entry: CatchLogEntry = { id: `${c.at}-${d.stats.catches}`, at: c.at, speciesId: c.speciesId, sizeCm: c.sizeCm, weightKg: c.weightKg, quality: c.quality, method: 'float', spotId, fate: 'keep', earnedG: 0, xp: 0, dataMode: 'demo', hour: c.hour };
  d.catchLog.push(entry); if (d.catchLog.length > CATCHLOG_MAX) d.catchLog.splice(0, d.catchLog.length - CATCHLOG_MAX);
  d.stats.catches++;
  const z = d.zukan[c.speciesId];
  let first = false, newMax = false;
  if (!z) { d.zukan[c.speciesId] = { firstCaughtAt: c.at, count: 1, maxSizeCm: c.sizeCm, bestQuality: c.quality }; first = true; }
  else { z.count++; if (c.sizeCm > z.maxSizeCm) { z.maxSizeCm = c.sizeCm; newMax = true; } z.bestQuality = Math.max(z.bestQuality, c.quality); }
  return { entry, first, newMax };
}
export function releaseCatch(d: SaveData, entryId: string): boolean {
  const e = d.catchLog.find((x) => x.id === entryId);
  if (!e || e.fate === 'release') return false;
  e.fate = 'release'; d.stats.releases++; return true;
}
