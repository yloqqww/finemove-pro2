import { NextRequest, NextResponse } from 'next/server'
import { mockQuotes } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    let filtered = mockQuotes

    if (search) {
      filtered = filtered.filter(q =>
        q.number.toLowerCase().includes(search.toLowerCase()) ||
        q.customer.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status) {
      filtered = filtered.filter(q => q.status === status)
    }

    return NextResponse.json({
      quotes: filtered,
      total: filtered.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}
