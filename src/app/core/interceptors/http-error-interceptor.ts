import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { NbToastrService } from '@nebular/theme'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: NbToastrService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        const error = e.message || e.statusText

        switch (e.status) {
          case 400: {
            if (this.router.url.includes('login')) {
              this.toastr.warning('Usuário não encontrado', 'Acesso não autorizado')
            } else {
              this.toastr.warning(error, 'Alguma coisa não ocorreu como esperado')
            }
            break
          }
          case 401: {
            if (this.router.url.includes('login')) {
              this.toastr.warning('Usuário não encontrado', 'Acesso não autorizado')
            } else {
              this.toastr.warning(error, 'Acesso não autorizado')
            }
            break
          }
          case 403: {
            this.toastr.danger(error, 'Acesso não autorizado')
            break
          }
          case 404: {
            this.toastr.danger(error, 'Recurso não encontrado')
            break
          }
          case 500: {
            this.toastr.danger(
              error,
              'Desculpe, estamos com instabilidade em nossos servidores'
            )
            break
          }
        }
        return throwError(e)
      })
    )
  }
}
