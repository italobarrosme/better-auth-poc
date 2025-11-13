import { PrismaClient } from "@prisma/client";

type DatabaseProvider = "sqlite" | "postgresql";

/**
 * Detecta o provider do banco de dados baseado na DATABASE_URL
 */
function detectDatabaseProvider(): DatabaseProvider {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL não está definida nas variáveis de ambiente");
  }

  // Se começa com "file:", é SQLite
  if (databaseUrl.startsWith("file:")) {
    return "sqlite";
  }

  // Se começa com "postgresql://" ou "postgres://", é PostgreSQL
  if (
    databaseUrl.startsWith("postgresql://") ||
    databaseUrl.startsWith("postgres://")
  ) {
    return "postgresql";
  }

  // Por padrão, tenta detectar pelo formato
  // Se não conseguir, assume PostgreSQL (mais comum em produção)
  return "postgresql";
}

/**
 * Obtém o provider do banco de dados
 */
export function getDatabaseProvider(): DatabaseProvider {
  // Permite forçar o provider via variável de ambiente
  const forcedProvider = process.env.DATABASE_PROVIDER as
    | DatabaseProvider
    | undefined;

  if (forcedProvider === "sqlite" || forcedProvider === "postgresql") {
    return forcedProvider;
  }

  return detectDatabaseProvider();
}

/**
 * Cria uma instância do Prisma Client configurada
 */
export function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

/**
 * Obtém a configuração do banco de dados
 */
export function getDatabaseConfig() {
  const provider = getDatabaseProvider();
  const prisma = createPrismaClient();

  return {
    provider,
    prisma,
  };
}

