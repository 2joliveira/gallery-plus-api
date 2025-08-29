import z from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  B2_STORAGE_ENDPOINT: z.url(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
