import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard, IsLoggedInGuard } from '@core/guards'
import { LayoutComponent } from '@layout/components/layout.component'

const routes: Routes = [

  {
    path: '',
    component:LayoutComponent ,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'pedidos',
        loadChildren: () =>
          import('@pages/order/order.module').then((m) => m.OrderModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('@pages/product/product.module').then((m) => m.ProductModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'relatorios',
        loadChildren: () =>
          import('@pages/report/report.module').then((m) => m.ReportModule),
        canActivate: [AuthGuard],
      },
      // { path: 'coupon', loadChildren: () => import('@pages/coupon/coupon.module').then((m) => m.CouponModule), canActivate: [AuthGuard] },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
