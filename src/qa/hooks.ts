/** QA 用フック。読み取りは常に可。位置・時刻・画質の書き換えは ?qa=1 のときだけ。 */
export function installQaHooks(c: any) {
  const w = window as any;
  const guard = () => { if (!c.qa) throw new Error('QA mode only (?qa=1)'); };
  w.__rfw = {
    qa: c.qa,
    state() {
      const p = c.player;
      return {
        playing: c.playing, mode: c.mode, x: p.x, z: p.z, y: p.y, yaw: p.yaw, pitch: p.pitch, moved: p.moved,
        canFish: c.site.can, siteInfo: c.site.can ? { depth: c.site.depth, zone: c.site.zoneJa, hole: c.site.hole, nearTetra: c.site.nearTetra, spot: c.site.spot?.def?.id ?? null, yaw: c.site.yaw } : null,
        fps: c.fps.fps, quality: c.settings.quality, camera: c.rig.mode, dpr: c.renderer.getPixelRatio(),
        calls: c.renderer.info.render.calls, tris: c.renderer.info.render.triangles, geometries: c.renderer.info.memory.geometries, textures: c.renderer.info.memory.textures,
        saveStatus: c.saveStatus, sunElev: c.skyState.elevDeg, hours: c.skyState.hours, errors: w.__rfwErrors ?? [],
      };
    },
    blocked(x: number, z: number) { return c.g.blockedCircle(x, z, 0.35); },
    reachableMarkers() { return c.props.markers.map((m: any) => ({ id: m.def.id, x: m.x, z: m.z, reach: !!c.g.reach[Math.floor((m.z + 80) / 0.5) * 320 + Math.floor((m.x + 80) / 0.5)], site: (() => { return null; })() })); },
    cell(x: number, z: number) { const i = Math.floor((z + 80) / 0.5) * 320 + Math.floor((x + 80) / 0.5); return { ground: c.g.ground[i], blockedFlag: c.g.blocked[i], tetra: c.g.tetra[i], hole: c.g.hole[i], depth: c.g.depth[i], reach: c.g.reach[i] }; },
    teleport(x: number, z: number, yaw = 0) { guard(); c.player.place(x, z, yaw); },
    setYaw(y: number) { guard(); c.player.yaw = y; },
    setQuality(q: string) { guard(); c.applyQuality(q); },
    startFishing() { c.startFishing(); },
    exitFishing() { c.exitFishing(); },
    saveNow() { return c.saveNow(); },
  };
}
