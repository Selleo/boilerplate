import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
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

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:5137",
    "http://localhost:5138",
    "http://localhost:3000",
  ],

  plugins: [openAPI()],
});
