# Changelog

## v1.7.0
Feat:
- Add RustFS - a local S3 Provider 🦀
- Add all remaining Shadcn components
- Implement language switcher
- Add MailPit for development mail viewer
- Add License Checker action

Fix:
- less verbose loggin in better auth requests in dev

Chore:
- Update Better Auth and remove better-auth custom implementation in favor of package
- Update all Shadcn components
- Improve domain handling in Better Auth options 
- Remove unused JWT logic
- Updated README.md license mention
- Dockerfile optimizations

## v1.6.0
Feat:
- Add Jobs system via Redis and BullMQ
- Move auth emails to Jobs

Fix:
- Fix mising deployment migrate script

Chore:
- Add CHANGELOG.MD and ROADMAP.md files
- Remove unused Local File Adapter (will be brought back better)

## v1.5.0

This version is a bit of revamp and attempt to better structure the apps allowing for easier update paths later on.

- Complete Revamp of the Boilerplate
- Upgraded NodeJS to >=24.8.0
- Upgraded PNPM to 10.15.1
- Upgraded to React 19.1.0
- Moved from Remix to React Router 7
- Upgrade to Tailwind 4 and new config styles
- Revamped frontend starting page / layout overhaul with dashboard
- Added Authentication via Better Auth /w Google Sign In and Email Confirmations
- Added testing examples with Vitest [FE/BE]
- Overall packages updates
- Added Github Actions for Pull Requests Tests
- Added Github Actions for Standard AWS Deployment
- Moved NestJS app to SWC
- 
