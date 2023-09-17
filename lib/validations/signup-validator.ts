import { z } from 'zod'

export const signUpValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(3).max(20),
})
