import { ActionReducerMap } from '@ngrx/store'
import { ProductModuleState } from '../states'
import { productReducer } from './product.reducer'

export const reducers: ActionReducerMap<ProductModuleState> = {
  products: productReducer,
}
