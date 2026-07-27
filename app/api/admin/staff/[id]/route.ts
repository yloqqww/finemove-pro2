import { NextRequest, NextResponse } from 'next/server'

// This would be replaced with actual database operations
let staffMembers = [
  { id: 1, name: 'James Wilson', email: 'james@finemove.com', phone: '(555) 123-0001', role: 'LEAD_DRIVER', status: 'ACTIVE', bookings: 28, address: '' },
  { id: 2, name: 'Maria Garcia', email: 'maria@finemove.com', phone: '(555) 123-0002', role: 'PACKER', status: 'ACTIVE', bookings: 42, address: '' },
  { id: 3, name: 'Carlos Rodriguez', email: 'carlos@finemove.com', phone: '(555) 123-0003', role: 'DRIVER', status: 'ACTIVE', bookings: 19, address: '' },
  { id: 4, name: 'David Lee', email: 'david@finemove.com', phone: '(555) 123-0004', role: 'COORDINATOR', status: 'ACTIVE', bookings: 35, address: '' },
  { id: 5, name: 'Sophia Martinez', email: 'sophia@finemove.com', phone: '(555) 123-0005', role: 'DRIVER', status: 'ON_LEAVE', bookings: 15, address: '' },
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const staffId = parseInt(resolvedParams.id)
    const staff = staffMembers.find(s => s.id === staffId)

    if (!staff) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(staff, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch staff member' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const staffId = parseInt(resolvedParams.id)
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find and update staff member
    const staffIndex = staffMembers.findIndex(s => s.id === staffId)

    if (staffIndex === -1) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      )
    }

    staffMembers[staffIndex] = {
      ...staffMembers[staffIndex],
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status || 'ACTIVE',
      address: data.address || '',
    }

    return NextResponse.json(staffMembers[staffIndex], { status: 200 })
  } catch (error) {
    console.error('Error updating staff member:', error)
    return NextResponse.json(
      { error: 'Failed to update staff member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const staffId = parseInt(resolvedParams.id)
    const staffIndex = staffMembers.findIndex(s => s.id === staffId)

    if (staffIndex === -1) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      )
    }

    const deletedStaff = staffMembers.splice(staffIndex, 1)

    return NextResponse.json(deletedStaff[0], { status: 200 })
  } catch (error) {
    console.error('Error deleting staff member:', error)
    return NextResponse.json(
      { error: 'Failed to delete staff member' },
      { status: 500 }
    )
  }
}
