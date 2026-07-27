"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useBookingStore } from "@/store/bookingStore"
import { addressSchema, type AddressInput } from "@/lib/validations/booking.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BUILDING_TYPES } from "@/lib/constants"
import { BuildingType } from "@prisma/client"

interface StepPickupProps {
  onNext: () => void
  onBack: () => void
}

export function StepPickup({ onNext, onBack }: StepPickupProps) {
  const { formData, updateFormData } = useBookingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      pickupAddress: formData.pickupAddress || "",
      pickupCity: formData.pickupCity || "",
      pickupState: formData.pickupState || "",
      pickupZip: formData.pickupZip || "",
      pickupBuilding: formData.pickupBuilding || BuildingType.HOUSE,
      pickupFloor: formData.pickupFloor || 1,
      pickupElevator: formData.pickupElevator || false,
      pickupDock: formData.pickupDock || false,
    },
  })

  const onSubmit = (data: any) => {
    updateFormData(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Address Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="pickupAddress" className="text-sm font-semibold text-slate-900 mb-2 block">
            Street Address
          </Label>
          <Input
            id="pickupAddress"
            placeholder="123 Main Street"
            className="py-2.5 border-slate-200"
            {...register("pickupAddress")}
          />
          {errors.pickupAddress && (
            <p className="text-xs text-red-600 mt-2">{errors.pickupAddress.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="pickupCity" className="text-sm font-semibold text-slate-900 mb-2 block">
              City
            </Label>
            <Input
              id="pickupCity"
              placeholder="New York"
              className="py-2.5 border-slate-200"
              {...register("pickupCity")}
            />
            {errors.pickupCity && (
              <p className="text-xs text-red-600 mt-2">{errors.pickupCity.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="pickupState" className="text-sm font-semibold text-slate-900 mb-2 block">
              State
            </Label>
            <Input
              id="pickupState"
              placeholder="NY"
              maxLength={2}
              className="py-2.5 border-slate-200 uppercase"
              {...register("pickupState")}
            />
            {errors.pickupState && (
              <p className="text-xs text-red-600 mt-2">{errors.pickupState.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="pickupZip" className="text-sm font-semibold text-slate-900 mb-2 block">
              ZIP Code
            </Label>
            <Input
              id="pickupZip"
              placeholder="10001"
              maxLength={5}
              className="py-2.5 border-slate-200"
              {...register("pickupZip")}
            />
            {errors.pickupZip && (
              <p className="text-xs text-red-600 mt-2">{errors.pickupZip.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Building Details */}
      <div className="space-y-4 border-t border-slate-200 pt-6">
        <h3 className="font-semibold text-slate-900">Building Details</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pickupFloor" className="text-sm font-medium text-slate-700 mb-2 block">
              Floor Number
            </Label>
            <Input
              id="pickupFloor"
              type="number"
              min={1}
              className="py-2.5 border-slate-200"
              {...register("pickupFloor", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Access Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="pickupElevator"
              checked={watch("pickupElevator")}
              onCheckedChange={(checked) => setValue("pickupElevator", checked as boolean)}
              className="border-slate-300"
            />
            <Label htmlFor="pickupElevator" className="font-medium text-slate-700 cursor-pointer">
              Building has elevator access
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="pickupDock"
              checked={watch("pickupDock")}
              onCheckedChange={(checked) => setValue("pickupDock", checked as boolean)}
              className="border-slate-300"
            />
            <Label htmlFor="pickupDock" className="font-medium text-slate-700 cursor-pointer">
              Building has loading dock
            </Label>
          </div>
        </div>
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
          type="submit"
          className="flex-1 bg-black hover:bg-slate-800 text-white"
        >
          Continue to Destination
        </Button>
      </div>
    </form>
  )
}
