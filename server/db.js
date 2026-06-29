import dotenv from "dotenv";
import pg from "pg";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: join(__dirname, ".env"),
});

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
    })
  : null;

export function isDatabaseConfigured() {
  return Boolean(pool);
}

export async function query(text, params = []) {
  if (!pool) {
    throw new Error("DATABASE_URL não configurada. Usando dados em memória.");
  }

  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error("Erro ao executar consulta no PostgreSQL:", error.message);
    throw error;
  }
}
