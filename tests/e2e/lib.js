// Shared helpers for the REAL FISHING WORLD Phase 1 QA suite.
// All game-specific assumptions live in SEL / TXT / HOOK below, so when src/ lands only this file needs tuning.
import { test as base, expect } from 'playwright/test';
import { groundTruth } from './gt.js';

export { expect };
export const MOCK = !!process.env.QA_MOCK;
export const T = {
  loadMaxMs: +(process.env.QA_LOAD_MAX_MS || 30000),    // loading screen must finish within (emulation only)
  edgeMax: +(process.env.QA_EDGE_MAX || 2.5),           // 釣り開始 may be visible only within this many m of water (TBD by spec)
  edgeNear: +(process.env.QA_EDGE_NEAR || 1.0),         // 釣り開始 MUST be visible within this many m of water
  autosaveWaitMs: +(process.env.QA_AUTOSAVE_WAIT_MS || 6000),
  saveKeyRe: new RegExp(process.env.QA_SAVE_KEY_RE || 'rfw|fishing|save', 'i'),
};

/** Selectors. TBD until src/ui exists: the programmer should add these data-testid attributes (see QA_PHASE1.md §Hooks). */
export const SEL = {
  // comma lists = [documented data-testid] , [ids the current build actually uses (src index.html, 2026-10-30 17:5x JST)]
  loading: '[data-testid="loading"], #loading',
  loadingBar: '[data-testid="loading-progress"], [role="progressbar"], #bar',
  play: '[data-testid="play-button"], #play',
  joystick: '[data-testid="joystick"], #joyRing',
  moveUi: '[data-testid="move-ui"]',
  fishStart: '[data-testid="fishing-start"], #btnFish',
  fishStop: '[data-testid="fishing-stop"], #btnExit',
  fishToggle: '[data-testid="fishing-toggle"]',
  fishUi: '[data-testid="fishing-ui"], #infoCard',
  canvas: 'canvas',
};
// extra HUD units that are not buttons/[data-ui] (the joystick reference ring)
export const HUD_EXTRA = '#joyRing';
export const TXT = {
  play: /^\s*(▶\s*)?(play|start|プレイ|スタート|はじめる|始める|ゲーム開始|タップして開始)/i,
  fishStart: /釣り開始|釣りを開始|釣りをはじめる|釣る/,
  fishStop: /釣りをやめる|釣り終了|釣りを終了|移動に戻る|やめる/,
};
export const HOOK = '__rfw';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export { sleep };

/* ------------------------------------------------------------------ touch simulation */
class TouchSim {
  constructor(game) { this.g = game; this.active = new Map(); }
  async _cdp() { return (this.cdp ||= await this.g.context.newCDPSession(this.g.page)); }
  async down(id, x, y) {
    this.active.set(id, { x, y });
    if (this.g.useCdp) {
      const c = await this._cdp();
      await c.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: id + 1 }] });
    } else if (process.env.QA_INPUT === 'mouse') { await this.g.page.mouse.move(x, y); await this.g.page.mouse.down(); }
    else await this.g.page.evaluate(([id, x, y]) => window.__qaTouch.dispatch('down', id, x, y), [id, x, y]);
  }
  async move(id, x, y) {
    this.active.set(id, { x, y });
    if (this.g.useCdp) {
      const c = await this._cdp();
      await c.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y, id: id + 1 }] });
    } else if (process.env.QA_INPUT === 'mouse') await this.g.page.mouse.move(x, y);
    else await this.g.page.evaluate(([id, x, y]) => window.__qaTouch.dispatch('move', id, x, y), [id, x, y]);
  }
  async up(id) {
    const p = this.active.get(id); if (!p) return;
    this.active.delete(id);
    if (this.g.useCdp) {
      const c = await this._cdp();
      await c.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [{ x: p.x, y: p.y, id: id + 1 }] });
    } else if (process.env.QA_INPUT === 'mouse') await this.g.page.mouse.up();
    else await this.g.page.evaluate(([id, x, y]) => window.__qaTouch.dispatch('up', id, x, y), [id, p.x, p.y]);
  }
  /** OS cancels the touch (e.g. system gesture, call, notification pull-down): touchcancel / pointercancel */
  async cancel(id) {
    const p = this.active.get(id); if (!p) return;
    this.active.delete(id);
    if (this.g.useCdp) { const c = await this._cdp(); await c.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] }); }
    else if (process.env.QA_INPUT === 'mouse') await this.g.page.mouse.up();
    else await this.g.page.evaluate(([id, x, y]) => window.__qaTouch.dispatch('cancel', id, x, y), [id, p.x, p.y]);
  }
  async releaseAll() { for (const id of [...this.active.keys()]) await this.up(id).catch(() => {}); }
  /** one-finger drag with intermediate moves */
  async drag(id, from, to, { steps = 12, stepMs = 16, hold = false } = {}) {
    await this.down(id, from.x, from.y);
    for (let i = 1; i <= steps; i++) { await this.move(id, from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps); await sleep(stepMs); }
    if (!hold) await this.up(id);
  }
}

