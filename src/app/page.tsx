export default function Home() {
  return (
    <div className="flex flex-col w-full items-center gap-6 text-center sm:items-start sm:text-left">
      <h1 className="text-3xl max-w-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Better Auth POC
      </h1>
      <p className="text-lg max-w-3xl leading-8 text-zinc-600 dark:text-zinc-400">
        Sistema de autenticação com Better Auth, Next.js e Prisma. Registre-se
        ou faça login para continuar.
      </p>
    </div>
  );
}
