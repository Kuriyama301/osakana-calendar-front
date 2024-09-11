# ビルドステージ
FROM node:20-alpine as build

WORKDIR /app

COPY app/package*.json ./
RUN npm install

COPY app ./
RUN npm run build

# 実行ステージ
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/server.js ./

RUN npm install --only=production

ENV PORT=3000
EXPOSE $PORT
CMD ["node", "server.js"]