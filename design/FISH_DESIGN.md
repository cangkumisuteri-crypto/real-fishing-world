# REAL FISHING WORLD — 魚の挙動 & ファイトモデル設計 (FISH_DESIGN)

**Status: Phase-2 ready（設計確定版 v1.0）** ／ 担当: AI-3（釣りシミュレーション設計）
データ: `design/FISH_DATA.json`（schemaVersion 1.0.0、9種）／ 再生成: `python3 design/_gen_fish_data.py`
`src/` には一切手を入れていない。Phase 2 では `src/data/fish.ts`（placeholder）へ `FISH_DATA.json` を取り込む（§0 参照）。

> すべて **ゲーム内モデル**。実際の釣果を保証しない。`price.*` は現実の市場参考値で、ゲーム内通貨ではない（ゲーム内は `gameBaseValue`）。

---

## 0. 規約（既存仕様に合わせた点）

| 項目 | 規約 |
|---|---|
| id | `src/data/fish.ts` と同じ romaji: `aji saba kasago mebaru chinu seabass tachiuo madai buri` |
| 単位 | 長さ cm / 重さ kg / 水深 m / 速度 m/s / 力 **kgf**（1kgf=9.80665N）/ 水温 ℃ / 時刻は24h |
| 0–1スケール | wariness, response, tendency, softness など。`power`(fish.ts) は `pullStrength` から導出可 |
| 海底ゾーン | `sand reef weed wall deep shallow`（`SeabedZone` 0..5 と1:1）。`structureTags`は追加ヒント |
| 流速 | 正規化 0..1（0=無風/止水、1=≥1.0 m/s ≈2kt） |
| 時間帯 | dawn 4–7 / day 7–16 / dusk 16–19 / night 19–4（Phase 6 で日の出入りに連動） |
| 釣法 | `float`(ウキ) / `lure` / `hole`(穴釣り) — fish.ts の `FishMethod` と同じ。**ファイトコアは3釣法共通** |
| 既存フィールドの取り込み | `legacy` に fish.ts の zones/power/baseValue/minTackle/wariness を保持（互換用） |

`FISH_DATA.json` 構造: `conventions` / `catalog`（lures, baits, lureActions, seabedZones）/ `species[]`。
各 species: depthRange, tempRangeC, preferredSeabed, swimSpeed, wariness, baits, lures, activeHours, currentResponse, lureResponse, pullStrength, rockDivingTendency, hookOutChance, sizeRange, price, fight, behavior, legacy。

---

## 1. 魚種ごとの設計意図（Rationale）

| 魚 | 位置づけ・リアル根拠 | ゲーム上の狙い |
|---|---|---|
| **アジ** | サビキ/アジングの入門魚。港内の常夜灯・岸壁沿いを群れで回遊。口が柔らかく口切れしやすい（hookOut 0.25）。軽いが“引く”。 | 初心者の練習台。コマセ・タナ・ハリス視認性を学ぶ。 |
| **サバ** | 回遊魚、ベイトと潮次第でスイッチが入る。横走りが速く、サビキ・ショアジギの外道代表。 | “ムラ”の体験。入れ食い/無反応の落差。 |
| **カサゴ** | 穴釣りの主役。穴・テトラ・根に定着。ほぼ丸飲みで針外れ少ないが、**掛けた直後に根へ潜る**（rockDiving 0.95）。 | 穴釣りの「初動で止める」ファイト。ラインブレイク/スレ学習。 |
| **メバル** | 夜の常夜灯・藻際。繊細で明暗・ライン視認性に敏感。スローな誘い。 | メバリング。ライト・ライン太さ・リトリーブ速度の調整。 |
| **チヌ** | 警戒心強い雑食（カニ・貝・オキアミ）。咥えて吐く探り食い。杭・牡蠣殻・根へ走る。春の乗っ込み/秋荒食い。 | ウキ釣り/チニングの“知能戦”。足音・影・ラインに反応。 |
| **シーバス** | 明暗・流れのヨレで待ち伏せ。**エラ洗い**で針外れ（hookOut 0.30）、橋脚/テトラへ。潮の動き出しに限定。 | ルアーのアクション選択と時合の読み。 |
| **タチウオ** | 夕〜夜に浮上、群れで来て去る。歯でリーダーを切る。テンヤ/ワインド/ジグ。引きは軽いが外れ/切れが多い。 | アタリの“見極め”と合わせタイミング、ワイヤー選択。 |
| **マダイ** | ショアでは稀。潮通し・ヨレ・根周り。口切れしやすく、ハリス視認性に敏感（lineVisSens 0.85）。 | 粘りと繊細さが必要な“ご褒美”魚。 |
| **ブリ** | 青物。ベイトを追う回遊。見切りは少ないが走りが強く持続的（stamina 150s）。 | ドラグ管理と体力勝負、タックル強度が必須（minTackle 0.8）。 |

