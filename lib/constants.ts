export const APP_NAME = "FineMove Pro"
export const APP_DESCRIPTION = "Premium Fine Art & White-Glove Logistics Booking Platform"

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  PRICING: '/pricing',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  CUSTOMER_BOOKINGS: '/customer/bookings',
  CUSTOMER_NEW_BOOKING: '/customer/bookings/new',
  CUSTOMER_QUOTES: '/customer/quotes',
  CUSTOMER_INVOICES: '/customer/invoices',
  CUSTOMER_PROFILE: '/customer/profile',
  
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_QUOTES: '/admin/quotes',
  ADMIN_SERVICES: '/admin/services',
  ADMIN_PRICING: '/admin/pricing-rules',
  ADMIN_COUPONS: '/admin/coupons',
  ADMIN_CALENDAR: '/admin/calendar',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_STAFF: '/admin/staff',
  ADMIN_SETTINGS: '/admin/settings',
  
  AI_ASSISTANT: '/ai-assistant',
} as const

export const BOOKING_STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  CONFIRMED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  IN_PROGRESS: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  RESCHEDULED: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
} as const

export const PAYMENT_STATUS_COLORS = {
  UNPAID: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  PAID: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  PARTIAL: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  REFUNDED: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
} as const

export const QUOTE_STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
} as const

export const SERVICE_ICONS = {
  FINE_ART: 'Palette',
  LUXURY_FURNITURE: 'Sofa',
  MUSEUM_DELIVERY: 'Building2',
  WHITE_GLOVE: 'Star',
  PACKING: 'Package',
  INSTALLATION: 'Hammer',
  STORAGE: 'Warehouse',
} as const

export const TIME_SLOTS = [
  { value: 'MORNING', label: 'Morning (8AM - 12PM)' },
  { value: 'AFTERNOON', label: 'Afternoon (12PM - 5PM)' },
  { value: 'EVENING', label: 'Evening (5PM - 9PM)' },
] as const

export const BUILDING_TYPES = [
  { value: 'HOUSE', label: 'House' },
  { value: 'APARTMENT', label: 'Apartment' },
  { value: 'CONDO', label: 'Condo' },
  { value: 'OFFICE', label: 'Office' },
  { value: 'MUSEUM', label: 'Museum' },
  { value: 'GALLERY', label: 'Gallery' },
  { value: 'WAREHOUSE', label: 'Warehouse' },
  { value: 'OTHER', label: 'Other' },
] as const

export const ITEM_CATEGORIES = [
  'Painting',
  'Sculpture',
  'Photography',
  'Print',
  'Drawing',
  'Tapestry',
  'Antique Furniture',
  'Mirror',
  'Chandelier',
  'Vase',
  'Bronze',
  'Marble Statue',
  'Other',
] as const

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
