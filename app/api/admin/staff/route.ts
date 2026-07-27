import { NextRequest, NextResponse } from 'next/server'

// This would be replaced with actual database operations
let staffMembers = [
  { id: 1, name: 'James Wilson', email: 'james@finemove.com', phone: '(555) 123-0001', role: 'LEAD_DRIVER', status: 'ACTIVE', bookings: 28 },
  { id: 2, name: 'Maria Garcia', email: 'maria@finemove.com', phone: '(555) 123-0002', role: 'PACKER', status: 'ACTIVE', bookings: 42 },
  { id: 3, name: 'Carlos Rodriguez', email: 'carlos@finemove.com', phone: '(555) 123-0003', role: 'DRIVER', status: 'ACTIVE', bookings: 19 },
  { id: 4, name: 'David Lee', email: 'david@finemove.com', phone: '(555) 123-0004', role: 'COORDINATOR', status: 'ACTIVE', bookings: 35 },
  { id: 5, name: 'Sophia Martinez', email: 'sophia@finemove.com', phone: '(555) 123-0005', role: 'DRIVER', status: 'ON_LEAVE', bookings: 15 },
]

export async function GET() {
  try {
    return NextResponse.json(staffMembers, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch staff members' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new staff member
    const newStaff = {
      id: Math.max(...staffMembers.map(s => s.id), 0) + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status || 'ACTIVE',
      address: data.address || '',
      bookings: 0,
      createdAt: new Date().toISOString(),
    }

    staffMembers.push(newStaff)

    return NextResponse.json(newStaff, { status: 201 })
  } catch (error) {
    console.error('Error creating staff member:', error)
    return NextResponse.json(
      { error: 'Failed to create staff member' },
      { status: 500 }
    )
  }
}
