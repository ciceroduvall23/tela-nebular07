import { Injectable } from '@angular/core'

import { Actions, createEffect, ofType } from '@ngrx/effects'
import { tap } from 'rxjs/operators'
import { Store } from '@ngrx/store'

import { ORDER_ACTIONS, updateOrder } from '../actions'
import { OrderState } from '../states'

@Injectable({
  providedIn: 'root',
})
export class OrderEffectsService {
  private populateNewOrderMessagesEntry$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ORDER_ACTIONS.SetCurrentOrder),
        tap((payload: any) =>
          this.msgStore.dispatch(updateOrder({ update: payload.order }))
        )
      ),
    { dispatch: false }
  )

  constructor(private msgStore: Store<OrderState>, private actions$: Actions) {
    this.initializeEffects()
  }

  public initializeEffects() {
    this.populateNewOrderMessagesEntry$.subscribe()
  }
}
