"use client"

import { useBookingStore } from "@/store/bookingStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Package, Calendar, DollarSign } from "lucide-react"

interface StepReviewProps {
  onNext: () => void
  onBack: () => void
}

export function StepReview({ onNext, onBack }: StepReviewProps) {
  const { formData } = useBookingStore()

  const calculateEstimate = () => {
    // Basic estimation logic
    const basePrice = 500
    const itemsMultiplier = (formData.items?.length || 1) * 50
    return basePrice + itemsMultiplier
  }

  const estimatedPrice = calculateEstimate()

  return (
    <div className="space-y-8">
      {/* Service Summary */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Booking Summary</h3>
        
        {formData.serviceId && (
          <Card className="p-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Service</p>
                <p className="text-slate-900 font-semibold">{formData.serviceId}</p>
              </div>
            </div>
          </Card>
        )}

        {formData.pickupAddress && (
          <Card className="p-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Pickup Location</p>
                <p className="text-slate-900 font-semibold">{formData.pickupAddress}</p>
                <p className="text-sm text-slate-600">
                  {formData.pickupCity}, {formData.pickupState} {formData.pickupZip}
                </p>
              </div>
            </div>
          </Card>
        )}

        {formData.destAddress && (
          <Card className="p-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Delivery Location</p>
                <p className="text-slate-900 font-semibold">{formData.destAddress}</p>
                <p className="text-sm text-slate-600">
                  {formData.destCity}, {formData.destState} {formData.destZip}
                </p>
              </div>
            </div>
          </Card>
        )}

        {formData.scheduledDate && (
          <Card className="p-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Scheduled Date & Time</p>
                <p className="text-slate-900 font-semibold">
                  {formData.scheduledDate.toLocaleDateString()} • {formData.timeSlot}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Items Summary */}
      {formData.items && formData.items.length > 0 && (
        <div className="border-t border-slate-200 pt-6 space-y-4">
          <h3 className="font-semibold text-slate-900">Items to Transport</h3>
          <div className="space-y-2">
            {formData.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{item.title || `Item ${idx + 1}`}</p>
                  <p className="text-xs text-slate-600">Quantity: {item.quantity}</p>
                </div>
                <div className="flex gap-2">
                  {item.isFragile && (
                    <Badge variant="outline" className="text-xs">Fragile</Badge>
                  )}
                  {item.needsInsurance && (
                    <Badge variant="outline" className="text-xs">Insurance</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Summary */}
      <div className="border-t border-slate-200 pt-6">
        <Card className="p-6 border border-slate-200 bg-slate-50">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-700">Base Service</span>
              <span className="font-semibold text-slate-900">$500.00</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-700">Additional Items</span>
              <span className="font-semibold text-slate-900">${(estimatedPrice - 500).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold text-slate-900">Estimated Total</span>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-slate-600" />
                <span className="text-2xl font-bold text-slate-900">${estimatedPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>
        <p className="text-xs text-slate-600 mt-4">
          * Final price may vary based on additional services and special requirements
        </p>
      </div>

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
          onClick={onNext}
          className="flex-1 bg-black hover:bg-slate-800 text-white"
        >
          Confirm & Complete
        </Button>
      </div>
    </div>
  )
}