注: 難易度は **サイズだけでなく魚種特性**（power/wariness/rockDiving/mouthHold/stamina）で決まる（SPEC_NOTES 第7・13章）。

---

## 2. 魚の活性・環境係数（State Machine の入力）

### 2.1 活性 A（0..1、魚ごと、1秒ごと更新）
```
A = clamp01( timeW · monthW · tempF · tideF · currentF · weatherF · chumF )
timeW   = lerp(activeHours.timeOfDayWeights[dawn|day|dusk|night])   // 区間境界は±30分で線形補間
monthW  = activeHours.monthlyActivity[month-1]                      // 12要素
tempF   = trapezoid(T; min, optMin, optMax, max)  floor 0.05        // opt内=1、端で0
tideF   = 0.4 + 0.6·tideMove          // tideMove=|sin(2π·phase)|, 潮止まり0 / 中潮1。Phase 6で実潮汐
currentF= max(0.2, exp(-(c - pref)² / (2·tol²)))                   // c=正規化流速
weatherF= 1 + 0.15·overcast + 0.2·ササ濁り(chinu/seabassのみ) − 0.3·強風/激流  // Phase 2は仮値1.0可
chumF   = 1 + 0.5·chumConcentration(0..1)  // schooling=true の魚(アジ/サバ/タチウオ/ブリ)のみ。他は1.0
```
- **釣り人圧力** `pressure(area)`: 近辺で魚が flee するたびに +0.15、毎秒 −0.003（約5分で回復）。`A *= (1 − 0.5·pressure)`。
- 行動パラメータは `behavior.*`: senseRange(視覚/側線/嗅覚 m), lightAffinity, lightSensitivity, noiseSensitivity, lineVisibilitySensitivity, inspectSec, biteType, strikeCommitP, fleeCooldownSec。

### 2.2 刺激量 stim（餌/ルアー1個に対する魚の評価）
```
item = bait or lure  (response r_i from species.baits[] / species.lures[], 無ければ0.05)
actionMatch = species.lureResponse.actionPreference[currentAction] ?? 0.3     // ルアーのみ。ベイトは「自然に漂う」=0.8、ずっと動かす=0.4
senseGain = max( visual(d)·vs, lateral(d)·ls, smell(d)·ss )                   // d=魚と対象の距離
   visual(d)  = clamp01(1 − d / senseRangeM.visual) · clarity(0..1) · lightVisF
   lateral(d) = clamp01(1 − d / senseRangeM.lateralLine) · (lureVibration)
   smell(d)   = clamp01(1 − d / senseRangeM.smell) · scent · downstreamBonus(current)
   vs,ls,ss   = lureResponse.senses.visual / .vibration / .scent
stim = r_i · actionMatch^0.7 · senseGain · lureResponse.overall^0.5(ルアー時)
lightVisF = lerp(1, 1.3, lightAffinity·darkness)   // 夜の常夜灯下では lightAffinity の高い魚ほど対象を見つけやすい
```

### 2.3 疑い度 suspicion s（0..1、接近以降に蓄積）
```
ds/dt = wariness · ( lineVis · lineVisSens
                   + noise   · noiseSens
                   + light   · lightSens      // 魚が明るい場所/日中に晒される度合い。メバル/チヌで大
                   + unnatural               // アクションが不自然(速すぎ・止まりすぎ)＝ 1 − actionMatch
                   + shadow  · 0.6 )          // 人影/足音(チヌ・マダイで効く)
        − 0.15·(1 − wariness)                 // 時間で慣れる
lineVis = lineVisibility(lineType, diameter) · clarity · (1 − 0.5·depthDarkness) · proximity(d)
          // fluoro 0.25 / nylon 0.6 / PE 0.8 / wire 1.0×1.3
noise   = playerNoise(0..1)  // 歩行=0.2, 走る=0.5, キャスト着水=0.3, ドラグ音/大きなリトリーブ=0.2
```

---

## 3. 魚挙動ステートマシン（idle → search → approach → inspect → strike → flee）

```
idle ──A·k>rand──▶ search ──target found──▶ approach ──d<dInspect──▶ inspect ──convince≥cth──▶ strike ──▶ (hooked → FIGHT)
  ▲                  │timeout                │s≥1 / startle            │s≥1 / timeout(低)        │外した/吐き出し
  └── cooldown ◀─── flee ◀──────────────────┴─────────────────────────┴────────────────────────┘
```

