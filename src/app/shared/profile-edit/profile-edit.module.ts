import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  NbButtonModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme'
import { DirectivesModule } from '@shared/directives'
import { ProfileEditComponent } from './profile-edit.component'

@NgModule({
  declarations: [ProfileEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbButtonModule,
    NbSpinnerModule,
    NbTabsetModule,
    DirectivesModule,
  ],
  exports: [ProfileEditComponent],
})
export class ProfileEditModule {}
