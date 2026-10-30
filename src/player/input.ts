/** 入力: 左半分=浮動ジョイスティック / 右半分=スワイプ視点 / PC: WASD + マウスドラッグ。Pointer Events（pointerId 追跡）。 */
export interface InputState {
  mx: number; mz: number; run: boolean;
  lookDX: number; lookDY: number; // 蓄積（消費側でリセット）
  /** ファイト用：ドラッグ開始点からのずれ(px)。fightHeld の間だけ有効 */
  fdx: number; fdy: number; fightHeld: boolean;
}
export class Input {
  s: InputState = { mx: 0, mz: 0, run: false, lookDX: 0, lookDY: 0, fdx: 0, fdy: 0, fightHeld: false };
  enabled = false;
  lockMove = false; // 釣りモード中は左半分も視点操作になる
  joyId: number | null = null; lookId: number | null = null;
  private jx0 = 0; private jy0 = 0; private lx = 0; private ly = 0;
  private keys = new Set<string>();
  runLock = false; // 走るボタン／常に走る
  edgeRun = false; // ジョイスティックを端まで倒している間
  onKey: (k: string) => void = () => {};
  /** ファイト中は視点操作の代わりに「ドラッグ量」を fdx/fdy に出す（上下=竿の角度、左右=竿を向ける） */
  fightMode = false;
  /** 上方向のフリックでキャスト（flickOn の間だけ）。power は 0..1 */
  flickOn = false;
  onFlick: (power: number) => void = () => {};
  private lx0 = 0; private ly0 = 0; private lt0 = 0;
  joyActive = false;

  constructor(private layer: HTMLElement, private ring: HTMLElement, private knob: HTMLElement) {
    layer.addEventListener('pointerdown', this.down);
    window.addEventListener('pointermove', this.move);
    window.addEventListener('pointerup', this.up);
    window.addEventListener('pointercancel', this.up);
    window.addEventListener('keydown', (e) => { if (!this.enabled) return; if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return; this.keys.add(e.code); this.onKey(e.code); if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault(); this.recalcKeys(); });
    window.addEventListener('keyup', (e) => { this.keys.delete(e.code); this.recalcKeys(); });
    window.addEventListener('blur', () => { this.keys.clear(); this.reset(); });
    layer.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  /** ジョイスティック半径（px） */
  get radius() { return window.innerWidth > window.innerHeight ? 48 : 56; }

  reset() {
    this.joyId = null; this.lookId = null; this.joyActive = false; this.edgeRun = false; this.s.fightHeld = false; this.s.fdx = 0; this.s.fdy = 0;
    this.s.mx = 0; this.s.mz = 0; this.recalcKeys();
    this.ring.classList.remove('active'); this.ring.style.transform = ''; this.knob.style.transform = '';
  }
  private recalcKeys() {
    if (this.joyId !== null) return;
    const k = this.keys;
    const mx = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
    const mz = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
    this.s.mx = mx; this.s.mz = mz;
    this.updateRun();
  }
  private updateRun() { this.s.run = this.runLock || this.edgeRun || this.keys.has('ShiftLeft') || this.keys.has('ShiftRight'); }
  setRunLock(v: boolean) { this.runLock = v; this.updateRun(); }

  private down = (e: PointerEvent) => {
    if (!this.enabled) return;
    const w = window.innerWidth;
    if (e.pointerType === 'mouse') {
      if (e.button !== 0 && e.button !== 2) return;
      if (this.lookId === null) { this.lookId = e.pointerId; this.lx = this.lx0 = e.clientX; this.ly = this.ly0 = e.clientY; this.lt0 = performance.now(); this.s.fightHeld = this.fightMode; }
      return;
    }
    if (e.clientX < w * 0.5 && !this.lockMove) {
      if (this.joyId !== null) return;
      this.joyId = e.pointerId; this.jx0 = e.clientX; this.jy0 = e.clientY; this.joyActive = true;
      this.ring.classList.add('active');
      const r = this.radius;
      this.ring.style.transform = `translate(${e.clientX - this.ringHome().x}px, ${e.clientY - this.ringHome().y}px)`;
      this.knob.style.transform = 'translate(0px,0px)';
      void r;
    } else if (this.lookId === null) {
      this.lookId = e.pointerId; this.lx = this.lx0 = e.clientX; this.ly = this.ly0 = e.clientY; this.lt0 = performance.now(); this.s.fightHeld = this.fightMode;
    }
  };
  private ringHome() {
    const rect = this.ring.getBoundingClientRect();
    const tr = this.ring.style.transform;
    const m = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(tr);
    const ox = m ? parseFloat(m[1]) : 0, oy = m ? parseFloat(m[2]) : 0;
    return { x: rect.left - ox + rect.width / 2, y: rect.top - oy + rect.height / 2 };
  }
  private move = (e: PointerEvent) => {
    if (e.pointerId === this.joyId) {
      const r = this.radius;
      let dx = e.clientX - this.jx0, dy = e.clientY - this.jy0;
      const d = Math.hypot(dx, dy);
      // 端まで倒す（円の外周付近）と走る。ヒステリシスでチラつき防止
      this.edgeRun = d >= r * (this.edgeRun ? 0.88 : 1.0);
      if (d > r) { dx = dx / d * r; dy = dy / d * r; }
      this.s.mx = dx / r; this.s.mz = -dy / r;
      const dead = 0.12;
      if (Math.hypot(this.s.mx, this.s.mz) < dead) { this.s.mx = 0; this.s.mz = 0; }
      this.updateRun();
      this.knob.style.transform = `translate(${dx}px, ${dy}px)`;
    } else if (e.pointerId === this.lookId) {
      if (this.fightMode) { this.s.fdx = e.clientX - this.lx0; this.s.fdy = e.clientY - this.ly0; }
      else { this.s.lookDX += e.clientX - this.lx; this.s.lookDY += e.clientY - this.ly; }
      this.lx = e.clientX; this.ly = e.clientY;
    }
  };
  private up = (e: PointerEvent) => {
    if (e.pointerId === this.joyId) {
      this.joyId = null; this.joyActive = false; this.s.mx = 0; this.s.mz = 0; this.edgeRun = false;
      this.ring.classList.remove('active'); this.ring.style.transform = ''; this.knob.style.transform = '';
      this.recalcKeys();
    }
    if (e.pointerId === this.lookId) {
      this.lookId = null;
      const dx = e.clientX - this.lx0, dy = e.clientY - this.ly0, dt = performance.now() - this.lt0;
      if (!this.fightMode && this.flickOn && dy < -90 && dt < 260 && Math.abs(dx) < -dy * 0.7) this.onFlick(Math.max(0.15, Math.min(1, (-dy - 60) / (window.innerHeight * 0.5))));
      this.s.fightHeld = false; this.s.fdx = 0; this.s.fdy = 0;
    }
  };
}
