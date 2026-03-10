import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  tursoClient: PrismaClient | undefined;
};

// Create Turso client for production
async function createTursoClient(): Promise<PrismaClient> {
  if (globalForPrisma.tursoClient) {
    return globalForPrisma.tursoClient;
  }

  const { PrismaLibSQL } = await import('@prisma/adapter-libsql');
  const { createClient } = await import('@libsql/client');

  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const adapter = new PrismaLibSQL(libsql);
  const client = new PrismaClient({ adapter });
  globalForPrisma.tursoClient = client;
  return client;
}

// Standard SQLite client for local development
const standardPrisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = standardPrisma;
}

/**
 * What: Returns the correct Prisma client (Turso in production, SQLite locally).
 * Why: Production (e.g. Vercel) has no .env file; Turso env vars must be set in the host's dashboard.
 * What for: Ensures API routes get a valid DB client or a clear error instead of a cryptic Prisma env failure.
 */
export async function getDbClient(): Promise<PrismaClient> {
  if (process.env.TURSO_DATABASE_URL) {
    return createTursoClient();
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in production (e.g. Vercel → Settings → Environment Variables).'
    );
  }
  return standardPrisma;
}

// Default export for backwards compatibility (local dev / build time)
export const prisma = standardPrisma;
export default prisma;
