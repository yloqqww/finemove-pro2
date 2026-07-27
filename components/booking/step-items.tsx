"use client"

import { useState } from "react"
import { useBookingStore } from "@/store/bookingStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface StepItemsProps {
  onNext: () => void
  onBack: () => void
}

export function StepItems({ onNext, onBack }: StepItemsProps) {
  const { formData, updateFormData } = useBookingStore()
  const [items, setItems] = useState(formData.items || [createEmptyItem()])

  function createEmptyItem() {
    return {
      category: "",
      title: "",
      description: "",
      quantity: 1,
      hasFrame: false,
      hasGlass: false,
      isFragile: false,
      needsInsurance: false,
      needsPacking: false,
      needsUnpacking: false,
      needsInstall: false,
      needsDisassembly: false,
      needsAssembly: false,
      notes: "",
    }
  }

  const addItem = () => {
    setItems([...items, createEmptyItem()])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleNext = () => {
    updateFormData({ items })
    onNext()
  }

  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <Card key={index} className="p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">Item {index + 1}</h3>
            {items.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Item Name & Description */}
            <div>
              <Label className="text-sm font-semibold text-slate-900 mb-2 block">
                Item Description
              </Label>
              <Input
                placeholder="e.g., Oil Painting on Canvas"
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
                className="py-2.5 border-slate-200"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-slate-900 mb-2 block">
                Additional Details
              </Label>
              <Textarea
                placeholder="Any special notes about this item..."
                value={item.notes}
                onChange={(e) => updateItem(index, "notes", e.target.value)}
                className="py-2.5 border-slate-200 resize-none"
                rows={3}
              />
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-sm font-semibold text-slate-900 mb-2 block">
                Quantity
              </Label>
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                className="py-2.5 border-slate-200"
              />
            </div>

            {/* Special Services */}
            <div className="space-y-3 border-t border-slate-200 pt-4">
              <h4 className="font-medium text-slate-900 text-sm">Special Services</h4>
              
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`fragile-${index}`}
                  checked={item.isFragile}
                  onCheckedChange={(checked) => updateItem(index, "isFragile", checked)}
                  className="border-slate-300"
                />
                <Label htmlFor={`fragile-${index}`} className="font-medium text-slate-700 cursor-pointer">
                  Fragile - requires special handling
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id={`insurance-${index}`}
                  checked={item.needsInsurance}
                  onCheckedChange={(checked) => updateItem(index, "needsInsurance", checked)}
                  className="border-slate-300"
                />
                <Label htmlFor={`insurance-${index}`} className="font-medium text-slate-700 cursor-pointer">
                  Add insurance coverage
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id={`packing-${index}`}
                  checked={item.needsPacking}
                  onCheckedChange={(checked) => updateItem(index, "needsPacking", checked)}
                  className="border-slate-300"
                />
                <Label htmlFor={`packing-${index}`} className="font-medium text-slate-700 cursor-pointer">
                  Professional packing needed
                </Label>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Add Item Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Item
      </Button>

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
          className="flex-1 bg-black hover:bg-slate-800 text-white"
        >
          Continue to Schedule
        </Button>
      </div>
    </div>
  )
}
