FROM node:23.5.0-alpine3.20 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN yarn install --prod --frozen-lockfile


FROM node:23.5.0-alpine3.20 as prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .
CMD ["node", "app.js" ]