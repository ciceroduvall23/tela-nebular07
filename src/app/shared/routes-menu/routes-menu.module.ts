import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NbMenuModule } from '@nebular/theme'
import { RoutesMenuComponent } from './routes-menu.component'

@NgModule({
  declarations: [RoutesMenuComponent],
  imports: [CommonModule, NbMenuModule],
  exports: [RoutesMenuComponent],
})
export class RoutesMenuModule {}
