import * as THREE from 'three';
import { Grid, G, CELL, N, ORG, WATER_Y, wx, wz, hash2, vnoise } from './grid';
import { GB, rgb, shade, RGB } from './geom';
import * as T from './textures';
import { SeabedZone } from '../data/seabed';

const tex = (t: THREE.Texture, rep = 0) => { if (rep) t.repeat.set(rep, rep); return t; };

/** 同種セルを横→縦に貪欲結合して上面クアッドにする */
function greedyTops(g: Grid, type: number, y: number): GB | null {
  const used = new Uint8Array(N * N);
  const b = new GB();
  let any = false;
  for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) {
    const i = iz * N + ix;
    if (used[i] || g.ground[i] !== type) continue;
    let w = 1; while (ix + w < N && !used[i + w] && g.ground[i + w] === type) w++;
    let h = 1;
    outer: while (iz + h < N) {
      for (let k = 0; k < w; k++) { const j = (iz + h) * N + ix + k; if (used[j] || g.ground[j] !== type) break outer; }
      h++;
    }
    for (let dz = 0; dz < h; dz++) for (let dx = 0; dx < w; dx++) used[(iz + dz) * N + ix + dx] = 1;
    const x0 = ORG + ix * CELL, x1 = x0 + w * CELL, z0 = ORG + iz * CELL, z1 = z0 + h * CELL;
    b.quad([x0, y, z1], [x1, y, z1], [x1, y, z0], [x0, y, z0], [1, 1, 1], [0, -1, 0]);
    any = true;
  }
  return any ? b : null;
}

