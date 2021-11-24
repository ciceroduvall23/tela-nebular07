import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NbCardModule, NbContextMenuModule, NbUserModule } from '@nebular/theme'
import { ProfileEditModule } from '@shared/profile-edit'
import { SettingsMenuComponent } from './settings-menu.component'

@NgModule({
  declarations: [SettingsMenuComponent],
  imports: [
    CommonModule,
    NbContextMenuModule,
    NbUserModule,
    NbCardModule,
    ProfileEditModule,
  ],
  exports: [SettingsMenuComponent],
})
export class SettingsMenuModule {}
