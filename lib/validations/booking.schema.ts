import { z } from 'zod'
import { BuildingType, TimeSlot, PaymentMethod } from '@prisma/client'

export const bookingItemSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  width: z.number().positive('Width must be positive').optional(),
  height: z.number().positive('Height must be positive').optional(),
  length: z.number().positive('Length must be positive').optional(),
  weight: z.number().positive('Weight must be positive').optional(),
  quantity: z.number().int().positive('Quantity must be at least 1').default(1),
  hasFrame: z.boolean().default(false),
  hasGlass: z.boolean().default(false),
  isFragile: z.boolean().default(false),
  needsInsurance: z.boolean().default(false),
  needsPacking: z.boolean().default(false),
  needsUnpacking: z.boolean().default(false),
  needsInstall: z.boolean().default(false),
  needsDisassembly: z.boolean().default(false),
  needsAssembly: z.boolean().default(false),
  insuranceValue: z.number().positive().optional(),
  photoUrls: z.array(z.string().url()).optional(),
  notes: z.string().optional(),
})

export const addressSchema = z.object({
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters (e.g., NY)'),
  zip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  building: z.nativeEnum(BuildingType),
  floor: z.number().int().min(1).max(100),
  elevator: z.boolean(),
  dock: z.boolean(),
})

export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Service is required'),
  
  // Pickup
  pickupAddress: z.string().min(5, 'Pickup address is required'),
  pickupCity: z.string().min(2, 'Pickup city is required'),
  pickupState: z.string().length(2, 'State must be 2 characters'),
  pickupZip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  pickupBuilding: z.nativeEnum(BuildingType),
  pickupFloor: z.number().int().min(1).max(100),
  pickupElevator: z.boolean(),
  pickupDock: z.boolean(),
  
  // Destination
  destAddress: z.string().min(5, 'Destination address is required'),
  destCity: z.string().min(2, 'Destination city is required'),
  destState: z.string().length(2, 'State must be 2 characters'),
  destZip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  destBuilding: z.nativeEnum(BuildingType),
  destFloor: z.number().int().min(1).max(100),
  destElevator: z.boolean(),
  destDock: z.boolean(),
  
  // Schedule
  scheduledDate: z.date().min(new Date(), 'Date cannot be in the past'),
  timeSlot: z.nativeEnum(TimeSlot),
  
  // Items
  items: z.array(bookingItemSchema).min(1, 'At least one item is required'),
  
  // Payment
  paymentMethod: z.nativeEnum(PaymentMethod),
  couponCode: z.string().optional(),
  notes: z.string().max(1000).optional(),
})

export const updateBookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'RESCHEDULED']),
  internalNotes: z.string().optional(),
})

export type BookingInput = z.infer<typeof bookingSchema>
export type BookingItemInput = z.infer<typeof bookingItemSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>
