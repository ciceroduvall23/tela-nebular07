export interface Coupon {
  id: string
  subsidiaryId: string
  description: string
  code: string
  calcType: CouponCalcType
  discountType: CouponDiscountType
  discount: number
  expiry: string | Date
  companies: string[] // A list of IDs for valid companies
  maxUsage: number
  minSubtotal: number
  sponsored: boolean
  isGeneric: boolean
  isActive: boolean
}

export enum CouponCalcType {
  PERCENTAGE,
  FIXED,
}

export enum CouponDiscountType {
  DELIVERY,
  SUBTOTAL,
}
