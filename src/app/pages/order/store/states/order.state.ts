import { Order } from '@core/models'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import * as moment from 'moment'

export interface _OrderState extends EntityState<Order> {
  loading: boolean
  error: any
  currentOrder: Order | null
}

export interface OrderState {
  orders: _OrderState
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  sortComparer: sortOrdersByCodeNumber,
})

export const initialOrderState: _OrderState = orderAdapter.getInitialState({
  loading: false,
  error: null,
  currentOrder: null,
})

function sortOrdersByCodeNumber(a: Order, b: Order): number {
  if (a.code < b.code) return 1
  else if (a.code > b.code) return -1
  return 0
}

function sortByCreatedAt(a: any, b: any): number {
  let aCreatedAt = a.createdAt as Date
  let bCreatedAt = b.createdAt as Date
  if (moment(aCreatedAt).isBefore(bCreatedAt)) return 1
  else if (moment(aCreatedAt).isAfter(bCreatedAt)) return -1
  return 0
}
