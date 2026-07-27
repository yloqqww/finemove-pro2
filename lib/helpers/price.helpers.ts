export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPriceShort(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export function calculateTax(amount: number, taxRate: number = 0.08): number {
  return Math.round(amount * taxRate * 100) / 100
}

export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  return Math.round(originalPrice * (discountPercent / 100) * 100) / 100
}

export function applyDiscount(price: number, discount: number): number {
  return Math.max(0, price - discount)
}
