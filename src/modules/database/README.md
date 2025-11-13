# Configuração de Banco de Dados

Este módulo permite alternar entre SQLite e PostgreSQL de forma dinâmica.

## Como Funciona

O sistema detecta automaticamente o provider do banco de dados baseado na `DATABASE_URL`:

- Se começa com `file:`, usa **SQLite**
- Se começa com `postgresql://` ou `postgres://`, usa **PostgreSQL**

## Alternando entre Bancos

### Usando PostgreSQL

1. Atualize o `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Configure o `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/better_auth"
```

3. Inicie o PostgreSQL (se usar Docker):
```bash
npm run db:up
```

4. Execute as migrations:
```bash
npx prisma migrate dev
```

5. Gere o Prisma Client:
```bash
npx prisma generate
```

### Usando SQLite

1. Atualize o `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

2. Configure o `.env`:
```env
DATABASE_URL="file:./dev.db"
```

3. Execute as migrations:
```bash
npx prisma migrate dev
```

4. Gere o Prisma Client:
```bash
npx prisma generate
```

## Forçar Provider Específico

Você pode forçar um provider específico usando a variável `DATABASE_PROVIDER`:

```env
DATABASE_PROVIDER="postgresql"  # ou "sqlite"
```

## Nota Importante

⚠️ **O Prisma requer que o provider no `schema.prisma` corresponda ao banco de dados real.** 

Se você alternar entre SQLite e PostgreSQL, precisa:
1. Atualizar o `provider` no `schema.prisma`
2. Executar `npx prisma migrate dev` para criar/atualizar as migrations
3. Executar `npx prisma generate` para regenerar o cliente

