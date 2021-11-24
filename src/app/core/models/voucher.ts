export interface Voucher {
  subsidiaryId: string
  customerId: string
  name: string
  code: string
  value: number
  expiry: number
  alreadyUsed: boolean
  usedAt: number
}
