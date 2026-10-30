import { test, expect, sleep } from './lib.js';

test.describe('QA-04..05 joystick & camera', () => {
  test('QA-04 joystick moves the player; release stops it', async ({ game: g }) => {
    await g.start();
    const hasPos = await g.hook('getState') && !!(await g.pos());
    const noise = await g.idleNoise();
    const dirs = [['forward', 0, 1], ['back', 0, -1], ['left', -1, 0], ['right', 1, 0]];
    const moved = {};
    for (const [name, sx, sy] of dirs) {
      const before = await g.frame(); const p0 = hasPos ? await g.pos() : null;
      await g.stickDown(sx, sy); await sleep(800);
      const mid = await g.frame();
      await g.stickUp(); await sleep(500);
      const p1 = hasPos ? await g.pos() : null;
      const d = await g.diff(before, mid);
      moved[name] = { px: d.changed, noise, dist: p0 && p1 ? Math.hypot(p1.x - p0.x, p1.z - p0.z) : null };
      if (hasPos) expect(moved[name].dist, `stick ${name}: player displacement (m) in 0.8 s (may be 0 only if blocked by terrain)`).toBeGreaterThan(0.4);
      // after release it must stop: two reads 400ms apart equal
      if (hasPos) { const a = await g.pos(); await sleep(400); const b = await g.pos(); expect(Math.hypot(a.x - b.x, a.z - b.z), `stick ${name}: player keeps drifting after release`).toBeLessThan(0.05); }
      // walk back toward open space between directions so we don't just sit on a wall
      if (hasPos) await g.stickHold(-sx, -sy, 700);
    }
    await g.testInfo.attach('joystick-result.json', { body: JSON.stringify(moved, null, 1), contentType: 'application/json' });
    if (!hasPos) {
      g.weak('no position hook: movement judged by canvas pixel diff only (> idle noise); cannot verify direction, speed or stopping');
      for (const k of Object.keys(moved)) expect(moved[k].px, `canvas should change when stick ${k} (idle noise ${noise.toFixed(3)})`).toBeGreaterThan(Math.max(0.02, noise * 2));
    }
    // diagonal + variable deflection: half deflection must be slower than full
    if (hasPos) {
      const a0 = await g.pos(); await g.stickHold(0, 0.4, 800); const a1 = await g.pos();
      await g.stickHold(0, -0.4, 800);
      const b0 = await g.pos(); await g.stickHold(0, 1.0, 800); const b1 = await g.pos();
      const half = Math.hypot(a1.x - a0.x, a1.z - a0.z), full = Math.hypot(b1.x - b0.x, b1.z - b0.z);
      g.note('speed 0.4 vs 1.0 deflection (m in 0.8 s)', `${half.toFixed(2)} vs ${full.toFixed(2)}`);
      if (full > 0.8) expect(half, 'analog stick: partial deflection should not be faster than full').toBeLessThanOrEqual(full + 0.05);
    }
    expect(g.errors).toEqual([]);
  });

  test('QA-05 swipe rotates the camera (yaw+pitch, clamped), without moving the player', async ({ game: g }) => {
    await g.start();
    const hasCam = (await g.hook('getState')) && (await g.state())?.camera;
    const noise = await g.idleNoise();
    const p0 = await g.pos();
    const before = await g.frame(); const s0 = hasCam ? await g.state() : null;
    await g.swipe(-140, 0); await sleep(350);
    const afterH = await g.frame(); const s1 = hasCam ? await g.state() : null;
    const dH = await g.diff(before, afterH);
    g.note('swipe-h pixel change', `${dH.changed.toFixed(3)} (idle noise ${noise.toFixed(3)})`);
    expect(dH.changed, 'horizontal swipe should visibly change the 3D view').toBeGreaterThan(Math.max(0.03, noise * 2));
    if (hasCam) {
      expect(Math.abs(angDiff(s1.camera.yaw, s0.camera.yaw)), 'camera yaw must change on horizontal swipe').toBeGreaterThan(0.05);
      // reverse swipe goes the other way
      await g.swipe(140, 0); await sleep(300); const s2 = await g.state();
      expect(Math.sign(angDiff(s1.camera.yaw, s0.camera.yaw)) * Math.sign(angDiff(s2.camera.yaw, s1.camera.yaw)), 'reverse swipe should reverse yaw direction').toBeLessThan(0);
      // vertical: pitch changes and is clamped (no flip over the pole)
      for (let i = 0; i < 4; i++) await g.swipe(0, 160);
      await sleep(300); const up = await g.state();
      for (let i = 0; i < 8; i++) await g.swipe(0, -160);
      await sleep(300); const dn = await g.state();
      g.note('pitch after big swipes (rad)', `${up.camera.pitch?.toFixed?.(2)} / ${dn.camera.pitch?.toFixed?.(2)}`);
      expect(Math.abs(up.camera.pitch), 'pitch clamped (< ~90deg)').toBeLessThanOrEqual(Math.PI / 2 + 0.02);
      expect(Math.abs(dn.camera.pitch), 'pitch clamped (< ~90deg)').toBeLessThanOrEqual(Math.PI / 2 + 0.02);
      expect(up.camera.pitch === dn.camera.pitch, 'vertical swipes had no effect on pitch').toBe(false);
    } else g.weak('no camera hook: swipe judged by pixel diff only');
    if (p0) { const p1 = await g.pos(); expect(Math.hypot(p1.x - p0.x, p1.z - p0.z), 'swiping must not walk the player').toBeLessThan(0.05); }
    // simultaneous: stick held + swipe on right side (two fingers). Both must work.
    if (p0) {
      await g.stickDown(0, 1); await sleep(200);
      const y0 = (await g.state())?.camera?.yaw; const q0 = await g.pos();
      await g.swipe(-120, 0); await sleep(300);
      const y1 = (await g.state())?.camera?.yaw; const q1 = await g.pos();
      await g.stickUp();
      if (y0 != null) expect(Math.abs(angDiff(y1, y0)), 'swipe while stick is held (multi-touch) should still rotate').toBeGreaterThan(0.05);
      g.note('multi-touch', `moved ${Math.hypot(q1.x - q0.x, q1.z - q0.z).toFixed(2)} m while swiping`);
    }
    expect(g.errors).toEqual([]);
  });
});
const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