| 状態 | 内容 | 遷移条件・タイマー・確率 |
|---|---|---|
| **idle** | 好みの海底/タナをゆるく回遊（cruise速度）。schooling種は群れ共有。 | 毎tick(1s)：`p_search = A · kSearch · dt`（kSearch=0.25/s）で search。コマセ/ベイト接近(`baitNearby`)で ×3。 |
| **search** | 感覚範囲内の最良ターゲット(stim最大)を探す。cruiseで移動。 | `p_detect/s = clamp01(stim·A·2)` → 検出で approach。`searchTimeout = U(20,60)s` で idle。stim<0.05は無視。 |
| **approach** | ターゲットへ接近（chase系は burst*0.5 まで加速）。 | `s`を§2.3で積算。`s ≥ 1` → flee(spook)。`d ≤ dInspect`（= 0.4 + 0.5·体長m）→ inspect。ターゲットが急に動いた(巻き速度>1.5 m/s)場合 `biteType=chase/strike` の魚は直ちに strike判定へスキップ（`p=0.5·stim`）。 |
| **inspect** | 正体を確かめる。対象の周りを旋回/追尾。 | `T_inspect = U(inspectSec.min, inspectSec.max) · (0.6 + 0.8·wariness) / (0.5 + A)`。`convince`を積算:<br>`dconv/dt = stim·A·2.0 − 0.6·s` ／ 閾値 `cth = 0.6 + 0.4·wariness`。<br>・`convince ≥ cth` → strike判定。<br>・`s ≥ 1` → flee(spook)。<br>・タイマー切れ：`convince ≥ 0.5` なら1回だけ延長(0.5×T) (=見切り前の追尾。シーバス/チヌで顕著)、`< 0.5` → flee(lose_interest, 軽い)。 |
| **strike** | 1回の捕食行動。`biteType`で挙動が変わる。 | `strikeCommitP`(例: aji .75, chinu .45, buri .9) で実際に口を使う。使わない → inspect戻り/flee。口を使った場合 → **アタリ(bite event)** を生成：<br>`signal = {type: biteType, strength: 0.3..1.0, durationMs}` (suck=軽い引込み / peck=ツンツン / gulp=ガッと重み / chase=ひったくり / mouth_and_spit=吐き出しあり)。<br>`hookWindowMs`中に **プレイヤーが合わせる/巻き合わせ** → 針掛かり判定 `pHook = pHookBase · hookTimingQ`。pHookBase: float .8 / lure .6(chaseは.9) / hole .9(カサゴ)。mouth_and_spit は窓が短い(0.3〜0.8s)。 |
| **flee** | 逃避。 | 逃避理由: `spook`(s≥1)=burst速度で3〜6m離脱、`lose_interest`=cruiseで離脱、`miss`(口切れ/吐き出し後)=burst 1s。クールダウン `T = U(fleeCooldownSec) · (1 + pressure)`。spookはさらに `pressure += 0.15`、同群の魚(schooling)にも `s += 0.3` を伝播。終了後 idle。 |

### 3.1 擬似コード (TypeScript風)
```ts
interface FishAgent {
  sp: SpeciesData; size: number /*cm*/; W: number /*kg*/; state: State;
  A: number; s: number; convince: number; timer: number; target?: Stimulus; cooldown: number;
}

function tick(f: FishAgent, env: Env, lure: Lure|null, dt: number) {
  f.A = activity(f.sp, env);                                 // §2.1
  switch (f.state) {
    case 'idle':
      wander(f, f.sp.swimSpeed.cruise);
      if (f.cooldown > 0) { f.cooldown -= dt; break; }
      if (rand() < f.A * K_SEARCH * (lure?.chumNearby ? 3 : 1) * dt) setState(f, 'search', U(20, 60));
      break;
    case 'search': {
      const cand = bestStimulus(f, env, lure);               // §2.2
      if (cand && rand() < clamp01(cand.stim * f.A * 2) * dt) { f.target = cand; setState(f, 'approach'); }
      else if ((f.timer -= dt) <= 0) setState(f, 'idle');
      break;
    }
    case 'approach': {
      f.s = clamp01(f.s + suspicionRate(f, env, lure) * dt);
      moveTowards(f, f.target, chaseSpeed(f));
      if (f.s >= 1) return flee(f, 'spook');
      if (dist(f, f.target) <= D_INSPECT(f.size)) {
        f.convince = 0;
        f.timer = U(sp.behavior.inspectSec.min, sp.behavior.inspectSec.max) * (0.6 + 0.8 * sp.wariness) / (0.5 + f.A);
        f.extended = false; setState(f, 'inspect');
      }
      break;
    }
    case 'inspect': {
      const stim = stimulus(f, env, lure);
      f.s = clamp01(f.s + suspicionRate(f, env, lure) * dt);
      f.convince = clamp01(f.convince + (stim * f.A * 2.0 - 0.6 * f.s) * dt);
      circle(f, f.target);
      if (f.s >= 1) return flee(f, 'spook');
      if (f.convince >= 0.6 + 0.4 * sp.wariness) return setState(f, 'strike');
      if ((f.timer -= dt) <= 0) {
        if (f.convince >= 0.5 && !f.extended) { f.extended = true; f.timer = 0.5 * f.timer0; }
        else return flee(f, 'lose_interest');
      }
      break;
    }
    case 'strike': {
      if (rand() > sp.behavior.strikeCommitP) return flee(f, 'miss');
      emitBite(f);                                           // アタリ演出 + hookWindow 開始 (§3 表)
      const hooked = awaitHookset(f, pHookBase(method, sp));  // プレイヤー入力で判定
      if (hooked) return startFight(f);                        // §4 へ
      flee(f, 'miss');
      break;
    }
  }
}

function flee(f: FishAgent, why: 'spook'|'lose_interest'|'miss') {
  const sp = f.sp;
  const speed = why === 'lose_interest' ? sp.swimSpeed.cruise : sp.swimSpeed.burst;
  setHeading(f, awayFrom(f.target)); f.fleeSpeed = speed;
  f.cooldown = U(sp.behavior.fleeCooldownSec.min, sp.behavior.fleeCooldownSec.max) * (1 + areaPressure);
  if (why === 'spook') { areaPressure += 0.15; propagateSpook(f, +0.3); }
  f.s = 0; f.convince = 0; setState(f, 'idle');
}
```

