import { z } from 'zod'

// types safe env
const envSchema = z.object({
  TEST: z.string().min(1),
})
export const env = envSchema.parse(process.env)
