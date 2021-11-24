import { Category } from './category'
import { ShippingType } from './shipping-type'
import { Type } from './type'

export interface Company {
  id: string
  name: string
  image: string
  cover: string
  score: number
  balance?: number
  package?: number
  address: string
  number: string
  district: string
  typeId: string
  category?: Category
  categoryId?: string
  minOrderValue?: number
  complement?: number
  picture?: string
  type: Type
  legalName: string
  shippingType: ShippingType
  shippingTax: number
  subsidiaryId: string
  issueFiscalDocument: boolean
  latitude: number
  longitude: number
  isOpen: boolean
  hasPickUp: boolean
  location?: CompanyLocation
  hours?: {
    close: number
    closed: boolean
    day: number
    open: number
  }[]
  zipCode?: string
  phoneNumber?: string
  avgMinTime?: number
  avgMaxTime?: number
  ein: string
  tax: number
  isActive: boolean
  packageId: string
  cityId?: string
  stateId?: string
  owner: CompanyOwner
  account?: CompanyAccount
}

export interface CompanyLocation {
  boundingBox: any
  coordinateReferenceSystem: any
  coordinates: { values: number[]; longitude: number; latitude: number }
  values: number[]
  extraMembers: any
  type: number
}

export interface CompanyOwner {
  name: string
  ssn: string
  phoneNumber: string
}

export interface CompanyAccount {
  bank: string
  agency: string
  number: string
  digit: number
  type: number
  person: number
  einssn: string
}
