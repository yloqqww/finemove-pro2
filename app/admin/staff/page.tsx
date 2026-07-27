'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Mail, Phone, MapPin, Search } from "lucide-react"

const staffMembers = [
  { id: 1, name: 'James Wilson', email: 'james@finemove.com', phone: '(555) 123-0001', role: 'Lead Driver', status: 'ACTIVE', bookings: 28 },
  { id: 2, name: 'Maria Garcia', email: 'maria@finemove.com', phone: '(555) 123-0002', role: 'Packer', status: 'ACTIVE', bookings: 42 },
  { id: 3, name: 'Carlos Rodriguez', email: 'carlos@finemove.com', phone: '(555) 123-0003', role: 'Driver', status: 'ACTIVE', bookings: 19 },
  { id: 4, name: 'David Lee', email: 'david@finemove.com', phone: '(555) 123-0004', role: 'Coordinator', status: 'ACTIVE', bookings: 35 },
  { id: 5, name: 'Sophia Martinez', email: 'sophia@finemove.com', phone: '(555) 123-0005', role: 'Driver', status: 'ON_LEAVE', bookings: 15 },
]

export default function StaffPage() {
  const [search, setSearch] = useState('')

  const filtered = staffMembers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Staff Management</h1>
          <p className="text-slate-700">Manage team members and assignments</p>
        </div>
        <Link href="/admin/staff/add">
          <Button className="bg-black hover:bg-slate-900 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="bg-white border-slate-200">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((staff) => (
          <Card key={staff.id} className="bg-white border-slate-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-black font-semibold mb-3">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <CardTitle className="text-black">{staff.name}</CardTitle>
                  <CardDescription className="text-slate-600">{staff.role}</CardDescription>
                </div>
                <Badge className={staff.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-900' : 'bg-yellow-100 text-yellow-900'}>
                  {staff.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="h-4 w-4" />
                {staff.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="h-4 w-4" />
                {staff.phone}
              </div>
              <div className="pt-3 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Shipments Handled</p>
                <p className="text-2xl font-bold text-black">{staff.bookings}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Link href={`/admin/staff/${staff.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full border-slate-300 text-black hover:bg-slate-100">
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="bg-white border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-slate-600">No staff members found</p>
          </CardContent>
        </Card>
      )}

      {/* Staff Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">{staffMembers.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">{staffMembers.filter(s => s.status === 'ACTIVE').length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">{staffMembers.filter(s => s.status === 'ON_LEAVE').length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg. Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">{Math.round(staffMembers.reduce((sum, s) => sum + s.bookings, 0) / staffMembers.length)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
