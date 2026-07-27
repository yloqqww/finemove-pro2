'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus } from "lucide-react"

const RULE_TYPES = [
  { value: 'DISTANCE', label: 'Distance-based' },
  { value: 'COVERAGE', label: 'Coverage/Insurance' },
  { value: 'FIXED', label: 'Fixed Fee' },
  { value: 'PREMIUM', label: 'Premium Service' },
  { value: 'TIME_BASED', label: 'Time-based' },
  { value: 'PERCENTAGE', label: 'Percentage-based' },
]

export default function AddPricingRulePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    value: '',
    description: '',
    status: 'ACTIVE',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/pricing-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create pricing rule')
      }

      router.push('/admin/pricing')
      router.refresh()
    } catch (error) {
      console.error('Error creating pricing rule:', error)
      alert('Failed to create pricing rule')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/pricing">
          <Button variant="ghost" size="sm" className="text-black">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black">Add Pricing Rule</h1>
          <p className="text-slate-700">Create a new pricing rule</p>
        </div>
      </div>

      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-black">New Pricing Rule</CardTitle>
          <CardDescription className="text-slate-600">Fill in the details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rule Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black">Rule Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Standard Distance"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="border-slate-200"
                />
              </div>

              {/* Rule Type */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-black">Rule Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {RULE_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Value */}
              <div className="space-y-2">
                <Label htmlFor="value" className="text-black">Value/Rate</Label>
                <Input
                  id="value"
                  placeholder="e.g., $0.50 per mile, 1%, $50 fixed"
                  value={formData.value}
                  onChange={(e) => handleChange('value', e.target.value)}
                  required
                  className="border-slate-200"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-black">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-black">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Add any additional details about this pricing rule"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="border-slate-200"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <Link href="/admin/pricing" className="flex-1">
                <Button variant="outline" className="w-full border-slate-300 text-black hover:bg-slate-100">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-black hover:bg-slate-900 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isLoading ? 'Creating...' : 'Create Rule'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
