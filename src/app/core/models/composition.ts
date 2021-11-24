import { Item } from './item'

export interface Composition {
  id: string
  name: string
  description: string
  base: number
  mandatory: boolean
  minAmount: number
  maxAmount: number
  items: Item[]
  valid: boolean
}
