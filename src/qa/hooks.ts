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
        fps: c.fps.fps, quality: c.settings.quality, alwaysRun: c.settings.alwaysRun, run: c.input.s.run, runLock: c.input.runLock, edgeRun: c.input.edgeRun, camera: c.rig.mode, dpr: c.renderer.getPixelRatio(),
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
    fishing: {
      state() {
        const f = c.fishing, s = f.session, v = f.view, cam = c.rig.camera;
        const fp = v.floatPos.clone().project(cam);
        const ui = f.ui.e; const vis = (el: HTMLElement) => el.classList.contains('show') || (getComputedStyle(el).display !== 'none');
        return {
          active: f.active, phase: s.phase, snap: s.snapshot(), rig: { ...s.rig }, aimPower: s.aimPower, drag: s.inp.drag, theta: s.inp.theta, reel: s.inp.reel, steer: s.inp.steer,
          floatShown: v.floatShown, floatNdc: { x: fp.x, y: fp.y, z: fp.z }, shadows: v.shadowCount, rodBend: v.rodBend, catchShown: v.catchShown, fightFish: v.fightFishShown,
          fx: s.fx, fz: s.fz, seabed: s.seabed, baitLife: s.baitLife, snag: s.snag, stats: { ...s.stats }, fight: s.fight ? { sp: s.fight.sp.id, nameJa: s.fight.sp.nameJa, dist: s.fight.dist, tension: s.fight.tension, mode: s.fight.mode, S: s.fight.S, result: s.fight.result, sizeCm: s.fight.sizeCm } : null,
          sfx: { ...f.sfx.counts, state: f.sfx.state, enabled: f.sfx.enabled }, hap: { ...f.hap.counts, shake: f.hap.shake, canVibrate: f.hap.canVibrate, enabled: f.hap.enabled },
          biteEvents: f.biteEvents, inp: { flickOn: c.input.flickOn, lookId: c.input.lookId, fightMode: c.input.fightMode, enabled: c.input.enabled }, resultShown: f.resultShown, resultText: f.ui.e.result.textContent, log: f.log.slice(-30),
          ui: { action: ui.action.textContent, actionClass: ui.action.className, reel: vis(ui.reel), ten: vis(ui.ten), power: vis(ui.power), rod: vis(ui.rod), bait: vis(ui.bait), info: ui.info.textContent, card: ui.card.textContent },
          save: { zukan: f.d.data.zukan, catchLog: f.d.data.catchLog.length, stats: { ...f.d.data.stats }, lastRig: f.d.data.lastRig },
        };
      },
      cast(power = 0.6) { const f = c.fishing; if (f.session.phase === 'ready') f.session.startAim(); return f.session.cast(power, c.player.yaw); },
      act() { c.fishing.act(); },
      hookset() { c.fishing.session.hookset(); },
      setRig(p: any) { c.fishing.session.setRig(p); c.fishing.d.data.lastRig = { ...c.fishing.session.rig }; },
      freeze(on: boolean) { guard(); c.fishing.qaFreeze = on; },
      /** 試験用ボット：完全な腕前でファイトを進める。結果を返す */
      bot(maxSec = 150, opts: any = {}) {
        guard(); const f = c.fishing, s = f.session; const T = opts.tens ?? 0.7;
        let n = 0;
        while (s.phase === 'fight' && n < maxSec * 10) {
          const fi = s.fight!; const m = fi.mode;
          f.setReel(opts.reelAlways ? true : !(m === 'run' || m === 'dive' || m === 'wedged' || m === 'headshake') && fi.tension < T);
          f.qaPose = { theta: opts.theta ?? 55, steer: m === 'side_run' ? (fi.bearing > 0 ? -1 : 1) : 0 };
          if (opts.drag) s.inp.drag = opts.drag;
          f.advance(0.1); n++;
        }
        f.setReel(false); f.qaPose = { theta: null, steer: null };
        return { phase: s.phase, result: s.lastResult ? s.lastResult.result : null, reason: s.lastResult ? s.lastResult.reason : null, sec: n / 10 };
      },
      advance(sec: number) { guard(); c.fishing.advance(sec); },
      forceBite(id: string, cm?: number) { guard(); return c.fishing.session.forceBite(id, cm); },
      pose(theta: number | null, steer: number | null) { guard(); c.fishing.qaPose = { theta, steer }; },
      drag(v: number) { c.fishing.session.inp.drag = v; },
      reel(on: boolean) { c.fishing.setReel(on); },
      raise(on: boolean) { c.fishing.setRaise(on); },
      dismiss(release = false) { c.fishing.closeResult(release); },
      boost(v: number) { guard(); c.fishing.session.boost = v; },
      setEnv(h: number) { guard(); c.fishing.session.setEnv(h); },
      rodTip() { const t = c.fishing.view.tip.clone().project(c.rig.camera); return { x: t.x, y: t.y }; },
      stored() { try { return JSON.parse(localStorage.getItem('realFishingWorld.save') || 'null'); } catch { return null; } },
    },
  };
}
