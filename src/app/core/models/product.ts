import { Sale } from './sale'

export interface Product {
  id: string
  companyId: string
  sectionId: number
  name: string
  description: string
  observation?: string
  image: string
  price: number
  time: string
  isFeatured: boolean
  sale: Sale
  total?: number
  amount?: number
}
