import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbUserModule } from '@nebular/theme'
import { AvatarFormComponent } from './avatar-form.component'

@NgModule({
  declarations: [AvatarFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NbUserModule],
  exports: [AvatarFormComponent],
})
export class AvatarFormModule {}
