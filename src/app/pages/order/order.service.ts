import { HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { assignMenuActionId } from '@core/helpers'
import { Order, OrderStatus } from '@core/models'
import { ApiService } from '@core/services'
import { NbMenuItem } from '@nebular/theme'
import { OrderStateService } from '@pages/order/store/services/order-state.service'
import { TableColumn } from '@shared/table/models'
import { Observable } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public url = 'order'

  constructor(private state: OrderStateService, private api: ApiService) {}

  setLoading(loading: boolean) {
    return this.state.setLoading(loading)
  }

  getOrderTableColumns(): TableColumn[] {
    return [
      new TableColumn('code', 'Código'),
      new TableColumn('shipping', 'Taxa de Entrega', {
        mask: 'currency',
        name: 'currency',
      }),
      new TableColumn('discount', 'Desconto', { mask: 'currency', name: 'currency' }),
      new TableColumn('status', 'Status'),
      new TableColumn('total', 'Total', { mask: 'currency', name: 'currency' }),
    ]
  }

  getOrderTableActions(): NbMenuItem[] {
    return assignMenuActionId([
      {
        title: 'Aceitar',
        icon: 'checkmark-outline',
        data: { disabled: (order: any) => order.status != 0 },
      },
      {
        title: 'Cancelar',
        icon: 'close-outline',
        data: { disabled: (order: any) => order.status != 0 },
      },
      { title: 'Detalhes', icon: 'expand-outline' },
      {
        title: 'Alterar status',
        icon: 'swap-outline',
        data: { disabled: (order: any) => order.status >= 4 || order.status == 0 },
      },
      { title: 'Abrir no mapa', icon: 'pin-outline' },
      // TODO: add print action
      // { title: 'Imprimir', icon: 'printer-outline' },
    ])
  }

  GetOrdersByDate(start: any, end: any, companyId: any): Observable<Order[]> {
    const params = new HttpParams()
    params.append('startDate', start)
    params.append('endDate', end)
    params.append('companyId', companyId)
    return this.api.get(`report/orders`, params)
  }

  GetOrders(): Observable<Order[]> {
    return this.api.get(this.url).pipe(
      map((orders: Order[]) => {
        return orders.map((order) => {
          if (order.items && typeof order.items == 'string')
            order.items = JSON.parse(order.items)
          order = this.setOrderCustomStatus(order)
          return order
        })
      }),
      tap((orders) => this.state.loadOrders(orders))
    )
  }

  GetOrderById(id: any): Observable<Order> {
    return this.api.get(`${this.url}/${id}`).pipe(
      map((order) => {
        if (order.items && typeof order.items == 'string')
          order.items = JSON.parse(order.items)
        order.address = order.address.replace('undefined', '')
        order.address = order.address.replace(' undefined', '')
        order.address = order.address.replace(', undefined', '')
        order.address = order.address.replace(',undefined', '')
        if (order.address.substring(order.address.length - 1) == ',')
          order.address = order.address.slice(0, -1)
        if (order.address.substring(order.address.length - 2) == ', ')
          order.address = order.address.slice(0, -2)
        order = this.setOrderCustomStatus(order)
        return order
      })
    )
  }

  GetOrderByIdAndUpdateStore(id: any): Observable<Order> {
    return this.api.get(`${this.url}/${id}`).pipe(
      map((order) => {
        if (order.items && typeof order.items == 'string')
          order.items = JSON.parse(order.items)
        order.address = order.address.replace('undefined', '')
        order.address = order.address.replace(' undefined', '')
        order.address = order.address.replace(', undefined', '')
        order.address = order.address.replace(',undefined', '')
        if (order.address.substring(order.address.length - 1) == ',')
          order.address = order.address.slice(0, -1)
        if (order.address.substring(order.address.length - 2) == ', ')
          order.address = order.address.slice(0, -2)
        order = this.setOrderCustomStatus(order)
        return order
      }),
      tap((order) => this.state.upsertOrder(order)),
      tap((order) => {
        this.state
          .getCurrentOrder()
          .pipe(take(1))
          .subscribe((currOrder) => {
            if (currOrder && currOrder.id == order.id) this.state.setCurrentOrder(order)
          })
      })
    )
  }

  renewCurrentOrders() {
    this.GetOrders().pipe(take(1)).subscribe()
  }

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

  // Status
  cancel(id: any) {
    return this.api.put(`order/${id}/cancel`, {})
  }

  confirm(id: any) {
    return this.api.put(`order/${id}/confirm`, {})
  }

  preparing(id: any) {
    return this.api.put(`order/${id}/preparing`, {})
  }

  ready(id: any) {
    return this.api.put(`order/${id}/ready`, {})
  }

  shipped(id: any) {
    return this.api.put(`order/${id}/shipped`, {})
  }

  delivered(id: any) {
    return this.api.put(`order/${id}/delivered`, {})
  }

  public transformStatus(id: any) {
    switch (id) {
      case OrderStatus.SUBMITTED:
        return 'NOVO'
      case OrderStatus.CONFIRMED:
        return 'CONFIRMADO'
      case OrderStatus.PREPARING:
        return 'PREPARANDO'
      case OrderStatus.READY:
        return 'PRONTO'
      case OrderStatus.SHIPPED:
        return 'EM TRANSPORTE'
      case OrderStatus.DELIVERED:
        return 'ENTREGUE'
      case OrderStatus.CANCELED:
        return 'CANCELADO'
    }
    return ''
  }

  tranformPayment(id: any) {
    switch (id) {
      case 1:
        return 'DINHEIRO'
      case 2:
        return 'CARTÃO DE DÉBITO'
      case 3:
        return 'CARTÃO DE CRÉDITO'
      case 4:
        return 'SODEXO VALE ALIMENTAÇÃO'
      case 5:
        return 'TICKET ALIMENTAÇÃO'
    }
    return ''
  }

  setOrderCustomStatus(order: Order) {
    order = JSON.parse(JSON.stringify(order))
    const status0 = order.history!.find((h) => h.status == OrderStatus.SUBMITTED)
    if (status0) order.submittedStatus = status0

    const status1 = order.history!.find((h) => h.status == OrderStatus.CONFIRMED)
    if (status1) order.confirmedStatus = status1

    const status2 = order.history!.find((h) => h.status == OrderStatus.PREPARING)
    if (status2) order.preparingStatus = status2

    const status3 = order.history!.find((h) => h.status == OrderStatus.READY)
    if (status3) order.readyStatus = status3

    const status4 = order.history!.find((h) => h.status == OrderStatus.SHIPPED)
    if (status4) order.shippedStatus = status4

    const status5 = order.history!.find((h) => h.status == OrderStatus.DELIVERED)
    if (status5) order.deliveredStatus = status5

    return order
  }
}
