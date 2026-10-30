import { test, expect, sleep } from './lib.js';

/**
 * QA-12H / QA-13H  HUD rects: no overlap, inside viewport + safe area, tap targets >= 44, button gaps >= 12.
 * Rules and device matrix come from design/ART_DIRECTION.md §4.1, §4.2, §4.5. See tests/QA_PHASE1.md "HUD rules assumed".
 * Safe-area insets per ART_DIRECTION §4.2 table (portrait top/bottom; landscape left/right/bottom):
 */
const DEVICES = [
  { id: '375x667', w: 375, h: 667, portrait: { top: 20, bottom: 0, left: 0, right: 0 }, landscape: { top: 0, bottom: 0, left: 0, right: 0 } },
  { id: '390x844', w: 390, h: 844, portrait: { top: 47, bottom: 34, left: 0, right: 0 }, landscape: { top: 0, bottom: 21, left: 47, right: 47 } },
  { id: '430x932', w: 430, h: 932, portrait: { top: 59, bottom: 34, left: 0, right: 0 }, landscape: { top: 0, bottom: 21, left: 59, right: 59 } },
];

async function emulateInsets(g, insets) {
  if (g.browserName !== 'chromium') return { ok: false, why: 'WebKit (Playwright) cannot emulate env(safe-area-inset-*)' };
  try {
    const c = await g.context.newCDPSession(g.page);
    await c.send('Emulation.setSafeAreaInsetsOverride', { insets });
    return { ok: true, c };
  } catch (e) { return { ok: false, why: 'CDP Emulation.setSafeAreaInsetsOverride unsupported: ' + e.message }; }
}
const probe = (page) => page.evaluate(() => { const d = document.createElement('div'); d.style.cssText = 'position:fixed;visibility:hidden;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'; document.body.appendChild(d); const cs = getComputedStyle(d); const r = { top: parseFloat(cs.paddingTop), right: parseFloat(cs.paddingRight), bottom: parseFloat(cs.paddingBottom), left: parseFloat(cs.paddingLeft) }; d.remove(); return r; });

for (const orient of ['portrait', 'landscape']) {
  const id = orient === 'portrait' ? 'QA-12H' : 'QA-13H';
  test(`${id} HUD ${orient}: no overlap, inside safe area (375x667, 390x844, 430x932)`, async ({ game: g, page }, testInfo) => {
    const failures = []; const checked = [];
    for (const d of DEVICES) {
      const size = orient === 'portrait' ? { width: d.w, height: d.h } : { width: d.h, height: d.w };
      const insets = d[orient];
      await page.setViewportSize(size);
      const em = await emulateInsets(g, insets);
      await g.start();
      // is the emulation really visible to CSS env()? if not we must not enforce containment
      const seen = await probe(page);
      const active = em.ok && Math.abs(seen.top - insets.top) < 1 && Math.abs(seen.bottom - insets.bottom) < 1 && Math.abs(seen.left - insets.left) < 1 && Math.abs(seen.right - insets.right) < 1;
      if (!active) g.weak(`${d.id} ${orient}: safe-area containment NOT enforced – ${em.ok ? 'env() probe returned ' + JSON.stringify(seen) : em.why}. Overlap/size/gap/viewport rules still enforced.`);
      // source-level rule (ART_DIRECTION 4.1): viewport-fit=cover and env(safe-area-inset-*) used by the HUD CSS
      const src = await page.evaluate(async () => {
        let css = ''; for (const s of document.styleSheets) { try { css += [...s.cssRules].map((r) => r.cssText).join('\n'); } catch (e) { try { css += await (await fetch(s.href)).text(); } catch (e2) {} } }
        css += [...document.querySelectorAll('style,[style]')].map((e) => e.textContent + (e.getAttribute('style') || '')).join('\n');
        return { cover: /viewport-fit\s*=\s*cover/.test(document.querySelector('meta[name=viewport]')?.content || ''), env: /env\(\s*safe-area-inset/.test(css) };
      });
      if (!src.cover) failures.push(`[${d.id} ${orient}] viewport meta lacks viewport-fit=cover (ART_DIRECTION 4.1)`);
      if (!src.env) failures.push(`[${d.id} ${orient}] no env(safe-area-inset-*) found in stylesheets (ART_DIRECTION 4.1)`);
      if (process.env.QA_HUD_SABOTAGE) await page.addStyleTag({ content: '#btnRun{bottom:calc(var(--sa-b) + 40px)!important} #btnMenu{left:2px!important} #btnCam{width:30px!important}' }); // negative control: harness must FAIL
      await g.eachScenario(`${d.id}-${orient}`, async (name) => {
        const rep = await g.hudReport(`${d.id}-${orient}-${name}`, active ? insets : null);
        checked.push(`${d.id} ${orient} ${name}: ${rep.boxes.length} units`);
        for (const p of rep.problems) failures.push(`[${d.id} ${orient} ${name}] ${p}`);
        const f = testInfo.outputPath(`hud-${d.id}-${orient}-${name}.png`); await page.screenshot({ path: f });
        await testInfo.attach(`hud-${d.id}-${orient}-${name}.png`, { path: f, contentType: 'image/png' });
      });
      if (g.browserName === 'chromium' && em.c) await em.c.send('Emulation.setSafeAreaInsetsOverride', { insets: { top: 0, bottom: 0, left: 0, right: 0 } }).catch(() => {});
    }
    g.note('hud-coverage', checked.join(' | '));
    await testInfo.attach('hud-failures.txt', { body: failures.join('\n') || '(none)', contentType: 'text/plain' });
    expect(failures, 'HUD rule violations').toEqual([]);
    expect(g.errors).toEqual([]);
  });
}
