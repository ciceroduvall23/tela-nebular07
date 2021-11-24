import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { mustMatch } from '@core/helpers'
import { User } from '@core/models'
import { NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  @Input() user: User
  profileForm: FormGroup
  passwordForm: FormGroup
  loading = false

  get profileControls() {
    return this.profileForm.controls as { [key: string]: FormControl }
  }
  get passwordControls() {
    return this.passwordForm.controls as { [key: string]: FormControl }
  }

  constructor(private formBuilder: FormBuilder, private toastr: NbToastrService) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      id: this.user.id,
      name: [this.user.name, [Validators.required]],
      email: [
        { value: this.user.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      subsidiaryId: [this.user.subsidiaryId],
      companyId: [this.user.companyId],
      isActive: [this.user.isActive],
      role: [this.user.role],
    })

    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirm: ['', [Validators.required, Validators.minLength(4)]],
      },
      { validators: mustMatch('password', 'confirm') }
    )
  }

  submitProfileForm() {
    if (this.profileForm.valid) {
      this.loading = true
      this.toastr.success('', 'Perfil editado com sucesso')
      this.loading = false
    }
  }

  submitPasswordForm() {
    if (this.passwordForm.valid) {
      this.loading = true
      this.toastr.success('', 'Senha alterada com sucesso')
      this.loading = false
    }
  }
}
