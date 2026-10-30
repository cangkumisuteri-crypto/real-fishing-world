/** バージョン付きセーブ（localStorage）。失敗しても例外を外へ出さない。 */
export type QualityId = 'low' | 'mid' | 'high';
export interface Settings {
  quality: QualityId;
  moveSpeed: number; // 0.6 .. 1.6 （1.0 = 歩き 3.0 m/s）
  lookSens: number; // 0.5 .. 2.0
  hints: boolean; // 釣り場マーカー表示（任意のヒント）
  camera: 'first' | 'third';
  alwaysRun: boolean; // 常に走る（起動時に走りロックをONにする）
}
export interface SaveData {
  version: 1;
  settings: Settings;
  position: { x: number; z: number; yaw: number } | null;
}
export const SAVE_KEY = 'realFishingWorld.save';
export function defaultSettings(isIOS: boolean): Settings {
  return { quality: isIOS ? 'mid' : 'high', moveSpeed: 1.0, lookSens: 1.0, hints: true, camera: 'first', alwaysRun: false };
}
export interface LoadResult { data: SaveData; status: 'new' | 'loaded' | 'reset' | 'unavailable'; note: string }

const num = (v: unknown, lo: number, hi: number, d: number) => (typeof v === 'number' && isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);

export function loadSave(isIOS: boolean): LoadResult {
  const def: SaveData = { version: 1, settings: defaultSettings(isIOS), position: null };
  let raw: string | null = null;
  try { raw = localStorage.getItem(SAVE_KEY); } catch (e) { return { data: def, status: 'unavailable', note: 'この環境では保存できません（プライベートブラウズ等）。' }; }
  if (!raw) return { data: def, status: 'new', note: '' };
  try {
    const j = JSON.parse(raw);
    if (!j || j.version !== 1) throw new Error('version mismatch');
    const s = j.settings ?? {};
    const settings: Settings = {
      quality: s.quality === 'low' || s.quality === 'mid' || s.quality === 'high' ? s.quality : def.settings.quality,
      moveSpeed: num(s.moveSpeed, 0.6, 1.6, 1),
      lookSens: num(s.lookSens, 0.5, 2, 1),
      hints: typeof s.hints === 'boolean' ? s.hints : true,
      camera: s.camera === 'third' ? 'third' : 'first',
      alwaysRun: typeof s.alwaysRun === 'boolean' ? s.alwaysRun : false,
    };
    let position: SaveData['position'] = null;
    if (j.position && typeof j.position.x === 'number' && typeof j.position.z === 'number' && isFinite(j.position.x) && isFinite(j.position.z)) {
      position = { x: j.position.x, z: j.position.z, yaw: num(j.position.yaw, -1e3, 1e3, 0) };
    }
    return { data: { version: 1, settings, position }, status: 'loaded', note: '' };
  } catch (e) {
    try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ }
    return { data: def, status: 'reset', note: 'セーブデータが壊れていたため初期化しました。' };
  }
}
export function writeSave(d: SaveData): boolean {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); return true; } catch { return false; }
}
export function clearSave(): boolean {
  try { localStorage.removeItem(SAVE_KEY); return true; } catch { return false; }
}
