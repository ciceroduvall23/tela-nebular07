import { Component, OnInit } from '@angular/core'
import { Product } from '@core/models'
import {
  NbDialogService,
  NbMenuItem,
  NbToastrService,
  NbWindowService,
} from '@nebular/theme'
import { TableActionClick, TableColumn } from '@shared/table/models'
import { Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'
import { ProductService } from './product.service'
import { ProductStateService } from './store/services/product-state.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  private currProduct: Product
  private products: Product[]
  products$: Observable<Product[]>
  currentProduct$: Observable<Product>
  loading$: Observable<boolean>
  columns: TableColumn[]
  tableActions: NbMenuItem[]

  constructor(
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private state: ProductStateService,
    private toastr: NbToastrService,
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.columns = this.service.getProductTableColumns()
    this.tableActions = this.service.getProductTableActions()
    this.loading$ = this.getLoadingState()
    this.currentProduct$ = this.getCurrentProduct()
    this.products$ = this.getAllProducts()
    this.loadProducts()
  }

  async tableActionOptionClicked(event: TableActionClick) {
    const { data: order } = event
    const actionId = event.bag?.item?.data?.id || -1
    if (actionId == 1) {
    } else if (actionId == 2) {
    } else if (actionId == 3) {
    }
  }

  private getCurrentProduct(): Observable<Product> {
    return this.state
      .getCurrentProduct()
      .pipe(tap((product) => (this.currProduct = product)))
  }

  private getAllProducts(): Observable<Product[]> {
    return this.state.getAllProducts().pipe(tap((products) => (this.products = products)))
  }

  private getLoadingState(): Observable<boolean> {
    return this.state.getLoadingState()
  }

  private loadProducts(): void {
    this.service
      .fetch()
      .pipe(take(1))
      .subscribe((products) => this.state.loadProducts(products))
  }
}
