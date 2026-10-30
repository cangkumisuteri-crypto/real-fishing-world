# REAL FISHING WORLD — システム/データ設計 (AI-4)

対象: セーブ、ショップ、経済バランス、現実連動データ。
実装ドラフト: [`systems_draft.ts`](./systems_draft.ts)（自己完結・どこからも import していない。`src/` には一切触れていない）。
数値はすべて `systems_draft.ts` を実際にコンパイルして計算したもの（§3 の表、§1 の動作確認）。FISH 側の ID・単位は `FISH_DATA.json` / `FISH_DESIGN.md`（AI-3）に合わせた。

型検査（design/ で）:

```
npx tsc --ignoreConfig --noEmit --strict --target ES2020 --lib ES2020,DOM,DOM.Iterable systems_draft.ts
```

`--ignoreConfig` が要るのは、tsc 7 が tsconfig のあるディレクトリでファイルを直接指定すると TS5112 で拒否するため。`noUncheckedIndexedAccess` / `exactOptionalPropertyTypes` / `noUnusedLocals` / `noUnusedParameters` を足してもエラー 0。

---

## 0. 全体方針

| 原則 | 具体 |
|---|---|
| 腕 > 道具 | 道具は「窓を最大+20%まで広げる」「必要最低強度を満たす」「快適さ（夜ウキ・水深表示）」だけ。タイミング窓の支配は腕。§3 |
| 保存データは絶対に黙って消さない | 壊れたデータは隔離、新しい版のデータは上書きロック、書き込みは read-back 検証。§1 |
| 現実データは「演出」 | 実データは LIVE、取得できなければ必ず `DEMO` バッジ。航行・安全判断には使わせない。§4 |
| 外部に出す情報は最小限 | 緯度経度は 0.1° に丸めて送る。位置情報(GPS)は既定OFF（`shareGps:false`）。 |

---

## 1. セーブ設計

### 1.1 ストレージキー（localStorage）

| キー | 内容 |
|---|---|
| `rfw.save` | 本体（エンベロープ JSON） |
| `rfw.save.bak` | 直前の正常データ（5分以上空けて更新） |
| `rfw.save.bad.<epochMs>` | 壊れたデータの隔離先（最大3個、古いものから削除） |
| `rfw.save.newer.v<N>` | 自分より新しい版のデータの退避先（ユーザー確認後のみ作る） |
| `rfw.rwcache` | 現実データのキャッシュ（§4）。セーブとは分離 |
| `rfw.probe` | 書き込み可否の確認用（直後に削除） |

### 1.2 エンベロープ

```ts
interface SaveEnvelope {
  magic: 'RFW-SAVE';
  schemaVersion: number;   // 現在 1
  rev: number;             // 保存ごとに +1。別タブの上書き検知
  savedAt: number;
  appVersion: string;
  checksum: string;        // fnv1a32(JSON.stringify(data))  ← 改ざん/破損の簡易検知（暗号ではない）
  data: unknown;           // SaveDataV1
}
```

### 1.3 SaveDataV1 の中身

| フィールド | 内容 |
|---|---|
| `profile` | `playerId`, `createdAt`, `playTimeSec` |
| `money`, `lifetimeEarned` | 所持金 / 累計獲得（開始 300G） |
| `xp`, `level` | `level` は **xp から必ず再計算**（保存値は信用しない） |
| `gear` | `owned: Record<itemId, 個数>`, `equipped: Partial<Record<slot, itemId>>` |
| `zukan` | `speciesId → {firstCaughtAt, count, maxSizeCm, bestQuality}` |
| `catchLog` | 直近 300 件。`{id, at, speciesId, sizeCm, quality, method, spotId, fate, earnedG, xp, dataMode, hour}` |
| `aquarium` | `tanks[]`, `fish[]`（`uid`, `speciesId`, `sizeCm`, `tankId`, `nickname`…） |
| `settings` | 移動速度、カメラ、音量、画質、`dataMode: 'auto'|'demo'`、`region`(0.1°丸め)、`jmaTideStation`、`shareGps`、`lastExportAt` |
| `stats` | casts / catches / lineBreaks / releases |