// Installed in every page. WebKit's `Touch` constructor is "Illegal" in Playwright's WebKit, so touch-only listeners can NOT be
// driven there; we dispatch PointerEvents (pointerType=touch). Chromium gets real touch through CDP instead.
const INIT = () => {
  const ids = new Map(); // id -> {target}
  const origSet = Element.prototype.setPointerCapture, origRel = Element.prototype.releasePointerCapture;
  Element.prototype.setPointerCapture = function (id) { try { return origSet.call(this, id); } catch (e) { if (id >= 1000) return; throw e; } };
  Element.prototype.releasePointerCapture = function (id) { try { return origRel.call(this, id); } catch (e) { if (id >= 1000) return; throw e; } };
  window.__qaTouch = {
    dispatch(kind, id, x, y) {
      const pid = 1000 + id;
      let target;
      if (kind === 'down') { target = document.elementFromPoint(x, y) || document.body; ids.set(id, { target }); }
      else target = (ids.get(id) || {}).target || document.elementFromPoint(x, y) || document.body;
      const type = { down: 'pointerdown', move: 'pointermove', up: 'pointerup', cancel: 'pointercancel' }[kind];
      const init = { bubbles: true, cancelable: true, composed: true, pointerId: pid, pointerType: 'touch', isPrimary: id === 0, clientX: x, clientY: y, screenX: x, screenY: y,
        width: 1, height: 1, pressure: kind === 'up' ? 0 : 0.5, button: kind === 'move' ? -1 : 0, buttons: kind === 'up' ? 0 : 1 };
      target.dispatchEvent(new PointerEvent(type, init));
      if (kind === 'up' || kind === 'cancel') { target.dispatchEvent(new PointerEvent('pointerout', init)); ids.delete(id); }
    },
  };
};

/* ------------------------------------------------------------------ Game helper */
export class Game {
  constructor({ page, context, browserName, testInfo }) {
    Object.assign(this, { page, context, browserName, testInfo });
    this.useCdp = browserName === 'chromium';
    this.touch = new TouchSim(this);
    this.errors = []; this.audioErrors = []; // headless WebKit has no audio device: the uncaught audio-resume rejection is tracked separately (asserted only by QA-15)
    this.warnings = [];
    this.calib = null;
    this.loc = {};
    for (const k of Object.keys(SEL)) this.loc[k] = page.locator(SEL[k]);
    this.loc.play = page.locator(SEL.play).or(page.getByRole('button', { name: TXT.play })).first();
    this.loc.fishStart = page.locator(SEL.fishStart).or(page.getByRole('button', { name: TXT.fishStart })).first();
    this.loc.fishStop = page.locator(SEL.fishStop).or(page.locator(SEL.fishToggle)).or(page.getByRole('button', { name: TXT.fishStop })).first();
    this.loc.joystick = page.locator(SEL.joystick).first();
    this.loc.loading = page.locator(SEL.loading).first();
    this.loc.fishUi = page.locator(SEL.fishUi).first();
    this.loc.canvas = page.locator('canvas').first();
  }
  async init() {
    await this.page.addInitScript(INIT);
    // AUDIO SHIELD (harness, not product): headless WebKit has no audio device, so AudioContext.resume() rejects and the build's global
    // unhandledrejection handler opens the full-screen #err overlay, which blocks every touch. Finding BUG-A is asserted by QA-15 and QA-X10
    // (shield OFF); all other tests swallow that one rejection in the capture phase so the rest of the build can still be audited.
    this.shield = !/QA-15|QA-X10/.test(this.testInfo.title);
    if (this.shield) await this.page.addInitScript(() => { window.addEventListener('unhandledrejection', (e) => { if (/audio device/i.test(String(e.reason && (e.reason.message || e.reason)))) { e.preventDefault(); e.stopImmediatePropagation(); } }, true); window.addEventListener('error', (e) => { if (/audio device/i.test(e.message || '')) { e.stopImmediatePropagation(); } }, true); });
    const { page } = this;
    const ignorable = (u) => /favicon\.ico|apple-touch-icon/.test(u || '');
    page.on('console', (m) => {
      const loc = m.location()?.url || '';
      if (m.type() === 'error' && !ignorable(loc) && !ignorable(m.text())) this.errors.push(`console.error: ${m.text()} @ ${loc}`);
      else if (m.type() === 'warning') this.warnings.push(m.text());
    });
    page.on('pageerror', (e) => { const m = `pageerror: ${e.message}`; if (/Failed to start the audio device/i.test(e.message)) { this.audioErrors.push(m); this.testInfo.annotations.push({ type: 'audio-pageerror', description: e.message }); } else this.errors.push(m); });
    page.on('requestfailed', (r) => { const f = r.failure()?.errorText || ''; if (!ignorable(r.url()) && !/ERR_ABORTED|cancelled|aborted/i.test(f)) this.errors.push(`requestfailed: ${r.url()} ${f}`); });
    page.on('response', (r) => { if (r.status() >= 400 && !ignorable(r.url())) this.errors.push(`http ${r.status()}: ${r.url()}`); });
    page.on('crash', () => this.errors.push('page crashed'));
    this.gt = await groundTruth();
  }
  async finish() {
    await this.touch.releaseAll();
    this.testInfo.annotations.push({ type: 'console-errors', description: String(this.errors.length) });
    if (this.errors.length) await this.testInfo.attach('console-errors.txt', { body: this.errors.join('\n'), contentType: 'text/plain' });
  }
  note(type, description) { this.testInfo.annotations.push({ type, description: String(description) }); }
  /** mark UNTESTED (Playwright 'skipped') with a reason; the report script maps skipped -> untested */
  untested(reason) { this.testInfo.skip(true, 'UNTESTED: ' + reason); }
  weak(reason) { this.note('weak-evidence', reason); }

