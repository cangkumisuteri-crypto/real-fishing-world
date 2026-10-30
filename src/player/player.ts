import { Grid, PLAYER_RADIUS } from '../world/grid';

export const EYE = 1.6;
export const WALK = 3.0; // m/s（ゲーム内。実測値ではない）
export const RUN = 6.0; // 歩きの2倍

/** 位置・向き・当たり判定。グリッドのセルに対する円の衝突（軸ごとのスライド）。 */
export class Player {
  x = 0; z = 0; y = 0; yaw = 0; pitch = 0;
  moved = 0; // 累積移動距離（QA用）
  constructor(private g: Grid) {}

  place(x: number, z: number, yaw = 0) {
    this.x = x; this.z = z; this.yaw = yaw; this.pitch = 0;
    this.y = this.g.heightAt(x, z);
  }
  /** 現在地が安全か（保存位置の検証用） */
  isSafe(x: number, z: number) { return !this.g.blockedCircle(x, z, PLAYER_RADIUS); }

  /** mx: 右+ / mz: 前+（-1..1）。speedMul: 設定倍率。 */
  update(dt: number, mx: number, mz: number, run: boolean, speedMul: number) {
    const len = Math.hypot(mx, mz);
    if (len < 0.001) { this.y = this.g.heightAt(this.x, this.z); return; }
    const k = Math.min(1, len) / len;
    mx *= k; mz *= k;
    const sp = (run ? RUN : WALK) * speedMul * dt;
    const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw);
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);
    let dx = (fx * mz + rx * mx) * sp, dz = (fz * mz + rz * mx) * sp;
    // サブステップ（トンネリング防止）
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.12));
    dx /= steps; dz /= steps;
    for (let i = 0; i < steps; i++) {
      const ox = this.x, oz = this.z;
      if (!this.g.blockedCircle(this.x + dx, this.z, PLAYER_RADIUS)) this.x += dx;
      if (!this.g.blockedCircle(this.x, this.z + dz, PLAYER_RADIUS)) this.z += dz;
      this.moved += Math.hypot(this.x - ox, this.z - oz);
    }
    this.y = this.g.heightAt(this.x, this.z);
  }
}
