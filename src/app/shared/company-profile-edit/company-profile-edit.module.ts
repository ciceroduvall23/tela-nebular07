import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  NbButtonModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbUserModule,
} from '@nebular/theme'
import { AvatarFormModule } from '@shared/avatar-form'
import { DirectivesModule } from '@shared/directives'
import { NgxMaskModule } from 'ngx-mask'
import { CompanyProfileEditComponent } from './company-profile-edit.component'

@NgModule({
  declarations: [CompanyProfileEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbUserModule,
    NbIconModule,
    NbButtonModule,
    NgxMaskModule,
    DirectivesModule,
    AvatarFormModule,
  ],
  exports: [CompanyProfileEditComponent],
})
export class CompanyProfileEditModule {}