export function buildTerrain(g: Grid, quality: { seabedSeg: number }) {
  const group = new THREE.Group();
  group.name = 'terrain';
  const mats: Record<number, THREE.Material> = {
    [G.CONCRETE]: new THREE.MeshLambertMaterial({ map: tex(T.concreteTex()) }),
    [G.ASPHALT]: new THREE.MeshLambertMaterial({ map: tex(T.asphaltTex(), 0.25) }),
    [G.ROCK]: new THREE.MeshLambertMaterial({ map: tex(T.rockTex()) }),
    [G.GRASS]: new THREE.MeshLambertMaterial({ map: tex(T.grassTex(), 0.25) }),
  };
  for (const t of [G.CONCRETE, G.ASPHALT, G.ROCK, G.GRASS]) {
    const b = greedyTops(g, t, 0);
    if (b) { const m = new THREE.Mesh(b.build(), mats[t]); m.name = 'top' + t; group.add(m); }
  }

  // ---- 砂浜（高さ付き） ----
  {
    const W = N + 1;
    const pos: number[] = [], nor: number[] = [], uv: number[] = [], col: number[] = [], idx: number[] = [];
    const remap = new Map<number, number>();
    const vert = (ix: number, iz: number) => {
      const k = iz * W + ix;
      let v = remap.get(k);
      if (v === undefined) {
        v = pos.length / 3; remap.set(k, v);
        const x = ORG + ix * CELL, z = ORG + iz * CELL, y = g.cornerH[k];
        pos.push(x, y, z); uv.push(x, z);
        const n = 0.88 + vnoise(x * 0.4, z * 0.4, 12) * 0.12 + (y < -1.2 ? -0.1 : 0);
        col.push(n, n, n);
      }
      return v;
    };
    for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) {
      if (g.ground[iz * N + ix] !== G.SAND) continue;
      const a = vert(ix, iz), b = vert(ix + 1, iz), c = vert(ix + 1, iz + 1), d = vert(ix, iz + 1);
      idx.push(a, d, c, a, c, b);
    }
    if (idx.length) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      geo.setIndex(idx);
      geo.computeVertexNormals();
      const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: tex(T.sandTex()), vertexColors: true }));
      m.name = 'sand'; group.add(m);
    }
  }

  // ---- 壁（岸壁・防波堤・岩・土手）と安全ライン ----
  {
    const b = new GB();
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const line = rgb(0xe8c428);
    for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) {
      const gr = g.ground[iz * N + ix];
      if (gr !== G.CONCRETE && gr !== G.ASPHALT && gr !== G.ROCK && gr !== G.GRASS) continue;
      const x0 = ORG + ix * CELL, x1 = x0 + CELL, z0 = ORG + iz * CELL, z1 = z0 + CELL;
      for (const [dx, dz] of dirs) {
        const nx = ix + dx, nz = iz + dz;
        if (nx < 0 || nz < 0 || nx >= N || nz >= N) continue;
        const ng = g.ground[nz * N + nx];
        const isWater = ng === G.WATER, isSand = ng === G.SAND;
        if (!isWater && !isSand) continue;
        // 辺の端点
        let p0: number[], p1: number[]; // [x,z]
        if (dx === 1) { p0 = [x1, z0]; p1 = [x1, z1]; }
        else if (dx === -1) { p0 = [x0, z0]; p1 = [x0, z1]; }
        else if (dz === 1) { p0 = [x0, z1]; p1 = [x1, z1]; }
        else { p0 = [x0, z0]; p1 = [x1, z0]; }
        const out = [dx, 0, dz];
        const h = hash2(ix, iz, 41);
        const isRock = gr === G.ROCK, isGrass = gr === G.GRASS;
        const top: RGB = isRock ? shade(rgb(0x7a6f64), 0.85 + h * 0.3) : isGrass ? rgb(0x5a6a3a) : shade(rgb(0xa9a8a2), 0.9 + h * 0.15);
        const wet: RGB = isRock ? rgb(0x3b4636) : isGrass ? rgb(0x33402a) : rgb(0x3f5144);
        const deep: RGB = isRock ? rgb(0x26352f) : rgb(0x203a3c);
        if (isSand) {
          const k0 = (Math.round((p0[1] - ORG) / CELL)) * (N + 1) + Math.round((p0[0] - ORG) / CELL);
          const k1 = (Math.round((p1[1] - ORG) / CELL)) * (N + 1) + Math.round((p1[0] - ORG) / CELL);
          const y0 = g.cornerH[k0], y1 = g.cornerH[k1];
          b.quadGrad([p0[0], 0, p0[1]], [p1[0], 0, p1[1]], [p1[0], y1, p1[1]], [p0[0], y0, p0[1]], top, top, shade(top, 0.8), shade(top, 0.8), out);
          continue;
        }
        const ys = [0, -1.2, -1.85, -10];
        const cs = [top, shade(top, 0.82), wet, deep];
        for (let k = 0; k < 3; k++) {
          b.quadGrad([p0[0], ys[k], p0[1]], [p1[0], ys[k], p1[1]], [p1[0], ys[k + 1], p1[1]], [p0[0], ys[k + 1], p0[1]], cs[k], cs[k], cs[k + 1], cs[k + 1], out);
        }
        if (gr === G.CONCRETE) {
          // 安全ライン（縁の黄色い線）
          const w = 0.18;
          const q0 = [p0[0] - dx * w, p0[1] - dz * w], q1 = [p1[0] - dx * w, p1[1] - dz * w];
          b.quad([p0[0], 0.02, p0[1]], [p1[0], 0.02, p1[1]], [q1[0], 0.02, q1[1]], [q0[0], 0.02, q0[1]], line, [p0[0], -5, p0[1]]);
        }
      }
    }
    const m = new THREE.Mesh(b.build(), new THREE.MeshLambertMaterial({ vertexColors: true }));
    m.name = 'walls'; group.add(m);
  }

  // ---- 海底 ----
  {
    const seg = quality.seabedSeg;
    const geo = new THREE.PlaneGeometry(N * CELL, N * CELL, seg, seg);
    geo.rotateX(-Math.PI / 2);
    const p = geo.getAttribute('position');
    const col = new Float32Array(p.count * 3);
    const zc: Record<number, RGB> = {
      [SeabedZone.Sand]: rgb(0xb9a984), [SeabedZone.Reef]: rgb(0x5d564c), [SeabedZone.Weed]: rgb(0x4d6b3c),
      [SeabedZone.Wall]: rgb(0x6c6f6b), [SeabedZone.Deep]: rgb(0x2c3b45), [SeabedZone.Shallow]: rgb(0xd3c294),
    };
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      const ix = Math.min(N - 1, Math.max(0, Math.floor((x - ORG) / CELL))), iz = Math.min(N - 1, Math.max(0, Math.floor((z - ORG) / CELL)));
      const k = iz * N + ix;
      const n = (vnoise(x * 0.3, z * 0.3, 13) - 0.5) * 0.4;
      p.setY(i, WATER_Y - g.depth[k] + n * 0.5);
      const c = shade(zc[g.zone[k]], 0.85 + n * 0.5);
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }));
    m.name = 'seabed'; group.add(m);
    const deep = new THREE.Mesh(new THREE.PlaneGeometry(2400, 2400).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x143040 }));
    deep.position.y = -11.5; deep.name = 'deepfloor'; group.add(deep);
  }
  return group;
}