`catchLog[].dataMode` は `live | demo | mixed`。DEMO データで釣った記録を、将来「実環境の釣果」と混ぜないために必須。

### 1.4 マイグレーションチェーン

```ts
const MIGRATIONS: Record<number, (old) => unknown> = {
  0: legacyToV1,   // 版なし（プロトタイプ時代の生データ）→ v1 に包む
  // 1: v1ToV2,    // 将来はここに追加するだけ
};
migrate(fromVersion, data)  // from → CURRENT まで 1 段ずつ。欠けた段があれば MigrationError
```

- 各段は純粋関数（入力を破壊しない）。段を飛ばさない。
- 最終段の後に `sanitizeV1()`（寛容な補修）を必ず通す: 型が違う/範囲外のフィールドは既定値かクランプで直し、直した場所を `repairs[]` に記録 → UI へ `REPAIRED_FIELDS` 通知。全体がオブジェクトですらない場合のみ失敗扱い。
- v2 を作る手順: `SaveDataV2` を追加 → `MIGRATIONS[1]` を書く → `CURRENT_SCHEMA_VERSION=2` → `sanitizeV2` を追加。古い版を読む経路はテストデータ（旧版の JSON）で確認する。

### 1.5 失敗ケースの扱い（`SaveManager`）

| 状況 | 挙動 |
|---|---|
| localStorage 不可（Safari プライベート等、`setItem` が投げる / 読み戻せない） | `probeStorage()` が null → `MemoryStorage` に縮退。`volatile=true`、UI に「この端末では保存できません。書き出しで控えを」と常時表示 |
| 容量超過（`QuotaExceededError`, `NS_ERROR_DOM_QUOTA_REACHED`, code 22/1014） | ①隔離データを全削除 ②`catchLog` を 100 件に縮めて 1 回だけ再試行 ③それでも失敗なら `{ok:false, reason:'quota'}`（メモリ上の進行は維持、UI に警告） |
| 本体が壊れている（JSON不正 / magic不一致 / checksum不一致） | **削除しない**。`rfw.save.bad.<ms>` に隔離 → `rfw.save.bak` から復元 → `RESTORED_FROM_BACKUP` 通知。バックアップも駄目なら新規で開始（壊れた生データは隔離済み） |
| 自分より新しい版（`schemaVersion > CURRENT`） | **書き込みロック**（`writeLocked=true`）。`save()` は常に `locked-newer-version` を返し、何も書かない。ユーザーが「新規で始める」を明示確認したときだけ `archiveNewerAndStartFresh()` が `rfw.save.newer.v<N>` に **コピーしてから** 新規開始 |
| 別タブが先に保存した（`rev` が自分より新しい） | `conflict` を返す。自動上書きしない（UI で「別タブで更新されました。再読み込み？」） |
| 書いたのに読み戻すと違う | 書き込み後に必ず read-back 検証。不一致は `verify-failed` |
| タブを閉じる/裏に回る | `installAutosave()`: `pagehide` / `visibilitychange(hidden)` で即保存 + 30 秒ごと |
| バックアップ自体の失敗 | 本体保存は続行、`BACKUP_FAILED` を警告通知 |

`save()` の戻り値（`SaveOutcome`）は呼び出し側が必ず見て、`ok:false` を握りつぶさない。

### 1.6 エクスポート / インポート

- `exportText(save)`: エンベロープ JSON をそのまま文字列化（ファイル名例 `rfw-save-YYYYMMDD.json`）。書き出したら `lastExportAt` を更新。
- `prepareImport(text)`: **保存はしない**。magic / checksum / 版を検証し、マイグレーション+補修した結果のプレビュー（所持金・レベル・図鑑数）を返す。checksum 不一致（手で編集した等）・形式違いは理由付きで拒否。
- `commitImport(preview)`: 現在のデータを先に `rfw.save.bak` へ退避してから書く（取り消せる）。新しい版のインポートは拒否。

### 1.7 動作確認済み（`/tmp` でコンパイルして実行）

新規→保存→再読込 / 本体破損→隔離+バックアップ復元 / 版99のデータ→ロック・上書きされないこと・退避コピー作成 / Quota 擬似エラー / 版なしレガシー→v1 移行 / export→改ざん検知→import プレビュー / ストレージなし→メモリ縮退、のシナリオが期待通りに動くことを確認済み。

