# エアドロ太郎のFlareノート｜ツール

Flare Network の機能を、ウォレット接続なし・FLR不要でブラウザから体験できる、エアドロ太郎（eadorotarou）が個人で運営する非公式のツール集です。日本語・English・한국어 に対応しています。

## ツール

- ライブ価格ボード（FTSOv2）：通貨をタップすると24時間・3日間のチャート
- XRP ⇔ FLR 換算（FTSOv2）
- 価格の「証明」をチェック（FTSO Scaling・Merkle証明）
- FXRPダッシュボード（FAssets）
- Smart Accountsチェッカー
- Flare乱数で抽選（Secure Random Number）
- 委任チェッカー（WNat・RewardManager）
- ネットワークの状態（Flare Systems Protocol）
- AIにFlareをつなぐ（Flare MCP Server）

## しくみ

サーバーはありません。ページを開いた人のブラウザが Flare の公開 RPC（flare-api.flare.network）に直接問い合わせて、チェーンを読むだけです。コントラクトのアドレスは公式の FlareContractRegistry から毎回取得します。

## ファイル

- `index.html`：ページ本体
- `i18n.js` / `i18n-en.js` / `i18n-ko.js`：言語の切り替えと英語・韓国語の訳
- `providers.js`：FTSOプロバイダ名の一覧（名前はチェーン上にないため、スナップショット）
- `ethers.umd.min.js`：チェーンを読むためのライブラリ（ethers v6）

※ Flare Foundation とは関係ありません。投資の助言ではありません。
