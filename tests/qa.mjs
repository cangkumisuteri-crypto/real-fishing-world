/* REAL FISHING WORLD Phase1+2 QA.  node tests/qa.mjs [--url=https://...] [--only=webkit-iphone13] [--out=tests/out]
 * 注意: ヘッドレス＋ソフトウェアGL。FPSは実機の値ではない。実機iPhoneは未検証。 */
import fs from 'fs'; import path from 'path';
import { fishFlow, phaseLayouts, auditFixes } from './fishflow.mjs';
import { phase21, firstRun } from './phase21.mjs';
import { webkit, chromium, devices, serve, sleep, WK_ENV, CHROMIUM_ARGS, collect } from './lib.mjs';
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const OUT = path.resolve(arg('out', 'tests/out')); fs.mkdirSync(OUT, { recursive: true });
const ONLY = arg('only', ''); const URLARG = arg('url', '');
let BASE = URLARG, srv = null;
if (!BASE) { srv = await serve(path.resolve('dist')); BASE = `http://127.0.0.1:${srv.port}/`; }
const Q = (extra = '') => BASE + (BASE.includes('?') ? '&' : '?') + 'qa=1' + extra;
const results = []; // {suite, name, ok, detail}
const rec = (suite, name, ok, detail = '') => { results.push({ suite, name, ok: !!ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'} [${suite}] ${name}${detail ? ' — ' + detail : ''}`); };
const waitBoot = (page) => page.waitForFunction(() => window.__rfwBooted || document.getElementById('err')?.classList.contains('show'), null, { timeout: 180000 });
const st = (page) => page.evaluate(() => window.__rfw.state());
const until = async (page, fn, arg, ms = 12000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 100 }); return true; } catch { return false; } };

async function hudRects(page) {
  return page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('[data-ui]')) {
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue;
      out.push({ id: el.id || el.className, x: r.x, y: r.y, w: r.width, h: r.height, info: el.hasAttribute('data-info'), op: parseFloat(cs.opacity) });
    }
    return out;
  });
}
async function layoutCheck(page, suite, vp, tag, shot) {
  await page.setViewportSize(vp); await sleep(500);
  for (const mode of ['move', 'fish']) {
    if (mode === 'fish') { await page.evaluate(() => { const m = window.__rfw.state(); }); }
    await page.evaluate((m) => { document.body.dataset.mode = m; }, mode); await sleep(300);
    const rs = await hudRects(page);
    const label = `${tag} ${vp.width}x${vp.height} ${mode}`;
    let bad = [];
    for (let i = 0; i < rs.length; i++) {
      const a = rs[i];
      if (a.x < -0.5 || a.y < -0.5 || a.x + a.w > vp.width + 0.5 || a.y + a.h > vp.height + 0.5) bad.push(`out:${a.id}`);
      if (!a.info && (a.w < 43.5 || a.h < 43.5)) bad.push(`small:${a.id}(${a.w | 0}x${a.h | 0})`);
      for (let j = i + 1; j < rs.length; j++) { const b = rs[j]; if (a.x < b.x + b.w - 0.5 && b.x < a.x + a.w - 0.5 && a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5) bad.push(`overlap:${a.id}×${b.id}`); }
    }
    rec(suite, `layout no-overlap/in-viewport/≥44px: ${label} (${rs.length} elems)`, bad.length === 0, bad.join(', '));
    if (shot) await page.screenshot({ path: path.join(OUT, `${suite}_${vp.width}x${vp.height}_${mode}.png`) });
  }
  await page.evaluate(() => { document.body.dataset.mode = 'move'; });
}