---

## 2. ショップ・アイテムモデル

### 2.1 モデル

`ItemBase = {id, slot, nameJa, tier(0..5), price, minLevel, note?}` を共通に、スロット別に拡張（`systems_draft.ts` の `ShopItem` union）。

| slot | 追加フィールド | ゲームへの効き方 |
|---|---|---|
| rod | `powerKgf`, `castDistanceM`, `windowBonus` | 強度ゲート / 飛距離（快適） / 窓+ |
| reel | `reelPowerKgf`, `reelSpeed`, `dragMaxKgf`, `windowBonus` | 強度ゲート / 巻き速度（快適） / 窓+ |
| line | `lineType`(nylon/fluoro/pe), `lb`, `ratedKgf`, `stretch`, `visibility` | 強度ゲート / 伸び・見えやすさ（食いに最大 +6%） |
| float | `windowBonus`, `nightVisible` | 窓+ / 夜でも見える（快適） |
| hook | `windowBonus`, `hookOutMult` | 窓+ / 針外れ（最大でも約1pt差） |
| sinker | `showsDepth` | 水深表示（快適。釣れ方は変わらない） |
| holeRig | `windowBonus` | 穴釣り用の窓+ |
| bait | `catalogId`, `packSize`, `usePerCast`, `qualityMult`（≤1.15） | 消耗品。`catalogId` は FISH_DATA の `catalog.baits` と一致 |
| lure | `catalogId`, `lossPerCast`, `qualityMult`（≤1.15） | `catalogId` は FISH_DATA の `catalog.lures` と一致 |

- **魚ごとの餌/ルアー反応（何が効くか）は FISH_DATA 側**に置く。ショップ側は「品質倍率の上限」と価格しか持たない。「何を使うか」は知識（=腕）であって、強い餌を買えば解決、にはしない。
- FISH_DATA の baits 10 種・lures 11 種はすべてカタログに存在（欠け/余りなし）。全 52 品目、ID 重複なし。
- 売却: 耐久財は `price × 0.4`。購入は `canPurchase()`（level / money / 重複）→ `applyPurchase()`（純関数、新しいセーブを返す）。

### 2.2 ティアと価格（耐久財 1 点）

| Tier | 解禁Lv | 耐久財の価格レンジ | 代表品 | 強度(kgf) | 窓+(セット合計) |
|---|---|---|---|---|---|
| T0 | 1 | 0（初期） | 初心者ロッド/リール/ナイロン5lb | 2.3 | 0% |
| T1 | 3 | 80–1,500 | ロッド540 / リール420 / ライン150 / ウキ150 / 針90 / 穴釣り360 | 2.7 | 5.4% |
| T2 | 8 | 300–6,000 | ロッド2,000 / リール1,500 / フロロ8lb 500 / 円錐ウキ500 / 針330 / 水深オモリ660 | 3.6 | 10.0% |
| T3 | 16 | 1,500–22,000 | ロッド11,000 / リール8,400 / フロロ16lb 2,600 / 電気ウキ2,400 / 針1,600 | 7.3 | 13.0% |
| T4 | 28 | 4,000–75,000 | ロッド39,000 / リール31,000 / PE 8,100 / 手研ぎ針5,100 | 10+ | 14.8% |
| T5 | 50 | 30,000–260,000 | 匠ロッド224,000 / 匠リール160,000 / PE40lb 46,000 | 10+（T4と同じ） | 15.4% |

- 餌: 20–600G/パック（オキアミ20、アオイソメ60、活きエビ250(10匹)、活き小魚600(5匹) など）。生き餌は 1 回あたりの消費を 0.2–0.34 に抑えて、狙う魚の価値に対し消耗品費が収入の 6–18% に収まるようにした。
- ルアー: 250–4,500G。紛失率 `lossPerCast` 1–3%。
- **T5 は「強さが T4 と同じ」**。ロッド/リール/ラインは匠仕様（感度・ドラグの滑らかさ・摩耗耐性）で、**窓+は T4 比 +0.6pt、強度ゲートは同じ**。つまり T5 は「見た目・手触り・誇り」のための買い物で、釣果への上積みはほぼない（意図的）。

