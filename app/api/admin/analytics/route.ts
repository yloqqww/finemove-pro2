import { NextRequest, NextResponse } from 'next/server'
import { mockAnalytics } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30d'

    return NextResponse.json({
      timeRange,
      revenueData: mockAnalytics.revenueData,
      bookingTrend: mockAnalytics.bookingTrend,
      paymentMethods: mockAnalytics.paymentMethods,
      servicePopularity: mockAnalytics.servicePopularity,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
