export interface Subsidiary {
  id: string
  name: string
  legalName: string
  ownerName?: string
  ein: string
  email?: string
  phoneNumber?: string
  district?: string
  address?: string
  numebr?: string
  complement?: string
  cityId?: string
  zipCode?: string
  state?: State
  city?: City
  latitude: number
  longitude: number
  params: any
  isOpen: boolean
}

export interface City {
  code: number
  name: string
}

export interface State {
  uf: number
  name: string
  shortName: string
}
