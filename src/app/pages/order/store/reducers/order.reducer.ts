import { Action, createReducer, on } from '@ngrx/store'
import * as OrderActions from '../actions/order.actions'
import { initialOrderState, orderAdapter, _OrderState } from '../states'

const _orderReducer = createReducer(
  initialOrderState,
  on(OrderActions.addOrder, (state, { order }) => {
    return orderAdapter.addOne(order, state)
  }),
  on(OrderActions.setOrder, (state, { order }) => {
    return orderAdapter.setOne(order, state)
  }),
  on(OrderActions.setCurrentOrder, (state, { order }) => {
    return { ...state, currentOrder: order }
  }),
  on(OrderActions.removeCurrentOrder, (state) => {
    return { ...state, currentOrder: null }
  }),
  on(OrderActions.upsertOrder, (state, { order }) => {
    return orderAdapter.upsertOne(order, state)
  }),
  on(OrderActions.addOrders, (state, { orders }) => {
    return orderAdapter.addMany(orders, state)
  }),
  on(OrderActions.upsertOrders, (state, { orders }) => {
    return orderAdapter.upsertMany(orders, state)
  }),
  on(OrderActions.updateOrder, (state, { update }) => {
    return orderAdapter.updateOne(update, state)
  }),
  on(OrderActions.updateOrders, (state, { updates }) => {
    return orderAdapter.updateMany(updates, state)
  }),
  on(OrderActions.mapOrder, (state, { entityMap }) => {
    return orderAdapter.mapOne(entityMap, state)
  }),
  on(OrderActions.mapOrders, (state, { entityMap }) => {
    return orderAdapter.map(entityMap, state)
  }),
  on(OrderActions.deleteOrder, (state, { id }) => {
    return orderAdapter.removeOne(id, state)
  }),
  on(OrderActions.deleteOrders, (state, { ids }) => {
    return orderAdapter.removeMany(ids, state)
  }),
  on(OrderActions.deleteOrdersByPredicate, (state, { predicate }) => {
    return orderAdapter.removeMany(predicate, state)
  }),
  on(OrderActions.loadOrders, (state, { orders }) => {
    return orderAdapter.setAll(orders, state)
  }),
  on(OrderActions.clearOrders, (state) => {
    return orderAdapter.removeAll({ ...state })
  }),
  on(OrderActions.setLoading, (state, { loading }) => {
    return setLoading(state, loading)
  })
)

export function orderReducer(state: _OrderState | undefined, action: Action) {
  return _orderReducer(state, action)
}

const filterByOrderStatus = (state: _OrderState, status: number) => {
  if (status >= 0) {
    const orders = state.entities
    const _orders = []
    for (const orderId in state.entities) {
      if (Object.prototype.hasOwnProperty.call(orders, orderId)) {
        const order = orders[orderId]
        if (order?.status === status) _orders.push(order)
      }
    }

    return { ...state, filteredOrders: _orders, statusFilter: status }
  }
  return { ...state, filteredOrders: null, statusFilter: null }
}

const setLoading = (state: _OrderState, loading: boolean) => {
  return { ...state, loading }
}
