## river-front

river のフロントリポジトリです。

## 環境

- フレームワーク：Next.js
- ライブラリ：React
- 言語：TypeScript
- 非同期ライブラリ：axios
- Form ライブラリ：React Hook Form
- バリデーションライブラリ：zod
- フェッチライブラリ：SWR
- 状態管理ライブラリ：zustand
- UI ライブラリ：Material UI
- UI ライブラリ：Material Icons
- アニメーションライブラリ：framer-motion

## 環境構築

下記の流れに従って、環境構築を行なってください。

#### clone

```
git clone git@github.com:NarumiNaito/river-front.git
```

#### .env「.env.example をコピーし.env にリネームして下さい.」

```
cp .env.example .env
```

#### build

```
docker compose build
```

#### コンテナ作成

```
docker compose up -d
```

#### コンテナへの接続

```
docker compose exec app /bin/sh
```
