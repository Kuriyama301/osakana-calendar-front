# ベースイメージ
FROM node:20-alpine as base
WORKDIR /app
COPY app/package*.json ./

# ビルドステージ
FROM base as build
RUN npm install
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
COPY app ./
RUN npx tailwindcss init -p
RUN npm run build
COPY app/public ./dist

# 本番環境
FROM node:20-alpine as production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js ./
RUN npm install --only=production
ENV PORT=3000
EXPOSE $PORT
USER node
CMD ["node", "server.js"]