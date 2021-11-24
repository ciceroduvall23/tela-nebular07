import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
} from '@nebular/theme'
import { NgxMaskModule } from 'ngx-mask'
import { TableComponent } from './table.component'

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbContextMenuModule,
    NgxMaskModule,
  ],
  exports: [TableComponent],
})
export class TableModule {}
