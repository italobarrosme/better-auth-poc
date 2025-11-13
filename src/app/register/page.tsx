import Link from "next/link";
import { RegisterForm } from "@/modules/authentication/components/RegisterForm";
import { redirect } from "next/navigation";
import { getServerSession } from "@/modules/authentication";

export default async function RegisterPage() {
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
              Criar Conta
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Preencha os dados para criar sua conta
            </p>
          </header>

          <RegisterForm />

          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <span>Já tem uma conta? </span>
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Entrar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

