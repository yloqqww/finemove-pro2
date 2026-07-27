"use client"

import { useState } from "react"
import { useBookingStore } from "@/store/bookingStore"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { TimeSlot } from "@prisma/client"
import { Calendar, Clock } from "lucide-react"

const TIME_SLOTS = [
  { value: TimeSlot.MORNING, label: "Morning (8AM - 12PM)" },
  { value: TimeSlot.AFTERNOON, label: "Afternoon (12PM - 5PM)" },
  { value: TimeSlot.EVENING, label: "Evening (5PM - 9PM)" },
]

interface StepScheduleProps {
  onNext: () => void
  onBack: () => void
}

export function StepSchedule({ onNext, onBack }: StepScheduleProps) {
  const { formData, updateFormData } = useBookingStore()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    formData.scheduledDate
  )
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>(
    formData.timeSlot || TimeSlot.MORNING
  )

  const handleNext = () => {
    if (selectedDate) {
      updateFormData({
        scheduledDate: selectedDate,
        timeSlot: selectedTimeSlot,
      })
      onNext()
    }
  }

  // Generate next 30 days
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1) // Start from tomorrow
    return date
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      {/* Date Selection */}
      <div>
        <Label className="text-sm font-semibold text-slate-900 mb-4 block">
          <Calendar className="inline h-4 w-4 mr-2" />
          Select Preferred Date
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {availableDates.map((date, i) => {
            const isSelected = selectedDate && 
              date.toDateString() === selectedDate.toDateString()
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  isSelected
                    ? "border-black bg-slate-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="font-semibold text-slate-900">
                  {date.getDate()}
                </div>
                <div className="text-xs text-slate-600">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="border-t border-slate-200 pt-6">
        <Label className="text-sm font-semibold text-slate-900 mb-4 block">
          <Clock className="inline h-4 w-4 mr-2" />
          Select Time Slot
        </Label>
        <div className="space-y-3">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot.value}
              onClick={() => setSelectedTimeSlot(slot.value)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                selectedTimeSlot === slot.value
                  ? "border-black bg-slate-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="font-semibold text-slate-900">{slot.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      {selectedDate && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <p className="text-sm font-medium text-slate-700 mb-2">Selected Schedule</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatDate(selectedDate)} • {TIME_SLOTS.find(s => s.value === selectedTimeSlot)?.label}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 border-t border-slate-200 pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Back
        </Button>
        <Button 
          type="button"
          onClick={handleNext}
          disabled={!selectedDate}
          className="flex-1 bg-black hover:bg-slate-800 text-white disabled:bg-slate-400"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  )
}
