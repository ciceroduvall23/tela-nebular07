import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import localePt from '@angular/common/locales/pt'
import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { environment } from '@environments/environment'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { IConfig, NgxMaskModule } from 'ngx-mask'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CardComponent } from './layout/components/card/card.component'
import { LayoutComponent } from './layout/components/layout.component'

registerLocaleData(localePt)

export function maskConfigFunction(): Partial<IConfig> {
  return {
    validation: false,
  }
}

// ngrx setup
const reducers = {}
const metaReducers: any = []
const effects: any[] = []

// setup theme
const validThemes = ['default']
let theme = localStorage.getItem('theme')
if (!theme || !validThemes.includes(theme)) {
  localStorage.setItem('theme', 'default')
  theme = 'default'
}

@NgModule({
  declarations: [AppComponent, CardComponent, LayoutComponent],
  imports: [
    BrowserModule,
    NbSidebarModule,
    NbSidebarModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: theme ? theme : 'default' }),
    NbEvaIconsModule,
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NgxMaskModule.forRoot(maskConfigFunction),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot(effects),
    NgxSkeletonLoaderModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
