// Usage: node tests/report.mjs [out/results.json] > RESULTS.md
// Maps Playwright JSON results -> pass / fail / untested per QA item per project.
// skipped ("UNTESTED: ...") => untested. Annotations "weak-evidence" are surfaced.
import fs from 'node:fs';
const file = process.argv[2] || new URL('./out/results.json', import.meta.url).pathname;
const j = JSON.parse(fs.readFileSync(file, 'utf8'));
const rows = new Map(); const projects = new Set(); const notes = [];
const walk = (s) => {
  for (const sp of s.specs || []) for (const t of sp.tests || []) {
    const id = (sp.title.match(/QA-\w+/) || [sp.title])[0];
    const p = t.projectName; projects.add(p);
    const r = t.results[t.results.length - 1] || {};
    let st = t.status === 'skipped' || r.status === 'skipped' ? 'untested'
      : (t.status === 'expected' ? 'pass' : t.status === 'flaky' ? 'pass(flaky)' : 'fail');
    const ann = (t.annotations || []).map(a => `${a.type}: ${a.description || ''}`);
    if (st === 'untested') { const m = (t.annotations||[]).find(a=>a.type==='skip'); ann.push('skip: ' + (m?.description || '')); }
    if (st === 'fail') ann.push('error: ' + String((r.error && r.error.message) || '').replace(/\u001b\[[0-9;]*m/g,'').split('\n').slice(0,6).join(' | ').slice(0,600));
    if (!rows.has(id)) rows.set(id, { title: sp.title, by: {} });
    rows.get(id).by[p] = st;
    for (const a of ann) if (/weak|UNTESTED|skip|error/i.test(a)) notes.push(`- **${id} / ${p}** — ${a}`);
  }
  (s.suites || []).forEach(walk);
};
(j.suites || []).forEach(walk);
const P = [...projects];
const icon = { pass: 'PASS', fail: 'FAIL', untested: 'untested', 'pass(flaky)': 'PASS(flaky)', '': '-' };
let out = `# QA Phase 1 results\n\nSource: ${file}\nGenerated: ${new Date().toString()}\n\n`;
out += `| QA item | ${P.join(' | ')} |\n|---|${P.map(() => '---').join('|')}|\n`;
for (const id of [...rows.keys()].sort()) out += `| ${id} ${rows.get(id).title.replace(/^QA-\w+\s*/, '').slice(0, 60)} | ${P.map(p => icon[rows.get(id).by[p] || ''] ).join(' | ')} |\n`;
const tot = { pass: 0, fail: 0, untested: 0 };
for (const r of rows.values()) for (const v of Object.values(r.by)) tot[v.startsWith('pass') ? 'pass' : v]++;
out += `\n**Totals:** pass ${tot.pass}, fail ${tot.fail}, untested ${tot.untested}\n\n## Notes / weak evidence / failures\n${[...new Set(notes)].join('\n') || '- none'}\n`;
out += `\n> Perf (QA-16) is desktop-emulation frame timing only. It says NOTHING about real iPhone fps (30 fps target UNVERIFIED).\n> WebKit cannot emulate env(safe-area-inset-*): safe-area containment is Chromium-only; real-iPhone check still required.\n`;
process.stdout.write(out);
