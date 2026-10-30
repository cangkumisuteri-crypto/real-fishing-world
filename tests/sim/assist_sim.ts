/* ファイトアシスト/おまかせの取り込み率を、手動ボット(従来のbot)と比べる。 node tests/sim/build.mjs tests/sim/assist_sim.ts /tmp/assist_sim.mjs && node /tmp/assist_sim.mjs */
import { Fight, hookSizeFactor } from '../../src/fishing/fight';
import { SPECIES_BY_ID, lengthToWeightKg } from '../../src/data/species';
import { Rng } from '../../src/fishing/rng';
import { T0, IDEAL_HOOK } from '../../src/fishing/rigdata';
import { assistInputs } from '../../src/fishing/assist';

type Pol = 'bot' | 'assist';
function run(spId: string, cm: number, seed: number, pol: Pol, struct: boolean, dragFixed?: number) {
  const sp = SPECIES_BY_ID[spId];
  const f = new Fight({ sp, sizeCm: cm, W: lengthToWeightKg(sp, cm), hookSet: 0.85, hookSizeF: hookSizeFactor(7, IDEAL_HOOK[spId]), barbless: false, tackle: T0, startDist: 12, startBearing: 0 }, new Rng(seed));
  let t = 0, drag = 0.75; const dt = 0.1; let n = 0;
  while (!f.result && t < 240) {
    const m = f.mode; let reel = 1, theta = 55, steer = m === 'side_run' ? (f.bearing > 0 ? -1 : 1) : 0;
    if (pol === 'bot') { reel = !(m === 'run' || m === 'dive' || m === 'wedged' || m === 'headshake') && f.tension < 0.7 ? 1 : 0; }
    else { const o = assistInputs(f, true, drag, 1 / 30); reel = o.reel; theta = o.theta; steer = o.steer; drag = dragFixed ?? o.drag; }
    // 実ゲームは 1/30s 刻み、advance は 0.1 を内部分割する想定。ここでは 1/30 で回す
    for (let k = 0; k < 3 && !f.result; k++) { if (pol === 'assist') { const o = assistInputs(f, true, drag, 1 / 30); reel = o.reel; steer = o.steer; drag = dragFixed ?? o.drag; } f.step({ reel, theta, drag, steer }, { nearStruct: struct, rough: 1 }); }
    t += dt; n++;
  }
  return { res: f.result ?? 'TIMEOUT', t };
}
const cases: [string, number, boolean][] = [['aji', 20, false], ['saba', 30, false], ['kasago', 22, true], ['mebaru', 20, true], ['chinu', 40, false], ['chinu', 40, true], ['seabass', 60, false], ['tachiuo', 80, false], ['madai', 40, false], ['buri', 60, false]];
const out: any[] = [];
for (const [sp, cm, st] of cases) for (const pol of ['bot', 'assist'] as const) {
  const N = 150; const c: Record<string, number> = {}; let ts = 0, nl = 0;
  for (let i = 0; i < N; i++) { const r = run(sp, cm, 500 + i, pol, st); c[r.res] = (c[r.res] ?? 0) + 1; if (r.res === 'LANDED') { ts += r.t; nl++; } }
  out.push(`${sp}${cm}${st ? '(根)' : ''} ${pol}: ` + Object.entries(c).map(([k, v]) => `${k}=${(v / N * 100).toFixed(0)}%`).join(' ') + (nl ? ` avg=${(ts / nl).toFixed(0)}s` : ''));
}
console.log(out.join('\n'));
import { dragRecommended } from '../../src/fishing/rigdata';
console.log('rec', dragRecommended(T0));
for (const dg of [0.5, 0.75, 1.0, 1.3, 1.7]) {
  const o2: string[] = [];
  for (const [sp, cm, st] of cases.filter((c) => ['chinu', 'seabass', 'madai', 'buri'].includes(c[0]) && !c[2])) {
    const N = 80; const c: Record<string, number> = {}; for (let i = 0; i < N; i++) { const r = run(sp, cm, 900 + i, 'assist', st, dg); c[r.res] = (c[r.res] ?? 0) + 1; }
    o2.push(`${sp}${cm}: ` + Object.entries(c).map(([k, v]) => `${k}=${(v / N * 100).toFixed(0)}%`).join(' '));
  }
  console.log('drag', dg, o2.join(' | '));
}
