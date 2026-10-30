# REAL FISHING WORLD — Phase 1 independent audit (AI-5) — results
Run 2026-10-30 19:49–~20:30 JST. All results are EMULATION (Playwright WebKit iPhone SE/13 + Chromium). **No real-iPhone fps or real-iPhone behaviour is claimed.** WebKit cannot emulate `env(safe-area-inset-*)`; safe-area containment is only enforced in Chromium (CDP inset override).
`src/` was not edited.

## What was run (build = what)
| Run | Target | Project | Log | Result |
|---|---|---|---|---|
| A (early snapshot, dist 19:34, no audio fix) | http://127.0.0.1:4180 / 4173 | WebKit SE + 13 | /tmp/runA.log, out/run.local-wk-se.log | SE 26 pass / 5 fail / 1 skip; 13 see below |
| B (same old dist) | local | Chromium | /tmp/runB.log | 31 pass |
| **b2 (CURRENT dist, built 20:05:56, includes audio.ts fix; snapshot /workspace/qa-dist2 @ :4181)** | local | WebKit iPhone SE (320x568) | out/run.b2-se.log | **27 pass / 4 fail / 1 skip (of 32)** |
| **b2** | local | WebKit iPhone 13 | out/run.b2-13.log | **30 pass / 1 fail / 1 skip** (the 1 fail passed on immediate re-run: flaky, see QA-05) |
| b2-cr | local | Chromium | out/run.b2-cr.log | see "Chromium local" section at bottom |
| C | LIVE https://cangkumisuteri-crypto.github.io/real-fishing-world/ | Chromium | /tmp/runC.log, out/results.live-cr.json | **32 / 32 pass** (live bundle now index-DD1IyPX_.js = same hash as my current dist; I cannot prove the live bundle was already DD1… when run C started 19:51) |

Caveats: other agents ran Playwright on the same box at the same time (load avg 10–25), and two of my own early runs shared output dirs → some ENOENT trace/artifact errors (e.g. QA-X7 in run A) and load-sensitive flakes. Those are listed as harness noise, not game bugs. Result JSON for the b2 runs was not written (reporter race); the per-test status is taken from the run logs above.

## 16-item checklist (current dist, b2)
Legend: PASS / FAIL / UNTESTED. "SE" = iPhone SE emulation at its native 320x568 (strictest), "13" = iPhone 13.

| # | Item | WebKit SE | WebKit 13 | Chromium local | Chromium LIVE |
|---|---|---|---|---|---|
| 1 | Boot (canvas/WebGL alive, not blank) | PASS | PASS | PASS (run B) | PASS |
| 2 | Loading completes | **FAIL (flaky?)** run b2 saw loading bar at 87% when sampled (need ≥95); re-run alone PASSED. Throttled-network variant (QA-02b): UNTESTED on WebKit (no CDP) | PASS (failed once in run A at 88%) | PASS, 02b PASS (B) | PASS, 02b PASS |
| 3 | Play button | PASS | PASS | PASS | PASS |
| 4 | Joystick | PASS | PASS | PASS | PASS |
| 5 | Swipe camera | PASS | FLAKY: failed once (visual-diff threshold under load), PASSED on immediate re-run; yaw/pitch/clamp asserts fine | PASS | PASS |
| 6 | No walking through terrain/buildings/props | PASS | PASS | PASS | PASS |
| 7 | No walking into the sea (incl. tetrapod & hole gaps) | PASS | PASS | PASS | PASS |
| 8 | 釣り開始 at the water edge only | **FAIL** (info chip text clipped at 320px, BUG-1) | PASS | PASS | PASS |
| 9 | 釣り開始 switches to fishing mode | PASS | PASS (failed once in run A under load) | PASS | PASS |
| 10 | Fishing toggle on/off repeatedly | PASS | PASS | PASS | PASS |
| 11 | Save persists after reload (+corrupt/newer/blocked/failing storage) | PASS (11, 11b, 11c) | PASS | PASS | PASS |
| 12 | Portrait layout | **FAIL @320x568 only** (BUG-1); 375/390/430 pass (QA-12H) | PASS | PASS | PASS |
| 13 | Landscape layout | PASS | PASS | PASS | PASS |
| 14 | Rotate/resize while playing | **FAIL @320x568 only** (BUG-1) | PASS | PASS | PASS |
| 15 | Zero console/page errors over a play session | PASS on current dist (FAILED on the 19:34 dist: BUG-2) | PASS (same) | PASS | PASS |
| 16 | Basic perf sample | UNTESTED as a perf claim. Emulation software-GL under heavy shared load gave roughly 9–17 fps; this says NOTHING about a real iPhone. 30 fps on real iPhone is UNVERIFIED. Test only hard-fails on a >1 s freeze: none in WebKit. | same | one 1.9 s frame in Chromium idle sample (software GL under load, not conclusive) | PASS (freeze check) |

