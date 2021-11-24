import { Injectable } from '@angular/core'
import { User } from '@core/models'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  UserLogin(data: { email: string; password: string }): Observable<User> {
    const { email, password } = data
    return this.api.post(`account/login`, { email, password })
  }
}
