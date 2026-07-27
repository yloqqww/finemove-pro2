"use client"

import { useRouter } from "next/navigation"
import { useBookingStore } from "@/store/bookingStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Download, Mail, ArrowRight } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export function StepConfirmation() {
  const router = useRouter()
  const { resetForm } = useBookingStore()

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  const bookingNumber = "FMP-" + Math.floor(Math.random() * 90000 + 10000)

  const handleViewBooking = () => {
    resetForm()
    router.push("/customer/bookings")
  }

  const handleNewBooking = () => {
    resetForm()
    router.push("/customer/bookings/new")
  }

  return (
    <div className="space-y-8 text-center py-4">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="h-14 w-14 text-emerald-600" />
        </div>
      </div>

      {/* Confirmation Message */}
      <div>
        <h2 className="text-4xl font-bold text-slate-900 mb-3">Booking Confirmed!</h2>
        <p className="text-lg text-slate-600">
          Your booking has been successfully created
        </p>
      </div>

      {/* Booking Number Card */}
      <Card className="bg-slate-50 border border-slate-200">
        <CardContent className="pt-8 pb-8">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
            Booking Number
          </p>
          <p className="text-5xl font-bold text-black mb-4">
            {bookingNumber}
          </p>
          <p className="text-sm text-slate-600">
            Save this number for your reference and tracking
          </p>
        </CardContent>
      </Card>

      {/* Secondary Actions */}
      <div className="space-y-3 bg-slate-50 p-6 rounded-lg border border-slate-200">
        <p className="text-slate-700 font-medium mb-4">
          A confirmation has been sent to your email
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-white transition-colors text-sm font-medium">
            <Mail className="h-4 w-4" />
            Email Confirmation
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-white transition-colors text-sm font-medium">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="space-y-3 pt-4">
        <Button 
          size="lg" 
          className="w-full bg-black hover:bg-slate-800 text-white py-3"
          onClick={handleViewBooking}
        >
          View My Bookings
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 py-3"
          onClick={handleNewBooking}
        >
          Create Another Booking
        </Button>
      </div>
    </div>
  )
}
