import { Injectable } from '@angular/core'
import { Product } from '@core/models'
import { Dictionary } from '@ngrx/entity'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as actions from '../actions'
import * as selectors from '../selectors'
import { ProductState, _ProductState } from '../states'

@Injectable({ providedIn: 'root' })
export class ProductStateService {
  constructor(private _store: Store<ProductState>) {}

  public get store() {
    return this._store
  }

  // Selectors
  public getProductState(): Observable<_ProductState> {
    return this.store.select(selectors.selectProductState)
  }

  public getAllProducts(): Observable<Product[]> {
    return this.store.select(selectors.selectAllProducts)
  }

  public getCurrentProduct(): Observable<Product> {
    return this.store.select(selectors.selectCurrentProduct)
  }

  public getProductEntities(): Observable<Dictionary<Product>> {
    return this.store.select(selectors.selectProductEntities)
  }

  public getLoadingState(): Observable<boolean> {
    return this.store.select(selectors.getLoadingState)
  }

  // Actions
  public removeCurrentProduct() {
    this.store.dispatch(actions.removeCurrentProduct())
  }

  public setCurrentProduct(product: Product) {
    return this.store.dispatch(actions.setCurrentProduct({ product }))
  }

  public updateProduct(product: Product) {
    return this.store.dispatch(
      actions.updateProduct({ update: { id: product.id, changes: product } })
    )
  }

  public upsertProduct(product: Product) {
    return this.store.dispatch(actions.upsertProduct({ product }))
  }

  public loadProducts(products: Product[]) {
    return this.store.dispatch(actions.loadProducts({ products }))
  }

  public setLoading(loading: boolean) {
    return this.store.dispatch(actions.setLoading({ loading }))
  }
}
