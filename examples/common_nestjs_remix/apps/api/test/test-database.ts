import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/storage/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { DatabasePg } from "../src/common";
import path from "path";
import { sql as sqlRaw } from "drizzle-orm";

let sql: ReturnType<typeof postgres>;
let db: DatabasePg;

export async function setupTestDatabase(): Promise<{
  db: DatabasePg;
  connectionString: string;
}> {
  const explicitConnectionString = process.env.DATABASE_TEST_URL!;

  sql = postgres(explicitConnectionString);
  db = drizzle(sql, { schema }) as DatabasePg;

  await migrate(db, {
    migrationsFolder: path.join(__dirname, "../src/storage/migrations"),
  });

  await db.execute(
    sqlRaw`select table_name from information_schema.tables where table_schema = 'public'`,
  );

  return {
    db,
    connectionString: explicitConnectionString,
  };
}

export async function closeTestDatabase() {
  if (sql) await sql.end();
}
