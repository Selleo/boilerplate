FROM node:24-alpine AS build

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

COPY package*.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/api/package*.json /app/apps/api/

COPY packages/email-templates/package*.json /app/packages/email-templates/
COPY packages/config-eslint/package*.json /app/packages/config-eslint/
COPY packages/typescript-config/package*.json /app/packages/typescript-config/
COPY packages/shared/package*.json /app/packages/shared/


RUN pnpm install

COPY apps/api /app/apps/api

COPY packages/email-templates /app/packages/email-templates
COPY packages/config-eslint /app/packages/config-eslint
COPY packages/typescript-config /app/packages/typescript-config/
COPY packages/shared /app/packages/shared

RUN pnpm build-email --filter=@repo/email-templates
RUN pnpm build-shared --filter=@repo/shared
RUN pnpm install
RUN pnpm build --filter=guidebook-api

FROM node:24-alpine AS production

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

COPY package*.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/api/package*.json /app/apps/api/

COPY packages/email-templates/package*.json /app/packages/email-templates/
COPY packages/config-eslint/package*.json /app/packages/config-eslint/
COPY packages/typescript-config/package*.json /app/packages/typescript-config/
COPY packages/shared/package*.json /app/packages/shared/

# Copy pre-built email-templates
COPY --from=build /app/packages/email-templates/dist /app/packages/email-templates/dist

COPY --from=build /app/packages/shared/dist /app/packages/shared/dist

RUN pnpm install

WORKDIR /app/apps/api

COPY --from=build /app/apps/api/dist .
COPY --from=build /app/apps/api/src/storage/migrations ./src/storage/migrations

ADD --chmod=755 apps/api/entrypoint.sh .

ENTRYPOINT [ "./entrypoint.sh" ]
