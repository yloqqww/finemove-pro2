"use client"

import { useState, useEffect } from "react"
import { useBookingStore } from "@/store/bookingStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Palette, Sofa, Building2, Star, Package, Hammer, Warehouse, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "service-1",
    name: "Fine Art Transport",
    type: "FINE_ART",
    description: "Museum-grade transport for paintings, sculptures, and fine art pieces",
    basePrice: 450,
    icon: Palette,
  },
  {
    id: "service-2",
    name: "Luxury Furniture",
    type: "LUXURY_FURNITURE",
    description: "White-glove moving service for high-end furniture and antiques",
    basePrice: 350,
    icon: Sofa,
  },
  {
    id: "service-3",
    name: "Museum Delivery",
    type: "MUSEUM_DELIVERY",
    description: "Specialized logistics for museums, galleries, and cultural institutions",
    basePrice: 800,
    icon: Building2,
  },
  {
    id: "service-4",
    name: "White Glove Delivery",
    type: "WHITE_GLOVE",
    description: "Premium end-to-end delivery with full setup and placement",
    basePrice: 300,
    icon: Star,
  },
  {
    id: "service-5",
    name: "Professional Packing",
    type: "PACKING",
    description: "Expert packing using archival materials and custom crating",
    basePrice: 150,
    icon: Package,
  },
  {
    id: "service-6",
    name: "Installation Service",
    type: "INSTALLATION",
    description: "Professional installation of artwork, mirrors, and furniture",
    basePrice: 200,
    icon: Hammer,
  },
  {
    id: "service-7",
    name: "Climate Storage",
    type: "STORAGE",
    description: "Secure, climate-controlled storage for fine art and luxury items",
    basePrice: 250,
    icon: Warehouse,
  },
]

interface StepServiceProps {
  onNext: () => void
}

export function StepService({ onNext }: StepServiceProps) {
  const { formData, updateFormData } = useBookingStore()
  const [selectedService, setSelectedService] = useState(formData.serviceId || "")

  const handleSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    updateFormData({ serviceId })
  }

  const handleNext = () => {
    if (selectedService) {
      onNext()
    }
  }

  const selectedServiceData = services.find(s => s.id === selectedService)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = selectedService === service.id

          return (
            <button
              key={service.id}
              onClick={() => handleSelect(service.id)}
              className={cn(
                "p-6 rounded-xl border-2 transition-all text-left",
                isSelected
                  ? "border-black bg-slate-50"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    isSelected
                      ? "bg-black text-white"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm">
                {service.name}
              </h3>
              <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                {service.description}
              </p>
              <p className="text-lg font-bold text-slate-900">
                From ${service.basePrice}
              </p>
            </button>
          )
        })}
      </div>

      {/* Selected Service Summary */}
      {selectedServiceData && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-slate-900 mb-2">Selected Service</h3>
          <p className="text-sm text-slate-600 mb-4">{selectedServiceData.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-slate-700 text-sm font-medium">Base Price</span>
            <span className="text-xl font-bold text-slate-900">${selectedServiceData.basePrice}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-slate-200">
        <div></div>
        <Button
          onClick={handleNext}
          disabled={!selectedService}
          className="bg-black hover:bg-slate-800 text-white px-8"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
