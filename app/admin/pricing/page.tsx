'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2 } from "lucide-react"

const pricingRules = [
  { id: 1, name: 'Standard Distance', type: 'Distance', value: '$0.50 per mile', status: 'ACTIVE' },
  { id: 2, name: 'Insurance Coverage', type: 'Coverage', value: '1% of item value', status: 'ACTIVE' },
  { id: 3, name: 'Handling Fee', type: 'Fixed', value: '$50 per item', status: 'ACTIVE' },
  { id: 4, name: 'Rush Delivery', type: 'Premium', value: '50% surcharge', status: 'ACTIVE' },
  { id: 5, name: 'Weekend Delivery', type: 'Time-based', value: '$100 extra', status: 'INACTIVE' },
]

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Pricing</h1>
          <p className="text-slate-700">Manage pricing rules and rates</p>
        </div>
        <Link href="/admin/pricing/add">
          <Button className="bg-black hover:bg-slate-900 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Rule
          </Button>
        </Link>
      </div>

      {/* Pricing Rules */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-black">Pricing Rules</CardTitle>
          <CardDescription className="text-slate-600">Configure your pricing structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pricingRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-black">{rule.name}</h3>
                    <Badge className={rule.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-900'}>
                      {rule.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-600">Type: {rule.type}</span>
                    <span className="font-semibold text-black">{rule.value}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-black">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Tiers */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-black">Service Price Tiers</CardTitle>
          <CardDescription className="text-slate-600">Standard pricing for each service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-sm font-medium text-slate-600 mb-2">Fine Art Transport</p>
              <p className="text-2xl font-bold text-black mb-2">$1,200</p>
              <p className="text-xs text-slate-600">Base price per shipment</p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-sm font-medium text-slate-600 mb-2">Luxury Furniture</p>
              <p className="text-2xl font-bold text-black mb-2">$800</p>
              <p className="text-xs text-slate-600">Base price per shipment</p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-sm font-medium text-slate-600 mb-2">Museum Delivery</p>
              <p className="text-2xl font-bold text-black mb-2">$2,000</p>
              <p className="text-xs text-slate-600">Base price per shipment</p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-sm font-medium text-slate-600 mb-2">White Glove Service</p>
              <p className="text-2xl font-bold text-black mb-2">$600</p>
              <p className="text-xs text-slate-600">Base price per shipment</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
