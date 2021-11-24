import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NbCardModule, NbIconModule } from '@nebular/theme'
import { TableModule } from '@shared/table'
import { ReportRoutingModule } from './report-routing.module'
import { ReportComponent } from './report.component'

@NgModule({
  declarations: [ReportComponent],
  imports: [CommonModule, ReportRoutingModule, NbIconModule, NbCardModule, TableModule],
})
export class ReportModule {}
