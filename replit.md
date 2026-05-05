# Replit runtime configuration

Should be only used if you're running this project on Replit. If you're running it locally, you can ignore this file.

This project uses Node and Pnpm versions specified in .nvmrc and package.json `packageManager` field.

When running in replit ONLY RUN frontend - do not run API as we will be connecting to Staging API via configured envs

After installation with `pnpm install` you can use `pnpm --filter boilerplate-web-app dev` to run the web only.

It should be accessible via localhost:5173. You might need to add some hosts to 
`vite.config.ts` to be able to run it in replit.
