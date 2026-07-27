'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Calendar } from "lucide-react"

const TIME_SLOTS = [
  { value: 'MORNING', label: 'Morning (8AM - 12PM)' },
  { value: 'AFTERNOON', label: 'Afternoon (12PM - 5PM)' },
  { value: 'EVENING', label: 'Evening (5PM - 9PM)' },
]

export default function AddSchedulePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    bookingId: '',
    scheduleDate: '',
    timeSlot: '',
    staffId: '',
    notes: '',
    reminderDays: '1',
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
      const response = await fetch('/api/admin/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create schedule')
      }

      router.push('/admin/calendar')
      router.refresh()
    } catch (error) {
      console.error('Error creating schedule:', error)
      alert('Failed to create schedule')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/calendar">
          <Button variant="ghost" size="sm" className="text-black">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black">Schedule New Shipment</h1>
          <p className="text-slate-700">Create a new delivery schedule</p>
        </div>
      </div>

      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-black">New Schedule</CardTitle>
          <CardDescription className="text-slate-600">Fill in the details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking ID */}
              <div className="space-y-2">
                <Label htmlFor="bookingId" className="text-black">Booking ID/Number</Label>
                <Input
                  id="bookingId"
                  placeholder="e.g., BK-2024-001"
                  value={formData.bookingId}
                  onChange={(e) => handleChange('bookingId', e.target.value)}
                  required
                  className="border-slate-200"
                />
              </div>

              {/* Schedule Date */}
              <div className="space-y-2">
                <Label htmlFor="scheduleDate" className="text-black">Scheduled Date</Label>
                <Input
                  id="scheduleDate"
                  type="date"
                  value={formData.scheduleDate}
                  onChange={(e) => handleChange('scheduleDate', e.target.value)}
                  required
                  className="border-slate-200"
                />
              </div>

              {/* Time Slot */}
              <div className="space-y-2">
                <Label htmlFor="timeSlot" className="text-black">Time Slot</Label>
                <Select value={formData.timeSlot} onValueChange={(value) => handleChange('timeSlot', value)}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map(slot => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Staff Assignment */}
              <div className="space-y-2">
                <Label htmlFor="staffId" className="text-black">Assign Staff Member</Label>
                <Select value={formData.staffId} onValueChange={(value) => handleChange('staffId', value)}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Select staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">James Wilson (Lead Driver)</SelectItem>
                    <SelectItem value="2">Maria Garcia (Packer)</SelectItem>
                    <SelectItem value="3">Carlos Rodriguez (Driver)</SelectItem>
                    <SelectItem value="4">David Lee (Coordinator)</SelectItem>
                    <SelectItem value="5">Sophia Martinez (Driver)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reminder Days */}
              <div className="space-y-2">
                <Label htmlFor="reminderDays" className="text-black">Reminder (days before)</Label>
                <Select value={formData.reminderDays} onValueChange={(value) => handleChange('reminderDays', value)}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Same Day</SelectItem>
                    <SelectItem value="1">1 Day Before</SelectItem>
                    <SelectItem value="2">2 Days Before</SelectItem>
                    <SelectItem value="3">3 Days Before</SelectItem>
                    <SelectItem value="7">1 Week Before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-black">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or notes about this delivery..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="border-slate-200 resize-none"
                rows={4}
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <Link href="/admin/calendar" className="flex-1">
                <Button variant="outline" className="w-full border-slate-300 text-black hover:bg-slate-100">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-black hover:bg-slate-900 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {isLoading ? 'Creating...' : 'Create Schedule'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
