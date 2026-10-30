import { parseSave, defaultSave, recordCatch, SAVE_VERSION, CATCHLOG_MAX } from '../../src/systems/save';
let ok = 0, ng = 0;
const t = (n: string, c: boolean, d = '') => { c ? ok++ : ng++; console.log((c ? 'PASS ' : 'FAIL ') + n + (d ? ' — ' + d : '')); };
// v1 (Phase 1) 形式
const v1 = JSON.stringify({ version: 1, settings: { quality: 'high', sound: false, invertY: true }, position: { x: -8, z: 8.6, yaw: 0.3 } });
const r1 = parseSave(v1, true);
t('v1→v2 移行', r1.migrated && r1.data.version === SAVE_VERSION && !r1.newer);
t('v1 位置が保持される', !!r1.data.position && r1.data.position.x === -8 && Math.abs(r1.data.position.yaw - 0.3) < 1e-9, JSON.stringify(r1.data.position));
t('v1 新フィールドが初期化', typeof r1.data.zukan === 'object' && Array.isArray(r1.data.catchLog) && r1.data.stats.casts === 0);
// 現行
const d = defaultSave(true);
recordCatch(d, { speciesId: 'aji', sizeCm: 21, weightKg: 0.1, quality: 0.5, hour: 7, at: 1 }, 'quay');
recordCatch(d, { speciesId: 'aji', sizeCm: 25, weightKg: 0.2, quality: 0.8, hour: 7, at: 2 }, 'quay');
t('図鑑 count/maxSize', d.zukan.aji.count === 2 && d.zukan.aji.maxSizeCm === 25 && d.catchLog.length === 2 && d.stats.catches === 2);
const r2 = parseSave(JSON.stringify(d), true);
t('v2 往復で内容保持', !r2.migrated && r2.data.zukan.aji.count === 2 && r2.data.catchLog.length === 2);
// 新しい版
const r3 = parseSave(JSON.stringify({ version: 99, zukan: {} }), true);
t('新しい版は既定にして newer=true', r3.newer && r3.data.version === SAVE_VERSION);
// 壊れたデータ
let threw = 0;
for (const bad of ['{', 'null', '[]', '{"version":"x"}', '']) { try { parseSave(bad, true); } catch { threw++; } }
t('壊れたJSON/形式は例外（呼び出し側で退避→新規）', threw === 5, 'threw=' + threw);
// 不正値のサニタイズ
const r4 = parseSave(JSON.stringify({ version: 2, settings: {}, zukan: { aji: { count: -5, maxSizeCm: 'x' }, bad: 3 }, catchLog: 'no', stats: { casts: 'a' }, money: 1e99 }), true);
t('不正値をサニタイズ（落ちない）', r4.data.version === 2 && Array.isArray(r4.data.catchLog) && r4.data.stats.casts === 0 && r4.data.money <= 1e9, JSON.stringify(r4.data.zukan));
// ログ上限
const big = defaultSave(true); for (let i = 0; i < CATCHLOG_MAX + 20; i++) recordCatch(big, { speciesId: 'aji', sizeCm: 20, weightKg: 0.1, quality: 0.5, hour: 7, at: i }, 'quay');
t('catchLog 上限' + CATCHLOG_MAX, big.catchLog.length === CATCHLOG_MAX);
console.log(`save_test ${ok}/${ok + ng}`); process.exit(ng ? 1 : 0);
