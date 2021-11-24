import { Company } from './company'

export interface User {
  id: any
  name: string
  role: number
  token: string
  ssn?: string | number
  phoneNumber?: string | number
  email: string
  bornDate: string
  subsidiaryId: string
  companyId: string
  isActive: string
  company?: Company
}
