/** Web Audio による合成SFX（音声ファイルなし）。iOS は最初のタップ後に resume が必要。失敗しても例外を出さない。 */
export class Sfx {
  enabled = true;
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private lastReel = 0; private lastSlip = 0;
  /** 呼ばれた SFX の回数（QA用） */
  counts: Record<string, number> = {};
  get state(): string { return this.ctx ? this.ctx.state : 'none'; }
  /** ユーザー操作の中で呼ぶ（iOS の自動再生制限の解除） */
  unlock() {
    try {
      if (!this.ctx) {
        const AC = (window as any).AudioContext || (window as any).webkitAudioContext; if (!AC) return;
        this.ctx = new AC() as AudioContext;
        this.master = this.ctx.createGain(); this.master.gain.value = 0.7; this.master.connect(this.ctx.destination);
        const n = this.ctx.sampleRate * 1; const b = this.ctx.createBuffer(1, n, this.ctx.sampleRate); const d = b.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; this.noiseBuf = b;
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch { /* ignore */ }
  }
  private count(k: string) { this.counts[k] = (this.counts[k] ?? 0) + 1; }
  private ok(): AudioContext | null { if (!this.enabled || !this.ctx || this.ctx.state !== 'running' || !this.master) return null; return this.ctx; }
  private tone(freq: number, dur: number, type: OscillatorType, vol: number, f2?: number, delay = 0) {
    const c = this.ok(); if (!c) return;
    const t = c.currentTime + delay; const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master!); o.start(t); o.stop(t + dur + 0.02);
  }
  private noise(dur: number, vol: number, f0: number, f1: number, q = 1, delay = 0) {
    const c = this.ok(); if (!c || !this.noiseBuf) return;
    const t = c.currentTime + delay; const s = c.createBufferSource(); s.buffer = this.noiseBuf;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = q; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(this.master!); s.start(t); s.stop(t + dur + 0.02);
  }
  /** キャスト音（ヒュッ） */
  whoosh() { this.count('whoosh'); this.noise(0.28, 0.25, 600, 2400, 0.8); }
  /** 着水音（ポチャッ） */
  splash(big = 1) { this.count('splash'); this.noise(0.35, 0.35 * big, 1800, 400, 0.7); this.tone(520, 0.12, 'sine', 0.18 * big, 180); }
  /** 前アタリ：小さなチッ */
  tick() { this.count('tick'); this.tone(1100, 0.05, 'triangle', 0.14); }
  /** 本アタリ：ポコッと2音（見逃さない音） */
  bite() { this.count('bite'); this.tone(420, 0.14, 'sine', 0.5, 220); this.tone(840, 0.1, 'triangle', 0.3, 520, 0.09); this.noise(0.12, 0.15, 900, 300, 1, 0.02); }
  /** 合わせ成功 */
  hookset() { this.count('hookset'); this.noise(0.1, 0.3, 3000, 900, 1); this.tone(300, 0.12, 'square', 0.12, 600); }
  /** 空振り・失敗 */
  miss() { this.count('miss'); this.tone(260, 0.2, 'sine', 0.2, 130); }
  /** リールの巻き音（呼ぶたびに間引いてクリック音） */
  reel(speed: number) {
    const c = this.ok(); if (!c) return; const now = performance.now();
    const gap = 130 - 70 * Math.min(1, speed); if (now - this.lastReel < gap) return; this.lastReel = now;
    this.count('reel'); this.tone(1700 + Math.random() * 200, 0.025, 'square', 0.05);
  }
  /** ドラグが滑る音 */
  slip() { const c = this.ok(); if (!c) return; const now = performance.now(); if (now - this.lastSlip < 90) return; this.lastSlip = now; this.count('slip'); this.tone(1200 + Math.random() * 400, 0.07, 'sawtooth', 0.06, 700); }
  /** ライン警告（張りすぎ） */
  warn() { this.count('warn'); this.tone(980, 0.09, 'square', 0.12); this.tone(980, 0.09, 'square', 0.12, undefined, 0.13); }
  /** ラインブレイク */
  snap() { this.count('snap'); this.noise(0.12, 0.45, 5000, 1500, 0.6); this.tone(1400, 0.2, 'sine', 0.2, 300); }
  /** バラシ */
  lost() { this.count('lost'); this.tone(330, 0.3, 'triangle', 0.25, 150); }
  /** 釣れた！ */
  landed(first = false) { this.count('landed'); const n = first ? [523, 659, 784, 1046] : [523, 659, 784]; n.forEach((f, i) => this.tone(f, 0.22, 'triangle', 0.25, undefined, i * 0.09)); this.noise(0.25, 0.2, 2200, 500, 0.8); }
  ui() { this.count('ui'); this.tone(700, 0.04, 'sine', 0.1); }
}
