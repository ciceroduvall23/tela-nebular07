import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class RouteHelperService {
  constructor(private activatedRoute: ActivatedRoute) {}

  // given a route param name, return its parsed value from activated route
  getRouteParam(paramName: string) {
    return this.activatedRoute.queryParams.pipe(
      map((params) => (params[paramName] ? JSON.parse(params[paramName]) : null))
    )
  }
}
