import { z } from 'zod';

const envSchema = z.object({
  VITE_BACKEND_URL: z.string().url('A variável VITE_BACKEND_URL deve ser uma URL válida.'),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error('❌ Erro de configuração de variáveis de ambiente no Front-end:', _env.error.format());
  throw new Error('Variáveis de ambiente inválidas ou ausentes.');
}

export const env = _env.data;