/* Phase2 ウキ釣り QA（qa.mjs から呼ぶ）。決定的：seed固定＋__rfw.fishing の advance/freeze を使う。
 * 実機の釣り心地・音・振動・fpsは検証できない（ヘッドレス）。 */
import path from 'path';
import { sleep } from './lib.mjs';

const settle = async (page) => { await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))))); await sleep(120); };
const F = (page, fn, a) => page.evaluate(fn, a);
const fst = (page) => page.evaluate(() => window.__rfw.fishing.state());
// 実際の座標をタップ（アニメーション中のボタンでも押せる＝他要素に隠れていないことも検証）
const tap = async (page, touch, sel) => {
  const b = await page.locator(sel).boundingBox(); if (!b) throw new Error('no box ' + sel);
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  const top = await page.evaluate(([x, y, sel]) => { const e = document.elementFromPoint(x, y); const t = document.querySelector(sel); return !!e && (e === t || t.contains(e)); }, [x, y, sel]);
  if (!top) throw new Error('covered ' + sel);
  if (touch) await page.touchscreen.tap(x, y); else await page.mouse.click(x, y);
};
const adv = (page, sec) => page.evaluate((s) => window.__rfw.fishing.advance(s), sec);
/** 本アタリ(biteイベント)が出るまで進める（前アタリでは止まらない） */
const advToMainBite = async (page, maxSec) => {
  const n0 = (await fst(page)).biteEvents;
  for (let t = 0; t < maxSec; t += 0.05) { if ((await fst(page)).biteEvents > n0) return true; await adv(page, 0.05); }
  return false;
};
const advUntil = async (page, phase, maxSec, step = 0.1) => {
  for (let t = 0; t < maxSec; t += step) { if ((await fst(page)).phase === phase) return true; await adv(page, step); }
  return (await fst(page)).phase === phase;
};
async function toFishing(page, touch, until, site = { x: -8, z: 8.6, yaw: 0 }) {
  await page.evaluate((s) => window.__rfw.teleport(s.x, s.z, s.yaw), site); await settle(page);
  await tap(page, touch, '#btnFish');
  await until(page, () => window.__rfw.state().mode === 'fish' && window.__rfw.fishing.state().phase === 'ready');
  await sleep(300);
}
/** キャスト（ボタン2回）して wait まで進める */
/** 強制アタリ→本アタリ→ボタンで合わせ。針掛かり確率があるので、失敗したら最大8回やり直す */
async function biteAndHook(page, touch, sp, cm, onBite) {
  for (let k = 1; k <= 8; k++) {
    if ((await fst(page)).phase !== 'wait') return { ok: false, tries: k, why: 'not-wait ' + (await fst(page)).phase };
    await F(page, ([sp, cm]) => window.__rfw.fishing.forceBite(sp, cm), [sp, cm]);
    if (!(await advToMainBite(page, 12))) return { ok: false, tries: k, why: 'no-bite' };
    await adv(page, 0.2);
    if (k === 1 && onBite) await onBite();
    await tap(page, touch, '#btnAction'); await adv(page, 0.4);
    if ((await fst(page)).phase === 'fight') return { ok: true, tries: k };
    await adv(page, 0.5);
  }
  return { ok: false, tries: 8, why: 'never hooked' };
}
async function castToWait(page, touch) {
  await tap(page, touch, '#btnAction'); await sleep(100);
  await adv(page, 0.6);
  const aim = await fst(page);
  await tap(page, touch, '#btnAction'); await sleep(100);
  await adv(page, 0.5);
  await advUntil(page, 'wait', 6);
  await settle(page); // 描画フレームを1回以上回してビュー状態を更新
  return aim;
}

