import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Invalid phone number').optional(),
  company: z.string().optional(),
  address: z.string().min(5, 'Address is required').optional(),
  city: z.string().min(2, 'City is required').optional(),
  state: z.string().length(2, 'State must be 2 characters').optional(),
  zip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits').optional(),
  notes: z.string().max(1000).optional(),
})

export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Invalid phone number').optional(),
  company: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2, 'State must be 2 characters').optional(),
  zip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits').optional(),
})

export type CustomerInput = z.infer<typeof customerSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