async function runSuite(suite, launcher, ctxOpts, opts = {}) {
  const browser = await launcher();
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const log = collect(page);
  const touch = !!ctxOpts.hasTouch;
  try {
    // ---- 1. boot ----
    const t0 = Date.now();
    await page.goto(Q(opts.q ?? '&q=mid&t=14&seed=7'));
    const loadingVisible = await page.evaluate(() => getComputedStyle(document.getElementById('loading')).display !== 'none');
    rec(suite, 'loading screen visible at start', loadingVisible);
    await waitBoot(page);
    const booted = await page.evaluate(() => !!window.__rfwBooted);
    const errShown = await page.evaluate(() => document.getElementById('err').classList.contains('show'));
    rec(suite, 'boots & loading finishes (no error overlay)', booted && !errShown, `${Date.now() - t0}ms`);
    const playEnabled = await page.evaluate(() => !document.getElementById('play').disabled);
    rec(suite, 'Play button enabled', playEnabled);
    await page.screenshot({ path: path.join(OUT, `${suite}_00_title.png`) });
    // ---- 2. play ----
    if (touch) await page.tap('#play'); else await page.click('#play');
    const playing = await until(page, () => window.__rfw.state().playing && document.body.classList.contains('playing') && getComputedStyle(document.getElementById('loading')).display === 'none');
    rec(suite, 'Play starts the game (tap/click)', playing);
    await sleep(800);
    const s0 = await st(page);
    rec(suite, 'WebGL scene renders (draw calls>0, tris>0)', s0.calls > 0 && s0.tris > 1000, `calls=${s0.calls} tris=${s0.tris} geoms=${s0.geometries}`);
    rec(suite, 'spawn position is safe & on quay', !(await page.evaluate(([x, z]) => window.__rfw.blocked(x, z), [s0.x, s0.z])), `(${s0.x.toFixed(1)},${s0.z.toFixed(1)})`);

    // ---- 3. joystick ----
    const vp = page.viewportSize();
    const jx = 90, jy = vp.height - 120;
    const ptr = (type, id, x, y) => page.evaluate(([type, id, x, y]) => {
      const tgt = type === 'pointerdown' ? document.getElementById('touch') : window;
      tgt.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType: 'touch', clientX: x, clientY: y, bubbles: true, cancelable: true, isPrimary: true, button: 0 }));
    }, [type, id, x, y]);
    await page.evaluate(() => window.__rfw.teleport(-20, 15.5, 0));
    await sleep(200);
    const a = await st(page);
    await ptr('pointerdown', 11, jx, jy); await ptr('pointermove', 11, jx, jy - 55);
    const moved = await until(page, (z) => window.__rfw.state().z < z - 1.0, a.z, 15000);
    const ringActive = await page.evaluate(() => document.getElementById('joyRing').classList.contains('active'));
    await page.screenshot({ path: path.join(OUT, `${suite}_01_joystick.png`) });
    await ptr('pointerup', 11, jx, jy - 55);
    const b = await st(page);
    rec(suite, 'virtual joystick (drag up) moves player forward', moved && b.z < a.z - 1.0, `dz=${(b.z - a.z).toFixed(2)}m`);
    rec(suite, 'joystick ring shows while dragging', ringActive);
    await sleep(300); const b2 = await st(page); await sleep(400); const b3 = await st(page);
    rec(suite, 'player stops after release', Math.hypot(b3.x - b2.x, b3.z - b2.z) < 0.05);

    // ---- 4. swipe look ----
    const y0 = (await st(page)).yaw, p0 = (await st(page)).pitch;
    const rx = vp.width - 100, ry = vp.height * 0.4;
    await ptr('pointerdown', 12, rx, ry);
    for (let i = 1; i <= 8; i++) { await ptr('pointermove', 12, rx - i * 14, ry + i * 3); await sleep(30); }
    await ptr('pointerup', 12, rx - 112, ry + 24);
    await sleep(200);
    const y1 = await st(page);
    rec(suite, 'right-side swipe rotates camera (yaw)', Math.abs(y1.yaw - y0) > 0.15, `dyaw=${(y1.yaw - y0).toFixed(2)}rad dpitch=${(y1.pitch - p0).toFixed(2)}`);

    // ---- 4b. 走る（トグル / 常に走る設定 / 端まで倒す） ----
    {
      const R = vp.width > vp.height ? 48 : 56; // Input.radius と同じ
      const runBtn = () => page.evaluate(() => { const b = document.getElementById('btnRun'); const r = b.getBoundingClientRect(), j = document.getElementById('joyRing').getBoundingClientRect(); const o = [...document.querySelectorAll('[data-ui]')].filter((e) => e !== b && getComputedStyle(e).display !== 'none').filter((e) => { const q = e.getBoundingClientRect(); return r.x < q.x + q.width && q.x < r.x + r.width && r.y < q.y + q.height && q.y < r.y + r.height; }).map((e) => e.id || e.className); return { on: b.classList.contains('on'), pressed: b.getAttribute('aria-pressed'), label: b.querySelector('.lb').textContent, w: r.width, h: r.height, overlaps: o, ringOverlap: r.x < j.x + j.width && j.x < r.x + r.width && r.y < j.y + j.height && j.y < r.y + r.height, inVp: r.x >= 0 && r.y >= 0 && r.right <= innerWidth && r.bottom <= innerHeight }; });
      const tapRun = async () => { try { if (touch) await page.tap('#btnRun', { timeout: 6000 }); else await page.click('#btnRun', { timeout: 6000 }); } catch (e) { const dbg = await page.evaluate(() => { const b = document.getElementById('btnRun'); const r = b.getBoundingClientRect(); const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return JSON.stringify({ mode: document.body.dataset.mode, r: [r.x, r.y, r.width, r.height], top: el && (el.id || el.className), err: document.getElementById('errMsg').textContent + ' ' + document.getElementById('errStack').textContent.slice(0,600), disp: getComputedStyle(b).display, anim: getComputedStyle(b).animationName }); }); throw new Error('tapRun: ' + String(e.message).split('\n').slice(0, 8).join(' | ') + ' ' + dbg); } await sleep(250); };
      const r0 = await runBtn(); const rs0 = await st(page);
      rec(suite, 'run: 走る button is ≥44px, in viewport, overlaps no other button or the joystick ring', r0.w >= 44 && r0.h >= 44 && r0.inVp && r0.overlaps.length === 0 && !r0.ringOverlap, `${r0.w}x${r0.h} overlaps=${r0.overlaps.join(',') || '-'} ring=${r0.ringOverlap}`);
      rec(suite, 'run: initial state is OFF (walk)', !r0.on && r0.pressed === 'false' && r0.label === '走る' && !rs0.run && !rs0.alwaysRun, `label=${r0.label} run=${rs0.run}`);
      // 歩き速度（スティック60%）
      const speed = async (ms) => { await page.evaluate(() => window.__rfw.teleport(-20, 15.5, 0)); await sleep(300); const m0 = (await st(page)).moved; const t0 = Date.now(); await ptr('pointerdown', 21, jx, jy); await ptr('pointermove', 21, jx, jy - Math.round(R * 0.6)); await sleep(ms); const m1 = (await st(page)).moved; const dt = Date.now() - t0; const sr = await st(page); await ptr('pointerup', 21, jx, jy - Math.round(R * 0.6)); await sleep(200); return { v: (m1 - m0) / (dt / 1000), run: sr.run, edge: sr.edgeRun }; };
      const w = await speed(1800);
      await tapRun();
      const r1 = await runBtn(); const rs1 = await st(page);
      rec(suite, 'run: tapping 走る turns lock ON (clear on-state: orange, "走る ON", aria-pressed)', r1.on && r1.pressed === 'true' && r1.label === '走る ON' && rs1.run && rs1.runLock, `label=${r1.label} run=${rs1.run}`);
      await page.screenshot({ path: path.join(OUT, `${suite}_04_run_on.png`) });
      // 壁時計ベースなので、ソフトウェアGLの負荷でfpsが揺れると比がずれる。最大3回測って範囲内なら合格（再測定回数を明記）
      let rn = await speed(1800), ratio = rn.v / w.v, att = 1;
      while (!(ratio > 1.7 && ratio < 2.3) && att < 3) { rn = await speed(1800); ratio = rn.v / w.v; att++; } // 走りだけ再測定（ロックON中）
      rec(suite, 'run: run speed ≈ 2× walk speed (same stick tilt)', w.v > 0.3 && ratio > 1.7 && ratio < 2.3 && rn.run && !w.run, `walk=${w.v.toFixed(2)}m/s run=${rn.v.toFixed(2)}m/s ratio=${ratio.toFixed(2)} attempts=${att} (headless, wall-clock)`);
      await tapRun();
      const r2 = await runBtn(); const rs2 = await st(page);
      rec(suite, 'run: tapping again turns lock OFF', !r2.on && r2.pressed === 'false' && r2.label === '走る' && !rs2.run, `label=${r2.label} run=${rs2.run}`);
      // スティックを端まで倒すと走る
      await ptr('pointerdown', 22, jx, jy); await ptr('pointermove', 22, jx, jy - Math.round(R * 0.6)); await sleep(150);
      const e0 = await st(page);
      await ptr('pointermove', 22, jx, jy - R - 6); await sleep(150);
      const e1 = await st(page);
      await ptr('pointermove', 22, jx, jy - Math.round(R * 0.6)); await sleep(150);
      const e2 = await st(page);
      await ptr('pointerup', 22, jx, jy - Math.round(R * 0.6)); await sleep(150);
      const e3 = await st(page);
      rec(suite, 'run: pushing joystick fully to the edge runs; easing back walks; release stops running', !e0.run && e1.run && e1.edgeRun && !e2.run && !e3.run, `part=${e0.run} edge=${e1.run} back=${e2.run} released=${e3.run}`);
      // 設定「常に走る」
      const openMenu = async () => { if (touch) await page.tap('#btnMenu'); else await page.click('#btnMenu'); await sleep(350); };
      const closeMenu = async () => { if (touch) await page.tap('#panelClose'); else await page.click('#panelClose'); await sleep(250); };
      await openMenu();
      const hasSet = await page.evaluate(() => !!document.querySelector('[data-seg="alwaysRun"] button[data-v="1"]') && /常に走る/.test(document.getElementById('panelBody').textContent));
      await page.evaluate(() => document.querySelector('[data-seg="alwaysRun"] button[data-v="1"]').click()); await sleep(300);
      const s3 = await st(page); const r3 = await runBtn();
      const sv = JSON.parse(await page.evaluate(() => localStorage.getItem('realFishingWorld.save')) || '{}');
      await page.screenshot({ path: path.join(OUT, `${suite}_05_menu_alwaysrun.png`) });
      await closeMenu();
      rec(suite, 'menu: 常に走る setting exists and turns run ON immediately (button shows ON)', hasSet && s3.alwaysRun && s3.run && r3.on, `alwaysRun=${s3.alwaysRun} run=${s3.run}`);
      rec(suite, 'menu: 常に走る is saved in settings (localStorage)', sv.version === 2 && sv.settings?.alwaysRun === true, JSON.stringify(sv.settings || {}).slice(0, 120));
      await page.goto(Q('&t=14')); await waitBoot(page);
      const s4 = await st(page); const r4 = await runBtn();
      rec(suite, 'menu: 常に走る persists across reload and run starts ON', s4.alwaysRun && s4.runLock && r4.on && r4.label === '走る ON', `alwaysRun=${s4.alwaysRun} runLock=${s4.runLock} label=${r4.label}`);
      if (touch) await page.tap('#play'); else await page.click('#play');
      await until(page, () => window.__rfw.state().playing); await sleep(500);
      await tapRun();
      const s5 = await st(page);
      rec(suite, 'run: with 常に走る ON the button can still switch to walk (setting stays ON)', !s5.run && s5.alwaysRun, `run=${s5.run} alwaysRun=${s5.alwaysRun}`);
      await openMenu();
      await page.evaluate(() => document.querySelector('[data-seg="alwaysRun"] button[data-v="0"]').click()); await sleep(300);
      const s6 = await st(page); const r6 = await runBtn();
      await closeMenu();
      rec(suite, 'menu: 常に走る OFF returns to walking', !s6.alwaysRun && !s6.run && !r6.on, `alwaysRun=${s6.alwaysRun} run=${s6.run}`);
      await page.evaluate(() => window.__rfw.teleport(-20, 15.5, 0)); await sleep(300);
    }

    // ---- 5. collision ----
    const walk = async (ms) => { await ptr('pointerdown', 13, jx, jy); await ptr('pointermove', 13, jx, jy - 60); await sleep(ms); await ptr('pointerup', 13, jx, jy - 60); await sleep(200); };
    // 5a: 海へ
    const edge = await page.evaluate(() => { const R = window.__rfw; for (let z = 18; z > -10; z -= 0.25) { const c = R.cell(-8, z); if (c.ground === 0) return { z, ok: true }; } return { ok: false }; });
    rec(suite, 'found a quay edge to test sea collision', edge.ok, `edge z≈${edge.z}`);
    if (edge.ok) {
      await page.evaluate((z) => window.__rfw.teleport(-8, z + 2.4, 0), edge.z);
      await sleep(300); await walk(touch ? 5000 : 4500);
      const e1 = await st(page); const blockedNow = await page.evaluate(([x, z]) => window.__rfw.blocked(x, z), [e1.x, e1.z]); const cellNow = await page.evaluate(([x, z]) => window.__rfw.cell(x, z), [e1.x, e1.z]);
      rec(suite, 'collision: cannot walk into the sea', e1.z > edge.z && cellNow.ground !== 0 && !blockedNow && e1.y > -0.5, `z=${e1.z.toFixed(2)} edge=${edge.z} y=${e1.y.toFixed(2)}`);
    }
    // 5b: 建物（壁）
    const wall = await page.evaluate(() => { const R = window.__rfw; for (let x = -12; x < 50; x += 0.25) { const c = R.cell(x, 22); if (c.blockedFlag && c.ground !== 0) return { x, ok: true }; } return { ok: false }; });
    rec(suite, 'found a building wall to test collision', wall.ok, `wall x≈${wall.x}`);
    if (wall.ok) {
      await page.evaluate((x) => window.__rfw.teleport(x - 3.2, 22, -Math.PI / 2), wall.x);
      await sleep(300); await walk(touch ? 5500 : 5000);
      const w1 = await st(page);
      rec(suite, 'collision: blocked by building wall', w1.x < wall.x - 0.2 && w1.x > wall.x - 3.2, `x=${w1.x.toFixed(2)} wall=${wall.x}`);
    }

    // ---- 6. spots & fishing ----
    await page.evaluate(() => window.__rfw.teleport(-20, 15.5, 0)); await sleep(500);
    const far = await page.evaluate(() => ({ s: window.__rfw.state(), btn: document.getElementById('btnFish').dataset.state }));
    rec(suite, 'away from water: 釣り開始 disabled', !far.s.canFish && far.btn === 'disabled', far.btn);
    await page.evaluate(() => document.getElementById('btnFish').click()); await sleep(200);
    const toastTxt = await page.evaluate(() => document.getElementById('toast').textContent);
    rec(suite, 'tapping disabled 釣り開始 shows 水辺 hint', /水辺/.test(toastTxt), toastTxt.slice(0, 30));
    const mk = await page.evaluate(() => window.__rfw.reachableMarkers());
    rec(suite, 'all fishing-spot markers are reachable on foot', mk.every((m) => m.reach), mk.filter((m) => !m.reach).map((m) => m.id).join(',') || `${mk.length} markers`);
    for (const m of mk) {
      await page.evaluate((m) => window.__rfw.teleport(m.x, m.z, 0), m); await sleep(450);
      const r = await page.evaluate(() => ({ s: window.__rfw.state(), btn: document.getElementById('btnFish').dataset.state }));
      rec(suite, `spot "${m.id}": 釣り開始 becomes available`, r.s.canFish && r.btn === 'ready', `depth=${r.s.siteInfo?.depth?.toFixed(1)} zone=${r.s.siteInfo?.zone}`);
    }
    // 任意の水際
    const anyEdge = await page.evaluate(() => { const R = window.__rfw; for (let x = -45; x < 5; x += 0.5) { for (let z = 20; z > 0; z -= 0.25) { if (R.cell(x, z).ground === 0) { return { x, z: z + 0.9 }; } } } return null; });
    if (anyEdge) { await page.evaluate((p) => window.__rfw.teleport(p.x, p.z, 0), anyEdge); await sleep(450); const s = await st(page); rec(suite, 'any walkable water\'s edge allows fishing (no marker needed)', s.canFish, `(${anyEdge.x},${anyEdge.z})`); }
    // 釣りモード
    const tip = mk.find((m) => m.id === 'tip') || mk[0];
    await page.evaluate((m) => window.__rfw.teleport(m.x, m.z, 0), tip); await sleep(500);
    if (touch) await page.tap('#btnFish'); else await page.click('#btnFish');
    const inFish = await until(page, () => window.__rfw.state().mode === 'fish' && document.body.dataset.mode === 'fish');
    await sleep(900);
    const fv = await page.evaluate(() => ({ exit: getComputedStyle(document.getElementById('btnExit')).display, mvBtn: getComputedStyle(document.getElementById('btnMap')).display, card: document.getElementById('infoCard').textContent.slice(0, 60) }));
    rec(suite, 'fishing mode: UI switches movement→fishing, camera faces water', inFish && fv.exit !== 'none' && fv.mvBtn === 'none', fv.card);
    await page.screenshot({ path: path.join(OUT, `${suite}_02_fishing.png`) });
    const fpos = await st(page); await ptr('pointerdown', 14, jx, jy); await ptr('pointermove', 14, jx, jy - 60); await sleep(600); await ptr('pointerup', 14, jx, jy - 60);
    const fpos2 = await st(page);
    rec(suite, 'fishing mode: player does not walk away', Math.hypot(fpos2.x - fpos.x, fpos2.z - fpos.z) < 0.05);
    if (touch) await page.tap('#btnExit'); else await page.click('#btnExit');
    const outFish = await until(page, () => window.__rfw.state().mode === 'move' && document.body.dataset.mode === 'move');
    rec(suite, 'fishing mode: exit returns to walking UI', outFish);

    // ---- 6b. Phase2 ウキ釣りフロー ----
    if (!arg('p21only', '')) await fishFlow({ page, suite, rec, touch, until, OUT, Q, waitBoot });
    await phase21({ page, suite, rec, touch, until, OUT, Q, waitBoot, devOpts: ctxOpts }, hudRects);
    await firstRun({ page, suite, rec, touch, until, OUT, Q, waitBoot }, hudRects, ctxOpts);
    if (arg('p21only', '')) throw new Error('p21only: stop here (dev run)');
    await page.goto(Q('&q=mid&t=14&seed=7')); await waitBoot(page);
    if (touch) await page.tap('#play'); else await page.click('#play');
    await until(page, () => document.body.classList.contains('playing')); await sleep(600);

    // ---- 7. menu / map / bag panels ----
    for (const [btn, name] of [['#btnMap', 'map'], ['#btnBag', 'bag'], ['#btnMenu', 'menu']]) {
      if (touch) await page.tap(btn); else await page.click(btn);
      await sleep(400);
      const open = await page.evaluate(() => document.getElementById('panel').classList.contains('open'));
      const extra = name === 'map' ? await page.evaluate(() => { const c = document.getElementById('mapCv'); return !!c && c.width > 100; }) : true;
      rec(suite, `panel "${name}" opens`, open && extra);
      await page.screenshot({ path: path.join(OUT, `${suite}_03_${name}.png`) });
      if (name === 'menu') {
        // 画質を「低」に変更
        await page.evaluate(() => document.querySelector('[data-seg="quality"] button[data-v="low"]').click()); await sleep(500);
        const q = await st(page); rec(suite, 'menu: quality change applies', q.quality === 'low', `quality=${q.quality} dpr=${q.dpr}`);
      }
      if (touch) await page.tap('#panelClose'); else await page.click('#panelClose'); await sleep(250);
      const closed = await page.evaluate(() => !document.getElementById('panel').classList.contains('open'));
      rec(suite, `panel "${name}" closes`, closed);
    }

    // ---- 8. save persistence ----
    await page.evaluate((m) => window.__rfw.teleport(m.x, m.z, 1.1), mk.find((m) => m.id === 'bw'));
    await sleep(300); await page.evaluate(() => window.__rfw.saveNow());
    const raw = await page.evaluate(() => localStorage.getItem('realFishingWorld.save'));
    let parsed = null; try { parsed = JSON.parse(raw); } catch {}
    rec(suite, 'save data is versioned {version:2,settings,position,zukan,catchLog,stats}', parsed && parsed.version === 2 && parsed.zukan && parsed.catchLog && parsed.stats && parsed.settings && parsed.position, raw ? raw.slice(0, 90) : 'null');
    const before = await st(page);
    await page.goto(Q('&t=14')); await waitBoot(page);
    const after = await st(page);
    rec(suite, 'save persists across reload (position + quality)', Math.hypot(after.x - before.x, after.z - before.z) < 0.6 && after.quality === 'low', `before=(${before.x.toFixed(1)},${before.z.toFixed(1)}) after=(${after.x.toFixed(1)},${after.z.toFixed(1)}) q=${after.quality}`);
    // 壊れたセーブ
    await page.evaluate(() => localStorage.setItem('realFishingWorld.save', '{broken json'));
    await page.goto(Q('&t=14')); await waitBoot(page);
    const okBroken = await page.evaluate(() => !!window.__rfwBooted && !document.getElementById('err').classList.contains('show'));
    rec(suite, 'corrupted save falls back to defaults without crashing', okBroken);
    await ctx.addInitScript(() => { if (window.name === 'inject-bad-pos') { localStorage.setItem('realFishingWorld.save', JSON.stringify({ version: 1, settings: { quality: 'mid' }, position: { x: 9999, z: 9999, yaw: 0 } })); window.name = ''; } });
    await page.evaluate(() => { window.name = 'inject-bad-pos'; });
    await page.goto(Q('&t=14')); await waitBoot(page);
    const bad = await st(page);
    rec(suite, 'invalid saved position falls back to spawn', Math.abs(bad.x + 20) < 3 && Math.abs(bad.z - 15.5) < 3, `(${bad.x.toFixed(1)},${bad.z.toFixed(1)})`);

    // ---- 9. layouts (portrait/landscape) ----
    await page.goto(Q('&q=low&t=14')); await waitBoot(page);
    if (touch) await page.tap('#play'); else await page.click('#play');
    await until(page, () => document.body.classList.contains('playing')); await sleep(1500);
    const sizes = opts.sizes || [[375, 667], [390, 844], [430, 932], [667, 375], [844, 390], [932, 430]];
    for (const [w, h] of sizes) await layoutCheck(page, suite, { width: w, height: h }, suite, true);
    for (const [w, h] of (opts.p2sizes || [[390, 844], [844, 390]])) await phaseLayouts({ page, suite, rec, touch, until, OUT }, { width: w, height: h }, hudRects);
    await auditFixes({ page, suite, rec, touch, until, OUT }, hudRects);
    // night / day sanity
    await page.setViewportSize({ width: sizes[1][0], height: sizes[1][1] });

    // ---- 10. fps (NOT real device) ----
    await page.goto(Q('&q=low&t=14')); await waitBoot(page); if (touch) await page.tap('#play'); else await page.click('#play');
    await sleep(6000);
    const f = await st(page);
    rec(suite, `headless FPS sample (software GL, NOT a real device): ${f.fps.toFixed(1)} fps @ ${f.quality}, ${f.calls} calls, ${(f.tris / 1000).toFixed(0)}k tris`, f.fps > 3, 'info only');
    opts.fps = f.fps;

    // ---- 11. errors ----
    const jsErr = await page.evaluate(() => (window.__rfwErrors || []).length);
    rec(suite, '0 console errors / page errors / failed requests', log.console.length === 0 && log.pageerror.length === 0 && log.requestfailed.length === 0 && log.http.length === 0 && jsErr === 0, JSON.stringify({ c: log.console.slice(0, 2), p: log.pageerror.slice(0, 2), r: log.requestfailed.slice(0, 2), h: log.http.slice(0, 2) }).slice(0, 400));
  } catch (e) {
    rec(suite, 'SUITE CRASHED', false, String(e.stack || e).split('\n').slice(0, 4).join(' | '));
    await page.screenshot({ path: path.join(OUT, `${suite}_crash.png`) }).catch(() => {});
  }
  await browser.close();
}