---

## 3. 経済バランス（数値）

### 3.1 「道具は腕に勝てない」をどう保証するか

1. **タイミング窓の支配**: 合わせ・ファイトの成功率 = 窓内に入る確率。プレイヤーのタイミング誤差を `N(0, σ²)`、窓の半幅を `h` とすると成功確率は `erf(h / (σ√2))`。
   - 窓の全幅 = `(800 − 400·difficulty) ms` × `(1 + windowBonus)`（合わせ）、`(1100 − 500·difficulty) ms` × `(1 + windowBonus)`（ファイト、誤差は σ×1.5）。
   - `windowBonus` は各パーツの合算を `0.2·tanh(raw/0.2)` で **漸近キャップ（最大+20%）**。T5 フルセットでも +15.4%、T4 との差は 0.6pt。
2. **食いは「知識」が主役**: アタリ回数 = `30/時 × knowledge(0.3–1.8) × gearMult`。`gearMult` は餌/ルアー品質×ライン見えにくさで **上限 1.15**。knowledge は場所・時間帯・餌の選択（FISH_DATA の反応）で決まり、**ゲームを理解した人ほど 2 倍以上**になる。
3. **強度ゲートは「足りるか」だけ**: `strength = min(rod, reel, line の kgf)/10`。`tackleGate = clamp(1 − 5·max(0, 魚の minTackle − strength))`。足りていれば 1、**超えても加点なし**（ブリ0.8 は T4 で頭打ち、T5 は同じ）。足りなければ成功率が急落。→ 道具は「大物に挑む許可証」であって、腕の代わりにならない。
4. **売価に道具は関与しない**: `売価 = baseValue × sizeFactor × (0.9..1.1 品質) × dailySaturation`。サイズ・品質・魚種選びが決める。同じ魚種を 1 日 10 匹超売ると 1 匹ごとに −2.5%（下限 −65%）。
5. **XP も道具に依存しない**: `XP = (8 + 0.07·baseValue)·rarity倍率·サイズ係数·品質係数`、初めて釣った魚は +150%。

### 3.2 腕 vs 道具（実測: 成功率）

「腕」= タイミング誤差 σ と knowledge。初心者 σ=260ms/k=0.7、中級 σ=170/k=1.0、上級 σ=95/k=1.4。

| 魚（必要強度） | 道具 | 初心者 | 中級 | 上級 |
|---|---|---|---|---|
| アジ (0.1) | T0 初期 | 58% | 82% | 90% |
| アジ | T5 | 68% | 87% | 91% |
| チヌ (0.35) | T0（強度不足） | 17% | 27% | 34% |
| チヌ | T1（まだ不足） | 30% | 46% | 55% |
| チヌ | T2（十分） | 51% | 77% | 90% |
| チヌ | T5 | 55% | 80% | 91% |
| シーバス (0.5) | T2（まだ不足） | 16% | 24% | 28% |
| シーバス | T3（十分） | 53% | 79% | 91% |
| シーバス | T5 | 55% | 80% | 91% |
| ブリ (0.8) | T3（不足） | 32% | 48% | 57% |
| ブリ | T4 / T5 | 52% / 52% | 78% / 78% | 91% / 91% |

読み方:
- **必要強度を満たした後の道具の上積みは、同じ魚でも +1〜10pt**（アジで初心者 +10pt、中級 +5pt、上級 +1pt）。
- **腕の差は同じ道具で +30〜40pt**（シーバス T3: 初心者53%→上級91%）。
- 初心者が最高装備(T5)でも、同じ魚を T3 で釣る上級者に届かない。逆に上級者は最高装備に買い替えても伸びしろはほぼない（91% → 91%）。
- 上級者でも強度不足の魚は釣れない（T1 でシーバス 0%）。ここは「進行」であって「腕との勝負」ではない設計。

### 3.3 XP カーブ

`xpToNext(L) = round(40 + 10·L^1.65)`（Lv99 でカンスト）。

