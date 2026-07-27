'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Plus } from "lucide-react"
import { mockBookings } from '@/lib/mockData'

export default function CalendarPage() {
  const upcomingBookings = mockBookings.filter(b => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Calendar & Scheduling</h1>
          <p className="text-slate-700">Manage shipment schedules and delivery dates</p>
        </div>
        <Link href="/admin/calendar/add">
          <Button className="bg-black hover:bg-slate-900 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Schedule New
          </Button>
        </Link>
      </div>

      {/* Calendar View */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-black">Upcoming Shipments</CardTitle>
          <CardDescription className="text-slate-600">Next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-slate-600" />
                    <p className="font-semibold text-black">{booking.number}</p>
                    <Badge className={booking.status === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-900' : 'bg-blue-100 text-blue-900'}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>{booking.service}</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{booking.pickup}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{booking.date}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-black">
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">2</p>
            <p className="text-xs text-slate-600 mt-1">scheduled deliveries</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">5</p>
            <p className="text-xs text-slate-600 mt-1">total shipments</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">3</p>
            <p className="text-xs text-slate-600 mt-1">need scheduling</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">8/10</p>
            <p className="text-xs text-slate-600 mt-1">staff available</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
