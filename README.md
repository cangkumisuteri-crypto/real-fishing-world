# REAL FISHING WORLD — Phase 1（歩ける 3D 港プレビュー）

架空の港「波戸浦港」を一人称で歩き回り、好きな水際で「釣り開始」を押すと釣りの構えに入れる、スマホ（iPhone Safari 最優先）向けの 3D プレビューです。

- TypeScript + Three.js + Vite（静的ビルド、`base: './'`）
- 実装済み: 3D 港（防波堤・岸壁・砂浜・岩場・テトラ・建物・つり具店の仮置き）、波と空（現地時刻の昼夜）、バーチャルジョイスティック＋スワイプ視点（PC は WASD＋ドラッグ）、衝突判定、釣り場判定＋釣りモード UI、マップ、メニュー（画質・速度・視点）、localStorage セーブ
- 未実装（次の Phase 以降）: キャスト／アタリ／ファイト／魚／所持品・経済／天気・潮の実データ など。`SPEC_NOTES.md` に仕様メモあり。

## 使い方
```
npm install
npm run dev        # 開発
npm run build      # dist/ に静的ファイルを生成
node tests/qa.mjs  # Playwright QA（要 dist/、WebKit/Chromium）
```
URL パラメータ: `?t=21`（時刻をデモ指定）, `?q=low|mid|high`, `?qa=1`（QA フック）。

テクスチャは CC0（`src/assets/textures/LICENSE.txt`）。
