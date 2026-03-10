FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache postgresql-client

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile --production=true

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/ormconfig.js ./ormconfig.js
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3333

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "start"]
