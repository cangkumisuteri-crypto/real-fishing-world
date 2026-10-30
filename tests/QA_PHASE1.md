# REAL FISHING WORLD — Phase 1 independent QA plan (AI-5)

Scope: iPhone Safari first. Everything here is **emulation** (Playwright WebKit iPhone SE / iPhone 13, Chromium desktop-with-touch). It is NOT a real-iPhone test.
`src/` is never edited. The builder's own suite (`tests/qa.mjs` etc.) is not relied on or touched. Results are written to `tests/RESULTS.md` (see "Results").

## Run

```
cd /workspace/realfishing && npm run build            # dist/ must exist (or point QA_BASE_URL elsewhere)
# local build (the config starts `vite preview` itself if QA_BASE_URL is unset), all 3 projects:
npx playwright test -c tests/playwright.config.mjs
# one project / one item:
npx playwright test -c tests/playwright.config.mjs --project=webkit-iphone-13 -g "QA-07"
# against an already-running server or the live site (Chromium):
QA_BASE_URL=https://cangkumisuteri-crypto.github.io/real-fishing-world/ QA_TAG=live-cr npx playwright test -c tests/playwright.config.mjs --project=chromium-desktop
# the three-target audit, then the merged table:
QA_TAG=local-wk QA_BASE_URL=http://127.0.0.1:4173 npx playwright test -c tests/playwright.config.mjs --project=webkit-iphone-se --project=webkit-iphone-13
QA_TAG=local-cr QA_BASE_URL=http://127.0.0.1:4173 npx playwright test -c tests/playwright.config.mjs --project=chromium-desktop
QA_TAG=live-cr  QA_BASE_URL=https://…/real-fishing-world/ npx playwright test -c tests/playwright.config.mjs --project=chromium-desktop
node tests/report.mjs tests/out/results.local-wk.json tests/out/results.local-cr.json tests/out/results.live-cr.json > tests/RESULTS.md
```
`package.json` "test" belongs to the builder; use the commands above. Env knobs: `QA_BASE_URL, QA_TAG, QA_SE_GEN3=1` (SE project at 375×667 instead of 320×568), `QA_INPUT=mouse`, `QA_EDGE_MAX/QA_EDGE_NEAR`, `QA_LOAD_MAX_MS`, `QA_SAVE_KEY_RE`, `QA_HUD_SABOTAGE=1` (negative control: deliberately breaks the HUD; the HUD tests MUST then fail), `QA_MOCK=1` (harness self-test against fixtures/mock-game only — never a game result).
Artifacts: `tests/out/artifacts[.TAG]/` (failure screenshots, traces), `tests/out/shots[.TAG]/<project>-<name>.png` (break-it screenshots), `tests/out/perf-<project>.json`, `tests/out/results[.TAG].json`, `tests/out/html[.TAG]/`.

