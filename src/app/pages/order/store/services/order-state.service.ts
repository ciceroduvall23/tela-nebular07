import { Injectable } from '@angular/core'
import { Order } from '@core/models'
import { Dictionary } from '@ngrx/entity'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as actions from '../actions'
import * as selectors from '../selectors'
import { OrderState, _OrderState } from '../states'

@Injectable({ providedIn: 'root' })
export class OrderStateService {
  constructor(private _store: Store<OrderState>) {}

  public get store() {
    return this._store
  }

  // Selectors
  public getOrderState(): Observable<_OrderState> {
    return this.store.select(selectors.selectOrderState)
  }

  public getAllOrders(): Observable<Order[]> {
    return this.store.select(selectors.selectAllOrders)
  }

  public getCurrentOrder(): Observable<Order> {
    return this.store.select(selectors.selectCurrentOrder)
  }

  public getOrderEntities(): Observable<Dictionary<Order>> {
    return this.store.select(selectors.selectOrderEntities)
  }

  public getLoadingState(): Observable<boolean> {
    return this.store.select(selectors.getLoadingState)
  }

  // Actions
  public removeCurrentOrder() {
    this.store.dispatch(actions.removeCurrentOrder())
  }

  public setCurrentOrder(order: Order) {
    return this.store.dispatch(actions.setCurrentOrder({ order }))
  }

  public updateOrder(order: Order) {
    return this.store.dispatch(
      actions.updateOrder({ update: { id: order.id, changes: order } })
    )
  }

  public upsertOrder(order: Order) {
    return this.store.dispatch(actions.upsertOrder({ order }))
  }

  public loadOrders(orders: Order[]) {
    return this.store.dispatch(actions.loadOrders({ orders }))
  }

  public setLoading(loading: boolean) {
    return this.store.dispatch(actions.setLoading({ loading }))
  }
}
