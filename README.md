# Selleo Boilerplate

That's a starting point of new apps. Consists of Frontend, Backend and necessary technologies to jump start a project.
High level overview is as follows: Authentication, Authorization, Emails, design-system, API communication, OpenAPI, Tests, Github Actions
- NestJS App with Typebox for Validation
- React Router 7 (React 19) SPA
- Better Auth for Authentication and Authorization
- Admin and User roles - ability to add more
- React Emails for Emails with adapters
- Tailwind 4 with Shadcn Design System
- OpenAPI and Frontend Client Generation
- Tests Setup - FE & BE
- GH Actions on PR
- GH Actions for Deploy on our AWS stack
- Shared packages build system

Main Page
<img width="1783" height="1005" alt="image" src="https://github.com/user-attachments/assets/3dc21a6b-5b60-44b0-b267-61631d9f2294" />

Auth Page
<img width="1790" height="999" alt="image" src="https://github.com/user-attachments/assets/c5da3660-c119-4875-8648-70fc77927969" />

Dashboard
<img width="1788" height="1004" alt="image" src="https://github.com/user-attachments/assets/e4586368-12f6-4f5f-85f5-16b0928d9145" />



### Apps and Packages Structure

- apps
  - `api`: a NestJS backend application working as API
  - `web`: React Router SPA on Vite
  - `reverse-proxy`: for domains and https during development
- packages
  - `email-templates`: a package for email templates
  - `eslint-config`: a package for eslint configuration
  - `typescript-config`: a package for typescript configuration
  - `shared`: a shared package for data

### Install

To start with the setup make sure you have the correct NodeJS version stated in [.tool-versions](./.tool-versions).
For the node versioning we recommend [asdf](https://asdf-vm.com/). At the time of writing this readme the version is `24.8.0`

After these steps, run the following command

```sh
pnpm install
```

Now to configure our reverse proxy we need to install [Caddy](https://caddyserver.com/docs/install#homebrew-mac). You
can do this using `homebrew` on mac.

> [!IMPORTANT]  
> First run has to be run by hand to configure caddy. Later on it will automatically
> start with the app start script.

To do that proceed with the following

```sh
cd ./apps/reverse-proxy
caddy run
```

After running caddy proceed with the on screen instructions.

The final setup step is to configure both the `api` and `web` applications.

To set up the backend envs and database:

```sh
cp ./apps/api/.env.example ./apps/api/.env
docker-compose up
```

Next, setup the env variables for frontend:

```sh
cp ./apps/web-app/.env.example ./apps/web-app/.env
```

### Migrations

Once the docker is up and running we need to run the migrations. To do that run the following command

```sh
pnpm db:migrate
```

### Develop

Now, from the root of the `examples/common_nestjs_remix` directory, run `pnpm dev` to start all applications in parallel.
You should be able to access your app at the following addresses:

| Service | URL                                                                               |
| ------- | --------------------------------------------------------------------------------- |
| Web app | [`https://app.boilerplate.localhost`](https://app.boilerplate.localhost)          |
| Api     | [`https://api.boilerplate.localhost`](https://api.boilerplate.localhost)          |
| Swagger | [`https://api.boilerplate.localhost/api`](https://api.boilerplate.localhost/api)  |

### Commands

- #### Database

  - generate migration

    ```sh
    pnpm db:generate -- --name your_migration_name
    ```

  - run migrations

    ```sh
    pnpm db:migrate
    ```

- #### HTTP Client

  To generate the http client run the following command.

  ```sh
  pnpm generate:client
  ```

  This command automates the process of creating a TypeScript client for the API based on the Swagger specification.

- #### Email Templates

  Email templates are generated on every start of turborepo. To generate them manually run the following command in `packages/email-templates`.

  ```sh
  pnpm build
  ```

  The mailhog service is available at [mailbox.boilerplate.localhost](https://mailbox.boilerplate.localhost)

- #### Testing
  - **Frontend**:
    ```sh
    pnpm test:web
    ```
    ```sh
    pnpm test:web:e2e
    ```
  - **Backend**:
    ```sh
    pnpm test:api
    ```
    ```sh
    pnpm test:api:e2e
    ```

#### CI Actions

CI is set up to run on:
- Test/Lint - on PRs
- Deploy - on Push Main (need to be configured for own aws)

#### Infrastructure

The terraform folder structure should be copied from examples in https://github.com/Selleo/terraform-aws-modules

The structure should be as follows

```
Root
├── terraform
│   ├── modules (here copy all modules)
│   |── environments
|   |    |----production
|   |    |----dev
|   |    |----staging
```


## Legal notice

This project was generated using [Selleo Boilerplate](https://github.com/Selleo/boilerplate) which is licensed under the MIT license.
