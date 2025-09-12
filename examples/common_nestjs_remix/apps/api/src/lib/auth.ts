import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "../storage/schema/index";

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

  plugins: [openAPI()],
});
