# Selleo Boilerplate

Modern full-stack starter kit combining a NestJS API, React Router 7 web app, and shared tooling (emails, lint rules, TypeScript configs) in a single pnpm workspace. Use it to launch new projects quickly with local HTTPS, auth, testing, and CI already wired in.

<img width="1783" height="1005" alt="Main page screenshot" src="https://github.com/user-attachments/assets/3dc21a6b-5b60-44b0-b267-61631d9f2294" />

---

## Table of Contents

1. [Quickstart](#quickstart)
2. [Tech Stack & Features](#tech-stack--features)
3. [Monorepo Layout](#monorepo-layout)
4. [Prerequisites](#prerequisites)
5. [Environment Setup](#environment-setup)
6. [Local Development](#local-development)
7. [Tooling Commands](#tooling-commands)
8. [Infrastructure Notes](#infrastructure-notes)
9. [CI & Deployment](#ci--deployment)
10. [Maintenance Tips](#maintenance-tips)
11. [Updating Existing Apps](#updating-existing-apps)
12. [Screenshots](#screenshots)
13. [Legal Notice](#legal-notice)

---

## Quickstart

1. Install the required tooling (see [Prerequisites](#prerequisites)).
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Bootstrap environment files:
   ```sh
   cp apps/api/.env.example apps/api/.env
   cp apps/web-app/.env.example apps/web-app/.env
   ```
4. Start infrastructure services:
   ```sh
   docker compose up -d
   ```
5. Run the reverse proxy once to trust the local certificates:
   ```sh
   cd apps/reverse-proxy
   caddy run
   ```
   Follow the interactive prompts; future runs happen automatically via `pnpm dev`.
6. From the repo root, launch everything:
   ```sh
   pnpm dev
   ```

---

## Tech Stack & Features

| Area        | Highlights |
| ----------- | ---------- |
| **API**     | NestJS + TypeScript, schema validation via TypeBox, Better Auth for authentication/authorization, generated OpenAPI spec, role-based access control. |
| **Web**     | React 19 SPA on React Router 7 and Vite, Tailwind CSS v4 with shadcn/ui primitives, generated API client for consistent typing. |
| **Platform**| Local HTTPS with Caddy, shared packages for email templates and configurations, turborepo orchestration, pnpm monorepo layout. |
| **Quality** | Vitest-based unit and e2e setups for both API and web, GitHub Actions for lint/test on PRs, deploy workflow scaffolded for AWS. |

---

## Monorepo Layout

| Path                  | Description |
| --------------------- | ----------- |
| `apps/api`            | NestJS backend (package name: `boilerplate-api`). |
| `apps/web-app`        | React Router SPA on Vite (`boilerplate-web-app`). |
| `apps/reverse-proxy`  | Caddy configuration enabling local HTTPS domains. |
| `packages/email-templates` | React email templates compiled for transactional emails. |
| `packages/config-eslint`   | Shared ESLint configuration (`@repo/eslint-config`). |
| `packages/typescript-config` | Reusable `tsconfig` bases (`@repo/typescript-config`). |
| `packages/shared`     | Cross-cutting shared utilities and data structures. |

---

## Prerequisites

Verify/install the tooling below before running the stack:

- Node.js ≥ 24.8.0 (check `.tool-versions` if using `asdf`).
- pnpm 10.15.x (installed globally or via `corepack enable`).
- Docker Desktop or Docker Engine + Docker Compose V2.
- Caddy (for local HTTPS certificates). macOS users can `brew install caddy`; Linux/WSL users should follow the [official guide](https://caddyserver.com/docs/install).
- Optional but recommended: Mailhog UI available once Docker is running (`localhost:8025`).

---

## Environment Setup

1. **Environment variables**
   - Copy `.env.example` files for both API and web as shown in the [Quickstart](#quickstart).
   - Adjust secrets (JWT keys, SMTP, etc.) as needed.

2. **Database & Mailhog**
   ```sh
   docker compose up -d
   ```
   - Default Postgres connection from `docker-compose.yml`: host `localhost`, port `5432`, db `boilerplate`, password `boilerplate`.

3. **Reverse proxy (first run only)**
   ```sh
   cd apps/reverse-proxy
   caddy run
   ```
   - Accept certificate prompts to enable the `*.boilerplate.localhost` domains.

4. **Migrations**
   ```sh
   pnpm db:migrate
   ```
   Run once after the database is up to align schema.

---

## Local Development

Start all apps from the repo root:

```sh
pnpm dev
```

You can also target individual workspaces:

- API only: `pnpm --filter boilerplate-api dev`
- Web only: `pnpm --filter boilerplate-web-app dev`
- Reverse proxy reload: `pnpm --filter reverse-proxy dev`

**Local URLs**

| Service  | URL |
| -------- | --- |
| Web App  | https://app.boilerplate.localhost |
| API      | https://api.boilerplate.localhost |
| Swagger  | https://api.boilerplate.localhost/api |
| Mailhog  | https://mailbox.boilerplate.localhost |

---

## Tooling Commands

**Database**
- Generate migration: `pnpm db:generate -- --name your_migration_name`
- Run migrations: `pnpm db:migrate`

**Client Generation**
- Update the typed API client: `pnpm generate:client`

**Emails**
- Manual rebuild (normally handled by turborepo):  
  ```sh
  pnpm run --filter email-templates build
  ```

**Quality**
- Lint: `pnpm lint`
- Format: `pnpm format`
- Type-check API: `pnpm typecheck:api`
- Test web: `pnpm test:web`
- Test web e2e: `pnpm test:web:e2e`
- Test API: `pnpm test:api`
- Test API e2e: `pnpm test:api:e2e`

---

## Infrastructure Notes

- Start from the terraform examples in [Selleo/terraform-aws-modules](https://github.com/Selleo/terraform-aws-modules).
- Recommended directory layout:
  ```
  terraform/
    modules/         # copy reusable modules here
    environments/
      dev/
      staging/
      production/
  ```
- Document any environment-specific variables in the corresponding Terraform environment folder README.

---

## CI & Deployment

- GitHub Actions run linting and tests on every pull request.
- Deploy workflow triggers on pushes to `main`; supply your own AWS credentials/secrets before enabling.
- Add new jobs (e.g., migrations, smoke tests) by extending workflows in `.github/workflows/`.

---

## Maintenance Tips

- Regenerate the Swagger client (`pnpm generate:client`) whenever API DTOs change.
- Keep migrations in sync with feature branches to avoid drift; run `pnpm db:migrate` after each pull.
- Update shared configs (`packages/config-eslint`, `packages/typescript-config`) centrally to propagate standards across workspaces.

---

## Updating Existing Apps

Use the curated update prompts and diffs in `/updates` whenever you need to bring an older project onto the newest boilerplate release:

- **Take the prompt**: Open `updates/prompt.md`, adjust any metadata (e.g., repo URL, version), and copy the whole instruction block—this is what you paste into Codex/Cursor/Claude Code to describe the upgrade workflow.
- **Copy the newest update diff**: Grab the latest file under `updates/<version>/<version>-update-diff.md` (right now `updates/1.6.0/1.6.0-update-diff.md`) so the assistant sees every code change required for the release.
- **Apply it via your AI helper**: Feed both the prompt and the diff into Codex, Cursor, or Claude Code, let it apply the patch set, then review, run tests, and commit once everything passes.

---

## Screenshots

Auth Page  
<img width="1790" height="999" alt="Authentication page screenshot" src="https://github.com/user-attachments/assets/c5da3660-c119-4875-8648-70fc77927969" />

Dashboard  
<img width="1788" height="1004" alt="Dashboard screenshot" src="https://github.com/user-attachments/assets/e4586368-12f6-4f5f-85f5-16b0928d9145" />

---

## Legal Notice

This project was generated using [Selleo Boilerplate](https://github.com/Selleo/boilerplate) which is licensed under the MIT license.
