import { Component, OnDestroy, OnInit } from '@angular/core'
import { removeMenuEntries } from '@core/helpers'
import { User } from '@core/models'
import { AuthService } from '@core/services'
import { NbMenuItem, NbMenuService, NbWindowService } from '@nebular/theme'
import { CompanyProfileEditComponent } from '@shared/company-profile-edit'
import { ProfileEditComponent } from '@shared/profile-edit'
import { BehaviorSubject, concat, fromEvent, Observable, of, Subject } from 'rxjs'
import { debounceTime, filter, map, switchMap, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject()
  private menuItems: NbMenuItem[] = [
    { title: 'Perfil', icon: 'person-outline' },
    { title: 'Estabelecimento', icon: 'briefcase-outline' },
    { title: 'Sair', icon: 'log-out-outline' },
  ]
  menuItems$: Observable<NbMenuItem[]>
  menuTag = 'settings-menu'
  user$: Observable<User | null>
  innerWidth$ = new BehaviorSubject<number>(window.innerWidth)

  constructor(
    private windowService: NbWindowService,
    private menuService: NbMenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.getUser()
    this.menuItems$ = this.getMenuItems()

    this.menuClickEvents()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  private openProfileModal() {
    const modal = this.windowService.open(ProfileEditComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: true,
      context: { user: this.authService.authenticatedUserValue },
    })
  }

  private openCompanyProfileModal() {
    const modal = this.windowService.open(CompanyProfileEditComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: true,
      context: { user: this.authService.authenticatedUserValue },
    })
  }

  private menuClickEvents(): void {
    this.menuService
      .onItemClick()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((menu) => menu.tag === this.menuTag)
      )
      .subscribe((menu) => {
        switch (menu.item.title.toLowerCase()) {
          case 'sair':
            this.authService.logout()
            break

          case 'perfil':
            this.openProfileModal()
            break

          case 'estabelecimento':
            this.openCompanyProfileModal()
            break

          default:
            break
        }
      })
  }

  private getUser(): Observable<User | null> {
    return this.authService.authenticatedUser
  }

  private getMenuItems(): Observable<NbMenuItem[]> {
    const resize$ = concat(
      of(window.innerWidth),
      fromEvent(window, 'resize').pipe(debounceTime(200))
    )
    return of(this.menuItems).pipe(
      switchMap((menuItems) => this.user$.pipe(map((user) => ({ user, menuItems })))),
      map((res) => {
        // remove menu content if user is not logged in
        const { menuItems, user } = res
        const menuEntriesToRemove: string[] = []
        return removeMenuEntries(menuItems, menuEntriesToRemove)
      }),
      switchMap((menuItems) =>
        resize$.pipe(
          map((ev: any) => {
            // change menu entries based on screen size
            let restrictions: string[] = []
            let width = ev.target ? ev.target.innerWidth : ev

            this.innerWidth$.next(width)
            return removeMenuEntries(menuItems, restrictions)
          })
        )
      )
    )
  }
}
