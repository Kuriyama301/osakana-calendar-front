# ベースイメージ
FROM node:20-alpine as base
WORKDIR /app
COPY app/package*.json ./

# ビルドステージ
FROM base as build
RUN npm ci || npm install
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
COPY app ./
RUN npx tailwindcss init -p
RUN npm run build
# 静的ファイルを明示的にコピー
# COPY app/src/assets ./dist/assets

# 本番環境
FROM node:20-alpine as production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js ./
RUN npm ci --only=production || npm install --only=production
ENV PORT=3000
EXPOSE $PORT
USER node
CMD ["node", "server.js"]