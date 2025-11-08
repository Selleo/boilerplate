import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

const sql = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(sql);

(async () => {
  await migrate(db, { migrationsFolder: './src/storage/migrations' });
  await sql.end();
})();
