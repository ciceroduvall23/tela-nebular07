import { Component, OnInit } from '@angular/core'
import { removeMenuEntries } from '@core/helpers'
import { User } from '@core/models'
import { AuthService } from '@core/services'
import { NbMenuItem, NbMenuService } from '@nebular/theme'
import { Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-routes-menu',
  templateUrl: './routes-menu.component.html',
  styleUrls: ['./routes-menu.component.scss'],
})
export class RoutesMenuComponent implements OnInit {
  menuItems: NbMenuItem[] = [
    {
      title: 'Pedidos',
      icon: 'bell-outline',
      link: '/pedidos',
    },
    {
      title: 'Produtos',
      icon: 'shopping-bag-outline',
      link: '/produtos',
    },
    {
      title: 'Cupons',
      icon: 'pricetags-outline',
      link: '/cupons',
    },
    {
      title: 'Relatórios',
      icon: 'file-text-outline',
      link: '/relatorios',
    },
  ]
  menuTag = 'routes-menu'
  user$: Observable<User | null>
  menuItems$: Observable<NbMenuItem[]>
  constructor(private authService: AuthService, private menuService: NbMenuService) {}

  ngOnInit() {
    this.user$ = this.getUser()
    this.menuItems$ = this.getMenuItems()
  }

  private getUser(): Observable<User | null> {
    return this.authService.authenticatedUser
  }

  private getMenuItems(): Observable<NbMenuItem[]> {
    return of(this.menuItems).pipe(
      switchMap((menuItems) => this.user$.pipe(map((user) => ({ user, menuItems })))),
      map((res) => {
        // remove menu entries based on user permissions
        const { menuItems, user } = res
        const menuEntriesToRemove: string[] = []
        return removeMenuEntries(menuItems, menuEntriesToRemove)
      })
    )
  }
}
