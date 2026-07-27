import { prisma } from '@/lib/prisma'
import { PriceCalculation, BookingFormData } from '@/types'

export class PricingService {
  private static async getPricingRules() {
    return await prisma.pricingRule.findMany({
      where: { active: true }
    })
  }

  private static getRuleValue(rules: any[], key: string): number {
    const rule = rules.find(r => r.ruleKey === key)
    return rule?.value || 0
  }

  static async calculateBookingPrice(data: BookingFormData): Promise<PriceCalculation> {
    const rules = await this.getPricingRules()
    const service = await prisma.service.findUnique({ where: { id: data.serviceId } })
    
    if (!service) throw new Error('Service not found')

    const basePrice = service.basePrice
    let addOnFees: { [key: string]: number } = {}
    let distanceFee = 0

    // Calculate distance (simplified - in production use Google Maps API)
    const distance = this.calculateDistance(
      data.pickupZip,
      data.destZip
    )
    
    if (distance > 10) {
      distanceFee = (distance - 10) * this.getRuleValue(rules, 'distance_per_mile')
    }

    // Item-based fees
    for (const item of data.items) {
      // Large item fee
      if (item.width && item.height && (item.width > 60 || item.height > 60)) {
        addOnFees['Large Item Fee'] = (addOnFees['Large Item Fee'] || 0) + this.getRuleValue(rules, 'large_item_fee')
      }

      // Heavy item fee
      if (item.weight && item.weight > 150) {
        addOnFees['Heavy Item Fee'] = (addOnFees['Heavy Item Fee'] || 0) + this.getRuleValue(rules, 'heavy_item_fee')
      }

      // Fragile fee
      if (item.isFragile) {
        addOnFees['Fragile Item Fee'] = (addOnFees['Fragile Item Fee'] || 0) + this.getRuleValue(rules, 'fragile_fee')
      }

      // Glass fee
      if (item.hasGlass) {
        addOnFees['Glass Protection'] = (addOnFees['Glass Protection'] || 0) + this.getRuleValue(rules, 'glass_fee')
      }

      // Service fees
      if (item.needsPacking) {
        addOnFees['Packing Service'] = (addOnFees['Packing Service'] || 0) + this.getRuleValue(rules, 'packing_fee')
      }

      if (item.needsUnpacking) {
        addOnFees['Unpacking Service'] = (addOnFees['Unpacking Service'] || 0) + this.getRuleValue(rules, 'unpacking_fee')
      }

      if (item.needsInstall) {
        addOnFees['Installation'] = (addOnFees['Installation'] || 0) + this.getRuleValue(rules, 'installation_fee')
      }

      if (item.needsDisassembly) {
        addOnFees['Disassembly'] = (addOnFees['Disassembly'] || 0) + this.getRuleValue(rules, 'disassembly_fee')
      }

      if (item.needsAssembly) {
        addOnFees['Assembly'] = (addOnFees['Assembly'] || 0) + this.getRuleValue(rules, 'assembly_fee')
      }

      // Insurance
      if (item.needsInsurance && item.insuranceValue) {
        const insuranceRate = this.getRuleValue(rules, 'insurance_fee') / 100
        addOnFees['Insurance'] = (addOnFees['Insurance'] || 0) + (item.insuranceValue * insuranceRate)
      }
    }

    // Building/location fees
    if (!data.pickupElevator && data.pickupFloor > 1) {
      if (data.pickupFloor === 2) {
        addOnFees['Pickup 2nd Floor (No Elevator)'] = this.getRuleValue(rules, 'second_floor_fee')
      } else {
        addOnFees['Pickup 3rd+ Floor (No Elevator)'] = this.getRuleValue(rules, 'third_floor_fee')
      }
    }

    if (!data.destElevator && data.destFloor > 1) {
      if (data.destFloor === 2) {
        addOnFees['Delivery 2nd Floor (No Elevator)'] = this.getRuleValue(rules, 'second_floor_fee')
      } else {
        addOnFees['Delivery 3rd+ Floor (No Elevator)'] = this.getRuleValue(rules, 'third_floor_fee')
      }
    }

    // Weekend/timing fees
    if (data.scheduledDate) {
      const day = new Date(data.scheduledDate).getDay()
      if (day === 0 || day === 6) {
        addOnFees['Weekend Surcharge'] = this.getRuleValue(rules, 'weekend_fee')
      }
    }

    const totalAddOnFees = Object.values(addOnFees).reduce((sum, fee) => sum + fee, 0)
    const subtotal = basePrice + distanceFee + totalAddOnFees
    
    // Apply minimum fee
    const minimumFee = this.getRuleValue(rules, 'minimum_fee')
    const totalPrice = Math.max(subtotal, minimumFee)

    // Build breakdown
    const breakdown = [
      { label: service.name + ' (Base Price)', amount: basePrice },
    ]

    if (distanceFee > 0) {
      breakdown.push({ label: `Distance Fee (${distance} miles)`, amount: distanceFee })
    }

    Object.entries(addOnFees).forEach(([label, amount]) => {
      breakdown.push({ label, amount })
    })

    return {
      basePrice,
      distanceFee,
      addOnFees,
      discount: 0,
      totalPrice,
      breakdown,
    }
  }

  private static calculateDistance(zip1: string, zip2: string): number {
    // Simplified distance calculation
    // In production, use Google Maps Distance Matrix API
    const diff = Math.abs(parseInt(zip1) - parseInt(zip2))
    return Math.min(diff / 100, 150) // Mock distance up to 150 miles
  }

  static async validateCoupon(code: string): Promise<{ valid: boolean; discount?: number; message?: string }> {
    // Mock coupon validation - extend with real database lookup
    const validCoupons: { [key: string]: number } = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'FIRSTMOVE': 50,
    }

    if (validCoupons[code.toUpperCase()]) {
      return {
        valid: true,
        discount: validCoupons[code.toUpperCase()],
        message: `Coupon applied! $${validCoupons[code.toUpperCase()]} discount.`
      }
    }

    return {
      valid: false,
      message: 'Invalid coupon code'
    }
  }
}
