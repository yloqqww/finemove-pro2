import { NextRequest, NextResponse } from 'next/server'

// This would be replaced with actual database operations
let schedules = [
  {
    id: 1,
    bookingId: 'BK-2024-001',
    scheduleDate: '2024-12-20',
    timeSlot: 'MORNING',
    staffId: 1,
    staffName: 'James Wilson',
    status: 'SCHEDULED',
    notes: 'Handle with care - fragile items',
    reminderDays: 1,
  },
  {
    id: 2,
    bookingId: 'BK-2024-002',
    scheduleDate: '2024-12-21',
    timeSlot: 'AFTERNOON',
    staffId: 2,
    staffName: 'Maria Garcia',
    status: 'CONFIRMED',
    notes: 'Requires professional packing',
    reminderDays: 2,
  },
  {
    id: 3,
    bookingId: 'BK-2024-003',
    scheduleDate: '2024-12-22',
    timeSlot: 'EVENING',
    staffId: 3,
    staffName: 'Carlos Rodriguez',
    status: 'SCHEDULED',
    notes: '',
    reminderDays: 1,
  },
]

export async function GET() {
  try {
    return NextResponse.json(schedules, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch schedules' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.bookingId || !data.scheduleDate || !data.timeSlot || !data.staffId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Map staff ID to staff name
    const staffMap: Record<string, string> = {
      '1': 'James Wilson',
      '2': 'Maria Garcia',
      '3': 'Carlos Rodriguez',
      '4': 'David Lee',
      '5': 'Sophia Martinez',
    }

    // Create new schedule
    const newSchedule = {
      id: Math.max(...schedules.map(s => s.id), 0) + 1,
      bookingId: data.bookingId,
      scheduleDate: data.scheduleDate,
      timeSlot: data.timeSlot,
      staffId: parseInt(data.staffId),
      staffName: staffMap[data.staffId] || 'Unknown Staff',
      status: 'SCHEDULED',
      notes: data.notes || '',
      reminderDays: parseInt(data.reminderDays) || 1,
      createdAt: new Date().toISOString(),
    }

    schedules.push(newSchedule)

    return NextResponse.json(newSchedule, { status: 201 })
  } catch (error) {
    console.error('Error creating schedule:', error)
    return NextResponse.json(
      { error: 'Failed to create schedule' },
      { status: 500 }
    )
  }
}
