'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, MessageSquare } from 'lucide-react'

export default function CustomerDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app would fetch from API
    setCustomer({
      id,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (212) 555-0123',
      company: 'Smith Art Gallery',
      status: 'ACTIVE',
      totalBookings: 12,
      totalSpent: '$45,600',
      joinDate: '2024-01-15',
      lastBooking: '2026-01-20',
      bookingHistory: [
        { number: 'FMP-001', date: '2026-01-20', amount: '$3,200', status: 'COMPLETED' },
        { number: 'FMP-002', date: '2025-12-10', amount: '$2,800', status: 'COMPLETED' },
        { number: 'FMP-003', date: '2025-11-05', amount: '$4,100', status: 'COMPLETED' },
      ],
    })
    setLoading(false)
  }, [id])

  if (loading) return <div className="flex justify-center py-8">Loading...</div>
  if (!customer) return <div className="text-center py-8">Customer not found</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/customers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{customer.name}</h1>
            <p className="text-muted-foreground">Customer Profile</p>
          </div>
        </div>
        <Link href={`/admin/customers/${id}/edit`}>
          <Button className="bg-black hover:bg-slate-800 text-white">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      {/* Status */}
      <div className="flex gap-2">
        <Badge className={customer.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-900'}>
          {customer.status}
        </Badge>
      </div>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium">{customer.company}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Join Date</p>
              <p className="font-medium">{customer.joinDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Total Bookings</p>
            <p className="text-3xl font-bold">{customer.totalBookings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
            <p className="text-3xl font-bold">{customer.totalSpent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Last Booking</p>
            <p className="text-lg font-semibold">{customer.lastBooking}</p>
          </CardContent>
        </Card>
      </div>

      {/* Booking History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customer.bookingHistory.map((booking: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{booking.number}</p>
                  <p className="text-sm text-muted-foreground">{booking.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">{booking.amount}</p>
                  <Badge className="bg-green-100 text-green-900">{booking.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
