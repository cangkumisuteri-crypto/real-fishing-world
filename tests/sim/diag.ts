import { buildMap } from '../../src/world/layout';
import { gridWorld } from '../../src/fishing/world';
import { FishingSession } from '../../src/fishing/session';
import { RIG_PRESETS } from '../../src/fishing/rigdata';
const map = buildMap(); const world = gridWorld(map.grid);
const site = { x: -8, z: 8.6, yaw: 0 };
const hour = Number(process.argv[2] ?? 18);
const s = new FishingSession(world, { seed: 5, hour, month: 10 });
s.setRig(RIG_PRESETS[0].rig); s.begin(site.x, site.z, site.yaw);
s.cast(0.55, 0);
const trans: Record<string, number> = {}; const orig=(s.sim as any).setState.bind(s.sim); (s.sim as any).setState=(a:any,to:string,why:string)=>{const k=a.sp.id+':'+a.state+'>'+to+(why?'('+why+')':''); trans[k]=(trans[k]??0)+1; orig(a,to,why)}; const sp: Record<string, number> = {};
for (let t = 0; t < 600; t += 0.05) {
  s.update(0.05);
  for (const e of s.popEvents()) void e;
  for (const e of (s.sim as any).__log ?? []) void e;
  if (s.phase === 'wait') {} 
}
console.log('phase', s.phase, 'seabed', s.seabed.toFixed(1), 'zone', s.zone, 'bait depth', s.baitDepthNow.toFixed(1), 'dist', s.castDist);
for (const a of s.sim.agents) sp[a.sp.id] = (sp[a.sp.id] ?? 0) + 1;
console.log(JSON.stringify(sp), JSON.stringify(s.sim.stats));
console.log('A', JSON.stringify(Object.fromEntries(s.sim.agents.map(a => [a.sp.id, +a.A.toFixed(2)]))));
const b = s.bait!;
const near = s.sim.agents.map(a => ({ id: a.sp.id, d: Math.hypot(a.x-b.x,a.z-b.z), dy: +(a.y-b.depth).toFixed(1), st: a.state, stim: +s.sim.stimulus(a,b,s.env).toFixed(3), A: +a.A.toFixed(2) })).sort((a,b)=>a.d-b.d).slice(0,12);
console.log(near.map(n=>JSON.stringify(n)).join('\n'));
console.log('tod', s.env.hour, 'daylight', s.env.daylight.toFixed(2));
console.log(Object.entries(trans).sort().map(([k,v])=>k+'='+v).join('\n'));
