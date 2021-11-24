import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbButtonModule, NbCardModule, NbSpinnerModule } from '@nebular/theme'
import { TableModule } from '@shared/table'
import { ProductRoutingModule } from './product-routing.module'
import { ProductComponent } from './product.component'

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NbSpinnerModule,
    TableModule,
    NbCardModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