| Lv | →次の Lv に必要 | 累計 XP |
|---|---|---|
| 2 | 71 | 50 |
| 5 | 182 | 360 |
| 8 | 349 | 1,062 |
| 10 | 487 | 1,826 |
| 16 | 1,010 | 5,978 |
| 22 | 1,681 | 13,647 |
| 28 | 2,482 | 25,674 |
| 35 | 3,569 | 46,222 |
| 50 | 6,398 | 118,750 |
| 60 | 8,629 | 192,551 |
| 99 | 19,664 | 727,269 |

1 匹あたり XP（典型サイズ・品質0.5。初めての魚は ×2.5）: アジ11 / サバ12 / カサゴ14 / メバル14 / チヌ37 / シーバス52 / タチウオ49 / マダイ148 / ブリ185。

### 3.4 魚種別の収入

| 魚 | 目安Lv | baseValue | 典型サイズでの売値 | 大物(×1.5サイズ,品質1.0) |
|---|---|---|---|---|
| アジ | 1 | 40 | 40 | 81 |
| サバ | 3 | 50 | 50 | 101 |
| カサゴ | 4 | 80 | 80 | 162 |
| メバル | 7 | 90 | 90 | 182 |
| チヌ | 10 | 220 | 220 | 445 |
| シーバス | 16 | 350 | 350 | 707 |
| タチウオ | 20 | 320 | 320 | 647 |
| マダイ | 28 | 700 | 700 | 1,415 |
| ブリ | 36 | 900 | 900 | 1,819 |

### 3.5 到達時間（シミュレーション）

方針: 各スキルのプレイヤーが休みなく釣り続け、買える最上位ティアを即購入。消耗品費（餌: アタリごとに消費 + 5回/時の空消費）は控除済み。狙う魚はその時点で解禁済みの上位 3 魚種。`simulateProgress()` で再現できる。

**ティア購入までの時間（セット一式の合計価格）**

| Tier | セット価格 | 解禁Lv | 初心者 | 中級（基準） | 上級 |
|---|---|---|---|---|---|
| T1 | 1,710 | 3 | 3.0 h | **1.25 h** | 0.75 h |
| T2 | 6,790 | 8 | 12.5 h | **6.0 h** | 3.75 h |
| T3 | 26,000 | 16 | 30.8 h | **14.5 h** | 9.3 h |
| T4 | 83,200 | 28 | 62.5 h | **30 h** | 19 h |
| T5 | 430,000 | 50 | 134.5 h | **62.8 h** | 39 h |

**レベル到達時間**

| Lv | 初心者 | 中級 | 上級 |
|---|---|---|---|
| 3 | 0.75 h | 0.25 h | 0.25 h |
| 8 | 6.8 h | 3.3 h | 2 h |
| 16 | 25 h | 12.5 h | 8 h |
| 28 | 62 h | 30 h | 19 h |
| 45 | 108 h | 52 h | 33 h |
| 60 | 171 h | 82 h | 51 h |

**純収入（時給 G、餌代控除後）の目安 — 中級**: 1時間 約1,150 → 5時間 約1,470 → 10時間 約2,840 → 20時間 約6,200 → 40時間 約10,000 → 80時間 約14,400。上級はその約 1.6 倍、初心者は約 0.45 倍。

意図:
- 腕の差は進行速度の 2〜3 倍に出るが、**道具で埋まらない**（同じ時間で同じティアを買える金額ならば、成功率の差は §3.2 の通り縮まらない）。初心者も T1 まで 3 時間、T2 まで 12 時間で行ける。
- 最初の 1 時間でレベル 3〜4、最初の道具を買える（開始 300G + オキアミ10個）。
- T5（約 63 時間・43万 G）は「やり込みの目標」。T5 を買っても強くはならない（§2.2）ので、稼ぎが余った人の見た目・快適用の金の使い道。
- 消耗品費の収入比（中級・各ティアの解禁 +3Lv時点）: T0 6% / T1 17% / T2 11% / T3 18% / T4 9% / T5 6%。

---

## 4. 現実連動データ

### 4.1 インターフェース

