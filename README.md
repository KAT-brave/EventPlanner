# EventPlanner

イベント予定を登録・管理できるWebアプリです。

---

## アプリ概要

「予定がLINEやメモに散らばって後から探せない」という課題を解決するために開発しました。

イベントの作成・一覧表示・詳細確認・編集・削除ができ、カテゴリ絞り込みやキーワード検索で素早く予定を確認できます。

---

## アプリURL

（デプロイ後に記載）

---

## 使用技術

| カテゴリ | 技術 |
|---|---|
| フロントエンド | Next.js |
| バックエンド | Ruby on Rails（APIモード） |
| データベース | MySQL |
| インフラ | AWS EC2 / RDS |
| バージョン管理 | GitHub |

---

## 機能一覧

- ユーザー登録・ログイン・ゲストログイン
- イベントの作成・一覧・詳細・編集・削除
- キーワード検索・カテゴリ絞り込み・日付順ソート
- フラッシュメッセージ・入力バリデーション
- 作成者のみ編集・削除できる権限制御

---

## 画面スクリーンショット

（実装後に追加）

---

## ER図

（実装後に追加）

---

## API一覧

| メソッド | URL | 説明 |
|---|---|---|
| POST | `/api/v1/auth/signup` | ユーザー登録 |
| POST | `/api/v1/auth/login` | ログイン |
| DELETE | `/api/v1/auth/logout` | ログアウト |
| POST | `/api/v1/auth/guest_login` | ゲストログイン |
| GET | `/api/v1/events` | イベント一覧 |
| GET | `/api/v1/events/:id` | イベント詳細 |
| POST | `/api/v1/events` | イベント作成 |
| PUT | `/api/v1/events/:id` | イベント編集 |
| DELETE | `/api/v1/events/:id` | イベント削除 |
| GET | `/api/v1/categories` | カテゴリ一覧 |

---

## 工夫した点

（実装後に記載）

---

## 苦労した点

（実装後に記載）

---

## 今後の改善点

- カレンダー表示
- 参加予定フラグ
- イベントの公開・非公開
- マイページ

---

## ローカル環境での起動方法

### バックエンド

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s
```

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

---

## AWS構成

（デプロイ後に追加）
