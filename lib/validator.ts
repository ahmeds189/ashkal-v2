import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z.string().min(3).max(10),
})

export type categoryFormType = z.infer<typeof categoryFormSchema>
