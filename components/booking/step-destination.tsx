"use client"

import { useForm } from "react-hook-form"
import { useBookingStore } from "@/store/bookingStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BuildingType } from "@prisma/client"

interface StepDestinationProps {
  onNext: () => void
  onBack: () => void
}

export function StepDestination({ onNext, onBack }: StepDestinationProps) {
  const { formData, updateFormData } = useBookingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      destAddress: formData.destAddress || "",
      destCity: formData.destCity || "",
      destState: formData.destState || "",
      destZip: formData.destZip || "",
      destBuilding: formData.destBuilding || BuildingType.HOUSE,
      destFloor: formData.destFloor || 1,
      destElevator: formData.destElevator || false,
      destDock: formData.destDock || false,
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
          <Label htmlFor="destAddress" className="text-sm font-semibold text-slate-900 mb-2 block">
            Street Address
          </Label>
          <Input
            id="destAddress"
            placeholder="456 Park Avenue"
            className="py-2.5 border-slate-200"
            {...register("destAddress")}
          />
          {errors.destAddress && (
            <p className="text-xs text-red-600 mt-2">{errors.destAddress.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="destCity" className="text-sm font-semibold text-slate-900 mb-2 block">
              City
            </Label>
            <Input
              id="destCity"
              placeholder="New York"
              className="py-2.5 border-slate-200"
              {...register("destCity")}
            />
          </div>

          <div>
            <Label htmlFor="destState" className="text-sm font-semibold text-slate-900 mb-2 block">
              State
            </Label>
            <Input
              id="destState"
              placeholder="NY"
              maxLength={2}
              className="py-2.5 border-slate-200 uppercase"
              {...register("destState")}
            />
          </div>

          <div>
            <Label htmlFor="destZip" className="text-sm font-semibold text-slate-900 mb-2 block">
              ZIP Code
            </Label>
            <Input
              id="destZip"
              placeholder="10002"
              maxLength={5}
              className="py-2.5 border-slate-200"
              {...register("destZip")}
            />
          </div>
        </div>
      </div>

      {/* Building Details */}
      <div className="space-y-4 border-t border-slate-200 pt-6">
        <h3 className="font-semibold text-slate-900">Building Details</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="destFloor" className="text-sm font-medium text-slate-700 mb-2 block">
              Floor Number
            </Label>
            <Input
              id="destFloor"
              type="number"
              min={1}
              className="py-2.5 border-slate-200"
              {...register("destFloor", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Access Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="destElevator"
              checked={watch("destElevator")}
              onCheckedChange={(checked) => setValue("destElevator", checked as boolean)}
              className="border-slate-300"
            />
            <Label htmlFor="destElevator" className="font-medium text-slate-700 cursor-pointer">
              Building has elevator access
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="destDock"
              checked={watch("destDock")}
              onCheckedChange={(checked) => setValue("destDock", checked as boolean)}
              className="border-slate-300"
            />
            <Label htmlFor="destDock" className="font-medium text-slate-700 cursor-pointer">
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
          Continue to Items
        </Button>
      </div>
    </form>
  )
}
