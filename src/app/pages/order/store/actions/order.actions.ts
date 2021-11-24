import { Order } from '@core/models'
import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity'
import { createAction, props } from '@ngrx/store'
import { ORDER_ACTIONS } from './actions'

export const setCurrentOrder = createAction(
  ORDER_ACTIONS.SetCurrentOrder,
  props<{ order: Order | null }>()
)
export const removeCurrentOrder = createAction(ORDER_ACTIONS.RemoveCurrentOrder)
export const setLoading = createAction(
  ORDER_ACTIONS.SetLoading,
  props<{ loading: boolean }>()
)
export const loadOrders = createAction(
  ORDER_ACTIONS.LoadOrder,
  props<{ orders: Order[] }>()
)
export const addOrder = createAction(ORDER_ACTIONS.AddOrder, props<{ order: Order }>())
export const setOrder = createAction(ORDER_ACTIONS.SetOrder, props<{ order: Order }>())
export const upsertOrder = createAction(
  ORDER_ACTIONS.UpsertOrder,
  props<{ order: Order }>()
)
export const addOrders = createAction(
  ORDER_ACTIONS.AddOrders,
  props<{ orders: Order[] }>()
)
export const upsertOrders = createAction(
  ORDER_ACTIONS.UpsertOrders,
  props<{ orders: Order[] }>()
)
export const updateOrder = createAction(
  ORDER_ACTIONS.UpdateOrder,
  props<{ update: Update<Order> }>()
)
export const updateOrders = createAction(
  ORDER_ACTIONS.UpdateOrders,
  props<{ updates: Update<Order>[] }>()
)
export const mapOrder = createAction(
  ORDER_ACTIONS.MapOrder,
  props<{ entityMap: EntityMapOne<Order> }>()
)
export const mapOrders = createAction(
  ORDER_ACTIONS.MapOrders,
  props<{ entityMap: EntityMap<Order> }>()
)
export const deleteOrder = createAction(
  ORDER_ACTIONS.DeleteOrder,
  props<{ id: string }>()
)
export const deleteOrders = createAction(
  ORDER_ACTIONS.DeleteOrders,
  props<{ ids: string[] }>()
)
export const deleteOrdersByPredicate = createAction(
  ORDER_ACTIONS.DeleteOrderByPredicate,
  props<{ predicate: Predicate<Order> }>()
)
export const clearOrders = createAction(ORDER_ACTIONS.ClearOrders)
