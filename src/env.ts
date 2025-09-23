import z from 'zod';

const envSchema = z.object({
  VITE_NODE_ENV: z.string(),
  VITE_DEV_SERVER: z.string(),
  VITE_PROD_SERVER: z.string(),
});

const env = envSchema.parse(import.meta.env);

export default env;