```ts
interface RealWorldAdapter {
  readonly id: string;
  readonly attributions: readonly Attribution[];
  getSnapshot(req: { lat; lon; nowMs; jmaStation?; signal? }): Promise<WorldSnapshot>;
}
interface WorldSnapshot {
  location, localTime,                       // 端末時刻 or API の utc_offset_seconds
  weather: Field<{tempC, weatherCode, cloudPct, precipMm, pressureHpa}>,
  wind:    Field<{speedMs, gustMs, dirDeg}>,
  waves:   Field<{heightM, periodS, dirDeg}>,
  seaTempC: Field<number>,
  tide:    Field<TideState>,                 // 水位, 上げ/下げ/止まり, 次の満潮干潮, level01, 大潮/中潮/小潮
  sun:     Field<{sunriseMs, sunsetMs, phase: night|dawn|day|dusk, polar}>,
  moonAgeDays, mode, badge, attributions, disclaimerJa, notes
}
interface Field<T> { value: T | null; source: 'live'|'cache'|'calc'|'demo'; fetchedAt; provider }
```

**項目ごとに provenance（出所）を持つ**: 天気は LIVE で潮だけ DEMO、のような混在を UI が正直に出せる。

| 実装 | 内容 |
|---|---|
| `OpenMeteoAdapter` | forecast + marine を取得。JMA 地点記号があれば潮だけ気象庁。日の出/日没は Open-Meteo の `daily`、無ければ自前計算 |
| `DemoAdapter` | 完全決定論（`mulberry32(ローカル日付 + 丸めた緯度経度)`）。同じ日・同じ場所は常に同じ。オフラインでもテストでも再現できる |
| `FallbackAdapter` | 本命が失敗した項目だけ DEMO で埋める。`settings.dataMode='demo'` なら最初から DEMO |
| `createAdapter(settings)` | 上を組み立てる工場 |

### 4.2 バッジの規則

`mode` ← 各 Field の `source` から計算（`calc`=自前の天文計算は中立で数えない）。

| 状態 | mode | UI |
|---|---|---|
| 主要項目がすべて live | `live` | 「LIVE」（目立たない小表示。tooltip に出典） |
| 一部が cache（古いが有効） | `cache` | 「CACHE 12分前」 |
| 一部が demo | `partial` | **「一部 DEMO」**（どの項目か tooltip で列挙） |
| すべて demo | `demo` | **「DEMO」バッジを常時・目立つ位置に**（`mustShow: true`）。ゲームのHUDで隠せない |

DEMO のデータで得た釣果は `catchLog[].dataMode='demo'` として記録する。

### 4.3 キャッシュ・タイムアウト・レート制限

- **キャッシュ**（`TtlCache`, `localStorage:rfw.rwcache` に永続化）: forecast 新鮮 15 分 / 古くても使える上限 3 時間、marine 30 分 / 6 時間、JMA 潮位表 12 時間。新鮮なら API を叩かない。期限切れで再取得に失敗したときだけ「stale（古い値）」を `source:'cache'` で返す（JMA の年間表は 40 日まで許容。潮の表は古くても変わらないため）。
- **キー**: `lat,lon` を 0.1° に丸めたもの（約 11km）。プライバシーと、キャッシュ命中率の両方のため。
- **タイムアウト**: 1 リクエスト 6 秒（`AbortController`、既定値 `timeoutMs`）。呼び出し元の `signal` もマージ。
- **single-flight**: 同じキーの同時リクエストは 1 本にまとめる。
- **レート制限 (`RequestGate`)**: 自主上限 60 回/時（Open-Meteo 無料枠 5,000/時, 10,000/日 に対し、ゲーム側で大きく余裕を持たせる）。連続 3 回失敗でサーキットブレーカー（5 分→最大 30 分に延長）。`429` / `Retry-After` を尊重。ブレーカー中は即キャッシュ/DEMO。
- **プリフライトを起こさない**: カスタムヘッダ無しの単純 GET のみ（余計な OPTIONS 往復を避け、他サービスにも移植しやすい）。
- **パース防御**: 異常値（NaN、範囲外）は null にして Field を `demo` にフォールバック。
  - **実測した癖**: Open-Meteo の `wind_gusts_10m` が `wind_speed_10m` より小さく返ることがある（2026-10-30 の相模湾で観測）。`parseForecast` で `gust = max(gust, speed)` に補正している。

### 4.4 ローカル計算（API 不要の部分）

