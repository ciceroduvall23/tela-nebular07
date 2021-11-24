import { Product } from '@core/models'
import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity'
import { createAction, props } from '@ngrx/store'
import { PRODUCT_ACTIONS } from './actions'

export const setCurrentProduct = createAction(
  PRODUCT_ACTIONS.SetCurrentProduct,
  props<{ product: Product | null }>()
)
export const removeCurrentProduct = createAction(PRODUCT_ACTIONS.RemoveCurrentProduct)
export const setLoading = createAction(
  PRODUCT_ACTIONS.SetLoading,
  props<{ loading: boolean }>()
)
export const loadProducts = createAction(
  PRODUCT_ACTIONS.LoadProduct,
  props<{ products: Product[] }>()
)
export const addProduct = createAction(
  PRODUCT_ACTIONS.AddProduct,
  props<{ product: Product }>()
)
export const setProduct = createAction(
  PRODUCT_ACTIONS.SetProduct,
  props<{ product: Product }>()
)
export const upsertProduct = createAction(
  PRODUCT_ACTIONS.UpsertProduct,
  props<{ product: Product }>()
)
export const addProducts = createAction(
  PRODUCT_ACTIONS.AddProducts,
  props<{ products: Product[] }>()
)
export const upsertProducts = createAction(
  PRODUCT_ACTIONS.UpsertProducts,
  props<{ products: Product[] }>()
)
export const updateProduct = createAction(
  PRODUCT_ACTIONS.UpdateProduct,
  props<{ update: Update<Product> }>()
)
export const updateProducts = createAction(
  PRODUCT_ACTIONS.UpdateProducts,
  props<{ updates: Update<Product>[] }>()
)
export const mapProduct = createAction(
  PRODUCT_ACTIONS.MapProduct,
  props<{ entityMap: EntityMapOne<Product> }>()
)
export const mapProducts = createAction(
  PRODUCT_ACTIONS.MapProducts,
  props<{ entityMap: EntityMap<Product> }>()
)
export const deleteProduct = createAction(
  PRODUCT_ACTIONS.DeleteProduct,
  props<{ id: string }>()
)
export const deleteProducts = createAction(
  PRODUCT_ACTIONS.DeleteProducts,
  props<{ ids: string[] }>()
)
export const deleteProductsByPredicate = createAction(
  PRODUCT_ACTIONS.DeleteProductByPredicate,
  props<{ predicate: Predicate<Product> }>()
)
export const clearProducts = createAction(PRODUCT_ACTIONS.ClearProducts)