  /* ---- navigation / state */
  async open(query = '', { waitUntil = 'domcontentloaded' } = {}) {
    const res = await this.page.goto('./' + query, { waitUntil });
    return res;
  }
  async hook(name) { return this.page.evaluate(([h, n]) => { const w = window[h]; if (!w) return false; if (n === 'getState') return typeof w.getState === 'function' || typeof w.state === 'function'; return typeof w[n] === 'function'; }, [HOOK, name]); }
  async hasHooks() { return this.page.evaluate((h) => !!window[h], HOOK); }
  /** Normalised state. Understands BOTH the proposed contract (getState(): {phase,player:{x,z},camera,mode,canFish}) and the build's
   *  actual window.__rfw.state() (flat: {playing,mode:'move'|'fish',x,z,yaw,pitch,canFish,camera,fps,...}). */
  async state() {
    return this.page.evaluate((h) => {
      const w = window[h]; if (!w) return null;
      if (w.getState) return w.getState();
      if (!w.state) return null;
      const s = w.state();
      const loadingVisible = !!document.querySelector('#loading') && getComputedStyle(document.querySelector('#loading')).display !== 'none';
      return { ...s, phase: s.playing ? (s.mode === 'fish' ? 'fishing' : 'playing') : (document.querySelector('#play')?.disabled ? 'loading' : loadingVisible ? 'title' : 'playing'),
        mode: s.mode === 'fish' ? 'fishing' : s.mode, player: { x: s.x, y: s.y, z: s.z }, camera: { yaw: s.yaw, pitch: s.pitch, mode: s.camera, aspect: innerWidth / innerHeight }, canFish: s.canFish, _flat: true };
    }, HOOK);
  }
  async pos() { const s = await this.state(); return s?.player ? { x: s.player.x, z: s.player.z } : null; }
  async call(name, ...args) { return this.page.evaluate(([h, n, a]) => window[h][n](...a), [HOOK, name, args]); }
  async vis(locator) { return locator.isVisible().catch(() => false); }
  async waitPlayVisible(timeout = T.loadMaxMs + 15000) { await this.loc.play.waitFor({ state: 'visible', timeout }); }