## HUD overlap + safe area (QA-12H portrait, QA-13H landscape; 375x667, 390x844, 430x932)
Rules: no HUD overlap, inside viewport, buttons ≥44x44, gaps ≥12 px, not obscured by another element, no clipped labels, `viewport-fit=cover` + `env(safe-area-inset-*)` in source.
- WebKit SE: PASS (portrait + landscape, all 3 sizes) — safe-area containment NOT enforced in WebKit (weak evidence).
- WebKit 13: PASS (same caveat).
- Chromium local (run B) and LIVE: PASS **with** emulated safe-area insets (iPhone table from ART_DIRECTION: e.g. 390x844 portrait top 47/bottom 34; landscape L/R 47).
- The real notch / Dynamic Island / Safari toolbar: UNTESTED (needs real iPhone).
- Not covered by the HUD check: transient toasts/tutorial bubbles (see BUG-3).

## Break-it attempts (QA-X1..X10) — WebKit SE and 13 (current dist), Chromium (local old dist B and live C)
| Attempt | Result |
|---|---|
| X1 stuck joystick via touchcancel/pointercancel | PASS all |
| X2 finger released far outside viewport / over a button | PASS all |
| X3 multi-touch (stick + swipe, 4 fingers, any release order) | PASS all (WebKit uses synthetic PointerEvents, not real iOS touches) |
| X4 background / resume (visibilitychange + pagehide saves, stick stops) | PASS all; real freeze/resume (Page.setWebLifecycleState) only Chromium; WebKit got synthetic events (weak evidence) |
| X5 walls/sea with main-thread stalls (huge dt, no tunnelling) | PASS all |
| X6 reload during play (moving / fishing / loading) | PASS all |
| X7 rotate mid-play with stick held | PASS on b2 (SE failure in run A was an ENOENT artifact collision from concurrent runs = harness noise) |
| X8 button spam (fishing toggle/menu/play) | PASS all |
| X9 poisoned save (sea/building/extreme/NaN) | PASS all |
| X10 audio failure (AudioContext.resume rejects / "Failed to start the audio device") | FAIL on the 19:34 dist (BUG-2); PASS on the 20:05 dist (SE + 13) and on LIVE |

