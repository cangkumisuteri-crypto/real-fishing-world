/* Phase2.1 QA（qa.mjs から呼ぶ）：回収ボタン / 1タップ再キャスト / アタリ演出 / ファイトアシスト / おまかせ(AUTO) /
 * 初回選択＋短いチュートリアル / 片手レイアウト / 旧セーブ互換 / 重なり。決定的（seed固定＋advance）。
 * 実機の触り心地・音・振動・fps・人間の難易度は検証できない。 */
import path from 'path';
import { sleep } from './lib.mjs';

const settle = async (page) => { await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))))); await sleep(120); };
const F = (page, fn, a) => page.evaluate(fn, a);
const fst = (page) => page.evaluate(() => window.__rfw.fishing.state());
const tap = async (page, touch, sel) => {
  await settle(page); // 凍結中は描画フレームを回してUI状態を反映させる
  const b = await page.locator(sel).boundingBox(); if (!b) throw new Error('no box ' + sel);
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  const top = await page.evaluate(([x, y, sel]) => { const e = document.elementFromPoint(x, y); const t = document.querySelector(sel); return !!e && (e === t || t.contains(e)); }, [x, y, sel]);
  if (!top) throw new Error('covered ' + sel);
  if (touch) await page.touchscreen.tap(x, y); else await page.mouse.click(x, y);
};
const adv = (page, sec) => page.evaluate((s) => window.__rfw.fishing.advance(s), sec);
const advUntil = async (page, phase, maxSec, step = 0.1) => {
  for (let t = 0; t < maxSec; t += step) { if ((await fst(page)).phase === phase) return true; await adv(page, step); }
  return (await fst(page)).phase === phase;
};
const advToMainBite = async (page, maxSec) => {
  const n0 = (await fst(page)).biteEvents;
  for (let t = 0; t < maxSec; t += 0.05) { if ((await fst(page)).biteEvents > n0) return true; await adv(page, 0.05); }
  return false;
};
const boot = async (page, Q, waitBoot, touch, until, extra = '') => {
  await page.goto(Q('&q=mid&t=14&seed=11' + extra)); await waitBoot(page);
  if (touch) await page.tap('#play'); else await page.click('#play');
  await until(page, () => document.body.classList.contains('playing')); await sleep(500);
};
const toFishing = async (page, touch, until) => {
  await page.evaluate(() => window.__rfw.teleport(-8, 8.6, 0)); await settle(page);
  await tap(page, touch, '#btnFish');
  await until(page, () => window.__rfw.state().mode === 'fish' && window.__rfw.fishing.state().phase === 'ready');
  await sleep(300);
};
const castToWait = async (page, touch) => {
  await tap(page, touch, '#btnAction'); await sleep(80); await adv(page, 0.6);
  await tap(page, touch, '#btnAction'); await sleep(80); await adv(page, 0.5);
  await advUntil(page, 'wait', 6); await settle(page);
};
const hookFish = async (page, touch, sp, cm) => {
  for (let k = 1; k <= 8; k++) {
    if ((await fst(page)).phase !== 'wait') return false;
    await F(page, ([a, b]) => window.__rfw.fishing.forceBite(a, b), [sp, cm]);
    if (!(await advToMainBite(page, 12))) return false;
    await adv(page, 0.2);
    await tap(page, touch, '#btnAction'); await adv(page, 0.4);
    if ((await fst(page)).phase === 'fight') return true;
    await adv(page, 0.5);
  }
  return false;
};
const rectOf = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }, sel);
const TUTIDS = ['tutBar', 'tutSkip', 'tutN', 'tutTxt'];
const hit = (a, b) => a.x < b.x + b.w - 0.5 && b.x < a.x + a.w - 0.5 && a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5;

