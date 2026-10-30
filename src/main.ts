import * as THREE from 'three';
import { buildMap, SPAWN, PLACES } from './world/layout';
import { buildTerrain } from './world/terrain';
import { Water } from './world/water';
import { Sky } from './world/sky';
import { buildProps } from './world/props';
import { WATER_Y, N, cx, cz } from './world/grid';
import { Player } from './player/player';
import { Input } from './player/input';
import { CameraRig } from './camera/rig';
import { detectSite, FishingSite } from './fishing/spots';
import { loadSave, writeSave, clearSave, Settings, QualityId, SaveData } from './systems/save';
import { TIERS, isIOSLike, isTouchDevice, effectiveDpr, FpsMeter } from './systems/quality';
import { computeSky, localHours, makeSkyState } from './systems/envtime';
import { Hud } from './ui/hud';
import { Minimap } from './ui/minimap';
import { installQaHooks } from './qa/hooks';
import { FishingController } from './fishing/controller';
import { defaultSave } from './systems/save';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
const setMsg = (m: string, p?: number) => { $('loadMsg').textContent = m; if (p != null) ($('bar').firstElementChild as HTMLElement).style.width = `${Math.round(p * 100)}%`; };

async function boot() {
  const qs = new URLSearchParams(location.search);
  const QA = qs.has('qa');
  const tOverride = qs.get('t') != null ? parseFloat(qs.get('t')!) : null;
  const ios = isIOSLike();
  const touch = isTouchDevice();
  const saved = loadSave(ios);
  let settings: Settings = { ...saved.data.settings };
  if (qs.get('q') === 'low' || qs.get('q') === 'mid' || qs.get('q') === 'high') settings.quality = qs.get('q') as QualityId;
  if (QA && !qs.has('assist')) settings = { ...settings, assist: false }; // QA既定は手動ファイト（従来の試験と互換）
  // 初回の「自分で/おまかせ」選択とチュートリアルの扱い（既存プレイヤー・QA には出さない）
  const forceTut = qs.get('tut') === '1';
  if (!settings.modeChosen && !forceTut && (QA || saved.data.stats.casts > 0)) settings = { ...settings, modeChosen: true, tutStep: 4 };
  if (!settings.modeChosen) settings = { ...settings, tutStep: 4 };
  let saveStatus = saved.status === 'unavailable' ? '保存不可の環境' : saved.status === 'reset' ? '壊れたデータを初期化' : saved.status === 'loaded' ? '前回のデータを読込済' : '新規';
  setMsg('描画エンジンを準備中…', 0.05);
  await nextFrame();

  // ---- renderer ----
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', alpha: false, stencil: false });
  } catch (e) {
    throw new Error('WebGL を初期化できませんでした。ブラウザまたは端末が WebGL に対応していない可能性があります。\n' + (e as Error).message);
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setClearColor(0x0b1424);
  $('stage').appendChild(renderer.domElement);
  const gl = renderer.getContext();
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const rendererName = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : 'WebGL';

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xcfe3ee, 60, 460);
  const hemi = new THREE.HemisphereLight(0xbfd9f0, 0x8a7e6a, 1);
  const sun = new THREE.DirectionalLight(0xfff3dc, 2);
  scene.add(hemi, sun, sun.target);

  // ---- world ----
  setMsg('港の地形を生成中…', 0.15); await nextFrame();
  const map = buildMap();
  const g = map.grid;
  let tier = TIERS[settings.quality];
  const terrain = buildTerrain(g, { seabedSeg: 1 });
  scene.add(terrain);
  setMsg('海と空を準備中…', 0.4); await nextFrame();
  const water = new Water(g, tier.waterSeg);
  scene.add(water.group);
  const sky = new Sky();
  scene.add(sky.mesh);
  setMsg('建物・防波堤・テトラ・海藻を配置中…', 0.6); await nextFrame();
  const props = buildProps(map, { seaweed: 600, tetraMax: 700 });
  scene.add(props.group);
  setMsg('操作系を準備中…', 0.8); await nextFrame();

  // ---- player / camera / input ----
  const player = new Player(g);
  const rig = new CameraRig(g, innerWidth / innerHeight);
  scene.add(rig.camera, rig.avatar);
  rig.setMode(settings.camera);
  let startPos: { x: number; z: number; yaw: number } = { x: SPAWN.x, z: SPAWN.z, yaw: SPAWN.yaw };
  const sp = saved.data.position;
  if (sp && player.isSafe(sp.x, sp.z) && g.reach[cz(sp.z) * N + cx(sp.x)]) startPos = sp;
  player.place(startPos.x, startPos.z, startPos.yaw);
  const input = new Input($('touch'), $('joyRing'), $('joyKnob'));

  let playing = false, mode: 'move' | 'fish' = 'move';
  let site: FishingSite = detectSite(g, player.x, player.z, props.markers);
  let siteFrozen: FishingSite | null = null;
  let lastRenderT = 0, lastSiteT = 0, lastSaveT = 0, savedMoved = 0, lastQualityChange = 0, lowFpsSince = 0;
  let curPlace = '';
  const fps = new FpsMeter();
  const skyState = makeSkyState();
  let skyTimer = -1;

  const minimap = new Minimap(g, props.markers);
  const data: SaveData = saved.data; // 図鑑・釣果・統計・最後の仕掛けはこのオブジェクトを直接更新する
  const snapshot = (): SaveData => { data.settings = settings; data.position = { x: player.x, z: player.z, yaw: player.yaw }; return data; };
  const saveNow = () => { const ok = writeSave(snapshot()); saveStatus = ok ? '保存OK' : '保存失敗'; return ok; };

  function applyQuality(q: QualityId) {
    tier = TIERS[q];
    renderer.setPixelRatio(effectiveDpr(tier));
    renderer.setSize(innerWidth, innerHeight, false);
    water.setSegments(tier.waterSeg);
    for (const name of ['seaweed', 'tetrapods']) {
      const m = props.group.getObjectByName(name) as THREE.InstancedMesh;
      m.count = Math.max(1, Math.floor((name === 'seaweed' ? props.stats.weeds : props.stats.tetras) * tier.detail));
    }
    settings = { ...settings, quality: q };
  }
  function applyTime(force = false) {
    const h = localHours(tOverride);
    if (!force && tOverride == null && Math.abs(h - skyState.hours) < 0.004) return;
    computeSky(h, skyState);
    sky.apply(skyState);
    const day = skyState.dayLight, night = 1 - day;
    const key = skyState.elevDeg > -1 ? skyState.sunDir : new THREE.Vector3(0.4, 0.6, 0.5).normalize();
    sun.position.copy(key).multiplyScalar(100);
    sun.color.copy(skyState.sunColor).lerp(new THREE.Color(0x8fa8e0), night);
    sun.intensity = Math.max(0.0, skyState.sunIntensity * 1.55) * (1 - night * 0.0) * (skyState.elevDeg > -1 ? 1 : 0) + 0.55 * night;
    hemi.color.copy(skyState.zenith).lerp(new THREE.Color(0xffffff), 0.45);
    hemi.groundColor.set(0x8a7e6a).multiplyScalar(0.35 + 0.65 * day);
    hemi.intensity = skyState.hemiIntensity * 2.0 + night * 0.35;
    const fog = scene.fog as THREE.Fog;
    fog.color.copy(skyState.fog);
    fog.near = 25 + 35 * day; fog.far = 200 + 260 * day;
    renderer.setClearColor(skyState.horizon);
    props.lampMat.color.set(0xffc87a).lerp(new THREE.Color(0xb9b8a8), day);
  }
  applyQuality(settings.quality);
  applyTime(true);
  water.update(0, skyState, 1, scene.fog as THREE.Fog);

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setPixelRatio(effectiveDpr(tier));
    renderer.setSize(w, h, false);
    rig.resize(w, h);
  }
  resize();
  addEventListener('resize', resize);
  addEventListener('orientationchange', () => setTimeout(resize, 150));

  // ---- HUD ----
  let prevAlways = settings.alwaysRun;
  const hud = new Hud({
    onFish: () => startFishing(),
    onExit: () => exitFishing(),
    onCam: () => { const m = rig.mode === 'first' ? 'third' : 'first'; rig.setMode(m); settings = { ...settings, camera: m }; hud.toast(m === 'first' ? '一人称視点' : '三人称視点'); saveNow(); },
    onSettings: (s) => {
      const qChanged = s.quality !== settings.quality;
      void prevAlways;
      settings = s; fishing.applySettings(s);
      if (qChanged) { lastQualityChange = performance.now(); applyQuality(s.quality); }
      rig.setMode(s.camera);
      props.hints.visible = s.hints;
      if (s.alwaysRun !== prevAlways) { prevAlways = s.alwaysRun; input.setRunLock(s.alwaysRun); hud.setRun(s.alwaysRun); hud.toast(s.alwaysRun ? '常に走る: ON' : '常に走る: OFF'); }
      saveNow();
    },
    onTutorial: () => { patchSettings({ auto: false }); fishing.tut.restart(); hud.toast('遊び方を開始（約30秒・スキップ可）', 2400); },
    onSaveNow: () => saveNow(),
    onClearSave: () => { const ok = clearSave(); const d0 = defaultSave(ios); data.zukan = d0.zukan; data.catchLog = d0.catchLog; data.stats = d0.stats; data.lastRig = null; return ok; },
    onResetPos: () => { player.place(SPAWN.x, SPAWN.z, SPAWN.yaw); hud.toast('スポーン地点に戻りました'); saveNow(); },
    onRun: (v) => { input.setRunLock(v); hud.setRun(v); hud.toast(v ? '走る ON' : '走る OFF（歩き）', 1200); },
    info: () => ({ fps: fps.fps, quality: settings.quality, timeLabel: clockLabel(), timeDemo: tOverride != null, saveStatus, renderer: rendererName, calls: renderer.info.render.calls, tris: renderer.info.render.triangles, dpr: renderer.getPixelRatio() }),
    playerPos: () => ({ x: player.x, z: player.z, yaw: player.yaw }),
  }, () => settings, minimap);
  const patchSettings = (p: Partial<Settings>) => { settings = { ...settings, ...p }; fishing.applySettings(settings); };
  const seedQ = qs.get('seed');
  const fishing = new FishingController({
    scene, rig, input, player, hud, g, data, saveNow: () => saveNow(), hours: () => (tOverride != null ? tOverride : skyState.hours || localHours(null)),
    seed: seedQ != null ? parseInt(seedQ, 10) >>> 0 : undefined, qa: QA, settings: () => settings, patch: patchSettings,
  });
  fishing.applySettings(settings);
  hud.onPanel = (open) => { input.enabled = playing && !open; if (open) input.reset(); else saveNow(); };
  props.hints.visible = settings.hints;
  input.setRunLock(settings.alwaysRun); hud.setRun(settings.alwaysRun);
  if (saved.note) setTimeout(() => hud.toast(saved.note, 4000), 1500);
  if (saved.status === 'unavailable') setTimeout(() => hud.toast('この環境では保存できません', 4000), 1500);

  function clockLabel() {
    const h = localHours(tOverride); const hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  }
  function startFishing() {
    if (mode === 'fish' || !playing) return;
    site = detectSite(g, player.x, player.z, props.markers);
    if (!site.can) { hud.toast('水辺に近づこう（岸壁・防波堤・砂浜・岩場の水際で釣れます）'); return; }
    siteFrozen = site; mode = 'fish';
    input.reset(); input.lockMove = true;
    player.yaw = site.yaw; player.pitch = -0.38;
    rig.enterFishing(site.yaw);
    hud.setMode('fish'); hud.showFishing(site);
    fishing.enter(site);
    saveNow();
  }
  function exitFishing() {
    if (mode !== 'fish') return;
    if (!fishing.requestExit()) return;
    fishing.leave();
    mode = 'move'; siteFrozen = null; input.lockMove = false; input.reset();
    rig.exitFishing(); player.pitch = 0;
    hud.setMode('move');
  }
  input.onKey = (k) => {
    if (k === 'KeyF') { mode === 'move' ? startFishing() : exitFishing(); }
    else if (k === 'Escape') { hud.panelOpen ? hud.close() : exitFishing(); }
    else if (k === 'KeyM') { hud.panelOpen ? hud.close() : hud.open('map'); }
    else if (k === 'KeyV') $('btnCam').click();
  };

  // ---- WebGL context loss ----
  let ctxLost = false;
  renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); ctxLost = true; hud.toast('描画が一時停止しました。復帰を待っています…', 8000); });
  renderer.domElement.addEventListener('webglcontextrestored', () => { ctxLost = false; hud.toast('描画が復帰しました'); resize(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { saveNow(); input.reset(); } });
  addEventListener('pagehide', () => { saveNow(); });

  // ---- shader precompile ----
  setMsg('シェーダーを準備中…', 0.9); await nextFrame();
  try { renderer.compile(scene, rig.camera); } catch (e) { console.warn('compile', e); }
  // ---- loop ----
  function frame(now: number) {
    requestAnimationFrame(frame);
    if (ctxLost) return;
    const cap = tier.fpsCap;
    if (cap < 60 && now - lastRenderT < 1000 / cap - 3) return;
    const dt = Math.min(0.1, lastRenderT ? (now - lastRenderT) / 1000 : 0.016);
    lastRenderT = now;
    fps.tick(now);
    const t = now / 1000;
    // 入力 → プレイヤー
    if (playing && !hud.panelOpen) {
      const s = input.s;
      if (s.lookDX || s.lookDY) { rig.look(player, s.lookDX, s.lookDY, settings.lookSens); s.lookDX = 0; s.lookDY = 0; }
      if (mode === 'move') player.update(dt, s.mx, s.mz, s.run, settings.moveSpeed);
    } else { input.s.lookDX = 0; input.s.lookDY = 0; }
    if (!playing) { // タイトル画面：港をゆっくり見回す
      player.yaw = startPos.yaw + Math.sin(t * 0.12) * 0.6;
    }
    // 釣り場判定（5Hz）
    if (now - lastSiteT > 200) {
      lastSiteT = now;
      if (mode === 'move') {
        site = detectSite(g, player.x, player.z, props.markers);
        let place = '';
        for (const p of PLACES) if (Math.hypot(p.x - player.x, p.z - player.z) < p.r) place = p.name;
        if (place && place !== curPlace && playing) hud.toast(PLACES.find((p) => p.name === place)!.note);
        curPlace = place;
        hud.updateChip(clockLabel(), tOverride != null, site, place ? `「${place}」付近（中身は準備中）` : '');
      }
      if (playing && now - lastSaveT > 10000) { lastSaveT = now; if (player.moved !== savedMoved) { savedMoved = player.moved; saveNow(); } }
      // 重い端末では画質を自動で下げる（QA時は無効）
      if (playing && !QA && document.visibilityState === 'visible' && settings.quality !== 'low' && now - lastQualityChange > 6000) {
        if (fps.fps > 0 && fps.fps < 21) { if (!lowFpsSince) lowFpsSince = now; else if (now - lowFpsSince > 3000) { const nq: QualityId = settings.quality === 'high' ? 'mid' : 'low'; lastQualityChange = now; lowFpsSince = 0; applyQuality(nq); hud.toast(`動作が重いので画質を「${TIERS[nq].label}」に下げました`, 4000); saveNow(); } } else lowFpsSince = 0;
      }
    }
    if (tOverride == null && now - skyTimer > 1000) { skyTimer = now; applyTime(); }
    rig.update(player, dt);
    fishing.update(dt, t, skyState.dayLight);
    sky.mesh.position.copy(rig.camera.position);
    sky.u.uTime.value = t;
    water.update(t, skyState, mode === 'fish' ? 1.0 : 1.0, scene.fog as THREE.Fog);
    props.update(t, rig.camera.position);
    renderer.render(scene, rig.camera);
  }
  requestAnimationFrame(frame);

  installQaHooks({
    qa: QA, player, g, rig, input, props, get mode() { return mode; }, get playing() { return playing; }, get site() { return site; },
    fps, renderer, get settings() { return settings; }, saveNow, applyQuality, applyTime, setTime: (h: number | null) => { (window as any).__rfwT = h; }, get saveStatus() { return saveStatus; }, hud, startFishing, exitFishing, fishing,
    get frozen() { return siteFrozen; }, skyState, scene, WATER_Y,
  } as any);

  // ---- Play ----
  const play = $<HTMLButtonElement>('play');
  setMsg('準備完了！', 1);
  play.disabled = false; play.textContent = '▶ はじめる';
  (window as any).__rfwBooted = true;
  const start = () => {
    if (playing) return;
    playing = true; input.enabled = true; fishing.sfx.unlock();
    $('loading').style.display = 'none';
    document.body.classList.add('playing');
    player.yaw = startPos.yaw; player.pitch = 0;
    saveNow();
    hud.toast(touch ? '左をドラッグで移動／右をスワイプで視点' : 'WASDで移動・ドラッグで視点・Fで釣り開始', 4200);
    if (!settings.modeChosen) {
      input.enabled = false; input.reset();
      const sc = $('startChoice'); sc.classList.add('open');
      const pick = (auto: boolean) => {
        sc.classList.remove('open'); input.enabled = playing && !hud.panelOpen;
        patchSettings({ modeChosen: true, auto });
        if (auto) { patchSettings({ tutStep: 4 }); hud.toast('🤖 おまかせで釣ります（水辺で「釣り開始」）', 3200); }
        else { patchSettings({ tutStep: 0 }); fishing.tut.restart(); }
        saveNow();
      };
      $('chManual').addEventListener('click', () => pick(false), { once: true });
      $('chAuto').addEventListener('click', () => pick(true), { once: true });
    }
  };
  play.addEventListener('click', start);
}

boot().catch((e) => {
  console.error(e);
  (window as any).__rfwShowError?.(String(e?.message ?? e), e?.stack ?? '');
});
