export interface Item {
  id: string
  productId: string
  compositionId: string
  name: string
  description: string
  price: number
  amount?: number
  disabled?: boolean
  checked?: boolean
  isActive: boolean
}
