import { 
  User, 
  Customer, 
  Booking, 
  BookingItem, 
  Service, 
  Quote, 
  Invoice,
  Notification,
  Staff,
  CalendarSlot,
  PricingRule,
  Analytics,
  Settings,
  BookingStatus,
  PaymentStatus,
  PaymentMethod,
  QuoteStatus,
  UserRole,
  ServiceType,
  BuildingType,
  TimeSlot
} from '@prisma/client'

export type {
  User,
  Customer,
  Booking,
  BookingItem,
  Service,
  Quote,
  Invoice,
  Notification,
  Staff,
  CalendarSlot,
  PricingRule,
  Analytics,
  Settings,
  BookingStatus,
  PaymentStatus,
  PaymentMethod,
  QuoteStatus,
  UserRole,
  ServiceType,
  BuildingType,
  TimeSlot
}

// Extended types with relations
export type UserWithRelations = User & {
  customer?: Customer | null
  staff?: Staff | null
}

export type BookingWithRelations = Booking & {
  customer: Customer & { user: User }
  service: Service
  items: BookingItem[]
  staff?: Staff & { user: User } | null
  invoice?: Invoice | null
}

export type CustomerWithRelations = Customer & {
  user: User
  bookings: Booking[]
}

export type QuoteWithRelations = Quote & {
  customer: Customer & { user: User }
}

export type InvoiceWithRelations = Invoice & {
  booking: BookingWithRelations
  customer: Customer & { user: User }
}

// Form types
export interface BookingFormData {
  serviceId: string
  
  // Pickup
  pickupAddress: string
  pickupCity: string
  pickupState: string
  pickupZip: string
  pickupBuilding: BuildingType
  pickupFloor: number
  pickupElevator: boolean
  pickupDock: boolean
  
  // Destination
  destAddress: string
  destCity: string
  destState: string
  destZip: string
  destBuilding: BuildingType
  destFloor: number
  destElevator: boolean
  destDock: boolean
  
  // Schedule
  scheduledDate: Date
  timeSlot: TimeSlot
  
  // Items
  items: BookingItemFormData[]
  
  // Payment
  paymentMethod: PaymentMethod
  couponCode?: string
  notes?: string
}

export interface BookingItemFormData {
  category: string
  title: string
  description?: string
  width?: number
  height?: number
  length?: number
  weight?: number
  quantity: number
  hasFrame: boolean
  hasGlass: boolean
  isFragile: boolean
  needsInsurance: boolean
  needsPacking: boolean
  needsUnpacking: boolean
  needsInstall: boolean
  needsDisassembly: boolean
  needsAssembly: boolean
  insuranceValue?: number
  photoUrls?: string[]
  notes?: string
}

export interface PriceCalculation {
  basePrice: number
  distanceFee: number
  addOnFees: {
    [key: string]: number
  }
  discount: number
  totalPrice: number
  breakdown: PriceBreakdownItem[]
}

export interface PriceBreakdownItem {
  label: string
  amount: number
  description?: string
}

// Dashboard stats
export interface DashboardStats {
  totalBookings: number
  activeBookings: number
  totalRevenue: number
  averageBookingValue: number
  completedJobs: number
  pendingQuotes: number
  newCustomers: number
  todayBookings: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    borderWidth?: number
  }[]
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Filter types
export interface BookingFilters {
  status?: BookingStatus[]
  serviceId?: string
  customerId?: string
  dateFrom?: Date
  dateTo?: Date
  paymentStatus?: PaymentStatus[]
  search?: string
}

export interface CustomerFilters {
  search?: string
  minSpent?: number
  maxSpent?: number
  minBookings?: number
}

// Table column type
export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}
