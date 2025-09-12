import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/storage/schema",
  out: "./src/storage/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:guidebook@localhost:5432/guidebook",
  },
  casing: "snake_case",
  verbose: true,
  strict: true,
});
