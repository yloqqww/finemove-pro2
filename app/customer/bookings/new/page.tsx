"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useBookingStore } from "@/store/bookingStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Check, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// Import step components (to be created)
import { StepService } from "@/components/booking/step-service"
import { StepPickup } from "@/components/booking/step-pickup"
import { StepDestination } from "@/components/booking/step-destination"
import { StepItems } from "@/components/booking/step-items"
import { StepSchedule } from "@/components/booking/step-schedule"
import { StepReview } from "@/components/booking/step-review"
import { StepConfirmation } from "@/components/booking/step-confirmation"

const STEPS = [
  { number: 1, title: "Service", description: "Choose service type" },
  { number: 2, title: "Pickup", description: "Pickup location" },
  { number: 3, title: "Destination", description: "Delivery location" },
  { number: 4, title: "Items", description: "Item details" },
  { number: 5, title: "Schedule", description: "Date & time" },
  { number: 6, title: "Review", description: "Review & pricing" },
  { number: 7, title: "Confirm", description: "Confirmation" },
]

export default function NewBookingPage() {
  const router = useRouter()
  const { currentStep, setCurrentStep, nextStep, previousStep, resetForm } = useBookingStore()
  
  const handleNext = () => {
    if (currentStep < STEPS.length) {
      nextStep()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      previousStep()
    } else {
      router.push("/customer/bookings")
    }
  }

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Bookings</span>
        </button>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Create New Booking
          </h1>
          <p className="text-base text-slate-600 mt-2">
            Follow {STEPS.length} simple steps to create your booking
          </p>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 border border-slate-200 shadow-sm">
          <CardContent className="pt-8 pb-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium text-slate-700">
                  Step {currentStep} of {STEPS.length}
                </p>
                <p className="text-sm font-medium text-slate-600">
                  {Math.round(progress)}% complete
                </p>
              </div>
              <Progress value={progress} className="h-2.5 bg-slate-100" />
            </div>

            {/* Steps Indicator */}
            <div className="flex justify-between gap-1 sm:gap-2">
              {STEPS.map((step) => (
                <div key={step.number} className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all font-semibold text-sm",
                      step.number < currentStep
                        ? "bg-emerald-500 text-white"
                        : step.number === currentStep
                        ? "bg-black text-white ring-2 ring-black ring-offset-2"
                        : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {step.number < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-600 text-center hidden sm:block leading-tight">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-200 pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900">
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-base text-slate-600 mt-1">
              {STEPS[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            {currentStep === 1 && <StepService onNext={handleNext} />}
            {currentStep === 2 && <StepPickup onNext={handleNext} onBack={handleBack} />}
            {currentStep === 3 && <StepDestination onNext={handleNext} onBack={handleBack} />}
            {currentStep === 4 && <StepItems onNext={handleNext} onBack={handleBack} />}
            {currentStep === 5 && <StepSchedule onNext={handleNext} onBack={handleBack} />}
            {currentStep === 6 && <StepReview onNext={handleNext} onBack={handleBack} />}
            {currentStep === 7 && <StepConfirmation />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
