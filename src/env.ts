import * as zod from "zod";

export const envSchema = zod.object({
  MODE: zod.enum(["development", "production", "test"]),
  VITE_API_URL: zod.string(),
  VITE_ENABLE_API_DELAY: zod.string().transform((value) => value === "true"),
});

export const env = envSchema.parse(import.meta.env);
