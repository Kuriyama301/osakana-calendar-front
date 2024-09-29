# ベースイメージ
FROM node:20-alpine as base
WORKDIR /app
COPY app/package*.json ./

# 開発環境
FROM base as development
RUN npm ci || npm install
COPY app ./
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
RUN npx tailwindcss init -p
RUN chown -R node:node /app
USER node
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# ビルドステージ
FROM base as build
RUN npm ci || npm install
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
COPY app ./
RUN npx tailwindcss init -p
RUN npm run build

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