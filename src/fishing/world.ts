/** Grid → 魚シム用の WorldQuery（three 非依存） */
import { Grid, N, cx, cz } from '../world/grid';
import type { WorldQuery } from './fishsim';

export function gridWorld(g: Grid): WorldQuery {
  const idx = (x: number, z: number) => { const ix = cx(x), iz = cz(z); return g.inB(ix, iz) ? iz * N + ix : -1; };
  return {
    isWater: (x, z) => { const i = idx(x, z); return i >= 0 && g.ground[i] === 0; },
    depthAt: (x, z) => { const i = idx(x, z); return i >= 0 ? g.depth[i] : 0; },
    zoneAt: (x, z) => { const i = idx(x, z); return i >= 0 ? g.zone[i] : 0; },
    tetraAt: (x, z) => { const i = idx(x, z); return i >= 0 && !!g.tetra[i]; },
    holeAt: (x, z) => { const i = idx(x, z); return i >= 0 && !!g.hole[i]; },
  };
}