### 3.2 魚種別の特徴的な挙動パラメータ
| 魚 | 特徴(挙動に効く点) |
|---|---|
| アジ | schooling。inspect短い(0.4–1.5s)。lineVisSens 0.45。コマセ(chumF)で search 確率↑ |
| サバ | schooling、strikeCommitP .85 / inspect短い。ジャークで strikeスキップ(chase) |
| カサゴ | 穴/根の前のみ巡回。inspect長め(0.6–2.5s)、吐き出さず gulp。lightSens低(昼も食う) |
| メバル | **lightSens .75 / lineVisSens .65**: 明暗境界・細いライン・遅い巻きで convince↑ |
| チヌ | **noiseSens .8 / lineVisSens .9**、inspect長い(1.5–6s)、`mouth_and_spit`。足音/影で s↑ |
| シーバス | 流れ(currentF)と時合(tideF)の影響大。chase系。inspectで追尾延長が多い |
| タチウオ | 夜は水柱浮上(depth優先を表層へ)。peck_then_swallow：早合わせで外れる。toothCut判定(§4.7) |
| マダイ | inspect長い(1–4s)、lineVisSens .85。cooldown長い(20–120s) |
| ブリ | 視覚10m、inspect極短い(0.1–0.8s)。ルアー速度が速いほどstim↑(`jerk`/`straight_retrieve`) |

---

## 4. 共通ファイトモデル（Fight Core）

**3釣法共通**。釣法による差分は §4.9 の `methodMod` だけで上乗せする。物理 tick は固定 `dt = 1/30 s`（30fps目標・iPhone実機未検証）。

### 4.0 定数（チューニング値）
```ts
const FIGHT = {
  DT: 1/30,
  LB_TO_KGF: 0.4536,
  PULL_EXP: 0.667,                  // F_sus = c · W^PULL_EXP
  LENGTH_STRETCH_REF_M: 30,         // ラインの伸び効果の基準長
  DRAG_STICTION: 1.0,               // 静摩擦 = D_static
  DRAG_DYN_RATIO: 0.85,             // 滑走中は D_dyn = 0.85·D_static
  DRAG_RECOMMENDED: [0.25, 0.33],   // 推奨ドラグ = 0.25〜0.33 × ラインの定格強度
  DRAG_HEAT_RATE: 0.004,            // 滑走1秒ごとにdrag有効値 −0.4%（最大−20%）
  ROD_CUSHION_MAX: 0.30,            // 竿角度が最適な時の張力吸収率
  ROD_IDEAL_ANGLE: 50, ROD_ANGLE_SIGMA: 25,       // deg (水平=0, 垂直=90)
  ROD_OVERHEAD_PENALTY: 1.15,       // 竿が立ち過ぎ(>80°)で吸収を失う
  SLACK_THRESHOLD_T: 0.08,          // T/F_sus < これ = スラック状態
  BREAK_SOFT_RATIO: 0.85,           // T/Bs がこれ以上で確率切れ
  BREAK_SOFT_RATE: 2.0,             // /s @ r=1
  ABR_K: 0.04,                      // 擦れ蓄積係数 (/s)
  ABR_STRENGTH_LOSS: 0.85,          // D=1で強度−85%
  DIVE_BASE_HAZARD: 0.5,            // /s (rockDivingTendency=1, 構造物4m以内)
  DIVE_NEAR_M: 4,
  STAMINA_BASE_RATE: 0.25,
  STAMINA_PRESSURE_RATE: 1.2,
  STAMINA_REST_RECOVER: 0.03,       // /s (スラック時)
  LAND_STAMINA: 0.20, LAND_DIST_M: 2.0,
  BARBLESS_HOOKOUT_MULT: 2.2,
} as const;
```

