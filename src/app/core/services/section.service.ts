import { Injectable } from '@angular/core'
import { Section } from '@core/models'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  url = 'section'

  constructor(private api: ApiService) {}

  // GetSections(): Observable<Section[]> {
  //   return this.api.get(this.url)
  // }

  GetSectionById(id: string): Observable<Section> {
    return this.api.get(`${this.url}/${id}`)
  }

  CreateSection(section: any): Observable<Section> {
    return this.api.post(this.url, section)
  }

  EditSection(data: any): Observable<Section> {
    return this.api.put(this.url, data)
  }

  // DeleteSection(id: string): Observable<Section> {
  //   return this.api.delete(`${this.url}/${id}`)
  // }
}
