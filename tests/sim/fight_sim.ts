import { Fight, hookSizeFactor } from '../../src/fishing/fight';
import { SPECIES_BY_ID, lengthToWeightKg } from '../../src/data/species';
import { Rng } from '../../src/fishing/rng';
import { T0, IDEAL_HOOK } from '../../src/fishing/rigdata';

type Policy = (f: Fight, t: number) => { reel: number; theta: number; drag: number; steer: number };
function run(spId: string, sizeCm: number, drag: number, seed: number, policy: 'hold' | 'smart' | 'idle', struct: boolean) {
  const sp = SPECIES_BY_ID[spId];
  const rng = new Rng(seed);
  const f = new Fight({ sp, sizeCm, W: lengthToWeightKg(sp, sizeCm), hookSet: 0.85, hookSizeF: hookSizeFactor(7, IDEAL_HOOK[spId]), barbless: false, tackle: T0, startDist: 12, startBearing: 0 }, rng);
  let t = 0, d = drag;
  while (!f.result && t < 240) {
    let reel = 1, theta = 50;
    if (policy === 'smart') {
      // 魚が走っている間は巻かない/竿を立てる、根に入ったらドラグを締めて巻き続ける
      if (f.mode === 'run' || f.mode === 'side_run') reel = f.slipping ? 0.2 : 0.6;
      if (f.mode === 'wedged') { d = Math.min(2.3, Math.max(d, f.Flock * 1.15)); theta = 60; }
      else d = drag;
      if (f.mode === 'dive') theta = 65;
    }
    if (policy === 'idle') reel = 0;
    f.step({ reel, theta, drag: d, steer: 0 }, { nearStruct: struct, rough: 1 });
    t += 1 / 30;
  }
  return { res: f.result ?? 'TIMEOUT', t, f };
}
const out: Record<string, unknown>[] = [];
const cases: [string, number, boolean][] = [['aji', 20, false], ['mebaru', 20, true], ['kasago', 22, true], ['saba', 30, false], ['chinu', 40, true], ['chinu', 40, false]];
for (const [sp, cm, st] of cases) {
  for (const pol of ['hold', 'smart'] as const) for (const drag of [0.4, 0.75, 1.2, 2.3]) {
    const cnt: Record<string, number> = {}; let tsum = 0, nland = 0; const N = 200;
    for (let i = 0; i < N; i++) { const r = run(sp, cm, drag, 1000 + i, pol, st); cnt[r.res] = (cnt[r.res] ?? 0) + 1; if (r.res === 'LANDED') { tsum += r.t; nland++; } }
    out.push({ sp, cm, pol, drag, ...Object.fromEntries(Object.entries(cnt).map(([k, v]) => [k, +(v / N * 100).toFixed(0)])), avgLandS: nland ? +(tsum / nland).toFixed(1) : null });
  }
}
console.log(JSON.stringify(out));
