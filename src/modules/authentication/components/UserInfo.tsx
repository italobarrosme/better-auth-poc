"use client";

import { useState, useEffect } from "react";
import { authClient } from "../auth-client";
import Link from "next/link";

export function UserInfo() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            name: session.data.user.name || "",
            email: session.data.user.email || "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar sessão:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          Entrar
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Registrar
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {user.name}
        </span>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          {user.email}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        Sair
      </button>
    </div>
  );
}

