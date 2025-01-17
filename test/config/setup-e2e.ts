import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';

import 'dotenv/config';

const schemaId = randomUUID();
let pool: Pool;

// Função para gerar o URL com o schema dinâmico
function generateUniqueDatabaseUrl(schemaId: string): string {
  const url = new URL(process.env.DATABASE_URL!);
  url.searchParams.set('schema', `testSchema-${schemaId}`);
  return url.toString();
}

beforeAll(async () => {
  const uniqueDatabaseUrl = generateUniqueDatabaseUrl(schemaId);

  // Atualiza o DATABASE_URL para o schema dinâmico
  process.env.DATABASE_URL = uniqueDatabaseUrl;

  // Inicializa o Pool
  pool = new Pool({
    connectionString: uniqueDatabaseUrl,
    max: 10,
  });

  // Cria o schema no banco
  await pool.query(`CREATE SCHEMA IF NOT EXISTS "testSchema-${schemaId}"`);

  // Executa o drizzle-kit com o URL atualizado
  execSync('pnpm drizzle:push', {
    stdio: 'inherit', // Exibe logs no terminal
    env: { ...process.env, DATABASE_URL: uniqueDatabaseUrl }, // Passa o URL dinâmico
  });

  // Verifica se as tabelas foram criadas no schema correto
  const result = await pool.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'testSchema-${schemaId}'`,
  );

  if (result.rows.length === 0) {
    throw new Error(
      `No tables were created in the schema "testSchema-${schemaId}"`,
    );
  }
});

afterAll(async () => {
  // Remove o schema após os testes
  await pool.query(`DROP SCHEMA IF EXISTS "testSchema-${schemaId}" CASCADE`);
  await pool.end();
});
