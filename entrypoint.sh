#!/bin/sh

  set -e

  cd /app/app

  # 環境変数に基づいてpackage.jsonを生成する関数
  generate_package_json() {
      local deploy_env=$1
      echo '{
    "name": "osakana-calendar",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
      "preview": "vite preview"' > package.json

      if [ "$deploy_env" = "production" ]; then
          echo '    ,
      "start": "node server.js",
      "heroku-postbuild": "npm run build"' >> package.json
      fi

      echo '  },
    "dependencies": {
      "axios": "^0.21.1",
      "react": "^18.2.0",
      "react-dom": "^18.2.0"' >> package.json

      if [ "$deploy_env" = "production" ]; then
          echo '    ,
      "express": "^4.17.1"' >> package.json
      fi

      echo '  },
    "devDependencies": {
      "@types/react": "^18.2.15",
      "@types/react-dom": "^18.2.7",
      "@vitejs/plugin-react": "^4.0.3",
      "eslint": "^8.45.0",
      "eslint-plugin-react": "^7.32.2",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.3",
      "vite": "^4.4.5"
    }
  }' >> package.json
  }

  # DEPLOY_ENV環境変数に基づいてpackage.jsonを生成
  generate_package_json "${DEPLOY_ENV:-development}"

  # package-lock.jsonが存在する場合のみ削除
  if [ -f "package-lock.json" ]; then
      echo "Removing existing package-lock.json..."
      rm -f package-lock.json || true
  fi

  # 依存関係をインストール
  npm install

  # 環境に応じてサーバーを起動
  if [ "$DEPLOY_ENV" = "production" ]; then
    echo "Starting production server..."
    node server.js
  else
    echo "Starting development server..."
    npm run dev -- --host
  fi