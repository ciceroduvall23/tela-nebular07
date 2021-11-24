import { Injectable } from '@angular/core'
import { NbThemeService } from '@nebular/theme'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(private themeService: NbThemeService) {}

  changeTheme(themeName: 'default') {
    localStorage.setItem('theme', themeName)
    this.themeService.changeTheme(themeName)
  }
}