  async tap(locator) {
    if (this.testInfo.project.use.hasTouch) await locator.tap({ timeout: 8000 }); else await locator.click({ timeout: 8000 });
  }
  /** Boot -> Play -> in-game. Returns when phase is playing. */
  async start({ query = '?qa=1', fresh = false } = {}) {  // ?qa=1 = the build's QA mode (enables teleport/setYaw, disables auto quality drop)
    if (fresh) await this.page.addInitScript(() => { try { if (!sessionStorage.__qaKept) { localStorage.clear(); sessionStorage.__qaKept = '1'; } } catch (e) {} });
    await this.open(query);
    await this.waitPlayVisible();
    await this.tap(this.loc.play);
    await this.waitPlaying();
  }
  async waitPlaying(timeout = 15000) {
    await expect.poll(async () => {
      const s = await this.state();
      if (s?.phase) return s.phase === 'playing' || s.phase === 'fishing';
      return !(await this.vis(this.loc.play)) && ((await this.vis(this.loc.joystick)) || (await this.vis(this.loc.canvas)));
    }, { timeout, message: 'game never reached the playing phase after Play' }).toBe(true);
    await sleep(300);
  }
  /** Position via hook, throws a clear error if hook missing. */
  async needPos() { const p = await this.pos(); if (!p) throw new Error('window.__rfw.getState().player.{x,z} missing'); return p; }
  async needHooks(...names) {
    const miss = [];
    for (const n of names) if (!(await this.hook(n))) miss.push(n);
    if (miss.length) this.untested(`hook(s) window.${HOOK}.${miss.join(', ')} not exposed by the build`);
  }
  needGT() { if (!this.gt) this.untested('ground truth unavailable (cannot import src/world/layout.ts)'); }
  async teleport(x, z, yaw) { await this.call('teleport', x, z, yaw); await sleep(250); }

  /* ---- joystick & swipe */
  vp() { return this.page.viewportSize(); }
  async box(locator) { return locator.boundingBox().catch(() => null); }
  async stickCenter() {
    const b = await this.box(this.loc.joystick);
    const vp = this.vp();
    if (b && b.width > 0) return { x: b.x + b.width / 2, y: b.y + b.height / 2, r: Math.max(20, Math.min(b.width, b.height) / 2), fixed: true };
    return { x: vp.width * 0.2, y: vp.height * 0.75, r: Math.min(vp.width, vp.height) * 0.12, fixed: false }; // dynamic-stick fallback region
  }
  /** Press the stick and hold it deflected by (sx right+, sy forward+) in [-1,1]. Returns release(). */
  async stickDown(sx, sy, id = 0) {
    const c = await this.stickCenter();
    await this.touch.down(id, c.x, c.y);
    await this.touch.move(id, c.x + sx * c.r * 0.85, c.y - sy * c.r * 0.85);
    this._stick = { c, id };
  }
  async stickSet(sx, sy) { const { c, id } = this._stick; await this.touch.move(id, c.x + sx * c.r * 0.85, c.y - sy * c.r * 0.85); }
  async stickUp() { if (this._stick) { await this.touch.up(this._stick.id); this._stick = null; } }
  async stickHold(sx, sy, ms) { await this.stickDown(sx, sy); await sleep(ms); await this.stickUp(); }

  /** Candidate swipe start points that are not on any button/joystick (hit-tested). */
  async freePoint() {
    const vp = this.vp();
    const cands = [[0.72, 0.45], [0.65, 0.35], [0.8, 0.3], [0.7, 0.55], [0.55, 0.3], [0.85, 0.5]];
    for (const [fx, fy] of cands) {
      const x = vp.width * fx, y = vp.height * fy;
      const ok = await this.page.evaluate(([x, y, sel]) => { const e = document.elementFromPoint(x, y); return !e || !e.closest(sel); }, [x, y, 'button,[role=button],input,select,a,[data-testid="joystick"],[data-testid="move-ui"] *']);
      if (ok) return { x, y };
    }
    return { x: vp.width * 0.7, y: vp.height * 0.4 };
  }
  async swipe(dx, dy, { id = 1, steps = 14 } = {}) {
    const p = await this.freePoint();
    const to = { x: Math.max(5, Math.min(this.vp().width - 5, p.x + dx)), y: Math.max(5, Math.min(this.vp().height - 5, p.y + dy)) };
    await this.touch.drag(id, p, to, { steps });
  }