- 日の出/日没: NOAA の近似式（Williams の日の出日の入り式）。2026-10-30 の相模湾 (35.3N,139.5E) で **計算 06:00 / 16:50 JST** に対し、**Open-Meteo は 06:01 / 16:49**、sunrise-sunset.org は 06:01(JST) / 16:50 → ±1 分で一致。極夜・白夜は `polar` で表現。
- 朝まずめ・夕まずめ: `dayPhase()` が日の出/日没の前後で dawn/dusk を返す。
- 月齢・大潮小潮: 平均朔望月 29.530589 日（基準 2000-01-06 18:14 UTC）。**実際の月とは最大 ±0.7 日ほどずれる**（2026-10-30 は計算 18.7 日、実際は約 19.5 日）ため、大潮/小潮の判定は「ゲームの目安」として扱い、境界は ±2 日の幅を持たせている。
- 潮: 極値（満潮/干潮）の列から現在水位を余弦補間（`deriveTideState`）。Open-Meteo の時別 `sea_level_height_msl` からは放物線補間で極値を検出（`findExtremes`）。

### 4.5 無料・ブラウザ(CORS)で使える API の調査結果

2026-10-30 に `curl -H 'Origin: https://example.com'` で実際に叩いて確認（日本 35.3N,139.5E / 米国 9414290）。

| サービス | 取れるもの | 結果 | CORS | キー | ライセンス / 規約 | レート制限 |
|---|---|---|---|---|---|---|
| **Open-Meteo Forecast** `api.open-meteo.com/v1/forecast` | 気温・天気コード・雲量・降水・気圧・風速/突風/風向・日の出/日没（`daily`） | 200 | `access-control-allow-origin: *` | 不要 | データ CC BY 4.0（**表示義務あり**）。**無料枠は非商用のみ**。商用は有償プラン（Standard: 100万回/月〜） | 600/分, 5,000/時, 10,000/日, 30万/月 |
| **Open-Meteo Marine** `marine-api.open-meteo.com/v1/marine` | 波高・周期・波向・うねり・風浪・**`sea_surface_temperature`（取得できた）**・**`sea_level_height_msl`（潮位込みの水位。取得できた。時別および current）** | 200（35.3N,139.5E → 格子 35.29N,139.46E。水温 22.8℃、水位 0.85m） | `*` | 不要 | 同上 CC BY 4.0・無料枠は非商用 | 同上（Forecast と合算） |
| **sunrise-sunset.org** `api.sunrise-sunset.org/json` | 日の出/日没・薄明（UTC、`formatted=0`） | 200（06:01 / 16:50 JST） | `*` | 不要 | 無料。**帰属表示が必要**（"Powered by sunrise-sunset.org"）。**商用は要確認** | 公称なし（過負荷時に制限）。**本設計では自前計算で足りるため採用しない（予備）** |
| **NOAA CO-OPS** `api.tidesandcurrents.noaa.gov/api/prod/datagetter` | 米国沿岸の潮位予測（`product=predictions&interval=hilo`）。水温・風も別 product で可 | 200（9414290: 2026-10-30 04:27 H 1.417m 等） | `*` | 不要 | 米国政府データ（実質パブリックドメイン）。`application=` に自アプリ名を付ける作法 | 明示上限なし。常識的な頻度で（1 日数回で十分） |
| **気象庁 潮位表** `www.data.jma.go.jp/kaiyou/data/db/tide/suisan/txt/2026/<地点>.txt` | 日本の主要検潮所の **年間 毎時潮位 + 満潮干潮（固定長テキスト）** | 200（横須賀 `QS`: 2026-01-01 満潮 04:08/163cm, 14:08/169cm, 干潮 08:58/123cm, 21:32/1cm 等） | `*` | 不要 | 政府標準利用規約（第 2.0 版, CC BY 4.0 互換）。**出典表示 + 加工した旨の記載が必要** | 明示なし（静的ファイル。`cache-control: max-age=600`）。年 1 回〜月 1 回の取得で十分 |
| MET Norway Locationforecast | 天気・風 | 200 | `*` | 不要 | CC BY 4.0 / NLOD。**識別可能な User-Agent が必須で、ブラウザからは設定できないため不採用** | — |

