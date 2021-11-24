import { ActionReducerMap } from '@ngrx/store'

import { orderReducer } from './order.reducer'
import { OrderModuleState } from '../states'

export const reducers: ActionReducerMap<OrderModuleState> = {
  orders: orderReducer,
}