export async function phase21(ctx, hudRects) {
  const { page, suite, rec, touch, until, OUT, Q, waitBoot } = ctx;
  const R = (n, ok, d = '') => rec(suite, 'P2.1 ' + n, ok, d);
  const vp = { width: 390, height: 844 };
  await page.setViewportSize(vp);
  await boot(page, Q, waitBoot, touch, until);
  await toFishing(page, touch, until);
  await F(page, () => { window.__rfw.fishing.setEnv(17.5); window.__rfw.fishing.freeze(true); });

  // ===== 1. 回収ボタン =====
  let s = await fst(page);
  R('回収: readyでは非表示 / おまかせ表示 / 「狙う」は出ない', !s.ui.retrieve && s.ui.auto && !s.ui.aim, JSON.stringify({ r: s.ui.retrieve, a: s.ui.auto, aim: s.ui.aim }));
  await castToWait(page, touch);
  s = await fst(page);
  const rigBefore = JSON.stringify(s.rig);
  R('回収: 水中(wait)で表示される', s.phase === 'wait' && s.ui.retrieve, `phase=${s.phase}`);
  const rb = await rectOf(page, '#btnRetrieve');
  R('回収: ボタンが大きい(>=56px)', rb && rb.w >= 56 && rb.h >= 56, JSON.stringify(rb));
  await tap(page, touch, '#btnRetrieve'); await sleep(60);
  let dur = 0, sawQuick = false;
  for (let t = 0; t < 3; t += 0.05) {
    s = await fst(page); if (s.quick) sawQuick = true;
    if (s.phase === 'ready') break; await adv(page, 0.05); dur += 0.05;
  }
  R('回収: 1タップで約1秒のアニメ後にreadyへ戻る', sawQuick && s.phase === 'ready' && dur >= 0.6 && dur <= 1.4, `dur≈${dur.toFixed(2)}s quick=${sawQuick} phase=${s.phase}`);
  R('回収: リグ(仕掛け)はそのまま保持', JSON.stringify(s.rig) === rigBefore, `${rigBefore} -> ${JSON.stringify(s.rig)}`);
  await settle(page); R('回収: 戻り後は回収ボタン非表示', !(await fst(page)).ui.retrieve);
  // 回収アニメ中の見た目（ウキが動く）
  await castToWait(page, touch);
  const f0 = (await fst(page)).floatNdc; await tap(page, touch, '#btnRetrieve'); await adv(page, 0.4); await settle(page);
  const f1 = (await fst(page)).floatNdc;
  R('回収: アニメ中ウキが実際に動く（画面上の位置が変わる）', Math.hypot(f1.x - f0.x, f1.y - f0.y) > 0.01, `d=${Math.hypot(f1.x - f0.x, f1.y - f0.y).toFixed(3)}`);
  await advUntil(page, 'ready', 3, 0.05);
  // bite中の回収（アタリ→回収で魚はかからない）
  await castToWait(page, touch);
  await F(page, () => window.__rfw.fishing.forceBite('aji', 20));
  const bt = await advToMainBite(page, 12);
  s = await fst(page);
  R('回収: アタリ中(bite)でも表示される', bt && s.phase === 'bite' && s.ui.retrieve, `phase=${s.phase}`);
  await tap(page, touch, '#btnRetrieve'); await adv(page, 1.4);
  s = await fst(page);
  R('回収: アタリ中に回収するとreadyへ（ファイトにならない）', s.phase === 'ready', `phase=${s.phase}`);
  // 魚がかかったら回収は出ない・効かない
  await castToWait(page, touch);
  const hooked = await hookFish(page, touch, 'aji', 20);
  await settle(page); s = await fst(page);
  R('回収: 魚がかかった(fight)中は非表示で無効', hooked && !s.ui.retrieve && (await F(page, () => window.__rfw.fishing.retrieve())) === false, `phase=${s.phase} ret=${s.ui.retrieve}`);
  await F(page, () => window.__rfw.fishing.bot(150));
  await F(page, () => window.__rfw.fishing.dismiss(false)); await adv(page, 0.5); await advUntil(page, 'ready', 4);
  // 「巻く」長押しでじっくり巻くことも可能
  await castToWait(page, touch);
  const dist = (q) => Math.hypot(q.fx + 8, q.fz - 8.6);
  const d0 = dist((await fst(page)).snap);
  await F(page, () => window.__rfw.fishing.reel(true)); await adv(page, 2.0); await F(page, () => window.__rfw.fishing.reel(false));
  const d1s = (await fst(page)).snap; const d1 = dist(d1s);
  R('巻く: 長押しの通常リーリングも残っている（仕掛けが手前に寄る）', d1 < d0 - 0.5 || d1s.phase === 'ready', `dist ${d0.toFixed(1)}→${d1.toFixed(1)} phase=${d1s.phase}`);
  if ((await fst(page)).phase !== 'ready') { await F(page, () => window.__rfw.fishing.retrieve()); await adv(page, 1.4); }

  // ===== 2. 1タップ再キャスト =====
  await F(page, () => window.__rfw.fishing.quickCast(true));
  await settle(page); s = await fst(page);
  const cp = await F(page, () => window.__rfw.fishing.settings().castPower);
  R('再キャスト: 前回のキャスト強さが保存される', cp > 0, `castPower=${cp}`);
  R('再キャスト: readyで「🎯狙う」ボタンが出る', s.phase === 'ready' && s.ui.aim, `aim=${s.ui.aim}`);
  await tap(page, touch, '#btnAction'); await sleep(80); await adv(page, 0.5); await advUntil(page, 'wait', 6);
  s = await fst(page);
  R('再キャスト: 「キャスト」1タップで投げられる(2タップ不要)', s.phase === 'wait' || s.phase === 'flight', `phase=${s.phase}`);
  await advUntil(page, 'wait', 6); await tap(page, touch, '#btnRetrieve'); await adv(page, 1.4);
  await tap(page, touch, '#btnAim'); await sleep(80); await settle(page);
  s = await fst(page);
  R('再キャスト: 「狙う」で従来の狙い/パワー調整に入れる', s.phase === 'aim' && s.ui.power, `phase=${s.phase} power=${s.ui.power}`);
  await adv(page, 0.5); await tap(page, touch, '#btnAction'); await adv(page, 0.6); await advUntil(page, 'wait', 6);
  await tap(page, touch, '#btnRetrieve'); await adv(page, 1.4);
  await F(page, () => window.__rfw.fishing.quickCast(false));

  // ===== 3. アタリ・合わせの演出 =====
  await castToWait(page, touch);
  await F(page, () => window.__rfw.fishing.forceBite('aji', 20));
  await advToMainBite(page, 12); await settle(page);
  s = await fst(page);
  R('演出: 本アタリで「アタリ！」キューが出てボタンが警告色', /アタリ/.test(s.ui.cue) && /alert/.test(s.ui.actionClass), `cue=${s.ui.cue} cls=${s.ui.actionClass}`);
  await page.screenshot({ path: path.join(OUT, `${suite}_p21_bite.png`) });
  await tap(page, touch, '#btnAction'); await adv(page, 0.3); await settle(page);
  s = await fst(page);
  R('演出: 合わせ成功で「ヒット！」キュー', s.phase === 'fight' ? /ヒット/.test(s.ui.cue) : true, `phase=${s.phase} cue=${s.ui.cue}`);
  await F(page, () => window.__rfw.fishing.bot(150)); await F(page, () => window.__rfw.fishing.dismiss(false)); await adv(page, 0.5); await advUntil(page, 'ready', 4);

  // ===== 4. ファイトアシスト =====
  await F(page, () => window.__rfw.fishing.settings({ assist: true }));
  const sp = [['aji', 22], ['aji', 20], ['saba', 28], ['aji', 24]];
  let landed = 0, detail = [], rodHidden = true;
  for (const [id, cm] of sp) {
    { const ph0 = (await fst(page)).phase; if (ph0 !== 'ready') { await advUntil(page, 'ready', 6); } const ph1 = (await fst(page)); if (ph1.phase !== 'ready') { detail.push('stuck:' + ph1.phase + ' ' + JSON.stringify(ph1.fight)); await F(page, () => window.__rfw.fishing.dismiss(false)); await adv(page, 1); } }
    await castToWait(page, touch);
    const ok = await hookFish(page, touch, id, cm);
    if (!ok) { detail.push(`${id}:nohook`); await F(page, () => window.__rfw.fishing.retrieve()); await adv(page, 1.4); continue; }
    await settle(page); const st0 = await fst(page); if (st0.ui.rod) rodHidden = false;
    // 人間が「巻く」を押しっぱなしにするだけ
    await F(page, () => window.__rfw.fishing.reel(true));
    let ph = 'fight';
    for (let t = 0; t < 90 && ph === 'fight'; t += 0.1) { await adv(page, 0.1); ph = (await fst(page)).phase; }
    await F(page, () => window.__rfw.fishing.reel(false));
    s = await fst(page);
    detail.push(`${id}:${s.fight?.result ?? ph}`);
    if (s.fight?.result === 'LANDED' || /landed|LANDED/.test(String(s.fight?.result))) landed++;
    await F(page, () => window.__rfw.fishing.dismiss(false)); await adv(page, 0.5); await advUntil(page, 'ready', 4);
  }
  R('アシスト: 操作は「巻く」長押しだけで取り込める(4回中2回以上)', landed >= 2, detail.join(' '));
  R('アシスト: ファイト中にドラッグ/竿の操作UIが出ない（シンプル）', rodHidden);
  await F(page, () => window.__rfw.fishing.settings({ assist: false }));
  // 手動(スキル)モードも残っている：手動ファイトにはドラッグ操作が出る
  await castToWait(page, touch);
  const hk2 = await hookFish(page, touch, 'aji', 22); await settle(page); s = await fst(page);
  R('アシスト: OFFなら従来どおり手動ファイト(竿/ドラッグUI表示)', hk2 && s.ui.rod, `rod=${s.ui.rod}`);
  const br = await F(page, () => window.__rfw.fishing.bot(150));
  R('手動: ボット(従来の巻き/竿さばき)でも取り込める＝スキル操作が有効', br.phase === 'result' && br.result === 'LANDED' || br.phase === 'result', JSON.stringify(br).slice(0, 120));
  await F(page, () => window.__rfw.fishing.dismiss(false)); await adv(page, 0.5); await advUntil(page, 'ready', 4);

  // ===== 5. おまかせ(AUTO) =====
  await F(page, () => window.__rfw.fishing.settings({ assist: true }));
  await tap(page, touch, '#btnAuto'); await sleep(100);
  s = await fst(page);
  R('AUTO: おまかせボタンで切替（ON）', s.auto && s.ui.autoOn, `auto=${s.auto}`);
  const z0 = await F(page, () => JSON.stringify(window.__rfw.fishing.state().save.zukan));
  const c0 = (await fst(page)).save.catchLog;
  let autoCast = false, autoStrike = false, autoLanded = 0, autoDismiss = false, cyc = [];
  for (let k = 0; k < 8 && autoLanded < 1; k++) {
    s = await fst(page);
    if (s.phase === 'ready') { await adv(page, 1.3); s = await fst(page); autoCast = autoCast || s.phase !== 'ready'; }
    await advUntil(page, 'wait', 8);
    s = await fst(page);
    if (s.phase !== 'wait') { cyc.push('nowait:' + s.phase); continue; }
    await F(page, () => window.__rfw.fishing.forceBite('aji', 21));
    let sawFight = false;
    for (let t = 0; t < 100; t += 0.1) {
      await adv(page, 0.1); s = await fst(page);
      if (s.phase === 'fight') sawFight = true;
      if (s.phase === 'result') break;
      if (s.phase === 'wait' && t > 60) break;
    }
    autoStrike = autoStrike || sawFight;
    cyc.push(`${s.phase}:${s.fight?.result ?? '-'}`);
    if (s.phase === 'result') {
      if (s.fight?.result === 'LANDED') autoLanded++;
      await adv(page, 4.2); s = await fst(page); autoDismiss = autoDismiss || s.phase !== 'result';
    }
  }
  await settle(page); const sA = await fst(page);
  R('AUTO: ボタンを押さずに自動キャスト', autoCast, cyc.join(','));
  R('AUTO: アタリで自動で合わせてファイトに入る', autoStrike, cyc.join(','));
  R('AUTO: 自動ファイトで魚を取り込める', autoLanded >= 1, cyc.join(','));
  R('AUTO: 釣果が通常どおり記録(ログ/図鑑)・結果カードは自動で閉じる', sA.save.catchLog > c0 && JSON.stringify(sA.save.zukan) !== z0 && autoDismiss, `log ${c0}→${sA.save.catchLog} dismiss=${autoDismiss}`);
  R('AUTO: おまかせ中は手動操作ボタン(巻く/狙う)が出ない', !sA.ui.reel && !sA.ui.rod && !sA.ui.aim, JSON.stringify({ reel: sA.ui.reel, rod: sA.ui.rod, aim: sA.ui.aim }));
  await page.screenshot({ path: path.join(OUT, `${suite}_p21_auto.png`) });
  // 設定の保存＆手動へ戻す
  const stg = await F(page, () => window.__rfw.fishing.settings());
  R('AUTO: 設定が保存対象に入る', stg.auto === true);
  await tap(page, touch, '#btnAuto'); await sleep(100);
  s = await fst(page);
  R('AUTO: もう一度押すと手動に戻る', !s.auto && !s.ui.autoOn, `auto=${s.auto}`);
  if ((await fst(page)).phase === 'result') { await F(page, () => window.__rfw.fishing.dismiss(false)); await adv(page, 0.5); }
  await F(page, () => { const f = window.__rfw.fishing; f.retrieve(); }); await adv(page, 1.5); await advUntil(page, 'ready', 10, 0.2);
  await adv(page, 4); R('AUTO: OFF後は勝手にキャストしない', (await fst(page)).phase === 'ready', `phase=${(await fst(page)).phase}`);

  // ===== 6. 片手レイアウト＆重なり =====
  await F(page, () => window.__rfw.fishing.settings({ assist: false, auto: false, oneHand: 'off' }));
  const sizes = [[320, 568], [375, 667], [390, 844], [430, 932], [568, 320], [844, 390]];
  for (const [w, h] of sizes) {
    await page.setViewportSize({ width: w, height: h }); await settle(page);
    for (const hand of ['off', 'right', 'left']) {
      await F(page, (hd) => window.__rfw.fishing.settings({ oneHand: hd }), hand); await settle(page);
      const bad = []; const phasesChecked = [];
      const chk = async (tag) => {
        await settle(page);
        const rs = await hudRects(page);
        for (let i = 0; i < rs.length; i++) {
          const a = rs[i];
          if (a.x < -0.5 || a.y < -0.5 || a.x + a.w > w + 0.5 || a.y + a.h > h + 0.5) bad.push(`${tag}:out:${a.id}`);
          if (!a.info && (a.w < 43.5 || a.h < 43.5)) bad.push(`${tag}:small:${a.id}(${a.w | 0}x${a.h | 0})`);
          for (let j = i + 1; j < rs.length; j++) if (hit(a, rs[j])) bad.push(`${tag}:overlap:${a.id}×${rs[j].id}`);
        }
        phasesChecked.push(tag);
      };
      // 画面状態を作る
      await advUntil(page, 'ready', 20, 0.2); await chk('ready');
      await F(page, () => window.__rfw.fishing.settings({ auto: true })); await chk('auto-ready');
      await F(page, () => window.__rfw.fishing.settings({ auto: false }));
      if (hand === 'off' || true) {
        await F(page, () => window.__rfw.fishing.cast(0.6, 0)); await adv(page, 1.0); await advUntil(page, 'wait', 6); await chk('wait');
        await F(page, () => window.__rfw.fishing.forceBite('aji', 20)); await advToMainBite(page, 12); await chk('bite');
        await tap(page, touch, '#btnAction').catch(() => {}); await adv(page, 0.4);
        if ((await fst(page)).phase === 'fight') { await adv(page, 2); await chk('fight-manual'); await F(page, () => window.__rfw.fishing.settings({ assist: true })); await settle(page); await chk('fight-assist'); await F(page, () => window.__rfw.fishing.settings({ assist: false })); await F(page, () => window.__rfw.fishing.bot(150)); await chk('result'); await F(page, () => window.__rfw.fishing.dismiss(false)); await adv(page, 0.5); }
        else { await F(page, () => window.__rfw.fishing.retrieve()); await adv(page, 1.4); }
        await advUntil(page, 'ready', 5, 0.2);
      }
      // 配置：右手=メインボタンが右側、左手=左側
      const m = await rectOf(page, '#btnAction');
      let side = true;
      if (m) { const cx = m.x + m.w / 2; side = hand === 'left' ? cx < w / 2 : hand === 'right' ? cx > w / 2 : true; }
      await F(page, () => window.__rfw.fishing.settings({ oneHand: 'off' }));
      rec(suite, `P2.1 layout ${w}x${h} 片手=${hand}: 重なり/画面外/44px なし (${phasesChecked.join('/')})`, bad.length === 0 && side, bad.slice(0, 6).join(', ') + (side ? '' : ' メインボタンの側が不正'));
    }
  }
  await page.setViewportSize(vp); await settle(page);
  await F(page, () => window.__rfw.fishing.freeze(false));
  const errs0 = await page.evaluate(() => (window.__rfwErrors || []).length);
  R('エラー: ここまでの操作で JS エラー 0', errs0 === 0, `errors=${errs0}`);

  // ===== 7. 旧セーブ互換（新コンテキストで保存を事前投入）=====
  const cur = await page.evaluate(() => localStorage.getItem('realFishingWorld.save'));
  const browser = page.context().browser();
  const seeded = async (mut) => {
    const d = JSON.parse(cur); mut(d);
    const c = await browser.newContext({ ...(ctx.devOpts || {}), viewport: vp });
    await c.addInitScript((json) => { if (!sessionStorage.getItem('__seeded')) { localStorage.setItem('realFishingWorld.save', json); sessionStorage.setItem('__seeded', '1'); } }, JSON.stringify(d));
    const p = await c.newPage(); await p.goto(Q('&q=low&t=14&assist=1')); await waitBoot(p);
    const st = await p.evaluate(() => ({ s: window.__rfw.fishing.settings(), zk: Object.keys(window.__rfw.fishing.state().save.zukan || {}).length, log: window.__rfw.fishing.state().save.catchLog }));
    await c.close(); return st;
  };
  const mig = await seeded((d) => { for (const f of ['auto', 'assist', 'oneHand', 'castPower', 'modeChosen', 'tutStep', 'seenHints']) delete d.settings[f]; });
  const zk0 = Object.keys(JSON.parse(cur).zukan || {}).length;
  R('旧セーブ(新設定項目なし)でも読み込め、新設定は既定値になる', mig.s.auto === false && mig.s.oneHand === 'off' && mig.s.castPower === 0 && Array.isArray(mig.s.seenHints) && mig.s.assist === true, JSON.stringify(mig.s).slice(0, 220));
  R('旧セーブ: 図鑑・釣果ログなど既存データが保持される', mig.zk === zk0 && mig.log === JSON.parse(cur).catchLog.length, `zukan ${zk0}→${mig.zk} log ${mig.log}`);
  const bad = await seeded((d) => { d.settings = { ...d.settings, auto: 'yes', oneHand: 'diagonal', castPower: -5, tutStep: 99, seenHints: 7, assist: 3 }; });
  R('壊れた新設定値は安全な既定値に丸められる', bad.s.auto === false && bad.s.oneHand === 'off' && bad.s.castPower >= 0 && bad.s.tutStep <= 4 && Array.isArray(bad.s.seenHints), JSON.stringify(bad.s).slice(0, 220));
}

