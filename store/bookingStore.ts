import { create } from 'zustand'
import { BookingFormData } from '@/types'
import { BuildingType, TimeSlot, PaymentMethod } from '@prisma/client'

interface BookingState {
  currentStep: number
  formData: Partial<BookingFormData>
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<BookingFormData>) => void
  resetForm: () => void
  nextStep: () => void
  previousStep: () => void
}

const initialFormData: Partial<BookingFormData> = {
  items: [],
  pickupElevator: false,
  pickupDock: false,
  destElevator: false,
  destDock: false,
  pickupFloor: 1,
  destFloor: 1,
  pickupBuilding: BuildingType.HOUSE,
  destBuilding: BuildingType.HOUSE,
  timeSlot: TimeSlot.MORNING,
  paymentMethod: PaymentMethod.PAY_LATER,
}

export const useBookingStore = create<BookingState>((set) => ({
  currentStep: 1,
  formData: initialFormData,
  setCurrentStep: (step) => set({ currentStep: step }),
  updateFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),
  resetForm: () => set({ currentStep: 1, formData: initialFormData }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
}))
