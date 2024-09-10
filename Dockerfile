# ビルドステージ
FROM node:20-alpine as build

WORKDIR /app

COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

COPY app ./app
WORKDIR /app/app

# 環境変数を設定
ENV DEPLOY_ENV=production

# エントリーポイントスクリプトを実行してビルド
RUN /bin/sh /app/entrypoint.sh

# 実行ステージ
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/app/dist ./dist
COPY --from=build /app/app/package.json ./
COPY --from=build /app/app/server.js ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "server.js"]