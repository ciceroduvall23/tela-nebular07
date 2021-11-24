import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'

export const promisify = ($: Observable<any>, amount = 1) =>
  $.pipe(take(amount)).toPromise()
