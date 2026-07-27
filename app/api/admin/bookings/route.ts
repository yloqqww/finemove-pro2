import { NextRequest, NextResponse } from 'next/server'
import { mockBookings } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    let filtered = mockBookings

    if (search) {
      filtered = filtered.filter(b =>
        b.number.toLowerCase().includes(search.toLowerCase()) ||
        b.service.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status) {
      filtered = filtered.filter(b => b.status === status)
    }

    return NextResponse.json({
      bookings: filtered,
      total: filtered.length,
      totalPages: 1,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
