import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { ProductState } from '../states'

@Injectable({
  providedIn: 'root',
})
export class ProductEffectsService {
  constructor(private store: Store<ProductState>, private actions$: Actions) {}

  public initializeEffects() {}
}
