import { Product } from '@core/models'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import * as moment from 'moment'

export interface _ProductState extends EntityState<Product> {
  loading: boolean
  error: any
  currentProduct: Product | null
}

export interface ProductState {
  products: _ProductState
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  sortComparer: sortProductsByCodeNumber,
})

export const initialProductState: _ProductState = productAdapter.getInitialState({
  loading: false,
  error: null,
  currentProduct: null,
})

function sortProductsByCodeNumber(a: Product, b: Product): number {
  return a.name.localeCompare(b.name)
}

function sortByCreatedAt(a: any, b: any): number {
  let aCreatedAt = a.createdAt as Date
  let bCreatedAt = b.createdAt as Date
  if (moment(aCreatedAt).isBefore(bCreatedAt)) return 1
  else if (moment(aCreatedAt).isAfter(bCreatedAt)) return -1
  return 0
}
