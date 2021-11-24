import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { AuthService, LocalStorageService } from '@core/services'
import * as moment from 'moment'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private _localStorage: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._auth.authenticatedUser.pipe(
      map((user) => {
        const remmember = this._localStorage.getRemmemberMe()
        const password = this._localStorage.getUserPassword()
        if (!remmember || !user || !password) {
          this._localStorage.clear()
          this.router.navigate(['/login'])
          return false
        }

        const sessionExpired = moment(remmember.timestamp).isSameOrBefore(
          this.getTwoHoursAgoMoment()
        )
        if (!remmember.remmember && sessionExpired) {
          this._auth.logout()
          this.router.navigate(['/login'])

          return false
        }

        return true
      })
    )
  }

  // return moment two hours ago from now
  private getTwoHoursAgoMoment() {
    return moment().subtract(2, 'hours')
  }
}
