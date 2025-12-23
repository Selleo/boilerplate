FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

FROM base AS prune

COPY . .

RUN pnpm dlx turbo@2.6.3 prune --scope=boilerplate-api --scope=@repo/email-templates --scope=@repo/shared --docker

FROM base AS deps

COPY --from=prune /app/out/json/ ./

RUN pnpm install --frozen-lockfile

###########################

FROM base AS build

COPY --from=deps /app/ /app/
COPY --from=prune /app/out/full/ ./

RUN pnpm build-email --filter=@repo/email-templates \
 && pnpm build-shared --filter=@repo/shared \
 && pnpm build --filter=boilerplate-api

############################

FROM node:24-alpine AS production

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

COPY --from=prune /app/out/json/ ./

RUN pnpm install --prod --frozen-lockfile \
 && pnpm store prune \
 && rm -rf /root/.cache

WORKDIR /app/apps/api

COPY --from=build /app/apps/api/dist .
COPY --from=build /app/apps/api/src/storage/migrations ./src/storage/migrations
COPY --from=build /app/packages/email-templates/dist /app/packages/email-templates/dist
COPY --from=build /app/packages/shared/dist /app/packages/shared/dist

COPY --chmod=755 apps/api/entrypoint.sh .

ENTRYPOINT [ "./entrypoint.sh" ]