### 4.1 魚の引き（Fish pull）
```
F_sus(W) = c · W^0.667                      // 最大持続力 [kgf]。FISH_DATA.pullStrength.coef = c
F_burst  = F_sus · burstMult                 // 瞬間ピーク (首振り・走り出し)。burstMult=1.4–1.6
Wtyp     = sizeRange.weightKg.typical
F_f(t)   = F_sus(W) · modeMult(mode) · (0.35 + 0.65·S(t))      // S=スタミナ(1→0)。疲れても最低35%は残す
```
| mode | modeMult | 持続(s) | 説明 |
|---|---|---|---|
| cruise | 0.35 | — | 通常の泳ぎ（針掛かり直後〜走り前） |
| run | 1.0 | `U(1.5,5)·(0.5+S)` | 直線的に走る。ドラグが滑る主因。`runStyle`で頻度 |
| side_run | 0.8 | `U(1,3)` | 横走り(サバ/ブリ)。ラインを根/障害に擦る可能性 |
| dive | 1.0（開始瞬間 ×burstMult） | §4.5 | 根/穴/テトラへ突進。abrasion/wedged発生 |
| headshake | burstMult を 0.15s | イベント | 首振り(エラ洗い=シーバス)。hook-out判定 §4.6 |
| rest | 0.2 | 1–3s | 走り直後の休止。回復はスラック時のみ |

- run 開始頻度: `h_run = (0.15 + 0.35·power_norm) · (0.4 + 0.6·S)` /s（power_norm = F_sus/F_sus_max_species）。
- headshake 頻度: `h_hs = headShakeFreq · 0.5 · (1 + 1.0·nearSurface)` /s（nearSurface = 距離<5m）。シーバス=0.8、アジ=0.3。

### 4.2 張力・竿・ドラグ
```
θ = 竿角度(deg)。理想 35–65°。
rodCushion(θ) = 1 − ROD_CUSHION_MAX · exp(−((θ − 50)/25)²)        // 0.70 .. 1.0
               · (θ > 80 ? 1.15 : 1)
stretchNorm   = clamp01( line.stretch · clamp(L_out/30m, 0.3, 1) / 0.25 )   // 伸びによる緩衝(長いほど効く)
shockMult     = 1 + (burstMult − 1) · (1 − 0.7·stretchNorm) · [headshake/run開始の瞬間のみ]
F_eff         = F_f · rodCushion · shockMult                       // 魚がラインに与える力
P_cap         = min( D_static, rodLift(θ), reelPower )             // プレイヤー側が出せる上限 [kgf]
T             = min(F_eff, P_cap)                                  // 実際のライン張力
slipping      = F_eff ≥ D_static · DRAG_STICTION                   // ドラグ滑走。滑走中 T = D_dyn(=0.85 D_static · heatFactor)
heatFactor    = 1 − min(0.2, DRAG_HEAT_RATE · slipSeconds)         // 滑走し続けると効きが落ちる
```
- **ドラグ設定**: プレイヤーが `D_static`（kgf）を設定。推奨は `Bs_rated × [0.25, 0.33]`。UIで「ドラグが強すぎる/弱すぎる」を示す。
- `rodLift(θ)` = rod.powerKgf · (0.4 + 0.6·sin θ)（立てるほど持ち上げ力、ただし θ>80 は cushion喪失）。
- 道糸が緩んだ時の**スラック**: `slack_m += (v_fish_toward − v_reel) · dt`、 `slack_m ≥ 0` 。`slack_m > 0.05m` で T=0。
- **スラック復帰スナップ**: 張り直した瞬間 `T_snap = T · (1 + 1.0·clamp01(slack_m/1.0) · (1 − 0.6·stretchNorm))`（PEでは大きく、ナイロンで小さい）。

### 4.3 距離・リーリング・ポンピング
```
v_reel = reelSpeed · handleInput(0..1) · (reelPower − T)/reelPower      // 張力が高いほど巻けない
net    = P_cap − F_eff                                                   // >0 ならプレイヤー優勢
if reeling:      dDist = −v_reel · clamp(net / P_cap, −1, 1)             // 優勢なら寄る、劣勢なら出される
if not reeling:  dDist = slipping ? +v_slip : (net < 0 ? +v_f·0.3 : −0.1)
v_slip = v_f(mode) · clamp((F_eff − D_dyn)/F_eff, 0, 1)                  // v_f = swimSpeed.cruise/burst をサイズ補正
pump&wind: 竿を θ↑(引き上げ)→θ↓+巻き の1サイクルで gain = pumpGain(≈0.4–0.8m) (スタミナ消耗に加算)
```
- v_f は `swimSpeed.cruise/burst`（基準体長 `refSizeCm`）× `(L/refSizeCm)^0.5`。

