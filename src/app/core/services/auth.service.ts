import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { promisify } from '@core/helpers/promisify'
import { User } from '@core/models'
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { LocalStorageService } from './localstorage.service'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticatedUser$ = new BehaviorSubject<User | null>(undefined!)

  constructor(
    private localStorage: LocalStorageService,
    private userService: UserService,
    private router: Router
  ) {
    let user: User = this.localStorage.getUser()
    let password = this.localStorage.getUserPassword()
    let remmemberMe = this.localStorage.getRemmemberMe()
    if (!user || !password || !remmemberMe) {
      this.logout()
      return
    } else {
      this._authenticatedUser$.next(user)
    }
  }

  get authenticatedUser(): Observable<User | null> {
    return this._authenticatedUser$
      .asObservable()
      .pipe(filter((user) => user !== undefined))
  }
  get authenticatedUserValue(): User | null {
    return this._authenticatedUser$.value
  }

  async updateAuthenticatedUser(user: User, password: string): Promise<void> {
    try {
      this.localStorage.setUserPassword(password)
      this.localStorage.setUser(user)
      return this._authenticatedUser$.next(user)
    } catch (error) {
      console.error(error)
    }
  }

  login(data: { email: string; password: string }): Observable<User> {
    return this.userService
      .UserLogin(data)
      .pipe(tap((user) => this.updateAuthenticatedUser(user, data.password)))
  }

  logout() {
    this._authenticatedUser$.next(null)
    this.localStorage.clear()
    this.router.navigateByUrl('login')
  }

  async loadUserFromLocalStorageAndUpdateItsData() {
    try {
      const user = this.localStorage.getUser()
      if (user) {
        await promisify(
          this.login({ email: user.email, ...this.localStorage.getUserPassword() })
        )
      }
    } catch (error) {
      console.error(error)
      this.logout()
    }
  }
}
