// database orm: https://orm.drizzle.team/docs/get-started-postgresql
// database: https://console.neon.tech/app/projects/rapid-dust-29817313/quickstart

import { setupDrizzle } from 'drizzle-orm/postgres';
import { PostgresConnection } from 'drizzle-orm/postgres/connection';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL is not set');
}

export const db = setupDrizzle({
  pool: new PostgresConnection(dbUrl),
});
