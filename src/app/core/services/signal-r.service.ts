import { Injectable } from '@angular/core'
import { Order, User } from '@core/models'
import { environment } from '@environments/environment'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { OrderService } from '@pages/order/order.service'
import { take } from 'rxjs/operators'
import { AuthService } from './auth.service'
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private url = environment.apiUrl.split('v1/')[0]
  private connection: HubConnection

  constructor(
    private notificationService: NotificationService,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.connection = this.buildConnection()
    this.startHub()
  }

  private buildConnection() {
    return new HubConnectionBuilder()
      .withUrl(this.url + 'hub/subsidiary', { withCredentials: false })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build()
  }

  private async startHub() {
    try {
      await this.connection.start()
      await this.invokeGroup()
      this.setupListeners()
    } catch (error) {
      console.error(error)
    }
  }

  private async invokeGroup() {
    try {
      const user: User = (await this.authService.authenticatedUser
        .pipe(take(1))
        .toPromise()) as User
      if (user) {
        await this.connection.invoke('Join', user.subsidiaryId)
        console.log('Connected to socket group')
      } else {
        throw new Error('user is not not defined in authService')
      }
    } catch (error) {
      console.error(error)
    }
  }

  private setupListeners() {
    this.createListener('OrderCreated', async (data) => {
      const newOrder = await this.getOrder(data)
      this.showNotification(
        'Chegou um novo pedido',
        'Acompanhe os detalhes na tela de pedidos',
        newOrder
      )
      console.log('OrderCreated', data)
      this.orderService.setLoading(false)
    })

    this.createListener('OrderCanceled', async (data) => {
      const newOrder = await this.getOrder(data)
      this.showNotification(
        'Um pedido foi cancelado',
        'O pedido será removido da tela de pedidos',
        newOrder
      )
      console.log('OrderCanceled', newOrder)
      this.orderService.setLoading(false)
    })

    this.createListener('OrderConfirmed', async (data) => {
      const newOrder = await this.getOrder(data)
      this.showNotification(
        'Pedido confirmado',
        'Acompanhe os detalhes na tela de pedidos',
        newOrder
      )
      console.log('OrderConfirmed', newOrder)
      this.orderService.setLoading(false)
    })

    this.createListener('OrderPreparing', async (data) => {
      const newOrder = await this.getOrder(data)
      this.showNotification(
        'Pedido em preparo',
        'Acompanhe os detalhes na tela de pedidos',
        newOrder
      )
      console.log('OrderPreparing', newOrder)
      this.orderService.setLoading(false)
    })

    this.createListener('OrderReady', async (data) => {
      const newOrder = await this.getOrder(data)
      this.showNotification(
        'Pedido em pronto para entrega',
        'Acompanhe os detalhes na tela de pedidos',
        newOrder
      )
      console.log('OrderReady', newOrder)
      this.orderService.setLoading(false)
    })

    this.createListener('OrderShipped', async (data) => {
      const newOrder = await this.getOrder(data)
      this.showNotification(
        'Pedido em trânsito',
        'Acompanhe os detalhes na tela de pedidos',
        newOrder
      )
      console.log('OrderShipped', newOrder)
      this.orderService.setLoading(false)
    })

    this.createListener('OrderDelivered', async (data) => {
      const newOrder = await this.getOrder(data)
      this.showNotification(
        'Pedido entregue',
        'O pedido será removido da tela de pedidos',
        newOrder
      )
      console.log('OrderDelivered', newOrder)
      this.orderService.setLoading(false)
    })
  }

  private createListener(eventName: string, callback: (data: any) => void) {
    this.connection.on(eventName, callback)
  }

  private showNotification(title: string, message: string = '', order: Order) {
    // this.notification.info(title, message || '');
    this.notificationService.display(title, message, order)
  }

  private async getOrder(order: any) {
    return await this.orderService
      .GetOrderByIdAndUpdateStore(order.id)
      .pipe(take(1))
      .toPromise()
  }
}
