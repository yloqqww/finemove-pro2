import { NextRequest, NextResponse } from 'next/server'
import { mockDashboardStats, mockAnalytics } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    // Return mock data instantly
    return NextResponse.json({
      totalBookings: mockDashboardStats.totalBookings,
      activeBookings: mockDashboardStats.activeBookings,
      pendingBookings: mockDashboardStats.pendingBookings,
      completedBookings: mockDashboardStats.completedBookings,
      totalCustomers: mockDashboardStats.totalCustomers,
      totalRevenue: mockDashboardStats.totalRevenue,
      monthlyRevenue: mockDashboardStats.monthlyRevenue,
      averageBookingValue: mockDashboardStats.averageBookingValue,
      pendingQuotes: mockDashboardStats.pendingQuotes,
      recentBookings: [],
      bookingTrend: mockAnalytics.bookingTrend,
      paymentStatus: mockAnalytics.paymentMethods,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
