import { Component, OnInit } from '@angular/core'
import { promisify } from '@core/helpers/promisify'
import { Order, OrderStatus } from '@core/models'
import { NotificationService } from '@core/services'
import {
  NbDialogService,
  NbMenuItem,
  NbToastrService,
  NbWindowService,
} from '@nebular/theme'
import { ConfirmActionComponent } from '@shared/confirm-action'
import { TableActionClick, TableColumn } from '@shared/table/models'
import { Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'
import { OrderDetailsComponent } from './components'
import { OrderService } from './order.service'
import { OrderStateService } from './store/services/order-state.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  private currOrder: Order
  private orders: Order[]
  orders$: Observable<Order[]>
  currentOrder$: Observable<Order>
  loading$: Observable<boolean>
  columns: TableColumn[]
  tableActions: NbMenuItem[]

  constructor(
    private notificationService: NotificationService,
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private state: OrderStateService,
    private toastr: NbToastrService,
    private service: OrderService
  ) {}

  ngOnInit(): void {
    this.columns = this.service.getOrderTableColumns()
    this.tableActions = this.service.getOrderTableActions()
    this.loading$ = this.getLoadingState()
    this.currentOrder$ = this.getCurrentOrder()
    this.orders$ = this.getAllOrders()
    this.service.renewCurrentOrders()
  }

  async tableActionOptionClicked(event: TableActionClick) {
    const { data: order } = event
    const actionId = event.bag?.item?.data?.id || -1
    if (actionId == 1) {
      // accept
      this.setNewOrderStatus(order, OrderStatus.CONFIRMED)
    } else if (actionId == 2) {
      // cancel
      this.setNewOrderStatus(order, OrderStatus.CANCELED)
    } else if (actionId == 3) {
      // open details
      const updatedOrder = (await this.updatedOrderAndStore(order)) as Order
      this.openOrderDetails(updatedOrder)
    } else if (actionId == 4) {
      // change status
      this.setNewOrderStatus(order, order.status + 1)
    } else if (actionId == 5) {
      // Open order address in google maps
      const updatedOrder = (await this.updatedOrderAndStore(order)) as Order
      const { latitude, longitude } = updatedOrder.location?.coordinates
      if (latitude && longitude) {
        this.openInGoogleMaps(latitude, longitude)
      } else {
        this.toastr.danger('Coordenadas não definidas', 'Não foi possível abrir o mapa')
      }
    } else if (actionId == 6) {
      // print
    }
  }

  private async updatedOrderAndStore(order: Order): Promise<Order | null> {
    try {
      if (!order) throw new Error('Order is undefined')
      if (!order.id) throw new Error('Order id is undefined')
      this.state.setLoading(true)
      const newOrder = await promisify(this.service.GetOrderByIdAndUpdateStore(order.id))
      this.state.setLoading(false)
      return newOrder
    } catch (error: any) {
      console.error(error)
      this.state.setLoading(false)
      this.toastr.danger(
        'Verifique com o adminsitrador do sistema',
        'Não foi possível baixar os dados do pedido'
      )
      return null
    }
  }

  private openConfirmActionDialog() {
    return this.dialogService.open(ConfirmActionComponent, {
      context: { title: 'Tem certeza que deseja alterar o status deste pedido?' },
    })
  }

  private openOrderDetails(order: Order) {
    const windowRef = this.windowService.open(OrderDetailsComponent, {
      closeOnBackdropClick: true,
      closeOnEsc: true,
      context: { order },
      hasBackdrop: true,
    })
    windowRef.onClose.pipe(take(1)).subscribe(() => this.state.removeCurrentOrder())
  }

  private getCurrentOrder(): Observable<Order> {
    return this.state.getCurrentOrder().pipe(tap((order) => (this.currOrder = order)))
  }

  private getAllOrders(): Observable<Order[]> {
    return this.state.getAllOrders().pipe(tap((orders) => (this.orders = orders)))
  }

  private getLoadingState(): Observable<boolean> {
    return this.state.getLoadingState()
  }

  private async setNewOrderStatus(order: any, status: number) {
    try {
      if (order.status >= 4) {
        this.toastr.danger(
          'Você não pode trocar o status do pedido agora',
          'Este menu está desabilitado'
        )
        return
      }
      const dialogRef = this.openConfirmActionDialog()
      const closedRes = await promisify(dialogRef.onClose)
      if (!closedRes.confirm) return

      this.state.setLoading(true)
      order = JSON.parse(JSON.stringify(order))
      // const user = (await promisify(this.authService.authenticatedUser)) as User
      // const company = user.company as Company
      // const _package = company.package as any
      // if (company.balance && _package && company.balance <= _package.balanceAlert) {
      //   // show warning
      //   this.toastr.warning(
      //     'Parece que você está com o saldo baixo. Faça upgrade do seu plano para aumentar o saldo'
      //   )
      // } else if (_package.balance <= 0) {
      //   this.toastr.danger(
      //     'O seu saldo acabou. Faça upgrade do seu plano para continuar aceitando os pedidos'
      //   )
      //   return // do not allow to change order status
      // }

      let updateOrderStatusRequest$ = null
      switch (status) {
        case OrderStatus.CONFIRMED:
          order.status = OrderStatus.CONFIRMED
          updateOrderStatusRequest$ = this.service.confirm(order.id)
          break
        case OrderStatus.PREPARING:
          order.status = OrderStatus.PREPARING
          updateOrderStatusRequest$ = this.service.preparing(order.id)
          break
        case OrderStatus.READY:
          order.status = OrderStatus.READY
          updateOrderStatusRequest$ = this.service.ready(order.id)
          break
        case OrderStatus.SHIPPED:
          order.status = OrderStatus.SHIPPED
          updateOrderStatusRequest$ = this.service.shipped(order.id)
          break
        case OrderStatus.DELIVERED:
          order.status = OrderStatus.DELIVERED
          updateOrderStatusRequest$ = this.service.delivered(order.id)
          break
        case OrderStatus.CANCELED:
          order.status = OrderStatus.CANCELED
          updateOrderStatusRequest$ = this.service.cancel(order.id)
          break
      }
      if (updateOrderStatusRequest$) {
        const updateRes = await promisify(updateOrderStatusRequest$)
      }

      this.state.setLoading(false)
    } catch (error) {
      console.error(error)
      this.state.setLoading(false)
    }
  }

  private openInGoogleMaps(latitude: any, longitude: any) {
    const width = window.innerWidth * 0.8
    const height = window.innerHeight * 0.8
    const leftPosition = window.screen.width / 2 - (width / 2 + 10)
    //Allow for title and status bars.
    const topPosition = window.screen.height / 2 - (height / 2 + 50)
    //Open the window.
    window.open(
      `http://maps.google.com/maps?q=${latitude},${longitude}`,
      '_blank',
      'status=no,height=' +
        height +
        ',width=' +
        width +
        ',resizable=yes,left=' +
        leftPosition +
        ',top=' +
        topPosition +
        ',screenX=' +
        leftPosition +
        ',screenY=' +
        topPosition +
        ',frame=yes,nodeIntegration=no'
    )
  }
}