### 4.4 魚の疲労（スタミナ S: 1→0）
```
staminaSec_W = fight.staminaSec · (W/Wtyp)^0.3
ρ = clamp(T / F_sus(W), 0, 1.5)                                     // 圧力(魚の最大持続力に対する張力)
modeCost = {cruise:.2, run:1.0, side_run:.8, dive:.8, headshake:.3, rest:0}
dS/dt = −(1/staminaSec_W) · ( STAMINA_BASE_RATE·modeCost + STAMINA_PRESSURE_RATE·ρ )
        + (ρ < 0.15 ? STAMINA_REST_RECOVER·(1−S) : 0)               // スラック/無負荷だと回復＝緩めすぎ禁止
```
- **ラストラン**: `S < 0.3 && dist < 4m` で p=0.3 の最終走り（`F_f = 0.6·F_sus`、持続1–2s）。
- **取り込み可**: `S ≤ LAND_STAMINA(0.20) && dist ≤ LAND_DIST_M(2m)` → landing。
- 抜き上げ上限: `W[kg] ≤ 0.25 · Bs_eff[kgf]`（超えるなら**タモ網**必須。ラインが耐えても針/竿が危険）。抜き上げ時 hook-out(§4.6-d)。
- `staminaSec`（基準=典型サイズ）: アジ20/サバ35/カサゴ25/メバル25/チヌ60/シーバス70/タチウオ45/マダイ80/ブリ150。

### 4.5 根ズレ・潜り（Rock diving）と擦れ（Abrasion）
**潜り開始**
```
nearStruct = distance to structure < DIVE_NEAR_M && mode ∈ {run, cruise}
h_dive = rockDivingTendency · DIVE_BASE_HAZARD
        · (nearStruct ? 1 : 0)
        · (hookupAgeSec < 2 ? 3.0 : 1.0)                            // 掛けた直後が最も危険(カサゴ/チヌ)
        · (headUp ? 0.5 : 1.0)                                      // headUp = ρ≥0.6 && θ≥45° (頭を上げさせる)
        · (S < 0.3 ? 0.4 : 1.0)
```
- 潜った（dive）→ `wedged`（根に入った）: 魚の引き `F_f = 1.0·F_sus`、魚は動かない。`F_lock = 0.6·F_sus·(1 + rockDiving)`。
- **脱出**: プレイヤーが `T ≥ F_lock`（かつ θ≥45°）を `U(1.5,4)s` 保つと引き出せる（成功p=0.8、残りは `abrasion` が加速）。ゆるめる（T<0.3·F_lock）と魚は穴から出て cruise に戻る（`recover` 3–8s）— 「ラインを緩めて出させる」技の再現。
- 初動対策: 掛けた後 `reactWindow = 1.2s` 内に T≥0.6·F_f かつ θ≥45° で潜り開始確率 ×0.2（カサゴの穴釣り）。

**擦れ（累積ダメージ D: 0..1、リーダー/ハリスの損傷）**
```
contact = wedged ? 1.0 : (mode==='dive' ? 0.8 : (lineCrossesEdge ? 0.3 : 0))
rough(zone/tag) = {reef:1.0, tetra_gap:1.0, rock_hole:1.0, wall:0.8, oyster_shell:1.2, pier_pile:1.2, shallow:0.4, weed:0.2, deep:0.1, sand:0.05}
abrRes(type)    = {nylon:0.6, fluoro:1.0, PE:0.35, wire:3.0}
dD/dt = ABR_K · contact · rough · (0.3 + T/Bs_eff) / abrRes(leader) / sqrt(leaderLb/16)
Bs_eff = Bs_rated · knotEff · (1 − ABR_STRENGTH_LOSS · D)
```
- D は**釣行中保存**し、ファイト後 `D > 0.2` で「リーダーが傷んでいる」表示 → 結び直し推奨（アイテム消費）。
- 目安: フロロ16lb・根・T/Bs=0.3 → `dD/dt ≈ 0.04·1.0·0.6/1.0/1 = 0.024/s`（約40秒で全損）。ナイロンは約1.7倍速く傷む。