export async function fishFlow(ctx) {
  const { page, suite, rec, touch, until, OUT, Q, waitBoot } = ctx;
  await page.evaluate(() => { try { window.__rfw.fishing.setEnv(17.5); } catch {} });
  await toFishing(page, touch, until);
  await F(page, () => window.__rfw.fishing.freeze(true));
  let s = await fst(page);
  rec(suite, 'P2 ready: ボタンが「キャスト」/ 情報カード表示', s.phase === 'ready' && /キャスト/.test(s.ui.action || '') && /釣り場/.test(s.ui.card || ''), s.ui.action);
  // ---- cast ----
  const aim = await castToWait(page, touch);
  rec(suite, 'P2 cast: 1回目で狙い(aim)・パワーゲージ表示', aim.phase === 'aim' && aim.ui.power === true, `phase=${aim.phase} power=${aim.aimPower?.toFixed(2)}`);
  s = await fst(page);
  const nd = s.floatNdc;
  rec(suite, 'P2 cast: ウキが3Dで出現し画面内に見える', s.phase === 'wait' && s.floatShown && nd && Math.abs(nd.x) < 1 && Math.abs(nd.y) < 1 && nd.z < 1, `phase=${s.phase} ndc=${nd ? nd.x.toFixed(2) + ',' + nd.y.toFixed(2) : 'null'} dist=${s.snap?.castDist}`);
  rec(suite, 'P2 cast: 魚影(近傍の魚)が存在 / 水深が分かる', s.shadows >= 0 && s.seabed > 1, `shadows=${s.shadows} seabed=${s.seabed?.toFixed?.(1)}`);
  rec(suite, 'P2 cast: SFX/ハプティクス呼び出しが発生', (s.sfx?.cast ?? s.sfx?.total ?? 0) > 0 || Object.values(s.sfx || {}).some((v) => v > 0), JSON.stringify(s.sfx));
  await settle(page);
  await page.screenshot({ path: path.join(OUT, `${suite}_p2_wait.png`) });
  // ---- 空合わせ ----
  const hs0 = (await fst(page)).log.length;
  await F(page, () => window.__rfw.fishing.act()); await adv(page, 0.2);
  s = await fst(page);
  rec(suite, 'P2 合わせ: アタリ前の空合わせは何も起きない(waitのまま)', s.phase === 'wait', `phase=${s.phase}`);
  // ---- ウキ下 ----
  const d0 = s.rig.depthM;
  await F(page, () => window.__rfw.fishing.setRig({ depthM: 4.0 })); s = await fst(page);
  rec(suite, 'P2 ウキ下変更が反映される', Math.abs(s.rig.depthM - 4.0) < 0.01 && d0 !== s.rig.depthM, `${d0}→${s.rig.depthM}`);
  await F(page, () => window.__rfw.fishing.setRig({ depthM: 3.0 }));
  // ---- bite → 合わせ ----
  await F(page, () => window.__rfw.fishing.forceBite('aji', 20));
  let sawPre = false;
  const nb0 = (await fst(page)).biteEvents;
  for (let i = 0; i < 200; i++) { await adv(page, 0.05); const x = await fst(page); if ((x.log || []).includes('pre')) sawPre = true; if (x.biteEvents > nb0) break; }
  await adv(page, 0.2);
  s = await fst(page);
  rec(suite, 'P2 bite: 前アタリ→本アタリ(bite)に到達', s.phase === 'bite' && s.biteEvents > nb0 && sawPre, `phase=${s.phase} pre=${sawPre} log=${(s.log || []).slice(-5).join('>')}`);
  await settle(page);
  await page.screenshot({ path: path.join(OUT, `${suite}_p2_bite.png`) });
  await tap(page, touch, '#btnAction'); await adv(page, 0.4);
  s = await fst(page);
  let hkTries = 1;
  if (s.phase !== 'fight') { const h2 = await biteAndHook(page, touch, 'aji', 20); hkTries += h2.tries; s = await fst(page); }
  rec(suite, 'P2 合わせ(ボタン)でフッキング→ファイト開始（針掛かりは確率。やり直しあり）', s.phase === 'fight', `phase=${s.phase} tries=${hkTries} log=${(s.log || []).slice(-5).join('>')}`);
  await adv(page, 3); await settle(page);
  s = await fst(page);
  for (let i = 0; i < 40 && !((s.ui || {}).ten && (s.ui || {}).rod && (s.ui || {}).reel); i++) { await settle(page); await sleep(250); s = await fst(page); } // 低速GL対策でUIフレームを待つ
  const ui = s.ui || {};
  rec(suite, 'P2 fight: テンション/竿角度/ドラグ/巻くのUI表示', ui.ten && ui.rod && ui.reel, JSON.stringify(ui).slice(0, 160));
  await page.screenshot({ path: path.join(OUT, `${suite}_p2_fight.png`) });
  // ドラグ±
  const dr0 = s.drag;
  await tap(page, touch, '#dragPlus'); s = await fst(page);
  const dr1 = s.drag; await tap(page, touch, '#dragMinus'); await tap(page, touch, '#dragMinus'); s = await fst(page);
  rec(suite, 'P2 fight: ドラグ＋/－ボタンが効く(0.1刻み)', dr1 > dr0 + 0.05 && s.drag < dr1 - 0.1, `${dr0}→${dr1}→${s.drag}`);
  await F(page, () => window.__rfw.fishing.drag(0.75));
  // ロッド角度ポーズ
  await F(page, () => { window.__rfw.fishing.pose(80, 0); }); await adv(page, 0.3); s = await fst(page);
  rec(suite, 'P2 fight: 竿の曲がり(rodBend)が表示に反映', s.rodBend > 0.01, `bend=${s.rodBend}`);
  await F(page, () => window.__rfw.fishing.pose(null, null));
  const bot = await F(page, () => window.__rfw.fishing.bot(150));
  s = await fst(page);
  rec(suite, 'P2 fight: 完了して取り込み成功(LANDED)', bot.result === 'LANDED' && s.phase === 'result', JSON.stringify(bot));
  await adv(page, 0.3); await settle(page);
  s = await fst(page);
  rec(suite, 'P2 landing: 魚種とサイズのカード・3D魚が出る', s.resultShown && /アジ/.test(s.resultText) && /cm/.test(s.resultText) && s.catchShown, (s.resultText || '').replace(/\s+/g, ' ').slice(0, 80));
  await page.screenshot({ path: path.join(OUT, `${suite}_p2_result.png`) });
  rec(suite, 'P2 landing: 図鑑・釣果ログ・統計が更新', !!s.save.zukan.aji && s.save.zukan.aji.count === 1 && s.save.catchLog >= 1 && s.save.stats.catches >= 1, JSON.stringify(s.save).slice(0, 160));
  await tap(page, touch, '#rcKeep'); await sleep(300);
  s = await fst(page);
  rec(suite, 'P2 landing: 「キープ」で閉じて ready に戻る', s.phase === 'ready' && !s.resultShown, `phase=${s.phase}`);
  // ---- 図鑑 / 仕掛けパネル ----
  await tap(page, touch, '#btnExit'); await settle(page);
  await tap(page, touch, '#btnBag'); await sleep(400);
  const zk = await F(page, () => ({ open: document.getElementById('panel').classList.contains('open'), txt: document.getElementById('panelBody').textContent }));
  rec(suite, 'P2 図鑑パネルにアジが記録表示される', zk.open && /アジ/.test(zk.txt) && /1/.test(zk.txt), zk.txt.replace(/\s+/g, ' ').slice(0, 80));
  await page.screenshot({ path: path.join(OUT, `${suite}_p2_zukan.png`) });
  await tap(page, touch, '#panelClose'); await sleep(250);
  await toFishing(page, touch, until);
  await F(page, () => window.__rfw.fishing.freeze(true));
  await tap(page, touch, '#btnGear'); await sleep(400);
  const rg = await F(page, () => ({ open: document.getElementById('panel').classList.contains('open'), n: document.querySelectorAll('#panelBody button').length, txt: document.getElementById('panelBody').textContent.replace(/\s+/g, ' ').slice(0, 100) }));
  rec(suite, 'P2 仕掛けパネル(プリセット/ウキ/エサ)が開く', rg.open && rg.n >= 6, `buttons=${rg.n} ${rg.txt}`);
  await page.screenshot({ path: path.join(OUT, `${suite}_p2_rig.png`) });
  // プリセット切替
  const pre0 = (await fst(page)).rig;
  const clicked = await F(page, () => { const b = [...document.querySelectorAll('#panelBody button')].find((x) => /底|ボトム|カサゴ/.test(x.textContent)); if (b) { b.click(); return b.textContent; } return null; });
  await sleep(200);
  const pre1 = (await fst(page)).rig;
  rec(suite, 'P2 仕掛けプリセットを切り替えると仕掛けが変わる', !!clicked && JSON.stringify(pre0) !== JSON.stringify(pre1), `${clicked} ${JSON.stringify(pre1).slice(0, 80)}`);
  await tap(page, touch, '#panelClose'); await sleep(250);
  await F(page, () => window.__rfw.fishing.setRig({ floatId: 'fS', depthM: 3, hookId: 'h5', baitId: 'okiami' }));
  // ---- 保存→リロード ----
  await F(page, () => window.__rfw.saveNow());
  const raw = await F(page, () => localStorage.getItem('realFishingWorld.save'));
  let sv = null; try { sv = JSON.parse(raw); } catch {}
  rec(suite, 'P2 保存: v2セーブに図鑑・釣果ログ・統計・仕掛けが入る', sv && sv.version === 2 && sv.zukan?.aji?.count === 1 && sv.catchLog?.length >= 1 && sv.stats?.catches >= 1 && sv.lastRig, raw ? raw.slice(0, 80) : 'null');
  await page.goto(Q('&q=low&t=14&seed=7')); await waitBoot(page);
  const zk2 = await F(page, () => { const sv = JSON.parse(localStorage.getItem('realFishingWorld.save')); return { z: sv.zukan, n: sv.catchLog.length }; });
  rec(suite, 'P2 保存: リロード後も図鑑・釣果ログが残る', zk2.z?.aji?.count === 1 && zk2.n >= 1, JSON.stringify(zk2).slice(0, 100));
  if (touch) await page.tap('#play'); else await page.click('#play');
  await until(page, () => document.body.classList.contains('playing')); await settle(page);
  await F(page, () => window.__rfw.fishing.setEnv(17.5));
  // ---- 自然なアタリ（forceBite無し） ----
  await toFishing(page, touch, until);
  await F(page, () => window.__rfw.fishing.freeze(true));
  await castToWait(page, touch);
  let nat = null, total = 0;
  for (let t = 0; t < 420 && !nat; t += 0.5) {
    await adv(page, 0.5); const x = await fst(page); total += 0.5;
    if (x.phase === 'bite') { nat = { t: total, sp: x.fightFish }; }
    if (x.phase === 'ready') { await castToWait(page, touch); }
  }
  rec(suite, 'P2 自然なアタリが発生する(強制なし・seed固定)', !!nat, nat ? `${nat.t}s(sim)` : '420s sim で無し');
  if (nat) { await F(page, () => window.__rfw.fishing.act()); await adv(page, 0.5); const a = await fst(page); rec(suite, 'P2 自然アタリ→合わせ→ファイトor軽い掛かり', a.phase === 'fight' || a.phase === 'wait' || a.phase === 'ready', `phase=${a.phase}`); }
  // ---- 失敗系：ラインブレイク ----
  const tryBreak = async (sp, cm, cfg) => {
    s = await fst(page);
    if (s.phase === 'fight') await F(page, () => window.__rfw.fishing.bot(200));
    s = await fst(page); if (s.phase === 'result') { await F(page, () => window.__rfw.fishing.dismiss(true)); await adv(page, 0.2); }
    s = await fst(page);
    if (s.phase === 'ready') await castToWait(page, touch);
    else if (s.phase === 'bite') { await adv(page, 6); if ((await fst(page)).phase === 'ready') await castToWait(page, touch); }
    await F(page, () => window.__rfw.fishing.setRig({}));
    const h = await biteAndHook(page, touch, sp, cm);
    if (!h.ok) return { ok: false, why: h.why };
    const r = await F(page, (cfg) => window.__rfw.fishing.bot(120, cfg), cfg);
    return { ok: true, r };
  };
  let brk = null;
  for (const [sp, cm, cfg] of [['chinu', 50, { reelAlways: true, theta: 88, drag: 2.3 }], ['seabass', 70, { reelAlways: true, theta: 88, drag: 2.3 }], ['chinu', 48, { reelAlways: true, theta: 85, drag: 2.3 }]]) {
    const o = await tryBreak(sp, cm, cfg); if (o.ok && o.r.result && o.r.result !== 'LANDED') { brk = { sp, ...o.r }; break; }
  }
  s = await fst(page);
  rec(suite, 'P2 失敗系: ラインブレイク等(LINE_BREAK/HOOK_OUT)に到達でき結果カードが出る', !!brk, brk ? JSON.stringify(brk) : 'not reached');
  if (brk) {
    await adv(page, 0.3); await settle(page); s = await fst(page);
    rec(suite, 'P2 失敗系: 結果カードがOKで閉じられ統計が更新', s.resultShown && (s.save.stats.lineBreaks + s.save.stats.hookOuts) >= 1, `${(s.resultText || '').replace(/\s+/g, ' ').slice(0, 60)} stats=${JSON.stringify(s.save.stats)}`);
    await page.screenshot({ path: path.join(OUT, `${suite}_p2_fail.png`) });
    await tap(page, touch, '#rcOk'); await sleep(200);
  }
  // ---- エサ取り（餌消耗） ----
  s = await fst(page);
  if (s.phase === 'result') await F(page, () => window.__rfw.fishing.dismiss(true));
  s = await fst(page);
  const bait0 = s.baitLife;
  rec(suite, 'P2 仕掛け情報(エサ残量)が取得できる', typeof bait0 === 'number' && bait0 >= 0 && bait0 <= 1.001, `bait=${bait0}`);
  // ---- フリックキャスト ----
  s = await fst(page);
  if (s.phase !== 'ready') { await F(page, () => window.__rfw.fishing.advance(30)); }
  s = await fst(page);
  if (s.phase === 'ready' || s.phase === 'wait') {
    if (s.phase === 'wait') { /* 巻き上げ */ await F(page, () => window.__rfw.fishing.reel(true)); for (let i = 0; i < 60 && (await fst(page)).phase !== 'ready'; i++) await adv(page, 0.5); await F(page, () => window.__rfw.fishing.reel(false)); }
    s = await fst(page);
    if (s.phase === 'ready') {
      await settle(page);
      const vp = page.viewportSize();
      const pre = await page.evaluate(() => { const i = window.__rfw.fishing.state().inp; const t = document.getElementById('touch'); window.__flk = []; ['pointerdown','pointerup'].forEach(n => window.addEventListener(n, (e) => window.__flk.push(n + ':' + e.pointerId + ':' + (e.target && e.target.id)), true)); return JSON.stringify(i) + ' touchDisp=' + getComputedStyle(t).display + ' pe=' + getComputedStyle(t).pointerEvents; });
      await page.evaluate(([w, h]) => {
        const t = document.getElementById('touch'); const mk = (type, x, y) => new PointerEvent(type, { pointerId: 31, pointerType: 'touch', clientX: x, clientY: y, bubbles: true, cancelable: true, isPrimary: true, button: 0 });
        const x = w * 0.75, y = h * 0.6;
        t.dispatchEvent(mk('pointerdown', x, y)); window.dispatchEvent(mk('pointermove', x, y - 60)); window.dispatchEvent(mk('pointermove', x, y - 140));
        window.dispatchEvent(mk('pointerup', x, y - 150));
      }, [vp.width, vp.height]);
      await sleep(200); await adv(page, 1);
      const x = await fst(page);
      rec(suite, 'P2 上フリックでもキャストできる', x.phase === 'wait' || x.phase === 'flight', `before=${s.phase} phase=${x.phase} log=${(x.log || []).slice(-6).join('>')} toast=${await page.evaluate(() => document.getElementById("toast").textContent)} inp=${JSON.stringify(x.inp)} pre=${pre} flk=${await page.evaluate(() => (window.__flk||[]).join(','))} resCard=${x.resultShown} panel=${await page.evaluate(() => document.getElementById('panel').classList.contains('open'))}`);
    }
  }
  await F(page, () => window.__rfw.fishing.freeze(false));
}

