import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  product: z.string(),
  defect: z.string(),
  tone: z.number(),
  sample: z.number(),
})

export const resolver = zodResolver(formSchema)

export type qualityDefectsSchema = z.infer<typeof formSchema>