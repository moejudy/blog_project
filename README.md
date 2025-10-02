# MyBlog
ブログ運営に必要な基本機能を一通り実装しました


## 実装した主な機能
- ユーザー認証機能（Firebase Authenticationを使用）
- ダークモード切り替え（状態管理によるテーマ変更）
- ブログ記事のCRUD機能（作成・閲覧・編集・削除が可能）

## サンプルサイト

【デモサイト】https://myblog-b631f.web.app/blog?blog=TestBlog 
【ログイン情報】  
ユーザーID：demo@test.com
パスワード：test123

デモ用ですので、投稿・削除の操作は自由に行っていただけますが、テストデータであることをご理解ください。


## Firebase
firebaseConfigTest.ts を firebaseConfig.ts にリネームして、以下を入力してください：
```js
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```


## 開発用デプロイ
```js
npm run dev
```


## 使用技術
- フロントエンド: React / TypeScript / Vite
- バックエンド & ホスティング: Firebase
  - Firebase Authentication（ユーザー認証）
  - Firestore Database（記事データの保存・取得）
  - Firebase Hosting（デプロイ）
- スタイリング: CSS（必要に応じてUI/UXを意識した調整）
- 背景画像素材: https://fr.pattern.monster/
- 開発環境: Node.js v20.11./npm 10.2.4/Git

## 環境変数の設定
このプロジェクトでは Firebase の設定を環境変数から読み込むようにしています。  
`.env.example` を参考に `.env` ファイルを作成し、各自の Firebase プロジェクトの値を入力してください。

例（`.env.example` の内容）:
```env
VITE_API_KEY=your_api_key_here
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id

```

# MyBlog
A simple blog application with essential features for blog management.

## Main Features Implemented
- User authentication (using Firebase Authentication)
- Dark mode toggle (theme switching with state management)
- Blog post CRUD functionality (create, read, update, delete)

## Sample Site
- Site example: https://myblog-b631f.web.app/
- Blog example: https://myblog-b631f.web.app/blog?blog=JudyBlog

## Firebase
Rename `firebaseConfigTest.ts` to `firebaseConfig.ts` and fill in the following:
```js
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

```

## Development Deployment
```js
npm run dev
```

## Environment Variables
This project loads Firebase configuration from environment variables.  
Please create a `.env` file based on `.env.example` and fill in your own Firebase project values.

Example (`.env.example`):
```env
VITE_API_KEY=your_api_key_here
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id

```
