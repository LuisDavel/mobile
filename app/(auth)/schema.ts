import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  password: z.string().min(1, 'O campo de senha é obrigatório.'),
  username: z.string().min(3, 'O campo deve conter pelo menos 3 caracteres.'),
})

export const resolver = zodResolver(formSchema)

export type LoginSchema = z.infer<typeof formSchema>