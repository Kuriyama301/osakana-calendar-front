# ビルドステージ
FROM node:20-alpine as build

WORKDIR /app/app

COPY app/package*.json ./
RUN npm install

COPY app ./
RUN npm run build

# 実行ステージ
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/app/dist ./app/dist
COPY --from=build /app/app/package.json ./app/
COPY --from=build /app/app/server.js ./app/

WORKDIR /app/app

RUN npm install --only=production
RUN npm install express

ENV PORT=3000
EXPOSE $PORT

# entrypoint.shをコピーして実行権限を付与
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# ENTRYPOINTを設定
ENTRYPOINT ["/entrypoint.sh"]

# CMDはENTRYPOINTスクリプトに引数として渡される
CMD ["node", "server.js"]