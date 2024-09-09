#!/bin/sh

set -e

cd /app/app

# node_modulesが存在する場合のみ削除を試みる
# if [ -d "node_modules" ]; then
#     echo "Removing existing node_modules..."
#     rm -rf node_modules || true
# fi

# package-lock.jsonが存在する場合のみ削除
if [ -f "package-lock.json" ]; then
    echo "Removing existing package-lock.json..."
    rm -f package-lock.json || true
fi

# プロジェクトが既に存在する場合は依存関係を更新
if [ -f "package.json" ]; then
    echo "Existing project found. Updating dependencies..."
    npm install
    # Axiosをインストール
    npm install axios
else
    # 新しいプロジェクトを作成（非対話式）
    echo "Creating new Vite + React project..."
    npm create vite@latest . -- --template react --skip-git
    npm install
    # Axiosをインストール
    npm install axios
fi

# vite.config.jsを作成または更新
echo "import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});" > vite.config.js

# 開発サーバーを起動
npm run dev -- --host