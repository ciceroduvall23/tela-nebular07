export interface Order {
  address: string
  appVersion: string
  code: number
  companyCharge: number
  companyId: string
  couponId: string
  courier: any
  courierCharge: number
  courierId: string
  createdAt: string
  customerId: string
  discount: number
  distance: number
  id: string
  latitude: number
  longitude: number
  paymentTypeId: any
  phoneModel: string
  shipping: number
  shippingType: number
  status: number
  subTotal: number
  subsidiaryId: string
  total: number

  customer?: any
  history?: any[]
  items?: any[]
  location?: any
  payment?: any
  company?: any

  submittedStatus?: any
  confirmedStatus?: any
  preparingStatus?: any
  readyStatus?: any
  shippedStatus?: any
  deliveredStatus?: any
}

export enum OrderShippingType {
  DELIVERY = 1,
  PICKUP,
}
