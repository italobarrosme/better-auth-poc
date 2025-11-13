# Better Auth POC

Prova de Conceito (POC) de um sistema de autenticação completo utilizando Better Auth, Next.js, Prisma e PostgreSQL. Este projeto demonstra a implementação de registro e login de usuários com validação, gerenciamento de sessões e uma arquitetura modular seguindo boas práticas.

## 🚀 Stack Tecnológica

- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19
- **Autenticação:** Better Auth 1.3.34
- **ORM:** Prisma 6.19.0
- **Banco de Dados:** PostgreSQL 17 (via Docker)
- **Estilização:** Tailwind CSS 4
- **Linguagem:** TypeScript 5
- **Linter/Formatter:** Biome 2.2.0

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Docker e Docker Compose (para o banco de dados PostgreSQL)

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd better-auth-poc
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto. Veja as opções abaixo para PostgreSQL ou SQLite.

## 🗄️ Configuração do Banco de Dados

O projeto suporta **PostgreSQL** (recomendado para produção) e **SQLite** (ideal para desenvolvimento rápido). Escolha uma das opções:

### Opção 1: PostgreSQL (Recomendado)

#### Configuração do .env

Crie um arquivo `.env` na raiz do projeto:

```env
# Database - PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/better_auth?schema=public"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Passos para configurar PostgreSQL

1. **Subir o banco de dados:**
```bash
npm run db:up
```

Ou usando Docker Compose diretamente:

```bash
docker compose up -d
```

2. **Aplicar as migrations:**
```bash
npx prisma migrate deploy
```

Ou use o script:

```bash
npm run prisma:migrate
```

3. **Gerar o Prisma Client:**
```bash
npm run prisma:generate
```

#### Alternar para PostgreSQL

Se você estiver usando SQLite e quiser alternar para PostgreSQL:

```bash
# 1. Alternar para PostgreSQL (remove migrations antigas automaticamente)
npm run db:switch:postgresql

# 2. Subir o banco PostgreSQL
npm run db:up

# 3. Criar nova migration para PostgreSQL
npx prisma migrate dev --name init
```

> **💡 Nota:** O script `db:switch:postgresql` remove automaticamente as migrations antigas para evitar o erro `P3019` (provider mismatch).

---

### Opção 2: SQLite (Desenvolvimento Rápido)

#### Configuração do .env

Crie um arquivo `.env` na raiz do projeto:

```env
# Database - SQLite
DATABASE_URL="file:./dev.db"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Passos para configurar SQLite

1. **Alternar para SQLite:**
```bash
npm run db:switch:sqlite
```

Este comando irá:
- Atualizar o `schema.prisma` para usar SQLite
- Atualizar o `.env` com a URL do SQLite
- Gerar o Prisma Client automaticamente

2. **Aplicar as migrations:**
```bash
npx prisma migrate dev --name init
```

Ou use o script:

```bash
npm run prisma:migrate
```

> **Nota:** Com SQLite, você não precisa do Docker. O banco será criado como um arquivo `dev.db` na pasta `prisma/`.

#### Alternar para SQLite

Se você estiver usando PostgreSQL e quiser alternar para SQLite:

```bash
# 1. Alternar para SQLite (remove migrations e banco antigos automaticamente)
npm run db:switch:sqlite

# 2. Criar nova migration para SQLite
npx prisma migrate dev --name init
```

---

### Comandos Úteis do Banco de Dados

- `npm run db:up` - Sobe o container PostgreSQL
- `npm run db:down` - Para o container PostgreSQL
- `npm run db:restart` - Reinicia o container
- `npm run db:logs` - Visualiza logs do container
- `npm run db:exec` - Acessa o PostgreSQL via CLI
- `npm run db:reset` - Reseta o banco (down + up)
- `npm run db:switch:sqlite` - Alterna para SQLite
- `npm run db:switch:postgresql` - Alterna para PostgreSQL

## 🎯 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Build de Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
better-auth-poc/
├── prisma/
│   ├── schema.prisma          # Schema do Prisma (models do Better Auth)
│   └── migrations/             # Migrations do banco de dados
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/           # Rotas de API do Better Auth
│   │   ├── login/              # Página de login
│   │   ├── register/           # Página de registro
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Página inicial
│   └── modules/
│       ├── authentication/     # Módulo de autenticação
│       │   ├── components/     # Componentes React (LoginForm, RegisterForm, etc)
│       │   ├── hooks/           # Custom hooks (useAuthLogic)
│       │   ├── types/           # Tipos TypeScript
│       │   ├── auth.ts          # Configuração do Better Auth
│       │   ├── auth-client.ts   # Cliente do Better Auth (React)
│       │   └── getServerSession.ts # Helper para obter sessão no servidor
│       └── database/
│           └── config.ts        # Configuração do Prisma
├── docker-compose.yml          # Configuração do PostgreSQL
└── package.json
```

## 🎨 Arquitetura

O projeto segue o padrão **Container/Presentational Components + Custom Hooks**:

- **Container Components (Render Components):** Componentes server-side que cuidam da lógica, chamadas de API e orquestração
- **Presentational Components:** Componentes client-side responsáveis apenas pela renderização da UI
- **Custom Hooks:** Lógica de negócio extraída em hooks reutilizáveis e testáveis

### Exemplo de Fluxo

```
Page (Server Component)
  ↓
  Busca dados/valida sessão
  ↓
Presentational Component (Client Component)
  ↓
  Usa Custom Hook para lógica de negócio
  ↓
  Renderiza UI
```

## 📜 Scripts Disponíveis

### Desenvolvimento
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção

### Banco de Dados
- `npm run db:up` - Sobe o container PostgreSQL (apenas para PostgreSQL)
- `npm run db:down` - Para o container PostgreSQL (apenas para PostgreSQL)
- `npm run db:restart` - Reinicia o container PostgreSQL
- `npm run db:logs` - Visualiza logs do container PostgreSQL
- `npm run db:exec` - Acessa o PostgreSQL via CLI
- `npm run db:reset` - Reseta o banco PostgreSQL (down + up)
- `npm run db:switch:sqlite` - Alterna para SQLite
- `npm run db:switch:postgresql` - Alterna para PostgreSQL

### Prisma
- `npm run prisma:migrate` - Cria e aplica nova migration
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:studio` - Abre o Prisma Studio (interface visual)

### Code Quality
- `npm run lint` - Executa o linter (Biome)
- `npm run format` - Formata o código

## 🔐 Funcionalidades de Autenticação

- ✅ Registro de usuário com validação
- ✅ Login de usuário
- ✅ Logout
- ✅ Gerenciamento de sessões
- ✅ Proteção de rotas (redirecionamento se autenticado)
- ✅ Exibição de informações do usuário autenticado

## 🎯 Rotas Disponíveis

- `/` - Página inicial (com links para login/registro)
- `/login` - Página de login
- `/register` - Página de registro
- `/api/auth/*` - Endpoints do Better Auth (gerenciados automaticamente)

## 📝 Notas

- O projeto suporta tanto **PostgreSQL** quanto **SQLite**
- **PostgreSQL** é recomendado para produção e requer Docker
- **SQLite** é ideal para desenvolvimento rápido, não requer Docker
- Use os scripts `db:switch:sqlite` ou `db:switch:postgresql` para alternar entre bancos
- **Os scripts de alternância removem automaticamente as migrations antigas** para evitar conflitos de provider
- As migrations são aplicadas automaticamente em desenvolvimento
- O Prisma Client deve ser regenerado após alterações no schema ou ao alternar de banco

## 📄 Licença

Este projeto é uma POC educacional.

