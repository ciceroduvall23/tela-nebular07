import { Injectable } from '@angular/core'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class CompositionService {
  url = 'composition'

  constructor(private api: ApiService) {}

  GetCompositions() {
    return this.api.get(this.url)
  }

  GetCompositionById(id: string) {
    return this.api.get(`${this.url}/${id}`)
  }

  CreateComposition(composition: any) {
    return this.api.post(this.url, composition)
  }

  EditComposition(data: any) {
    return this.api.put(this.url, data)
  }

  DeleteComposition(id: string) {
    return this.api.delete(`${this.url}/${id}`)
  }
}
