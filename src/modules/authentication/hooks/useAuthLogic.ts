"use client";

import { useMemo } from "react";
import type { LoginFormData, RegisterFormData, AuthError } from "../types";

/**
 * Hook responsável por aplicar regras de negócio e validação
 * sobre os formulários de autenticação.
 *
 * Este hook **não faz chamadas de API**, apenas valida e formata
 * os dados dos formulários.
 *
 * ---
 *
 * 🔹 Funções principais:
 * - Valida formato de email
 * - Valida força da senha
 * - Verifica se as senhas coincidem (registro)
 * - Gera mensagens de erro formatadas
 *
 * ---
 *
 * @returns {{
 *   validateLogin: (data: LoginFormData) => AuthError | null
 *   validateRegister: (data: RegisterFormData) => AuthError | null
 * }}
 */
export function useAuthLogic() {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // Mínimo 8 caracteres
    return password.length >= 8;
  };

  const validateLogin = (data: LoginFormData): AuthError | null => {
    if (!data.email.trim()) {
      return { message: "Email é obrigatório", field: "email" };
    }

    if (!validateEmail(data.email)) {
      return { message: "Email inválido", field: "email" };
    }

    if (!data.password.trim()) {
      return { message: "Senha é obrigatória", field: "password" };
    }

    return null;
  };

  const validateRegister = (data: RegisterFormData): AuthError | null => {
    if (!data.name.trim()) {
      return { message: "Nome é obrigatório", field: "name" };
    }

    if (data.name.trim().length < 2) {
      return { message: "Nome deve ter pelo menos 2 caracteres", field: "name" };
    }

    if (!data.email.trim()) {
      return { message: "Email é obrigatório", field: "email" };
    }

    if (!validateEmail(data.email)) {
      return { message: "Email inválido", field: "email" };
    }

    if (!data.password.trim()) {
      return { message: "Senha é obrigatória", field: "password" };
    }

    if (!validatePassword(data.password)) {
      return {
        message: "Senha deve ter pelo menos 8 caracteres",
        field: "password",
      };
    }

    if (data.password !== data.confirmPassword) {
      return {
        message: "As senhas não coincidem",
        field: "confirmPassword",
      };
    }

    return null;
  };

  return useMemo(
    () => ({
      validateLogin,
      validateRegister,
    }),
    []
  );
}

