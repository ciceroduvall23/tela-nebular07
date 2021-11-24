import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbListModule,
  NbSpinnerModule,
  NbTagModule,
} from '@nebular/theme'
import { StoreModule } from '@ngrx/store'
import { ConfirmActionModule } from '@shared/confirm-action'
import { TableModule } from '@shared/table'
import { StoreFeatures } from '@store/store-features'
import { NgxMaskModule } from 'ngx-mask'
import {
  OrderCodeComponent,
  OrderDetailsComponent,
  OrderStatusTagComponent,
} from './components'
import { OrderRoutingModule } from './order-routing.module'
import { OrderComponent } from './order.component'
import { reducers } from './store'

@NgModule({
  declarations: [
    OrderComponent,
    OrderCodeComponent,
    OrderStatusTagComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NbSpinnerModule,
    NbCardModule,
    NbListModule,
    NbIconModule,
    NbTagModule,
    NbButtonModule,
    NbContextMenuModule,
    NbAccordionModule,
    TableModule,
    ConfirmActionModule,
    StoreModule.forFeature(StoreFeatures.ORDER_MODULE, reducers),
    NgxMaskModule,
  ],
})
export class OrderModule {}
