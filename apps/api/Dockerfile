FROM node:24-alpine AS build

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

COPY package*.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/api/package*.json apps/api/
COPY packages/*/package*.json packages/

RUN pnpm install --frozen-lockfile

COPY apps/api /app/apps/api
COPY packages packages

RUN pnpm install --frozen-lockfile

RUN pnpm build-email --filter=@repo/email-templates \
 && pnpm build-shared --filter=@repo/shared \
 && pnpm build --filter=boilerplate-api

FROM node:24-alpine AS production

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

COPY package*.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/api/package*.json apps/api/
COPY packages/*/package*.json packages/

COPY --from=build /app/packages/email-templates /app/packages/email-templates
COPY --from=build /app/packages/shared /app/packages/shared

RUN pnpm install --prod --frozen-lockfile \
    && pnpm store prune \
    && rm -rf /root/.cache

WORKDIR /app/apps/api

COPY --from=build /app/apps/api/dist .
COPY --from=build /app/apps/api/src/storage/migrations ./src/storage/migrations

COPY --chmod=755 apps/api/entrypoint.sh .

ENTRYPOINT [ "./entrypoint.sh" ]
