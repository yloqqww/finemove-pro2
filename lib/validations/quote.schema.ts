import { z } from 'zod'

export const quoteRequestSchema = z.object({
  serviceType: z.string().min(1, 'Service type is required'),
  description: z.string().min(10, 'Please provide a detailed description (at least 10 characters)'),
  estimatedValue: z.number().positive().optional(),
  notes: z.string().max(1000).optional(),
})

export const quoteUpdateSchema = z.object({
  estimatedPrice: z.number().positive('Price must be positive'),
  adminNotes: z.string().optional(),
})

export const quoteApprovalSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  adminNotes: z.string().optional(),
})

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>
export type QuoteUpdateInput = z.infer<typeof quoteUpdateSchema>
export type QuoteApprovalInput = z.infer<typeof quoteApprovalSchema>
