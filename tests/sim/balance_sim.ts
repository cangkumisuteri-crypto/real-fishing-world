import { buildMap, SPOTS } from '../../src/world/layout';
import { gridWorld } from '../../src/fishing/world';
import { FishingSession } from '../../src/fishing/session';
import { RIG_PRESETS } from '../../src/fishing/rigdata';
import { SPECIES_BY_ID } from '../../src/data/species';

const map = buildMap(); const world = gridWorld(map.grid);
const sites: Record<string, { x: number; z: number; yaw: number }> = {
  quay: { x: -8, z: 8.6, yaw: 0 },
  bw: { x: 20.4, z: -25, yaw: Math.PI / 2 },
  tip: { x: 20.5, z: -49.2, yaw: 0 },
};
void SPOTS;
function trial(site: { x: number; z: number; yaw: number }, hour: number, seed: number, presetId: string, maxS = 900, reelSkill = 'ok') {
  const s = new FishingSession(world, { seed, hour, month: 10 });
  s.setRig(RIG_PRESETS.find((p) => p.id === presetId)!.rig); if (process.env.RIG) s.setRig(JSON.parse(process.env.RIG));
  s.begin(site.x, site.z, site.yaw);
  const catches: { id: string; t: number }[] = []; const miss: string[] = [];
  let t = 0, biteSeen = 0, pendingHook = -1, firstBite = -1, nCast = 0;
  const dt = 0.05; let castWait = 0, lastCastT = -99;
  while (t < maxS) {
    t += dt; s.update(dt);
    for (const e of s.popEvents()) {
      if (e.kind === 'bite') { biteSeen++; if (firstBite < 0) firstBite = t; pendingHook = t + 0.5 + Math.random() * 0.0 + (s.rng.next() * 0.5); }
      if (e.kind === 'end') { if (e.result === 'LANDED') catches.push({ id: e.species, t }); else miss.push(e.species + ':' + e.result); }
    }
    if (s.phase === 'ready') { s.cast(0.55, site.yaw); lastCastT = t; nCast++; }
    else if (s.phase === 'result') s.dismissResult();
    else if (s.phase === 'bite' && pendingHook > 0 && t >= pendingHook) { s.hookset(); pendingHook = -1; }
    else if (s.phase === 'wait') {
      if (s.baitLife < 0.1 || t - lastCastT > 75) { s.setRetrieve(true); } else s.setRetrieve(false);
    } else if (s.phase === 'fight') {
      const f = s.fight!;
      let reel = 1; if (f.mode === 'run' || f.mode === 'side_run') reel = f.slipping ? 0.2 : 0.6;
      s.inp.reel = reel; s.inp.drag = 0.75; s.inp.theta = 50;
      if (f.mode === 'wedged') { s.inp.drag = Math.min(2.3, Math.max(0.75, f.Flock * 1.15)); s.inp.theta = 60; }
    }
  }
  return { catches, miss, biteSeen, firstBite, nCast, snap: s.snapshot() };
}
const hours = (process.env.HOURS ?? '6,12,17.5,21').split(',').map(Number);
const out: string[] = [];
for (const [name, site] of Object.entries(sites)) for (const preset of (process.env.PRESETS ?? 'easy,bottom').split(',')) for (const h of hours) {
  const N = 12; const firsts: number[] = [], firstFish: number[] = []; const per: Record<string, number> = {}; let bites = 0, lost = 0, landed = 0;
  const target: number[] = [];
  for (let i = 0; i < N; i++) {
    const r = trial(site, h, 100 + i, preset, 600);
    if (r.firstBite >= 0) firsts.push(r.firstBite);
    if (r.catches[0]) firstFish.push(r.catches[0].t);
    const tg = r.catches.find((c) => ['aji', 'mebaru', 'kasago'].includes(c.id)); if (tg) target.push(tg.t);
    for (const c of r.catches) per[c.id] = (per[c.id] ?? 0) + 1;
    bites += r.biteSeen; lost += r.miss.length; landed += r.catches.length;
  }
  const med = (a: number[]) => a.length ? a.sort((x, y) => x - y)[a.length >> 1].toFixed(0) : '-';
  out.push(`${name.padEnd(5)} ${preset.padEnd(6)} h=${String(h).padEnd(4)} firstBite med=${med(firsts)}s (${firsts.length}/${N}) firstCatch med=${med(firstFish)}s (${firstFish.length}/${N}) target(aji/meb/kas) med=${med(target)}s (${target.length}/${N}) bites/10min=${(bites / N).toFixed(1)} landed=${(landed / N).toFixed(1)} lost=${(lost / N).toFixed(1)} ${JSON.stringify(per)}`);
}
console.log(out.join('\n'));
void SPECIES_BY_ID;
