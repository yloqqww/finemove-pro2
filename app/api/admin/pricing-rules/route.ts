import { NextRequest, NextResponse } from 'next/server'

// This would be replaced with actual database operations
let pricingRules = [
  { id: 1, name: 'Standard Distance', type: 'DISTANCE', value: '$0.50 per mile', status: 'ACTIVE' },
  { id: 2, name: 'Insurance Coverage', type: 'COVERAGE', value: '1% of item value', status: 'ACTIVE' },
  { id: 3, name: 'Handling Fee', type: 'FIXED', value: '$50 per item', status: 'ACTIVE' },
  { id: 4, name: 'Rush Delivery', type: 'PREMIUM', value: '50% surcharge', status: 'ACTIVE' },
  { id: 5, name: 'Weekend Delivery', type: 'TIME_BASED', value: '$100 extra', status: 'INACTIVE' },
]

export async function GET() {
  try {
    return NextResponse.json(pricingRules, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pricing rules' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.type || !data.value) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new pricing rule
    const newRule = {
      id: Math.max(...pricingRules.map(r => r.id), 0) + 1,
      name: data.name,
      type: data.type,
      value: data.value,
      description: data.description || '',
      status: data.status || 'ACTIVE',
      createdAt: new Date().toISOString(),
    }

    pricingRules.push(newRule)

    return NextResponse.json(newRule, { status: 201 })
  } catch (error) {
    console.error('Error creating pricing rule:', error)
    return NextResponse.json(
      { error: 'Failed to create pricing rule' },
      { status: 500 }
    )
  }
}
