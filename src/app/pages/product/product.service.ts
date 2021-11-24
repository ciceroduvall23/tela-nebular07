import { Injectable } from '@angular/core'
import { assignMenuActionId } from '@core/helpers'
import { ApiService } from '@core/services'
import { NbMenuItem } from '@nebular/theme'
import { TableColumn } from '@shared/table/models'
import { ProductStateService } from './store/services/product-state.service'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public url = 'product'

  constructor(private api: ApiService, private state: ProductStateService) {}

  setLoading(loading: boolean) {
    return this.state.setLoading(loading)
  }

  getProductTableColumns(): TableColumn[] {
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

  getProductTableActions(): NbMenuItem[] {
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

  fetch() {
    return this.api.get(`${this.url}`)
  }

  fetchCompositions(id: string) {
    return this.api.get(`${this.url}/${id}/compositions`)
  }

  fetchItems(id: string) {
    return this.api.get(`${this.url}/${id}/items`)
  }

  add(data: any) {
    return this.api.post(`${this.url}`, data)
  }

  addImage(data: any) {
    return this.api.post(`${this.url}/image`, data)
  }

  edit(data: any) {
    return this.api.put(`${this.url}`, data)
  }

  remove(id: string) {
    return this.api.delete(`${this.url}/${id}`)
  }

  activate(id: any) {
    return this.api.put(`${this.url}/${id}/activate`, {})
  }

  deactivate(id: any) {
    return this.api.put(`${this.url}/${id}/deactivate`, {})
  }
}