  /* ---- closed-loop walking (convention-free: calibrates what "forward/right" means in world coords) */
  async calibrate(force = false) {
    const s0 = await this.state();
    const yaw = s0?.camera?.yaw ?? 0;
    if (this.calib && !force && Math.abs(this.calib.yaw - yaw) < 0.05) return this.calib;
    const measure = async (sx, sy) => {
      const a = await this.needPos(); await this.stickHold(sx, sy, 700); await sleep(250); const b = await this.needPos();
      const d = Math.hypot(b.x - a.x, b.z - a.z); return d < 0.25 ? null : { x: (b.x - a.x) / d, z: (b.z - a.z) / d, d };
    };
    let f = await measure(0, 1);
    if (!f) { f = await measure(0, 1); } // maybe first press was swallowed by an intro; retry once
    if (!f) throw new Error('joystick forward did not move the player (>0.25 m in 0.7 s)');
    let r = await measure(1, 0);
    if (!r) throw new Error('joystick right did not move the player');
    this.calib = { yaw, f, r };
    return this.calib;
  }
  /** Walk (hold the stick) toward world (tx,tz). Resolves {reason:'arrived'|'timeout'|'stuck', samples}. */
  async walkToward(tx, tz, { timeout = 20000, arrive = 0.7, speedMul = 1, stuckMs = 4000, recorder = true, keepPushing = false } = {}) {
    const cal = await this.calibrate();
    if (recorder) await this.recStart();
    const t0 = Date.now(); let reason = 'timeout', lastMoveT = t0, lastP = await this.needPos();
    await this.stickDown(0, 1);
    try {
      while (Date.now() - t0 < timeout) {
        const p = await this.needPos();
        const dx = tx - p.x, dz = tz - p.z, dist = Math.hypot(dx, dz);
        if (dist < arrive && !keepPushing) { reason = 'arrived'; break; }
        const ux = dx / (dist || 1), uz = dz / (dist || 1);
        const sf = ux * cal.f.x + uz * cal.f.z, sr = ux * cal.r.x + uz * cal.r.z;
        const m = Math.hypot(sf, sr) || 1;
        await this.stickSet((sr / m) * speedMul, (sf / m) * speedMul);
        if (Math.hypot(p.x - lastP.x, p.z - lastP.z) > 0.15) { lastP = p; lastMoveT = Date.now(); }
        else if (Date.now() - lastMoveT > stuckMs) { reason = 'stuck'; if (!keepPushing) break; }
        await sleep(90);
      }
    } finally { await this.stickUp(); }
    const samples = recorder ? await this.recStop() : []; if (samples.length) samples[0].start = true;
    return { reason, samples, end: await this.needPos() };
  }
  /** Walk along a planned route (gt.route) waypoint by waypoint. */
  async walkRoute(to, opts = {}) {
    const from = await this.needPos(); const r = this.gt.route(from, to);
    if (!r) return { reason: 'no-route', samples: [], end: from };
    let last = { reason: 'arrived', samples: [] }; const samples = [];
    for (const w of [...r, to]) { last = await this.walkToward(w.x, w.z, { timeout: 9000, arrive: 0.6, ...opts, recorder: opts.recorder ?? false }); samples.push(...last.samples); if (last.reason !== 'arrived') break; }
    return { ...last, samples, end: await this.needPos() };
  }
  async recStart(everyMs = 33) {
    await this.page.evaluate(([h, ms]) => {
      window.__qaRec = { s: [], t0: performance.now() };
      window.__qaRecTimer = setInterval(() => {
        const w = window[h]; let st = w?.getState?.(); if (!st && w?.state) { const f = w.state(); st = { player: { x: f.x, z: f.z }, camera: { yaw: f.yaw, pitch: f.pitch }, mode: f.mode }; } if (!st?.player) return;
        window.__qaRec.s.push({ t: performance.now() - window.__qaRec.t0, x: st.player.x, z: st.player.z, yaw: st.camera?.yaw, pitch: st.camera?.pitch, mode: st.mode });
      }, ms);
    }, [HOOK, everyMs]);
  }
  async recStop() { return this.page.evaluate(() => { clearInterval(window.__qaRecTimer); return window.__qaRec.s; }); }