要点:
- **潮汐**: 日本は気象庁の潮位表（正確・無料・CORS 可。固定長パーサ `parseJmaTideText` を実装・実データで検証）、米国は NOAA。それ以外の地域は Open-Meteo Marine の `sea_level_height_msl`（約 8km 格子の海洋モデル、**港内・湾奥は粗い**。陸地に当たる地点は null → DEMO。基準面は全球平均海面なので、満潮干潮の「高さ」は気象庁/NOAA の値と一致しない。ゲームでは相対値 `level01` を使う）。
- 気象庁の地点記号は `station2026.php` に一覧がある。設定 `jmaTideStation`（例 `QS`）に入れる。
- **Open-Meteo は 無料枠が非商用**。個人の趣味・試作・無料公開はよいが、広告やアプリ内課金を入れる / 有償販売するなら **有償 API（`customer-api.open-meteo.com` + API キー）への切り替えが必須**。キーをブラウザに入れると漏れるので、その場合は自前のプロキシ（Cloudflare Worker 等）を通す。`OPEN_METEO_FORECAST_URL` を差し替えるだけで移行できる作りにしてある。
- Open-Meteo の帰属表示（CC BY 4.0）: 「気象・海況データ: Open-Meteo.com (CC BY 4.0)」をクレジット/設定画面/データ表示の近くに出す。JMA は「潮位: 気象庁「潮位表」を加工して作成」。これらは `adapter.attributions` から取れる。

### 4.6 免責（UI に必ず出す）

> ゲーム内の演出用データです。海況・潮位は航行や釣行の安全判断に使用しないでください。実際の釣果を保証するものではありません。

（`DISCLAIMER_JA`。Open-Meteo Marine の公式ドキュメントにも「潮汐は約 8km 格子の数値モデルで沿岸の精度は限定的。coastal navigation には不適」「`sea_level_height_msl` の基準面は LAT ではなく全球平均海面」との注意書きがある。設定画面の「データについて」と、現実連動パネルの隅に常時掲示。）

### 4.7 動作確認（実ネットワーク + 擬似障害）

- `OpenMeteoAdapter` で実際に `badge: LIVE`、天気・風・波・水温・潮・日の出日没が取得できた（相模湾）。
- `fetch` が常に失敗 → `badge: DEMO`（`mustShow:true`）に落ちる。
- 応答しない `fetch`（既定 6 秒→テストでは 300ms に短縮）→ 設定した時間で打ち切り、DEMO。
- `DemoAdapter` は同じ日・同じ場所で 1 分後でも同一の天気（決定論）。
- JMA 横須賀 2026 年分 1,397 件の満潮/干潮を解析。1/1 の値が公式ファイルと一致。

---

## 5. 統合時の ToDo（src/ 側。本タスクでは未着手）

1. `SPECIES_ECON` は FISH_DATA.json から生成する（現在は転記。`difficulty` は `wariness` から導出）。
2. ゲームループから `landProbability` のような式は呼ばない（これは**バランス検証用の近似**）。実プレイでは本物のタイミング判定を使い、`windowBonus` を窓幅に掛け、`strength01` で FISH_DATA の `minTackle` を判定、`computeTackle()` が返す `hookOutMult` 等をファイト処理に渡す。
3. `SaveManager.load()` を起動時に 1 回。`volatile` / `NEWER_VERSION_LOCKED` / `RESTORED_FROM_BACKUP` の通知 UI を作る。
4. 設定画面: 書き出し / 読み込み（プレビュー確認付き）、データモード、地域、JMA 地点、帰属表示、免責、DEMO バッジ。
5. 収益化する場合は §4.5 の Open-Meteo 商用条件を先に解決する。

## 6. 既知の限界

- 経済数値は「定常的に釣り続ける理想プレイヤー」のシミュレーション。実際は探索・移動・失敗で遅くなるので、実プレイ時間は 1.5〜2 倍に延びる前提でテストプレイ調整すること。
- `sigmaMs`（初心者260/中級170/上級95）は仮定値。実装後に実プレイのタイミング誤差を計測して置き換える。
- 月齢は平均値（±0.7 日）。
- `checksum` は破損検知用で、改ざん防止ではない（クライアントだけで完結するゲームのため、チートは対象外）。
