// lib/validators.ts
import { z } from "zod";

export const entradaSchema = z.object({
  texto: z
    .string()
    .trim()
    .min(2, "Digite pelo menos 2 caracteres.")
    .max(120, "No máximo 120 caracteres.")
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  senha: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(64, "Senha muito longa."),
  protocolo: z
    .string()
    .regex(/^PR-\d{8}-\d{4}$/, "Protocolo no formato PR-YYYYMMDD-####")
});

export type Entrada = z.infer<typeof entradaSchema>;
export type Login = z.infer<typeof loginSchema>;
