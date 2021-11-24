import { Product } from '@core/models'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { StoreFeatures } from '@store/store-features'
import { productAdapter, ProductModuleState, _ProductState } from '../states'

const {
  selectEntities: _selectProductEntities,
  selectTotal: _selectProductTotal,
  selectAll: _selectAllProducts,
  selectIds: _selectProductIds,
} = productAdapter.getSelectors()
const _getCurrentProductId = (state: _ProductState) =>
  (state.currentProduct as Product)?.id
const _getCurrentProduct = (state: _ProductState) => state.currentProduct as Product
const _getLoadingState = (state: _ProductState) => state.loading as boolean

export const selectProductModuleState = createFeatureSelector<ProductModuleState>(
  StoreFeatures.PRODUCT_MODULE
)
export const selectProductState = createSelector(
  selectProductModuleState,
  _selectProductState
)

export const selectProductIds = createSelector(selectProductState, _selectProductIds)
export const selectProductEntities = createSelector(
  selectProductState,
  _selectProductEntities
)
export const selectAllProducts = createSelector(selectProductState, _selectAllProducts)
export const selectProductTotal = createSelector(selectProductState, _selectProductTotal)
export const selectCurrentProductId = createSelector(
  selectProductState,
  _getCurrentProductId
)
export const selectCurrentProduct = createSelector(selectProductState, _getCurrentProduct)
export const getLoadingState = createSelector(selectProductState, _getLoadingState)

function _selectProductState(state: ProductModuleState) {
  return state.products
}
