/**
 * Tipos relacionados à autenticação
 */

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthError = {
  message: string;
  field?: string;
};

