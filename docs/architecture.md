# AWS構成

## 構成図

```
ユーザー
  │
  │ HTTP (ポート80)
  ▼
[EC2 (t3.micro)] ─── ap-southeast-2 (シドニー)
  │
  ├── nginx (リバースプロキシ)
  │     ├── /api  → Rails (ポート3000)
  │     └── /     → Next.js (ポート3001)
  │
  ├── Rails API サーバー (Puma / ポート3000)
  │     └── RAILS_ENV=production
  │
  └── Next.js フロントエンド (ポート3001)

  │
  │ MySQL (ポート3306)
  ▼
[RDS (MySQL 8.x)] ─── ap-southeast-2 (シドニー)
  └── eventplanner_production
```

## 構成の詳細

| サービス | 内容 |
|---------|------|
| EC2 | t3.micro / Ubuntu 22.04 / ap-southeast-2 |
| RDS | MySQL 8.x / t3.micro / ap-southeast-2 |
| nginx | リバースプロキシとしてAPIとフロントを振り分け |
| Rails | APIサーバー（Puma）/ productionモードで起動 |
| Next.js | フロントエンドサーバー / productionビルド済み |

## ネットワーク構成

| 項目 | 設定 |
|-----|------|
| VPC | デフォルトVPC |
| EC2 セキュリティグループ | HTTP(80) / SSH(22) / 3000 / 3001 を開放 |
| RDS セキュリティグループ | EC2からのMySQL(3306)接続のみ許可 |

## 技術スタック

### バックエンド

| 役割 | 技術 | バージョン | 選定理由 |
|------|------|----------|---------|
| 言語 | Ruby | 3.3.2 | 記述量が少なく可読性が高い・Railsとの親和性 |
| フレームワーク | Ruby on Rails | 8.1.3 | APIモードで軽量に使用可能・設定より規約で素早く開発できる |
| 認証 | JWT（jwt gem） | 3.2.0 | ステートレスな認証・フロントとの分離に適している |
| パスワード暗号化 | bcrypt | 3.1.x | Railsの `has_secure_password` と組み合わせて安全に暗号化 |
| ORM | Active Record | Rails同梱 | SQLを意識せずモデルでDB操作が可能 |

### フロントエンド

| 役割 | 技術 | バージョン | 選定理由 |
|------|------|----------|---------|
| フレームワーク | Next.js | 16.x | App Router・SSR対応・ファイルベースルーティング |
| 言語 | TypeScript | 5.x | 型安全・補完が効くことでバグを事前に防げる |
| スタイリング | Tailwind CSS | 4.x | クラス名でUIを組め・デザインの一貫性を保ちやすい |
| 状態管理 | React Context API | React同梱 | 外部ライブラリなしでログイン状態をアプリ全体で共有 |
