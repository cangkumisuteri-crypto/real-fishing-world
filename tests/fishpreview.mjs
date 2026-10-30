// 魚モデル確認：9種を1枚ずつ撮る（Chromium, ?qa=1）。使い方: node tests/fishpreview.mjs [--url=http://127.0.0.1:4173/] [--out=tests/out]
import { chromium, sleep, CHROMIUM_ARGS } from './lib.mjs';
const arg = (k, d) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').split('=').slice(1).join('=') || d;
const url = arg('url', 'http://127.0.0.1:4173/'), out = arg('out', 'tests/out');
const SP = [['aji', 22], ['saba', 36], ['kasago', 24], ['mebaru', 22], ['chinu', 40], ['seabass', 62], ['tachiuo', 90], ['madai', 45], ['buri', 70]];
const b = await chromium.launch({ args: CHROMIUM_ARGS });
const page = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
const errs = []; page.on('pageerror', (e) => errs.push(String(e))); page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto(`${url}?qa=1&t=14&q=mid`);
await page.waitForFunction(() => window.__rfwBooted, null, { timeout: 120000 });
await page.click('#play').catch(() => {}); await sleep(300);
await page.evaluate(() => window.__rfw.teleport(-8, 8.6, 0)); await sleep(500);
await page.evaluate(() => window.__rfw.startFishing()); await sleep(600);
for (const [id, cm] of SP) {
  await page.evaluate(([i, c]) => window.__rfw.fishing.preview(i, c), [id, cm]); await sleep(900);
  await page.screenshot({ path: `${out}/fish_${id}.png`, clip: { x: 95, y: 410, width: 200, height: 130 } });
}
await page.evaluate(() => window.__rfw.fishing.preview(null));
console.log('errors', JSON.stringify(errs));
await b.close();
