'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Plus, Calendar, MapPin, Package, Download, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockBookings } from '@/lib/mockData'

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statuses = ['ALL', 'CONFIRMED', 'IN_PROGRESS', 'PENDING', 'COMPLETED', 'CANCELLED']

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                My Bookings
              </h1>
              <p className="text-base text-slate-600 mt-2">
                Track and manage all your moving bookings
              </p>
            </div>
            <Link href="/customer/bookings/new">
              <Button size="lg" className="bg-black hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all">
                <Plus className="mr-2 h-5 w-5" />
                New Booking
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filter Section */}
        <Card className="mb-8 border border-slate-200 shadow-sm">
          <CardHeader className="pb-4 border-b border-slate-200">
            <CardTitle className="text-base font-semibold text-slate-900">
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search by booking number or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 py-2.5 border-slate-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  Filter by Status
                </p>
                <div className="flex gap-2 flex-wrap">
                  {statuses.map(status => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'default' : 'outline'}
                      onClick={() => setStatusFilter(status)}
                      className={`text-sm transition-all ${
                        statusFilter === status
                          ? 'bg-black text-white border-black hover:bg-slate-800'
                          : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {status === 'ALL' ? 'All Status' : status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="border border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {filteredBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50 border-b border-slate-200">
                    <TableRow className="border-0">
                      <TableHead className="font-semibold text-slate-900 py-4 px-6 text-left">
                        Booking #
                      </TableHead>
                      <TableHead className="font-semibold text-slate-900 px-6 text-left">
                        Service
                      </TableHead>
                      <TableHead className="font-semibold text-slate-900 px-6 text-left">
                        Date
                      </TableHead>
                      <TableHead className="font-semibold text-slate-900 px-6 text-left">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-slate-900 px-6 text-left">
                        Amount
                      </TableHead>
                      <TableHead className="font-semibold text-slate-900 px-6 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow
                        key={booking.id}
                        className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <TableCell className="font-semibold text-slate-900 py-4 px-6">
                          {booking.number}
                        </TableCell>
                        <TableCell className="text-slate-700 px-6">
                          {booking.service}
                        </TableCell>
                        <TableCell className="text-slate-600 px-6 text-sm">
                          {booking.date}
                        </TableCell>
                        <TableCell className="px-6">
                          <StatusBadge status={booking.status} />
                        </TableCell>
                        <TableCell className="font-semibold text-slate-900 px-6">
                          {booking.price}
                        </TableCell>
                        <TableCell className="px-6">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-4">
                <div className="rounded-full bg-slate-100 p-6 mb-6">
                  <Package className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-slate-600 text-center max-w-md mb-8 text-sm">
                  {searchTerm.length > 0
                    ? 'Try adjusting your search criteria or status filter'
                    : 'You haven\'t created any bookings yet. Ready to get started?'}
                </p>
                {searchTerm.length === 0 && (
                  <Link href="/customer/bookings/new">
                    <Button className="bg-black hover:bg-slate-800 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Booking
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: { [key: string]: string } = {
    PENDING: "bg-yellow-100 text-yellow-900 border border-yellow-200",
    CONFIRMED: "bg-blue-100 text-blue-900 border border-blue-200",
    IN_PROGRESS: "bg-purple-100 text-purple-900 border border-purple-200",
    COMPLETED: "bg-emerald-100 text-emerald-900 border border-emerald-200",
    CANCELLED: "bg-red-100 text-red-900 border border-red-200",
  }

  const labels: { [key: string]: string } = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  }

  return (
    <Badge className={variants[status] || variants.PENDING}>
      {labels[status] || status}
    </Badge>
  )
}