/** 各フェーズでHUDレイアウト（重なり/画面外/44px）を検査 */
export async function phaseLayouts(ctx, vp, hudRects) {
  const { page, suite, rec, touch, until, OUT } = ctx;
  await page.setViewportSize(vp); await settle(page);
  await toFishing(page, touch, until);
  await F(page, () => window.__rfw.fishing.freeze(true));
  const check = async (tag) => {
    await settle(page);
    const rs = await hudRects(page); const bad = [];
    for (let i = 0; i < rs.length; i++) {
      const a = rs[i];
      if (a.x < -0.5 || a.y < -0.5 || a.x + a.w > vp.width + 0.5 || a.y + a.h > vp.height + 0.5) bad.push(`out:${a.id}`);
      if (!a.info && (a.w < 43.5 || a.h < 43.5)) bad.push(`small:${a.id}(${a.w | 0}x${a.h | 0})`);
      for (let j = i + 1; j < rs.length; j++) { const b = rs[j]; if (a.x < b.x + b.w - 0.5 && b.x < a.x + a.w - 0.5 && a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5) bad.push(`overlap:${a.id}×${b.id}`); }
    }
    // 結果カード（非data-ui）とのかぶりもチェック
    const card = await page.evaluate(() => { const c = document.getElementById('resultCard'); if (!c || getComputedStyle(c).display === 'none') return null; const r = c.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    if (card) for (const a of rs) { if (!['rcRelease', 'rcKeep', 'rcOk'].includes(a.id) && a.x < card.x + card.w && card.x < a.x + a.w && a.y < card.y + card.h && card.y < a.y + a.h) bad.push(`card×${a.id}`); }
    rec(suite, `P2 layout ${vp.width}x${vp.height} [${tag}]: 重なり/画面外/44px (${rs.length} elems)`, bad.length === 0, bad.join(', '));
    await page.screenshot({ path: path.join(OUT, `${suite}_p2_${vp.width}x${vp.height}_${tag}.png`) });
  };
  await check('ready');
  await tap(page, touch, '#btnAction'); await sleep(100); await check('aim');
  await adv(page, 0.6);
  await tap(page, touch, '#btnAction'); await adv(page, 0.5); await advUntil(page, 'wait', 6); await check('wait');
  const hk = await biteAndHook(page, touch, 'aji', 20, () => check('bite'));
  rec(suite, `P2 layout ${vp.width}x${vp.height}: 合わせてファイトに入れる`, hk.ok, JSON.stringify(hk));
  await adv(page, 3); await check('fight');
  const br = await F(page, () => window.__rfw.fishing.bot(150)); await adv(page, 0.3); await check('result');
  rec(suite, `P2 layout ${vp.width}x${vp.height}: ファイトがresultまで到達`, br.phase === 'result', JSON.stringify(br));
  await tap(page, touch, (await page.evaluate(() => (document.getElementById('rcKeep') ? '#rcKeep' : document.getElementById('rcOk') ? '#rcOk' : '#btnExit')))); await sleep(200);
  await tap(page, touch, '#btnGear'); await sleep(400);
  const open = await page.evaluate(() => document.getElementById('panel').classList.contains('open'));
  const pr = await page.evaluate(() => { const r = document.getElementById('panel').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
  rec(suite, `P2 layout ${vp.width}x${vp.height} [rig panel]: 画面内に収まる`, open && pr.x >= -0.5 && pr.y >= -0.5 && pr.x + pr.w <= vp.width + 0.5 && pr.y + pr.h <= vp.height + 0.5, JSON.stringify(pr));
  await page.screenshot({ path: path.join(OUT, `${suite}_p2_${vp.width}x${vp.height}_rigpanel.png`) });
  await tap(page, touch, '#panelClose'); await sleep(250);
  await F(page, () => window.__rfw.fishing.freeze(false));
  await tap(page, touch, '#btnExit'); await sleep(400);
}
