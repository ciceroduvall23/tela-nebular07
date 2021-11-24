import { Action, createReducer, on } from '@ngrx/store'
import * as ProductActions from '../actions/product.actions'
import { initialProductState, productAdapter, _ProductState } from '../states'

const _productReducer = createReducer(
  initialProductState,
  on(ProductActions.addProduct, (state, { product }) => {
    return productAdapter.addOne(product, state)
  }),
  on(ProductActions.setProduct, (state, { product }) => {
    return productAdapter.setOne(product, state)
  }),
  on(ProductActions.setCurrentProduct, (state, { product }) => {
    return { ...state, currentProduct: product }
  }),
  on(ProductActions.removeCurrentProduct, (state) => {
    return { ...state, currentProduct: null }
  }),
  on(ProductActions.upsertProduct, (state, { product }) => {
    return productAdapter.upsertOne(product, state)
  }),
  on(ProductActions.addProducts, (state, { products }) => {
    return productAdapter.addMany(products, state)
  }),
  on(ProductActions.upsertProducts, (state, { products }) => {
    return productAdapter.upsertMany(products, state)
  }),
  on(ProductActions.updateProduct, (state, { update }) => {
    return productAdapter.updateOne(update, state)
  }),
  on(ProductActions.updateProducts, (state, { updates }) => {
    return productAdapter.updateMany(updates, state)
  }),
  on(ProductActions.mapProduct, (state, { entityMap }) => {
    return productAdapter.mapOne(entityMap, state)
  }),
  on(ProductActions.mapProducts, (state, { entityMap }) => {
    return productAdapter.map(entityMap, state)
  }),
  on(ProductActions.deleteProduct, (state, { id }) => {
    return productAdapter.removeOne(id, state)
  }),
  on(ProductActions.deleteProducts, (state, { ids }) => {
    return productAdapter.removeMany(ids, state)
  }),
  on(ProductActions.deleteProductsByPredicate, (state, { predicate }) => {
    return productAdapter.removeMany(predicate, state)
  }),
  on(ProductActions.loadProducts, (state, { products }) => {
    return productAdapter.setAll(products, state)
  }),
  on(ProductActions.clearProducts, (state) => {
    return productAdapter.removeAll({ ...state })
  }),
  on(ProductActions.setLoading, (state, { loading }) => {
    return setLoading(state, loading)
  })
)

export function productReducer(state: _ProductState | undefined, action: Action) {
  return _productReducer(state, action)
}

const setLoading = (state: _ProductState, loading: boolean) => {
  return { ...state, loading }
}
