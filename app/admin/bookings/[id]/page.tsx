'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Download } from 'lucide-react'

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  RESCHEDULED: 'bg-orange-100 text-orange-800',
}

const paymentStatusColors = {
  UNPAID: 'bg-red-100 text-red-800',
  PAID: 'bg-green-100 text-green-800',
  PARTIAL: 'bg-yellow-100 text-yellow-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
}

export default function BookingDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - in real app would fetch from API
    setBooking({
      id,
      bookingNumber: `FMP-${id}`,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      service: 'Fine Art Transport',
      scheduledDate: '2026-02-15',
      status: 'CONFIRMED',
      totalPrice: 1200,
      paymentStatus: 'PAID',
      pickupAddress: '123 Gallery St, New York, NY',
      deliveryAddress: '456 Museum Ave, New York, NY',
      items: [
        { description: 'Oil Painting 36x48', quantity: 1 },
        { description: 'Sculpture (marble)', quantity: 1 },
      ],
      notes: 'Handle with care - valuable artwork',
    })
    setLoading(false)
  }, [id])

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>
  }

  if (!booking) {
    return <div className="text-center py-8">Booking not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/bookings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{booking.bookingNumber}</h1>
            <p className="text-muted-foreground">Booking Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Link href={`/admin/bookings/${id}/edit`}>
            <Button className="bg-black hover:bg-slate-800 text-white">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Booking Status</p>
            <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
              {booking.status}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Payment Status</p>
            <Badge className={paymentStatusColors[booking.paymentStatus as keyof typeof paymentStatusColors]}>
              {booking.paymentStatus}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
            <p className="text-2xl font-bold">${booking.totalPrice}</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{booking.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{booking.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled Date</p>
              <p className="font-medium">{booking.scheduledDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium">{booking.service}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Locations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Pickup Address</p>
            <p className="font-medium">{booking.pickupAddress}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Delivery Address</p>
            <p className="font-medium">{booking.deliveryAddress}</p>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {booking.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between p-3 border rounded-lg">
                <p className="font-medium">{item.description}</p>
                <p className="text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {booking.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{booking.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
