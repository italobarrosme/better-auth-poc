#!/usr/bin/env node

/**
 * Script helper para alternar entre SQLite e PostgreSQL
 * 
 * Uso:
 *   node scripts/switch-db.js sqlite
 *   node scripts/switch-db.js postgresql
 */

const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
const envPath = path.join(__dirname, "..", ".env");
const migrationsPath = path.join(__dirname, "..", "prisma", "migrations");

const providers = {
  sqlite: {
    provider: "sqlite",
    databaseUrl: 'file:./dev.db',
  },
  postgresql: {
    provider: "postgresql",
    databaseUrl: 'postgresql://postgres:postgres@localhost:5432/better_auth',
  },
};

function switchDatabase(providerName) {
  const config = providers[providerName];

  if (!config) {
    console.error(`❌ Provider inválido: ${providerName}`);
    console.error(`   Use: sqlite ou postgresql`);
    process.exit(1);
  }

  // Atualizar schema.prisma
  let schemaContent = fs.readFileSync(schemaPath, "utf-8");
  schemaContent = schemaContent.replace(
    /provider\s*=\s*"(sqlite|postgresql)"/,
    `provider = "${config.provider}"`
  );
  fs.writeFileSync(schemaPath, schemaContent);
  console.log(`✅ Schema atualizado para: ${config.provider}`);

  // Atualizar .env
  let envContent = `DATABASE_URL="${config.databaseUrl}"\n`;
  if (fs.existsSync(envPath)) {
    const existingEnv = fs.readFileSync(envPath, "utf-8");
    // Preservar outras variáveis de ambiente
    const otherVars = existingEnv
      .split("\n")
      .filter((line) => !line.startsWith("DATABASE_URL"))
      .join("\n");
    envContent = otherVars ? `${envContent}${otherVars}\n` : envContent;
  }
  fs.writeFileSync(envPath, envContent);
  console.log(`✅ .env atualizado com DATABASE_URL para ${providerName}`);

  // Remover migrations antigas para evitar conflito de provider (P3019)
  if (fs.existsSync(migrationsPath)) {
    const migrations = fs.readdirSync(migrationsPath);
    if (migrations.length > 0) {
      console.log(`\n⚠️  Removendo migrations antigas para evitar conflito de provider...`);
      fs.rmSync(migrationsPath, { recursive: true, force: true });
      console.log(`✅ Pasta de migrations removida`);
      console.log(`   (Isso é necessário porque o Prisma não permite misturar providers)`);
    }
  }

  // Se for SQLite, remover o banco antigo para evitar drift
  if (providerName === "sqlite") {
    const dbPath = path.join(__dirname, "..", "prisma", "dev.db");
    if (fs.existsSync(dbPath)) {
      console.log(`\n⚠️  Removendo banco SQLite antigo para evitar drift...`);
      fs.unlinkSync(dbPath);
      console.log(`✅ Banco SQLite antigo removido`);
      console.log(`   (Um novo banco será criado na próxima migration)`);
    }
  }

  console.log(`\n📝 Próximos passos:`);
  console.log(`   1. Execute: npx prisma generate`);
  console.log(`   2. Execute: npx prisma migrate dev --name init`);
  if (providerName === "postgresql") {
    console.log(`   3. Certifique-se de que o PostgreSQL está rodando (npm run db:up)`);
  }
}

const provider = process.argv[2];

if (!provider) {
  console.error("❌ Por favor, especifique o provider:");
  console.error("   node scripts/switch-db.js sqlite");
  console.error("   node scripts/switch-db.js postgresql");
  process.exit(1);
}

switchDatabase(provider);

