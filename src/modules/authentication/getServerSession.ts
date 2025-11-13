import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Obtém a sessão atual do usuário no servidor
 *
 * Esta função encapsula a lógica de obter os headers do Next.js
 * e buscar a sessão do better-auth.
 *
 * @returns {Promise<{ user: { id: string; name: string; email: string; emailVerified: boolean; image?: string | null } } | null>}
 * A sessão do usuário ou null se não estiver autenticado
 *
 * @example
 * ```tsx
 * const session = await getServerSession();
 * if (session?.user) {
 *   // Usuário autenticado
 * }
 * ```
 */
export async function getServerSession() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: new Headers(requestHeaders),
  });

  return session;
}

