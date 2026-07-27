// Mock data for fully functional demo

export const mockBookings = [
  {
    id: '1',
    number: 'FMP-01025',
    service: 'Fine Art Transport',
    date: 'Aug 15, 2026',
    status: 'CONFIRMED',
    price: '$1,250',
    customer: 'John Smith',
    pickup: '123 Gallery Ave, NYC',
    delivery: '456 Museum St, LA',
    items: 'Oil Painting Collection',
    assignedStaff: 'James Wilson',
    icon: '🎨',
  },
  {
    id: '2',
    number: 'FMP-01018',
    service: 'Luxury Furniture Delivery',
    date: 'Aug 10, 2026',
    status: 'IN_PROGRESS',
    price: '$895',
    customer: 'Sarah Johnson',
    pickup: '789 Warehouse Blvd, Chicago',
    delivery: '321 Penthouse Ave, Miami',
    items: 'Designer Couch Set',
    assignedStaff: 'Maria Garcia',
    icon: '🪑',
  },
  {
    id: '3',
    number: 'FMP-00997',
    service: 'White Glove Service',
    date: 'Jul 28, 2026',
    status: 'COMPLETED',
    price: '$650',
    customer: 'Michael Chen',
    pickup: '555 Art District, San Francisco',
    delivery: '888 Estate Rd, Beverly Hills',
    items: 'Sculpture & Antiques',
    assignedStaff: 'Carlos Rodriguez',
    icon: '✨',
  },
  {
    id: '4',
    number: 'FMP-00982',
    service: 'Museum Delivery',
    date: 'Jul 15, 2026',
    status: 'COMPLETED',
    price: '$2,150',
    customer: 'Emily Watson',
    pickup: '999 International Port, Boston',
    delivery: '111 Museum Way, Washington DC',
    items: 'Rare Exhibition Pieces',
    assignedStaff: 'David Lee',
    icon: '🏛️',
  },
  {
    id: '5',
    number: 'FMP-00965',
    service: 'Fine Art Transport',
    date: 'Jul 01, 2026',
    status: 'COMPLETED',
    price: '$1,800',
    customer: 'Lisa Anderson',
    pickup: '222 Gallery Ave, NYC',
    delivery: '333 Collectors St, Toronto',
    items: 'Contemporary Art Series',
    assignedStaff: 'Sophia Martinez',
    icon: '🖼️',
  },
]

export const mockCustomers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', phone: '(555) 123-4567', company: 'Smith Art Gallery', status: 'ACTIVE', bookings: 12, spent: '$15,250', joinDate: '2025-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 234-5678', company: 'Johnson Interiors', status: 'ACTIVE', bookings: 8, spent: '$9,450', joinDate: '2025-02-10' },
  { id: '3', name: 'Michael Chen', email: 'michael@example.com', phone: '(555) 345-6789', company: 'Chen Collectibles', status: 'ACTIVE', bookings: 15, spent: '$21,800', joinDate: '2024-12-20' },
  { id: '4', name: 'Emily Watson', email: 'emily@example.com', phone: '(555) 456-7890', company: 'Museum Associates', status: 'ACTIVE', bookings: 5, spent: '$8,200', joinDate: '2025-03-05' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa@example.com', phone: '(555) 567-8901', company: 'Anderson Fine Art', status: 'INACTIVE', bookings: 3, spent: '$4,150', joinDate: '2025-04-01' },
]

export const mockQuotes = [
  { id: '1', number: 'QUOTE-0854', customer: 'John Smith', amount: '$1,500', status: 'PENDING', date: 'Aug 20, 2026', expiry: 'Aug 27, 2026', items: 'Oil Painting Collection' },
  { id: '2', number: 'QUOTE-0842', customer: 'Sarah Johnson', amount: '$950', status: 'PENDING', date: 'Aug 19, 2026', expiry: 'Aug 26, 2026', items: 'Furniture Set' },
  { id: '3', number: 'QUOTE-0831', customer: 'Michael Chen', amount: '$2,200', status: 'APPROVED', date: 'Aug 15, 2026', expiry: 'Aug 22, 2026', items: 'Sculpture & Antiques' },
  { id: '4', number: 'QUOTE-0819', customer: 'Emily Watson', amount: '$1,800', status: 'APPROVED', date: 'Aug 10, 2026', expiry: 'Aug 17, 2026', items: 'Museum Exhibition Pieces' },
]

export const mockInvoices = [
  { id: '1', number: 'INV-2026-001', amount: '$1,250', tax: '$125', total: '$1,375', status: 'PAID', date: 'Aug 15, 2026', dueDate: 'Aug 22, 2026', booking: 'FMP-01025' },
  { id: '2', number: 'INV-2026-002', amount: '$895', tax: '$90', total: '$985', status: 'PAID', date: 'Aug 10, 2026', dueDate: 'Aug 17, 2026', booking: 'FMP-01018' },
  { id: '3', number: 'INV-2026-003', amount: '$650', tax: '$65', total: '$715', status: 'PENDING', date: 'Aug 05, 2026', dueDate: 'Aug 12, 2026', booking: 'FMP-00997' },
  { id: '4', number: 'INV-2026-004', amount: '$2,150', tax: '$215', total: '$2,365', status: 'PAID', date: 'Jul 28, 2026', dueDate: 'Aug 04, 2026', booking: 'FMP-00982' },
]

export const mockServices = [
  { id: '1', name: 'Fine Art Transport', description: 'Premium transport for valuable artwork', basePrice: '$1,200', icon: '🎨' },
  { id: '2', name: 'Luxury Furniture Delivery', description: 'White-glove furniture delivery service', basePrice: '$800', icon: '🪑' },
  { id: '3', name: 'Museum Delivery', description: 'Specialized museum-grade shipping', basePrice: '$2,000', icon: '🏛️' },
  { id: '4', name: 'White Glove Service', description: 'Premium personal handling service', basePrice: '$600', icon: '✨' },
]

export const mockAnalytics = {
  revenueData: [
    { date: 'Aug 1', revenue: 2400 },
    { date: 'Aug 2', revenue: 1398 },
    { date: 'Aug 3', revenue: 9800 },
    { date: 'Aug 4', revenue: 3908 },
    { date: 'Aug 5', revenue: 4800 },
    { date: 'Aug 6', revenue: 3800 },
    { date: 'Aug 7', revenue: 4300 },
  ],
  bookingTrend: [
    { date: 'Aug 1', bookings: 4 },
    { date: 'Aug 2', bookings: 3 },
    { date: 'Aug 3', bookings: 8 },
    { date: 'Aug 4', bookings: 5 },
    { date: 'Aug 5', bookings: 6 },
    { date: 'Aug 6', bookings: 5 },
    { date: 'Aug 7', bookings: 7 },
  ],
  paymentMethods: [
    { name: 'Credit Card', value: 45 },
    { name: 'Bank Transfer', value: 30 },
    { name: 'Check', value: 15 },
    { name: 'Wire Transfer', value: 10 },
  ],
  servicePopularity: [
    { name: 'Fine Art Transport', value: 35 },
    { name: 'Luxury Furniture', value: 25 },
    { name: 'White Glove', value: 20 },
    { name: 'Museum Delivery', value: 20 },
  ],
}

export const mockDashboardStats = {
  totalBookings: 87,
  activeBookings: 12,
  pendingBookings: 5,
  completedBookings: 65,
  totalCustomers: 34,
  totalRevenue: 185230,
  monthlyRevenue: 42500,
  averageBookingValue: 1850,
  pendingQuotes: 8,
}