### 4.6 針外れ（Hook-out）
`hookOutChance.base` = 1イベントあたりの基準確率（アジ.25/サバ.20/カサゴ.05/メバル.20/チヌ.12/シーバス.30/タチウオ.15/マダイ.18/ブリ.10）。
```
hookSet∈[0.3,1] = 掛けた時のタイミング品質（早合わせ/遅合わせで低下。タチウオ/マダイ/チヌは合わせ窓が狭い）
hookSetF  = 1.6 − hookSet                                             // 0.6 .. 1.3
hookSizeF = clamp(1 + 0.6·|ln(hookSize/idealHookSize)|, 1, 2)         // 針が大きすぎ/小さすぎ
barbF     = barbless ? 2.2 : 1.0
slackF    = 1 + 3·clamp01(slackSec/0.5)                               // スラック1秒で×4
```
- (a) **首振り/エラ洗い**（headshake event 1回ごと）:
  `p = base · hookSetF · hookSizeF · barbF · (1 + 0.8·[nearSurface])`
- (b) **スラック**（毎秒）: `h = base · 0.8 · slackF · hookSetF · barbF · [slackSec>0]`
- (c) **口切れ(tear-out)**（毎秒）: `limit = mouthHoldRatio · F_sus · (0.8 + 0.4·hookSet)`; `T > limit` なら `p/s = clamp01(0.5·(T/limit − 1))`。
  口が柔らかい魚はmouthHoldRatioが低い（アジ1.6/サバ1.5/マダイ1.8/メバル1.7 … カサゴ4.0/チヌ3.0）→ **ドラグを強くし過ぎると口切れ**。
- (d) **取り込み時**（抜き上げ/タモ入れ）: `p = 0.5·base·(S>0.3 ? 1.8 : 1) · (抜き上げ ? 1.5 : 0.6) · barbF`。タモ入れ時はタモの扱い（スキル入力）で0.6→0.3。
- **バーブレス**: 外れ ×2.2 だが、**リリース時のダメージ・魚の回復 ×0.5**（図鑑/リリース機能と連動）。

### 4.7 ラインブレイク（Line break）
```
Bs_rated  = lb · LB_TO_KGF                          // 定格(lb) 例: 8lb=3.63kgf, 16lb=7.26kgf, PE1.0=約8lb(PE1号≈16–20lb)
knotEff   = {nylon:0.75, fluoro:0.70, PE:0.85, wire:0.8(クリンプ)} · knotQuality(0.85..1.0)   // 結びの品質(スキル)
Bs_eff    = Bs_rated · knotEff · (1 − ABR_STRENGTH_LOSS·D) · (1 − 0.08·lineAgeUse)             // lineAgeUse: 0..1 (交換までの使用度)
r         = T / Bs_eff
if r ≥ 1.0                  → BREAK (即)
else if r ≥ BREAK_SOFT_RATIO(0.85)
     hazard/s = BREAK_SOFT_RATE · ((r − 0.85)/0.15)²   // 結び目・微小傷からの確率切れ
```
**システム強度**（道糸＋リーダー）: `Bs_sys = min(Bs_main_eff, Bs_leader_eff·knotEff_FG)`。破断位置は弱い方。PE+リーダーでは**リーダー側で切れる**。
**ラインの性質**:
| type | stretch | abrRes | visibility | knotEff | 備考 |
|---|---|---|---|---|---|
| nylon | 0.25 | 0.6 | 0.6 | 0.75 | 伸び大＝ショック吸収。根ズレに弱い |
| fluoro | 0.20 | 1.0 | 0.25 | 0.70 | 見えにくい(チヌ/メバル/マダイ向き)。結びが滑りやすい |
| PE | 0.03 | 0.35 | 0.8 | 0.85 | 感度高・ショックに弱い(スナップが大きい)・リーダー必須 |
| wire | 0.00 | 3.0 | 1.0 (×1.3 lineVis) | 0.8 | タチウオ/ブリ(歯・擦れ)対策。食い渋りに影響 |

**ショック切れ**: `shockMult`(§4.2)と`T_snap`(スラック復帰)で瞬間的に T が Bs を超えた場合。ドラグを締め切る＋PE直結＋スラック→大首振りが最悪の組合せ。
**タチウオの歯切れ**（strike時）: ワイヤー無し→ `p_cut = toothCut.nonWireLeaderCutChancePerBite(0.45)`（リーダー径で×0.7〜1.0）、ワイヤー→0.03。

### 4.8 ファイト終了条件
| 結果 | 条件 |
|---|---|
| **LANDED** | `S ≤ 0.20 && dist ≤ 2m` → 取り込み（§4.6-d のロール後） |
| **LINE_BREAK** | `T ≥ Bs_eff` またはハザード発火 |
| **HOOK_OUT** | §4.6 のいずれかが発火 |
| **ROD_BREAK**（任意・Phase 2はOFF可） | `F_eff > 1.5·rod.powerKgf` が2秒継続 |
| **STUCK_LOST** | wedged で 20s 経過 or D≥0.95 → リーダー切れ扱い |

