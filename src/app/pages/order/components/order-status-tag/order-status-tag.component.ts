import { Component, Input } from '@angular/core'

@Component({
  selector: 'order-status-tag',
  templateUrl: './order-status-tag.component.html',
  styleUrls: ['./order-status-tag.component.scss'],
})
export class OrderStatusTagComponent {
  @Input() status: number
}