## Hook contract (what the tests use)
Real build: URL `?qa=1` enables `window.__rfw` = `state()` (flat: playing, mode `move|fish`, x, z, y, yaw, pitch, canFish, camera, fps, quality, saveStatus…), `blocked(x,z)`, `cell(x,z)`, `teleport(x,z,yaw)`, `setYaw`, `setQuality`, `startFishing`, `exitFishing`, `saveNow`, `reachableMarkers`.
DOM ids: `#loading`, `#bar > i` (progress), `#play` (disabled "読み込み中…" until ready; lives *inside* #loading), `#joyRing`, `#btnFish` (釣り開始, greyed out away from water, not hidden), `#btnExit`, `#infoCard`, `#btnMenu #btnCam #btnRun #btnBag`. Save key `realFishingWorld.save` (v1).
Ground truth (walls/sea/shoreline) is read **read-only** from `src/world/layout.ts` + `grid.ts` (`e2e/gt.js`, via `e2e/ts-hooks.mjs`), so the local run judges the game against its own map source; for the live site a deployed-vs-local-src mismatch would show as failures.
Recommended (not required) for stability: `data-hud="<name>"` + `data-hud-zone` on every HUD unit, `data-testid`s.
Input: Chromium gets **real touch** (CDP `Input.dispatchTouchEvent`). WebKit cannot construct `Touch`, so WebKit gets synthetic `PointerEvent`s (`pointerType:'touch'`, ids 1000+) dispatched on the real hit-test target — equal for pointer-based input code, but not identical to iOS touch/gesture handling.

## The 16 checklist items
| # | Item | Steps | Pass criteria | Automation (spec / id) | Hooks / selectors |
|---|------|-------|---------------|------------------------|-------------------|
| 1 | Boot | open URL | canvas present, WebGL context alive, not blank/uniform, no error overlay | `01 / QA-01` | `canvas`, `#err`, pixel sample |
| 2 | Loading completes | open URL, watch loading | progress monotonic, bar ends full, Play becomes **enabled**, within limit; also on throttled network (QA-02b, Chromium) | `01 / QA-02, QA-02b` | `#bar i`, `#play` enabled |
| 3 | Play works | tap Play | overlay hidden, `playing`, HUD shown, frames advance | `01 / QA-03` | `#play`, `__rfw.state()` |
| 4 | Joystick | press left half, drag, release | player moves in stick direction (relative to yaw), stops on release, ring shows/hides | `02 / QA-04` | `#joyRing`, state x/z |
| 5 | Swipe camera | swipe right half | yaw+pitch change, pitch clamped, player does not move | `02 / QA-05` | state yaw/pitch |
| 6 | No walking through terrain/buildings/props | drive the stick into each building / prop / boundary from several sides (ground-truth targets) | player never enters a solid cell; no jumps > 3 m; no NaN | `03 / QA-06` | `gt.buildings`, `gt.blockedCircle`, `__rfw.blocked` |
| 7 | No walking into the sea | drive into every shoreline segment incl. tetrapod zone & hole gaps | player never ends up on a water cell (except legit tetrapod cells) | `03 / QA-07, QA-07b` | `gt.isWater/isTetra`, `__rfw.blocked` cross-check |
| 8 | 釣り開始 at the water edge | route (A*) to a shoreline spot; compare button state inland vs at the edge | button is *active* within `QA_EDGE_NEAR` of water, *inactive* beyond `QA_EDGE_MAX` | `04 / QA-08` | `#btnFish` (greyed class/disabled), `gt.edgeSpots/route` |
| 9 | 釣り開始 works | tap it at the edge | mode → `fish`, move UI → fishing UI | `04 / QA-09` | `#btnFish`, `#btnExit`, state.mode |
| 10 | Fishing toggle on/off | enter/exit repeatedly | state and UI never desync; player can walk again | `04 / QA-10` | same |
| 11 | Save persists | move, saveNow, reload | position/camera/version restored; corrupt/newer/blocked/failing storage never white-screens | `05 / QA-11, 11b, 11c` | localStorage `realFishingWorld.save` |
| 12 | Portrait layout | 320×568 / 375×667 / 390×844 / 430×932, states: playing, near-water | no overlap, nothing off-screen / clipped / under notch | `06 / QA-12`, `08 / QA-12H` | `uiBoxes()` |
| 13 | Landscape layout | same sizes rotated | same | `06 / QA-13`, `08 / QA-13H` | same |
| 14 | Resize / rotate | rotate while playing | state preserved, canvas aspect right, controls still work | `06 / QA-14` | state, canvas rect |
| 15 | Zero console/page errors | whole session | no `console.error`, `pageerror`, failed requests | `07 / QA-15` + `expect(g.errors)` in every test | — |
| 16 | Basic perf sample | idle / moving+rotating rAF sampling | reported only; hard-fails only on freeze (>1 s frame) | `07 / QA-16` | `out/perf-<project>.json` |

**QA-16 is emulation on a shared Linux box with software GL (and other agents' load). It says nothing about iPhone fps. 30 fps on a real iPhone is UNVERIFIED.**

## HUD overlap + safe-area check (steering addition) — `08-hud-safearea.spec.js` (QA-12H portrait, QA-13H landscape)
Spec source: `design/ART_DIRECTION.md` §4. Sizes 375×667, 390×844, 430×932, portrait and landscape, in states *playing* and *edge/fishing-button-active*.
Rules per size/orientation/state: (1) no two HUD units overlap; (2) every unit inside the viewport and inside the safe area (viewport − insets); (3) buttons ≥ 44×44 CSS px (the info chip and the joystick/gauge are non-interactive and exempt); (4) button↔button gap ≥ 12 px (tolerance 11.5); (5) buttons not obscured (hit-test at centre returns the button); (6) no clipped label (scrollWidth ≤ clientWidth); (7) source check: `viewport-fit=cover` and `env(safe-area-inset-*)` used in index.html/CSS.
Inset table (iPhone-class, from the spec): 375×667 portrait top 20 / bottom 0, landscape 0; 390×844 portrait top 47 / bottom 34, landscape L/R 47 / bottom 21; 430×932 portrait top 59 / bottom 34, landscape L/R 59 / bottom 21.
Assumptions: insets are emulated **only in Chromium** (CDP `Emulation.setSafeAreaInsetsOverride`, verified with an `env()` probe). WebKit/Playwright cannot emulate `env(safe-area-inset-*)`, so there containment-in-safe-area is skipped and flagged *weak evidence*; only overlap, size, gap, obscured and clipping are enforced. The joystick ring is `pointer-events:none` and is not hit-tested. Spec coordinates are advisory; the rules above are the pass criteria. A negative control (`QA_HUD_SABOTAGE=1`) proves the test fails for an undersized target, an overlap and an out-of-safe-area element.
Not testable here: the real notch/Dynamic Island, home-indicator and Safari toolbar behaviour (needs a real iPhone).

## Break-it suite — `09-break-it.spec.js`
| id | Attack | Pass |
|----|--------|------|
| QA-X1 | touchcancel / pointercancel while the stick is held | stick released, player stops, a new press works (no leaked pointer id) |
| QA-X2 | finger released far outside the viewport / over a HUD button / window blur with finger down | player stops, ring idle |
| QA-X3 | stick + look at once, 3rd/4th finger, every release order | walking continues, camera turns, extra fingers ignored, nothing sticks |
| QA-X4 | `visibilitychange(hidden)` and `pagehide` while moving | save written, stick reset, resume works |
| QA-X5 | run at a wall / the sea with main-thread stalls (huge dt) | no tunnelling |
| QA-X6 | reload while moving / fishing / during loading | no white screen, valid restored position |
| QA-X7 | rotate mid-play with the stick held | no stuck input, HUD ok |
| QA-X8 | hammer 釣り開始 / menu / Play | no desync, no errors |
| QA-X9 | poisoned save: in the sea / in a building / extreme / NaN | player ends on a safe cell |
Walls/terrain/sea attempts also run as QA-06/07.

## Limitations (read before trusting a PASS)
- No real iPhone: no real Safari touch/gesture behaviour, no rubber-banding / address-bar resize, no real notch, no memory-pressure kills, no real GPU. **No real-device fps claim is made.**
- WebKit input is synthetic pointer events; Chromium input is real touch. WebKit has no freeze/resume lifecycle test (only `visibilitychange`/`pagehide` events are dispatched).
- WebKit safe-area insets cannot be emulated (see above).
- iPhone SE project defaults to 320×568 (SE 1st-gen class); 375×667 (SE 2/3) is run with `QA_SE_GEN3=1`.
- Tests run serially on a loaded shared box; timing-sensitive checks use generous limits.
- Ground truth is local `src/`; the live-site run assumes the deployed bundle matches it.
- The mock game in `fixtures/` is only a harness self-test.

## Results template
| # | Item | WebKit SE | WebKit 13 | Chromium (local) | Chromium (live) | Notes / bug id |
|---|------|-----------|-----------|------------------|-----------------|----------------|
| 1 | Boot | pass / fail / untested | | | | |
| … | (one row per item above, plus QA-12H/13H and QA-X1…X9) | | | | | |

`node tests/report.mjs <results json…>` fills this table into `tests/RESULTS.md` (skipped = untested; weak-evidence and error text are surfaced).