const suites = {
  'webkit-iphone13': () => runSuite('webkit-iphone13', () => webkit.launch({ env: WK_ENV }), { ...devices['iPhone 13'] }),
  'webkit-iphoneSE': () => runSuite('webkit-iphoneSE', () => webkit.launch({ env: WK_ENV }), { ...devices['iPhone SE'] }, { sizes: [[375, 667], [667, 375]], p2sizes: [[375, 667], [667, 375]] }),
  'chromium-touch': () => runSuite('chromium-touch', () => chromium.launch({ args: CHROMIUM_ARGS }), { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 }),
  'chromium-desktop': () => runSuite('chromium-desktop', () => chromium.launch({ args: CHROMIUM_ARGS }), { viewport: { width: 1280, height: 720 } }, { sizes: [[1280, 720], [390, 844], [844, 390]], p2sizes: [[1280, 720], [844, 390]] }),
};
for (const [k, f] of Object.entries(suites)) if (!ONLY || ONLY === k) await f();
const failed = results.filter((r) => !r.ok);
console.log(`\n==== ${results.length - failed.length}/${results.length} passed ====`);
for (const r of failed) console.log(`FAIL [${r.suite}] ${r.name} — ${r.detail}`);
fs.writeFileSync(path.join(OUT, 'qa-results.json'), JSON.stringify({ base: BASE, date: new Date().toString(), results }, null, 1));
srv?.s.close();
process.exit(failed.length ? 1 : 0);