### 4.9 釣法差分 `methodMod`（共通コアへの上乗せ）
| 釣法 | 掛かり方 | 方向/行動の差 | 係数 |
|---|---|---|---|
| float(ウキ) | 向こう合わせ/遅合わせ。hookSet高め | 沖へ走る、足元の根へ潜る | `hookSet+=0.1`, `h_dive×1.0` |
| lure | 食い上げ/追い食い。chase系は掛かり良好 | 横走り・エラ洗い・表層戦 | `hookSet+=0.05`、`headshake×1.1`（フックが小さく外れやすい） |
| hole(穴釣り) | 丸飲み(カサゴ)。初動が決定的 | **潜り開始ハザード×1.5**、短い距離での綱引き。ライン短 (stretchNorm↓)→ショック↑ | `reactWindow=1.2s`, `L_out≈3–5m` |
共通：使用タックルの`rod.powerKgf / reelPower / reelSpeed / line.lb,type / hookSize / barbless`がコアに渡る。魚の`pullStrength/stamina/rockDiving/hookOut/mouthHold`はFISH_DATAから。

---

## 5. 魚種別ファイトの目安（サニティ・チェック表）
`F_sus` は **typical サイズで最大持続力**（FISH_DATA `pullStrength.sustainedKgf.typical`）。推奨ドラグ=0.25–0.33×定格。

| 魚 | typical W (kg) | F_sus typ / max (kgf) | 想定リーダー | 難所 |
|---|---|---|---|---|
| アジ | 0.10 | 0.27 / 1.09 | フロロ 2–3lb | 口切れ（ドラグ弱め）|
| サバ | 0.35 | 0.90 / 2.49 | フロロ 6–8lb | 横走り・ショック |
| カサゴ | 0.20 | 1.03 / 2.62 | フロロ 8–12lb | **初動の根潜り・擦れ** |
| メバル | 0.12 | 0.49 / 1.25 | フロロ 2–3lb | 細リーダーで見切り回避 vs 強度 |
| チヌ | 1.02 | 2.84 / 7.51 | フロロ 6–10lb | 杭・根・口の固さ。警戒心 |
| シーバス | 3.29 | 4.43 / 9.03 | フロロ 14–20lb | **エラ洗い**・橋脚 |
| タチウオ | 0.69 | 1.71 / 3.72 | ワイヤ or フロロ 30lb+ | 歯切れ・合わせ |
| マダイ | 2.00 | 3.49 / 11.3 | フロロ 6–12lb | 口切れ・走り |
| ブリ | 5.99 | 7.92 / 17.8 | フロロ/ナイロン 30–50lb | 持久力・ドラグ・根 |

例：チヌ typ（F_sus 2.84kgf）に 8lbフロロ（Bs_eff = 3.63·0.70 = 2.54kgf）直結 → ドラグを締めると r>1 で破断、ドラグ0.3×3.63=1.09kgf なら滑走しながら寄せられる（疲労が進む）。**標準的な「ドラグを緩めて走らせる」が正解になる**ようにチューニング済み。

---

## 6. Phase 2 実装メモ（ハンドオフ）
1. `FISH_DATA.json` を `src/data/` へ取り込み、`FISH_SPECIES`(placeholder)を置換。`power` は `F_sus_typ / F_sus_max_over_species` で導出可（互換用）。`legacy.*` で既存コードのキーを維持。
2. 実装順: ①活性A → ②state machine(§3) → ③ファイトコア(§4) → ④釣法差分(§4.9)。ウキ釣りから開始（SPEC Phase 2）。
3. 定数は `FIGHT`（§4.0）と各種係数を `src/data/tuning.ts` 等に集約し、QAで調整可能に。
4. テスト（`tests/`）: (a) パラメータ範囲/参照整合 (b) 状態遷移の決定的シード再現 (c) ファイト: ドラグ設定ごとに結果（LANDED/BREAK/HOOK_OUT）が妥当な傾向になるシミュレーション。
5. 未検証事項: iPhone実機の30fps（`DT=1/30`の物理が負荷に耐えるか）は未確認。数値は実釣果に基づく保証ではなくゲームバランス用の初期値。

## 7. 前提・仮定
- 現実の魚の生態（日本沿岸）を一般的な釣り知識で近似。値は初期チューニング用。実測データ/釣果記録で見直す前提。
- 魚の `lengthWeight` は W=a·L³（タチウオは全長基準、指幅表記は `growthNames`）。
- `price` は2020年代の日本国内市場の一般的レンジの目安。ゲーム内通貨とは分離。
- 竿/リール/ライン数値（rod.powerKgf, reelPower, reelSpeed 等）は Phase 5 のショップデータ側で定義予定。ここでは仮のインターフェースのみ。
