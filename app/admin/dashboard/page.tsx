'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Package, Users, DollarSign, TrendingUp, CheckCircle, Clock, ArrowRight } from "lucide-react"
import { mockBookings, mockDashboardStats, mockAnalytics } from '@/lib/mockData'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-base text-slate-600 mt-2">Real-time business metrics and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{mockDashboardStats.totalBookings}</p>
            <p className="text-xs text-slate-600 mt-2">All time</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{mockDashboardStats.activeBookings}</p>
            <p className="text-xs text-slate-600 mt-2">In progress</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{mockDashboardStats.totalCustomers}</p>
            <p className="text-xs text-slate-600 mt-2">All registered</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">${mockDashboardStats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-600 mt-2">Paid invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">{mockDashboardStats.pendingBookings}</p>
            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{width: `${(mockDashboardStats.pendingBookings / mockDashboardStats.totalBookings) * 100}%`}} />
            </div>
            <p className="text-xs text-slate-600 mt-2">
              {Math.round((mockDashboardStats.pendingBookings / mockDashboardStats.totalBookings) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">{mockDashboardStats.completedBookings}</p>
            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${(mockDashboardStats.completedBookings / mockDashboardStats.totalBookings) * 100}%`}} />
            </div>
            <p className="text-xs text-slate-600 mt-2">
              {Math.round((mockDashboardStats.completedBookings / mockDashboardStats.totalBookings) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-900">Pending Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{mockDashboardStats.pendingQuotes}</p>
            <p className="text-xs text-slate-600 mt-4">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Monthly Revenue</CardTitle>
          <CardDescription className="text-slate-600">Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-slate-700 font-medium">Monthly Total</span>
              <p className="text-2xl font-bold text-slate-900">${mockDashboardStats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Average per Booking</span>
              <p className="text-xl font-semibold text-slate-900">${mockDashboardStats.averageBookingValue.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="flex items-center justify-between border-b border-slate-200">
          <div>
            <CardTitle className="text-slate-900">Recent Bookings</CardTitle>
            <CardDescription className="text-slate-600">Latest 5 bookings</CardDescription>
          </div>
          <Link href="/admin/bookings">
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {mockBookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{booking.number}</p>
                  <p className="text-sm text-slate-600">{booking.service}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-semibold text-slate-900">{booking.price}</p>
                  <Badge className={
                    booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-900 border-0' :
                    booking.status === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-900 border-0' :
                    booking.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-900 border-0' :
                    'bg-slate-100 text-slate-900 border-0'
                  }>
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Booking Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">87%</p>
            <p className="text-xs text-slate-600 mt-2">Confirmed/Completed</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">2h</p>
            <p className="text-xs text-slate-600 mt-2">Quote to confirmation</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">4.8/5</p>
            <p className="text-xs text-slate-600 mt-2">Based on reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
