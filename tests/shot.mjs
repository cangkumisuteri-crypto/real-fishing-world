import { chromium, serve, collect, sleep, CHROMIUM_ARGS } from './lib.mjs';
const { s, port } = await serve(new URL('../dist', import.meta.url).pathname);
const b = await chromium.launch({ args: CHROMIUM_ARGS });
const shots = JSON.parse(process.argv[2] || '[]');
const page = await b.newPage({ viewport: { width: 844, height: 390 } });
const log = collect(page);
for (const sh of shots) {
  await page.setViewportSize(sh.vp || { width: 844, height: 390 });
  await page.goto(`http://127.0.0.1:${port}/?qa=1&t=${sh.t ?? 14}&q=${sh.q ?? 'mid'}`);
  await page.waitForFunction(() => window.__rfwBooted || document.getElementById('err')?.classList.contains('show'), null, { timeout: 120000 });
  await page.click('#play').catch(() => {});
  await sleep(300);
  await page.evaluate((o) => window.__rfw.teleport(o.x, o.z, o.yaw), sh);
  if (sh.fish) await page.evaluate(() => window.__rfw.startFishing());
  if (sh.click) await page.click(sh.click);
  await sleep(sh.wait ?? 1500);
  await page.screenshot({ path: `tests/out/${sh.name}.png` });
  console.log(sh.name, JSON.stringify(await page.evaluate(() => window.__rfw.state())));
}
console.log(JSON.stringify(log));
await b.close(); s.close();
