import Link from "next/link";
import { LoginForm } from "@/modules/authentication/components/LoginForm";
import { redirect } from "next/navigation";
import { getServerSession } from "@/modules/authentication";

export default async function LoginPage() {
  const session = await getServerSession();

  // Se já estiver autenticado, redireciona para home
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md px-6 py-12">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 space-y-6">
          <header className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Entrar
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Acesse sua conta para continuar
            </p>
          </header>

          <LoginForm />

          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <span>Não tem uma conta? </span>
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Registre-se
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

