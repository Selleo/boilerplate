import { betterAuth } from "better-auth";
import { createAuthMiddleware, openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "../storage/schema/index";

import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not found on .env");
}

const queryClient = postgres(process.env.DATABASE_URL!);

const db = drizzle({ client: queryClient });

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId) {
  throw new Error("GOOGLE_CLIENT_ID not found on .env");
}

if (!googleClientSecret) {
  throw new Error("GOOGLE_CLIENT_SECRET not found on .env");
}

const DEV_SOCIAL = process.env.DEV_SOCIAL === "true";

// In dev mode allow localhost:5173 and localhost:5174 as trusted origins

export const auth = betterAuth({
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      console.log(`[Auth][${ctx.method}] Incoming request: ${ctx.path}`);
      if (
        process.env.NODE_ENV === "development" &&
        process.env.LOG_LEVEL === "debug"
      ) {
        console.log(`[Auth][${ctx.method}] Headers:`, ctx.headers);
        if (ctx.method !== "GET") {
          console.log(`[Auth][${ctx.method}] Body:`, JSON.stringify(ctx.body));
        }
      }
    }),
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
  advanced: DEV_SOCIAL
    ? undefined
    : {
        crossSubDomainCookies: {
          enabled: true,
          domain: "guidebook.localhost",
        },
      },
  trustedOrigins: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://app.guidebook.localhost",
  ],
  logger: {
    level: "debug",
    log(level, message, ...args) {
      console[level](message, ...args);
    },
  },
  plugins: [openAPI()],
  // Default but in case they change it down the line
  telemetry: {
    enabled: false,
  },
});
