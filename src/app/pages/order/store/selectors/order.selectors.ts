import { Order } from '@core/models'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { StoreFeatures } from '@store/store-features'
import { orderAdapter, OrderModuleState, _OrderState } from '../states'

const {
  selectEntities: _selectOrderEntities,
  selectTotal: _selectOrderTotal,
  selectAll: _selectAllOrders,
  selectIds: _selectOrderIds,
} = orderAdapter.getSelectors()
const _getCurrentOrderId = (state: _OrderState) => (state.currentOrder as Order)?.id
const _getCurrentOrder = (state: _OrderState) => state.currentOrder as Order
const _getLoadingState = (state: _OrderState) => state.loading as boolean

export const selectOrderModuleState = createFeatureSelector<OrderModuleState>(
  StoreFeatures.ORDER_MODULE
)
export const selectOrderState = createSelector(selectOrderModuleState, _selectOrderState)

export const selectOrderIds = createSelector(selectOrderState, _selectOrderIds)
export const selectOrderEntities = createSelector(selectOrderState, _selectOrderEntities)
export const selectAllOrders = createSelector(selectOrderState, _selectAllOrders)
export const selectOrderTotal = createSelector(selectOrderState, _selectOrderTotal)
export const selectCurrentOrderId = createSelector(selectOrderState, _getCurrentOrderId)
export const selectCurrentOrder = createSelector(selectOrderState, _getCurrentOrder)
export const getLoadingState = createSelector(selectOrderState, _getLoadingState)

function _selectOrderState(state: OrderModuleState) {
  return state.orders
}
