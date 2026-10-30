/** 決定的乱数（mulberry32）。?seed=… や QA で再現できるようにする。 */
export class Rng {
  private s: number;
  constructor(seed = (Date.now() ^ 0x9e3779b9) >>> 0) { this.s = seed >>> 0; }
  seed(n: number) { this.s = n >>> 0; }
  next(): number {
    this.s = (this.s + 0x6d2b79f5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  u(a: number, b: number) { return a + (b - a) * this.next(); }
  /** 正規乱数（Box-Muller） */
  n01() { const u = Math.max(1e-9, this.next()), v = this.next(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  chance(p: number) { return this.next() < p; }
  pick<T>(a: T[]): T { return a[Math.floor(this.next() * a.length) % a.length]; }
}
export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
