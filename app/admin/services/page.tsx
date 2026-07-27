'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import { mockServices } from '@/lib/mockData'

export default function ServicesPage() {
  const [services, setServices] = useState(mockServices)
  const [search, setSearch] = useState('')

  const filtered = services.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Services</h1>
          <p className="text-slate-700">Manage available shipping services</p>
        </div>
        <Link href="/admin/services/add">
          <Button className="bg-black hover:bg-slate-900 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="bg-white border-slate-200">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <Card key={service.id} className="bg-white border-slate-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <CardTitle className="text-black">{service.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-slate-600">{service.description}</CardDescription>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-3">Base Price</p>
                <p className="text-2xl font-bold text-black">{service.basePrice}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Link href={`/admin/services/${service.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full border-slate-300 text-black hover:bg-slate-100">
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="bg-white border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-slate-600">No services found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