## Bugs
**BUG-1 (Low–Medium; only at 320 px width = iPhone SE 1st gen / 5s class):** the top info chip is too narrow (left 76px, right 136px => ~108 px at 320 w). Line 1 ("波戸浦港 20:…") ellipsizes, line 2 (`small`, "釣れる水際 ✔ 水深…") is hard-cut mid-glyph ("水深紙") because only `.chip div` has `overflow/ellipsis`. Info becomes unreadable. Repro: iPhone SE emulation (320x568), play, look at the chip; fails QA-08/12/14 on WebKit SE. Not reproduced at 375/390/430. Screenshot: tests/out/artifacts.b2-se/06-layout-QA-12-portrait-l-80af9-ipped-or-hidden-under-notch-webkit-iphone-se/test-failed-1.png. Suggested fix: allow the chip to wrap/shrink font, or reduce right margin at ≤340 px.
**BUG-2 (Medium, FIXED in current dist; verify live):** on the 19:34 build an audio failure (`AudioContext.resume()` rejection / "InvalidStateError: Failed to start the audio device" — happens when iOS audio session is interrupted or no device) became an unhandled promise rejection → index.html's global `unhandledrejection` handler opened the full-screen red `#err` overlay and blocked all input; also a pageerror in QA-15. Repro: run on WebKit without audio device (this box) or force `AudioContext.prototype.resume = () => Promise.reject(...)`, tap Play. Fixed by `audio.ts` catch (19:55 commit-less change). b2 SE/13 and live pass X10 and QA-15. Residual risk: the global handler still turns ANY future unhandled rejection into a full-screen fatal overlay — recommend only showing it before boot or for non-recoverable errors. (Low)
**BUG-3 (Low, observation, not auto-detected):** at 320x568 the fishing tutorial bubble ("キャスト→もう一度押して投げる…") overlaps the 走る (run) button ring and sits over the water view. Screenshot above (same file). Overlap is with a non-interactive toast, but it partially hides a button.
**Flakes (not game bugs as far as I can tell):** QA-02 loading bar sampled at 87–88% (SE/13 under load; passes alone) — could also be a bar that reaches Play-enabled before showing 100%: worth a look (Low). QA-05 visual-diff threshold under load.

## Not done / UNTESTED
- Real iPhone anything (fps, safe-area, touch/gesture quirks, audio session, Safari toolbar). Perf numbers here are software-GL emulation under load and prove nothing.
- QA-02b throttled network on WebKit.
- WebKit safe-area containment.
- Phase-2 fishing mechanics (float fishing/fight/save v2) beyond the entry/exit UI.

## Artifacts
Screenshots: tests/out/shots.b2-se/, tests/out/shots.b2-13/, tests/out/shots.live-cr/ (X1–X10), tests/out/shots.b2-cr/. Failure artifacts: tests/out/artifacts.b2-se/, artifacts.b2-13/. Logs: tests/out/run.*.log, /tmp/runA..D.log.

## Chromium local on the CURRENT dist (run b2-cr) — PARTIAL
Stopped by my 720 s timeout (box was slow) after 25 of 32 tests: **QA-01…QA-15, QA-16, QA-12H, QA-13H, QA-X1, X2, X3 all PASS, 0 failures** on the 20:05 dist. **QA-X4…X10 were NOT run (UNTESTED) on local Chromium for the current dist.** Those same checks PASS on the old 19:34 dist (run B, 31/31) and on the LIVE site (run C, 32/32 incl. X10), and X4–X10 PASS on WebKit SE/13 current dist (X4 freeze/resume is only a synthetic event in WebKit).
Log: tests/out/run.b2-cr.log. Preview servers on :4180/:4181 were stopped.

## Overall
- Current dist: no FAIL except BUG-1 (320 px width only, SE 1st-gen class) plus load-flaky QA-02/QA-05 samples that pass alone.
- No walls/sea/stuck-stick/multi-touch/rotate/background/reload break found on the current dist (emulation only).

---
## Fix status (Phase 2, 2026-10-30 JST)
- BUG-1 (320px chip truncated mid-character): FIXED – narrow (<=340px) uses abbreviated chip text + wrapping/shrink CSS. Verified by qa.mjs `BUG-1` checks (320x568 / 568x320) and e2e QA-08/12/14 at webkit-iphone-se (31 passed, 1 skipped).
- BUG-2 (any unhandled rejection showed fatal overlay): FIXED – overlay only for errors before boot completes; later rejections are logged (`__rfwWarnings`) + small toast. Verified by qa.mjs `BUG-2`, e2e X10.
- BUG-3 (tutorial toast overlapped 走る at 320x568): FIXED – move-mode toast positioned above the button row. Verified by qa.mjs `BUG-3` (rect intersection with run/joystick/other buttons = none).
