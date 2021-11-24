import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NbButtonModule, NbCardModule } from '@nebular/theme'
import { ConfirmActionComponent } from './confirm-action.component'

@NgModule({
  declarations: [ConfirmActionComponent],
  imports: [CommonModule, NbCardModule, NbButtonModule],
  exports: [ConfirmActionComponent],
})
export class ConfirmActionModule {}