  /* ---- images */
  async frame(clipFrac = { x: 0.15, y: 0.12, w: 0.7, h: 0.55 }) {
    const vp = this.vp();
    const clip = { x: Math.round(vp.width * clipFrac.x), y: Math.round(vp.height * clipFrac.y), width: Math.round(vp.width * clipFrac.w), height: Math.round(vp.height * clipFrac.h) };
    return this.page.screenshot({ clip, type: 'png', scale: 'css', animations: 'allow' });
  }
  async diff(a, b) {
    this.scratch ||= await this.context.newPage();
    return this.scratch.evaluate(async ([a, b]) => {
      const load = (buf) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = 'data:image/png;base64,' + buf; });
      const [ia, ib] = await Promise.all([load(a), load(b)]);
      const W = 96, H = Math.max(8, Math.round((96 * ia.height) / ia.width));
      const px = (img) => { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); x.drawImage(img, 0, 0, W, H); return x.getImageData(0, 0, W, H).data; };
      const A = px(ia), B = px(ib); let ch = 0, sum = 0;
      for (let i = 0; i < A.length; i += 4) { const d = Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]); sum += d; if (d > 36) ch++; }
      // blankness of A
      let m = 0; for (let i = 0; i < A.length; i += 4) m += A[i] + A[i + 1] + A[i + 2]; m /= (A.length / 4) * 3;
      let v = 0; for (let i = 0; i < A.length; i += 4) { const g = (A[i] + A[i + 1] + A[i + 2]) / 3; v += (g - m) ** 2; }
      const cols = new Set(); for (let i = 0; i < A.length; i += 4) cols.add(((A[i] >> 4) << 8) | ((A[i + 1] >> 4) << 4) | (A[i + 2] >> 4));
      return { changed: ch / (A.length / 4), mean: sum / (A.length / 4) / 3, stdA: Math.sqrt(v / (A.length / 4)), colorsA: cols.size };
    }, [a.toString('base64'), b.toString('base64')]);
  }
  /** idle-noise-aware change measure: returns {idle, after}. Water animation makes idle > 0, so callers compare against it. */
  async idleNoise() { const a = await this.frame(); await sleep(350); const b = await this.frame(); return (await this.diff(a, b)).changed; }

  /* ---- layout */
  /**
   * HUD units. Preferred: elements carrying data-hud="<name>" (leaf-most; zones marked data-hud-zone are skipped).
   * Fallback (no data-hud anywhere): visible leaf [data-testid]/button/role=button elements.
   */
  async uiBoxes() {
    return this.page.evaluate((extra) => {
      const vis = (e) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.05 && r.width > 0 && r.height > 0; };
      const marked = [...document.querySelectorAll('[data-hud]')].filter((e) => vis(e) && !e.closest('[data-qa-ignore]') && !e.hasAttribute('data-hud-zone') && !e.closest('[data-hud-zone]'));
      let units, mode;
      if (marked.length) {
        const set = new Set(marked);
        units = marked.filter((e) => ![...e.querySelectorAll('[data-hud]')].some((c) => set.has(c)));
        mode = 'data-hud';
      } else {
        const sel = '[data-testid], [data-ui], button, [role=button], input, select, a[href], ' + extra;
        const all = [...document.querySelectorAll(sel)].filter((e) => !(e instanceof HTMLCanvasElement) && vis(e) && !e.closest('[data-qa-ignore]') && !/swipe|zone|loading/i.test(e.getAttribute('data-testid') || ''));
        const set = new Set(all);
        units = all.filter((e) => ![...e.querySelectorAll(sel)].some((c) => set.has(c)));
        mode = 'fallback-heuristic';
      }
      const name = (e) => e.getAttribute('data-hud') || e.getAttribute('data-testid') || e.getAttribute('aria-label') || e.id || (e.textContent || '').trim().slice(0, 12) || e.tagName.toLowerCase();
      const isStick = (e) => /joy|stick/i.test((e.getAttribute('data-hud') || '') + (e.getAttribute('data-testid') || '') + e.id);
      const isButton = (e) => e.matches('button,[role=button],a[href],input,select,[data-hud-button]') && !isStick(e);
      return units.map((e) => {
        const r = e.getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
        const hit = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(0, cx)), Math.min(innerHeight - 1, Math.max(0, cy)));
        const disabled = e.disabled || e.getAttribute('aria-disabled') === 'true' || e.hasAttribute('data-disabled') || /(^|\s)(disabled|is-disabled)(\s|$)/.test(e.className || '');
        return { name: name(e), mode, x: r.x, y: r.y, w: r.width, h: r.height, button: isButton(e), stick: isStick(e), interactive: isButton(e) || isStick(e), disabled,
          hitOk: !!hit && (hit === e || e.contains(hit) || hit.contains(e)), hitBy: hit ? (hit.getAttribute?.('data-testid') || hit.getAttribute?.('data-hud') || hit.tagName) : null,
          clipped: e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflow !== 'visible' };
      });
    }, HUD_EXTRA);
  }
  async fishStartActive() {
    const l = this.loc.fishStart;
    if (!(await this.vis(l))) return false;
    return l.evaluate((e) => !(e.disabled || e.getAttribute('aria-disabled') === 'true' || e.hasAttribute('data-disabled') || /(^|\s)(disabled|is-disabled|off)(\s|$)/.test(e.className || '') || e.dataset?.state === 'disabled'));
  }
  /**
   * HUD rule check from design/ART_DIRECTION.md §4.1 / §4.5 (see QA_PHASE1.md "HUD rules assumed").
   * insets: {top,right,bottom,left} to enforce for containment, or null when the safe area cannot be emulated (WebKit).
   */
  async hudReport(label, insets) {
    const vp = this.vp(); const boxes = await this.uiBoxes(); const problems = [];
    const R = (b) => `${b.name}[x${Math.round(b.x)}-${Math.round(b.x + b.w)},y${Math.round(b.y)}-${Math.round(b.y + b.h)}]`;
    if (!boxes.length) problems.push('no HUD elements found (need data-hud / data-testid)');
    for (const b of boxes) {
      if (b.x < -0.5 || b.y < -0.5 || b.x + b.w > vp.width + 0.5 || b.y + b.h > vp.height + 0.5) problems.push(`outside viewport: ${R(b)} in ${vp.width}x${vp.height}`);
      if (insets && (b.x < insets.left - 0.5 || b.y < insets.top - 0.5 || b.x + b.w > vp.width - insets.right + 0.5 || b.y + b.h > vp.height - insets.bottom + 0.5)) problems.push(`outside safe area (insets t${insets.top} r${insets.right} b${insets.bottom} l${insets.left}): ${R(b)}`);
      if (b.button && (b.w < 43.5 || b.h < 43.5)) problems.push(`tap target < 44x44: ${R(b)} is ${b.w.toFixed(0)}x${b.h.toFixed(0)}`);
      if (b.button && !b.disabled && !b.hitOk) problems.push(`obscured: centre of ${R(b)} hit-tests to ${b.hitBy}`);
      if (b.clipped) problems.push(`label clipped: ${R(b)}`);
    }
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], c = boxes[j];
      const gx = Math.max(a.x, c.x) - Math.min(a.x + a.w, c.x + c.w), gy = Math.max(a.y, c.y) - Math.min(a.y + a.h, c.y + c.h);
      if (gx < 0 && gy < 0) problems.push(`HUD overlap ${Math.round(-gx)}x${Math.round(-gy)}px: ${R(a)} <-> ${R(c)}`);
      else if (a.button && c.button) { const gap = gx > 0 && gy > 0 ? Math.hypot(gx, gy) : Math.max(gx, gy); if (gap < 11.5) problems.push(`button gap ${gap.toFixed(1)}px < 12: ${R(a)} <-> ${R(c)}`); }
    }
    this.note('hud-' + label, `${boxes.length} units (${boxes[0]?.mode}): ${boxes.map((b) => b.name).join(', ')}`);
    return { problems, boxes };
  }
  /** Visit: A playing/spawn, B shoreline (釣る enabled), C fishing mode. fn(name) is awaited in each. */
  async eachScenario(label, fn) {
    await fn('movement-spawn');
    if (!this.gt || !(await this.hook('getState'))) { this.weak(`${label}: no getState/ground truth, only the spawn HUD was checked`); return; }
    const spot = this.gt.edgeSpots(1)[0];
    if (await this.hook('teleport')) await this.teleport(spot.x, spot.z); else await this.walkToward(spot.x, spot.z, { timeout: 25000, arrive: 0.6, recorder: false });
    await sleep(400);
    await fn('movement-shoreline');
    if (await this.fishStartActive()) {
      await this.tap(this.loc.fishStart); await sleep(500);
      await fn('fishing-mode');
      await this.tap(this.loc.fishStop); await sleep(300);
    } else this.weak(`${label}: 釣る/釣り開始 not enabled at shoreline – fishing-mode HUD not checked`);
  }
  async layoutReport(label) {
    const vp = this.vp();
    const boxes = await this.uiBoxes();
    const page = await this.page.evaluate(() => {
      const c = document.querySelector('canvas'); const r = c?.getBoundingClientRect();
      return { sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, iw: innerWidth, ih: innerHeight,
        canvasCover: r ? (Math.min(r.right, innerWidth) - Math.max(r.left, 0)) * (Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / (innerWidth * innerHeight) : 0 };
    });
    const problems = [];
    if (page.sw > page.iw + 1 || page.sh > page.ih + 1) problems.push(`page scrolls (${page.sw}x${page.sh} > ${page.iw}x${page.ih})`);
    if (page.canvasCover < 0.98) problems.push(`canvas covers only ${(page.canvasCover * 100).toFixed(0)}% of viewport`);
    for (const b of boxes) {
      if (b.x < -0.5 || b.y < -0.5 || b.x + b.w > vp.width + 0.5 || b.y + b.h > vp.height + 0.5) problems.push(`off-screen: ${b.name} [${b.x | 0},${b.y | 0},${b.w | 0}x${b.h | 0}] in ${vp.width}x${vp.height}`);
      if (b.interactive && Math.min(b.w, b.h) < 32) problems.push(`tap target < 32px: ${b.name} (${b.w | 0}x${b.h | 0})`);
      if (b.button && !b.disabled && !b.hitOk) problems.push(`obscured (center hit-test lands on ${b.hitBy}): ${b.name}`);
      if (b.clipped) problems.push(`text clipped: ${b.name}`);
    }
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], c = boxes[j];
      const ox = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x), oy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
      if (ox > 2 && oy > 2) problems.push(`overlap ${ox | 0}x${oy | 0}px: ${a.name} <-> ${c.name}`);
    }
    const small = boxes.filter((b) => b.interactive && Math.min(b.w, b.h) < 44).map((b) => b.name);
    if (small.length) this.note('hig-44px-warning', `${label}: ${small.join(', ')} < 44px (advisory)`);
    this.note('layout-' + label, `${boxes.length} UI boxes checked: ${boxes.map((b) => b.name).join(', ') || '(none found!)'}`);
    if (!boxes.length) problems.push('no UI elements found (data-testid / data-hud / button) – overlap check had nothing to check');
    return { problems, boxes, page };
  }
  async perfSample(ms) {
    return this.page.evaluate((ms) => new Promise((res) => {
      const d = []; let last = performance.now(); const t0 = last;
      const f = (t) => { d.push(t - last); last = t; if (t - t0 < ms) requestAnimationFrame(f); else res(d); };
      requestAnimationFrame(f);
    }), ms);
  }
}

