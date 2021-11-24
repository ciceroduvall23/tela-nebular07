import { Component, Input } from '@angular/core'

@Component({
  selector: 'order-code',
  templateUrl: './order-code.component.html',
  styleUrls: ['./order-code.component.scss'],
})
export class OrderCodeComponent {
  @Input() code: number

  public normalizeCode(code: number): any {
    if (code && code.toString().length != 4) {
      let newCode = code.toString().split('')
      while (newCode.length < 4) {
        newCode.unshift('0')
      }
      return newCode.join('')
    } else {
      return code
    }
  }
}
