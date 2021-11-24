import { Component, Input, OnInit } from '@angular/core'
import { formatPrice } from '@core/helpers'
import { Order } from '@core/models'
import { OrderStateService } from '@pages/order/store/services/order-state.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() order: Order

  formatPrice = formatPrice
  loading$: Observable<boolean>
  compositions$: Observable<any[]>

  constructor(private state: OrderStateService) {}

  ngOnInit(): void {
    this.loading$ = this.state.getLoadingState()
  }
}
