import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(8),
  PORT: z.coerce.number().default(4000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Erro de configuração nas variáveis de ambiente:");
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
  throw new Error("Variáveis de ambiente inválidas.");
}

export const env = parsedEnv.data;