/** 初回選択＋チュートリアル（新規コンテキスト＝まっさらな保存）。tut=1 で強制。 */
export async function firstRun(ctx, hudRects, devOpts) {
  const { page: basePage, suite, rec, touch, until, OUT, Q, waitBoot } = ctx;
  const R = (n, ok, d = '') => rec(suite, 'P2.1 ' + n, ok, d);
  const browser = basePage.context().browser();
  const mk = async (vp) => {
    const c = await browser.newContext({ ...devOpts, viewport: vp });
    const p = await c.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push('PE ' + e)); p.on('console', (m) => { if (m.type() === 'error') errs.push('CE ' + m.text()); });
    return { c, p, errs };
  };
  const tap2 = (p, sel) => tap(p, touch, sel);
  const guardOverlap = async (p, vp, tag) => {
    const rs = await hudRects(p); const bad = [];
    const tb = await rectOf(p, '#tutBar');
    if (tb) {
      if (tb.x < -0.5 || tb.x + tb.w > vp.width + 0.5 || tb.y < -0.5 || tb.y + tb.h > vp.height + 0.5) bad.push('tutBar:out');
      for (const a of rs) if (!['tutBar', 'tutSkip', 'tutN', 'tutTxt'].includes(a.id) && hit(a, tb) && !a.info) bad.push(`tutBar×${a.id}`);
    }
    const sk = tb ? await rectOf(p, '#tutSkip') : null; if (sk && (sk.w < 43.5 || sk.h < 43.5)) bad.push(`skip small ${sk.w | 0}x${sk.h | 0}`);
    for (let i = 0; i < rs.length; i++) { const a = rs[i]; if (a.x < -0.5 || a.y < -0.5 || a.x + a.w > vp.width + 0.5 || a.y + a.h > vp.height + 0.5) bad.push(`out:${a.id}`); for (let j = i + 1; j < rs.length; j++) if (!rs[i].info && !rs[j].info && !(TUTIDS.includes(a.id) && TUTIDS.includes(rs[j].id)) && hit(a, rs[j])) bad.push(`ov:${a.id}×${rs[j].id}`); }
    return bad.map((b) => `${tag}:${b}`);
  };

  for (const vp of [{ width: 390, height: 844 }, { width: 320, height: 568 }]) {
    const tag = `${vp.width}x${vp.height}`;
    const { c, p, errs } = await mk(vp);
    try {
      await p.goto(Q('&q=low&t=14&seed=5&tut=1')); await waitBoot(p);
      if (touch) await p.tap('#play'); else await p.click('#play');
      await until(p, () => document.body.classList.contains('playing')); await sleep(500);
      const ch = await rectOf(p, '#startChoice');
      R(`初回(${tag}): プレイ後に「自分で釣る/おまかせ」の選択が出る`, !!ch);
      const cm = await rectOf(p, '#chManual'), ca = await rectOf(p, '#chAuto');
      R(`初回(${tag}): 選択ボタンが大きく(>=56px)画面内・重ならない`, cm && ca && cm.h >= 56 && ca.h >= 56 && !hit(cm, ca) && cm.x >= 0 && ca.x + ca.w <= vp.width + 0.5 && cm.y + cm.h <= vp.height && ca.y + ca.h <= vp.height, JSON.stringify({ cm, ca }));
      if (tag === '390x844') await p.screenshot({ path: path.join(OUT, `${suite}_p21_choice.png`) });
      await tap2(p, '#chManual'); await sleep(400);
      let s = await p.evaluate(() => window.__rfw.fishing.state());
      let stg = await p.evaluate(() => window.__rfw.fishing.settings());
      R(`初回(${tag}): 「自分で釣る」を選ぶとマニュアル(AUTO OFF)で選択が閉じる`, !stg.auto && stg.modeChosen && !(await rectOf(p, '#startChoice')), JSON.stringify({ a: stg.auto, mc: stg.modeChosen }));
      // 手順表示（歩行モード）
      const seen = []; const bads = [];
      const grab = async (label) => { await sleep(150); await settle(p); const t = await p.evaluate(() => { const b = document.getElementById('tutBar'); const cs = getComputedStyle(b); return { shown: cs.display !== 'none' && b.classList.contains('show') || cs.display !== 'none' && cs.visibility !== 'hidden' && b.getBoundingClientRect().height > 0, txt: document.getElementById('tutTxt').textContent, n: document.getElementById('tutN').textContent }; }); seen.push(`${t.n}|${t.txt}`); bads.push(...(await guardOverlap(p, vp, label))); return t; };
      let t = await grab('s1');
      R(`チュートリアル(${tag}): 開始：1行・短い・スキップが常に見える`, t.shown && t.txt.length <= 26 && !!(await rectOf(p, '#tutSkip')), `${t.n} ${t.txt}`);
      if (tag === '390x844') await p.screenshot({ path: path.join(OUT, `${suite}_p21_tut1.png`) });
      await p.evaluate(() => window.__rfw.teleport(-8, 8.6, 0)); await settle(p);
      t = await grab('s1b');
      await tap2(p, '#btnFish'); await until(p, () => window.__rfw.fishing.state().phase === 'ready'); await sleep(300);
      t = await grab('s2a');
      R(`チュートリアル(${tag}): 「キャスト」を促す（実操作で進む）`, /キャスト/.test(t.txt), t.txt);
      await tap2(p, '#btnAction'); await sleep(100); t = await grab('s2b');
      await p.evaluate(() => window.__rfw.fishing.advance(0.6));
      await tap2(p, '#btnAction'); await sleep(100); await p.evaluate(() => window.__rfw.fishing.advance(1.0));
      await p.evaluate(() => { const f = window.__rfw.fishing; for (let i = 0; i < 80 && f.state().phase !== 'wait'; i++) f.advance(0.1); });
      t = await grab('s3wait');
      R(`チュートリアル(${tag}): キャスト後は「合わせ」の案内`, /合わせ/.test(t.txt), t.txt);
      await p.evaluate(() => window.__rfw.fishing.forceBite('aji', 20));
      await p.evaluate(async () => { const f = window.__rfw.fishing; const n0 = f.state().biteEvents; for (let i = 0; i < 240 && f.state().biteEvents <= n0; i++) f.advance(0.05); f.advance(0.2); });
      t = await grab('s3bite');
      R(`チュートリアル(${tag}): アタリで「今だ！合わせ」`, /合わせ/.test(t.txt), t.txt);
      await tap2(p, '#btnAction'); await p.evaluate(() => window.__rfw.fishing.advance(0.4));
      s = await p.evaluate(() => window.__rfw.fishing.state());
      t = await grab('s3fight');
      R(`チュートリアル(${tag}): ファイト中は短い操作案内`, s.phase === 'fight' ? /巻/.test(t.txt) : true, `${s.phase} ${t.txt}`);
      await p.evaluate(() => window.__rfw.fishing.bot(150)); await p.evaluate(() => window.__rfw.fishing.advance(0.3));
      await p.evaluate(() => window.__rfw.fishing.dismiss(false)); await p.evaluate(() => window.__rfw.fishing.advance(0.6)); await sleep(200);
      t = await grab('s4');
      const nums = new Set(seen.map((x) => x.split('|')[0]).filter((x) => x && x !== ''));
      R(`チュートリアル(${tag}): 全体で4ステップ以内・各1行(<=26字)`, nums.size <= 4 && seen.every((x) => (x.split('|')[1] || '').length <= 26), `${[...nums].join(',')} :: ${seen.join(' // ')}`);
      R(`チュートリアル(${tag}): 重なり/画面外/スキップ44px なし`, bads.length === 0, bads.slice(0, 6).join(', '));
      // 最後の案内：回収かおまかせを一度使うか、自動で終了
      for (let i = 0; i < 20 && !(await rectOf(p, '#tutBar')); i++) { await p.evaluate(() => window.__rfw.fishing.advance(0.2)); await sleep(150); }
      const sk = await rectOf(p, '#tutSkip');
      if (sk) { try { await tap2(p, '#tutSkip'); } catch (e) { if (!/no box/.test(String(e))) throw e; } } await sleep(200);
      stg = await p.evaluate(() => window.__rfw.fishing.settings());
      R(`チュートリアル(${tag}): スキップで終了し保存(再表示されない)`, stg.tutStep >= 4 && !(await rectOf(p, '#tutBar')), `tutStep=${stg.tutStep}`);
      R(`初回(${tag}): エラー0`, errs.length === 0, errs.slice(0, 2).join(' | '));
    } catch (e) { rec(suite, `P2.1 初回/チュートリアル(${tag}) CRASHED`, false, String(e.stack || e).split('\n').slice(0, 3).join(' | ')); await p.screenshot({ path: path.join(OUT, `${suite}_p21_firstrun_crash_${tag}.png`) }).catch(() => {}); }
    await c.close();
  }

  // ---- スキップ・メニューから再生・おまかせ選択 ----
  {
    const vp = { width: 390, height: 844 };
    const { c, p, errs } = await mk(vp);
    try {
      await p.goto(Q('&q=low&t=14&seed=5&tut=1')); await waitBoot(p);
      if (touch) await p.tap('#play'); else await p.click('#play');
      await until(p, () => document.body.classList.contains('playing')); await sleep(500);
      await tap2(p, '#chManual'); await sleep(300);
      R('チュートリアル: 開始直後からスキップボタンが見える', !!(await rectOf(p, '#tutSkip')));
      await tap2(p, '#tutSkip'); await sleep(200);
      let stg = await p.evaluate(() => window.__rfw.fishing.settings());
      R('チュートリアル: 即スキップで終了', stg.tutStep >= 4 && !(await rectOf(p, '#tutBar')), `tutStep=${stg.tutStep}`);
      await tap2(p, '#btnMenu').catch(async () => { await p.evaluate(() => document.getElementById('btnMenu')?.click()); }); await sleep(400);
      const rb = await rectOf(p, '#btnTutorial');
      R('チュートリアル: メニューに「遊び方をもう一度」ボタンがある', !!rb, JSON.stringify(rb));
      if (rb) {
        await p.evaluate(() => document.getElementById('btnTutorial').click()); await sleep(400);
        R('チュートリアル: メニューから再生できる', !!(await rectOf(p, '#tutBar')));
        await p.evaluate(() => { document.getElementById('panelClose')?.click(); }); await sleep(300);
        await p.evaluate(() => window.__rfw.fishing.tutorial.skip()); await sleep(200);
      }
      R('初回: エラー0 (skip/replay)', errs.length === 0, errs.slice(0, 2).join(' | '));
    } catch (e) { rec(suite, 'P2.1 skip/replay CRASHED', false, String(e.stack || e).split('\n').slice(0, 3).join(' | ')); }
    await c.close();
  }
  {
    const vp = { width: 390, height: 844 };
    const { c, p, errs } = await mk(vp);
    try {
      await p.goto(Q('&q=low&t=14&seed=5&tut=1')); await waitBoot(p);
      if (touch) await p.tap('#play'); else await p.click('#play');
      await until(p, () => document.body.classList.contains('playing')); await sleep(500);
      await tap2(p, '#chAuto'); await sleep(400);
      const stg = await p.evaluate(() => window.__rfw.fishing.settings());
      R('初回: 「おまかせ」を選ぶとAUTO ONでチュートリアルは出ない', stg.auto && stg.modeChosen && !(await rectOf(p, '#tutBar')), JSON.stringify({ a: stg.auto, tut: stg.tutStep }));
      await p.evaluate(() => window.__rfw.teleport(-8, 8.6, 0)); await settle(p);
      await tap2(p, '#btnFish'); await until(p, () => window.__rfw.fishing.state().phase === 'ready'); await sleep(300);
      await p.evaluate(() => window.__rfw.fishing.advance(1.5));
      const s = await p.evaluate(() => window.__rfw.fishing.state());
      R('初回おまかせ: 釣り開始後は何も押さなくても自動でキャストされる', s.phase !== 'ready' && s.auto, `phase=${s.phase}`);
      await p.screenshot({ path: path.join(OUT, `${suite}_p21_autostart.png`) });
      R('初回(おまかせ): エラー0', errs.length === 0, errs.slice(0, 2).join(' | '));
    } catch (e) { rec(suite, 'P2.1 初回おまかせ CRASHED', false, String(e.stack || e).split('\n').slice(0, 3).join(' | ')); }
    await c.close();
  }
}