export function stats(deltas) {
  const d = deltas.slice(2).filter((x) => x > 0); if (!d.length) return null;
  const s = [...d].sort((a, b) => a - b); const avg = d.reduce((a, b) => a + b, 0) / d.length;
  const q = (p) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  return { frames: d.length, avgFps: +(1000 / avg).toFixed(1), p95FrameMs: +q(0.95).toFixed(1), p99FrameMs: +q(0.99).toFixed(1), maxFrameMs: +s[s.length - 1].toFixed(1), over50ms: d.filter((x) => x > 50).length, over500ms: d.filter((x) => x > 500).length, lowFpsP5: +(1000 / q(0.95)).toFixed(1) };
}

/** terrain / sea violations of a recorded path against ground truth. */
export function violations(gt, samples, { strict }) {
  const out = []; let prev = null;
  for (const s of samples) {
    if (gt.isWater(s.x, s.z)) out.push({ t: s.t, why: 'in sea', x: s.x, z: s.z });
    else if (gt.isTetra(s.x, s.z)) out.push({ t: s.t, why: 'on tetrapod zone', x: s.x, z: s.z });
    const b = gt.inBuilding(s.x, s.z); if (b) out.push({ t: s.t, why: 'inside building ' + b.id, x: s.x, z: s.z });
    if (strict && (gt.isBlockedCell(s.x, s.z) || gt.blockedCircle(s.x, s.z, 0.2))) out.push({ t: s.t, why: 'inside prop/solid cell', x: s.x, z: s.z });
    if (s.x < gt.extent.min || s.x > gt.extent.max || s.z < gt.extent.min || s.z > gt.extent.max) out.push({ t: s.t, why: 'outside map extent', x: s.x, z: s.z });
    if (prev && !s.start && Math.hypot(s.x - prev.x, s.z - prev.z) > 3) out.push({ t: s.t, why: 'position jump >3 m in one sample (tunnelling/teleport?)', x: s.x, z: s.z });
    prev = s;
  }
  return out;
}

export const test = base.extend({
  game: async ({ page, context, browserName }, use, testInfo) => {
    const g = new Game({ page, context, browserName, testInfo });
    await g.init();
    await use(g);
    await g.finish();
  },
});
