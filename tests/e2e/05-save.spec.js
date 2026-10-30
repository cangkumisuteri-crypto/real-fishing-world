import { test, expect, T, sleep } from './lib.js';

async function saveKeys(page) {
  return page.evaluate((re) => Object.keys(localStorage).filter((k) => new RegExp(re, 'i').test(k)), T.saveKeyRe.source);
}

test.describe('QA-11 save / reload', () => {
  test('QA-11 save persists across reload (position, camera, versioned data)', async ({ game: g, page }) => {
    await g.needHooks('getState');
    await g.start();
    if (!(await g.pos())) g.untested('getState().player missing');
    // move somewhere clearly different from spawn, and turn the camera
    await g.stickHold(1, 0.6, 1800); await g.swipe(-150, 0); await sleep(300);
    const s0 = await g.state(); const spawnD = g.gt ? Math.hypot(s0.player.x - g.gt.spawn.x, s0.player.z - g.gt.spawn.z) : 99;
    expect(spawnD, 'player did not leave spawn – test would be vacuous').toBeGreaterThan(1);
    if (await g.hook('saveNow')) await g.call('saveNow'); else { g.weak('no saveNow hook: relying on autosave wait of ' + T.autosaveWaitMs + ' ms'); await sleep(T.autosaveWaitMs); }
    const keys = await saveKeys(page);
    expect(keys.length, `no localStorage save key matching /${T.saveKeyRe.source}/ (set QA_SAVE_KEY_RE if the key is named differently). keys: ${await page.evaluate(() => Object.keys(localStorage).join(','))}`).toBeGreaterThan(0);
    const raw = await page.evaluate((k) => localStorage.getItem(k), keys[0]);
    let parsed = null; try { parsed = JSON.parse(raw); } catch (e) {}
    expect(parsed, 'save must be JSON').not.toBeNull();
    expect(JSON.stringify(parsed), 'save must carry a version number (spec ch.14)').toMatch(/"(version|ver|v|saveVersion)"\s*:\s*\d+/i);
    g.note('save-key', `${keys[0]} (${raw.length} bytes)`);
    // also exercise the "app is being backgrounded" path Safari uses
    await page.evaluate(() => { window.dispatchEvent(new Event('pagehide')); document.dispatchEvent(new Event('visibilitychange')); });
    await sleep(200);
    await page.reload();
    await g.waitPlayVisible();
    await g.tap(g.loc.play).catch(async () => { const cont = page.getByRole('button', { name: /続き|つづき|continue/i }).first(); await g.tap(cont); });
    await g.waitPlaying();
    await sleep(400);
    const s1 = await g.state();
    const dist = Math.hypot(s1.player.x - s0.player.x, s1.player.z - s0.player.z);
    g.note('position drift after reload (m)', dist.toFixed(2));
    expect(dist, 'player position not restored after reload').toBeLessThan(1.5);
    if (s0.camera && s1.camera) {
      let dy = Math.abs(s1.camera.yaw - s0.camera.yaw); dy = Math.min(dy, 2 * Math.PI - dy);
      expect(dy, 'camera yaw not restored').toBeLessThan(0.3);
    }
    // saved state survives a second reload and can still be played
    await page.reload(); await g.waitPlayVisible(); await g.tap(g.loc.play); await g.waitPlaying();
    const s2 = await g.state(); expect(Math.hypot(s2.player.x - s0.player.x, s2.player.z - s0.player.z)).toBeLessThan(1.5);
    expect(g.errors).toEqual([]);
  });

  test('QA-11b robust to corrupt / newer-version / blocked save data (no white screen)', async ({ game: g, page }) => {
    // corrupt JSON
    await page.addInitScript(() => { try { localStorage.setItem('rfw.save', '{not json'); localStorage.setItem('rfw_save', '\u0000\u0001'); localStorage.setItem('fishing-save', '{"version":9999,"player":{"x":1e99,"z":"NaN"}}'); } catch (e) {} });
    await g.open(); await g.waitPlayVisible(); await g.tap(g.loc.play); await g.waitPlaying();
    if (await g.hook('getState')) {
      const s = await g.state();
      expect(Number.isFinite(s.player.x) && Number.isFinite(s.player.z), 'player position must be a finite number after bad save').toBe(true);
      if (g.gt) { expect(g.gt.isWater(s.player.x, s.player.z), 'bad save must not drop the player in the sea / outside map').toBe(false); }
    } else g.weak('no getState hook: only checked that the game still starts');
    expect(g.errors.filter((e) => /pageerror/.test(e)), 'uncaught exceptions with corrupt save').toEqual([]);
  });

  test('QA-11c storage write failure (Safari private mode / quota) does not break the game', async ({ game: g, page }) => {
    await page.addInitScript(() => { Storage.prototype.setItem = function () { throw new DOMException('quota', 'QuotaExceededError'); }; });
    await g.open(); await g.waitPlayVisible(); await g.tap(g.loc.play); await g.waitPlaying();
    await g.stickHold(0, 1, 1200); await sleep(T.autosaveWaitMs);
    await expect(g.loc.canvas).toBeVisible();
    expect(g.errors.filter((e) => /pageerror/.test(e)), 'uncaught exception when setItem throws (spec ch.14: failure handling)').toEqual([]);
  });
});
