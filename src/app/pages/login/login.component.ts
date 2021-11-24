import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { promisify } from '@core/helpers/promisify'
import { AuthService, LocalStorageService } from '@core/services'
import * as moment from 'moment'
import { version } from 'src/../package.json'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    remmemberMe: new FormControl(true),
  })
  get controls(): { [key: string]: FormControl } {
    return this.form.controls as { [key: string]: FormControl }
  }
  showPassword = false
  loading = false
  version = version
  currentYear = moment().format('YYYY').toString()

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async submitForm() {
    try {
      if (this.form.valid && !this.loading) {
        this.loading = true
        const { remmemberMe, ...data } = this.form.value
        const user = await promisify(this.authService.login(data))
        this.loading = false
        this.localStorageService.setRemmemberMe(remmemberMe)
        this.router.navigateByUrl('/')
      }
    } catch (error) {
      this.loading = false
      console.error(error)
    }
  }
}
