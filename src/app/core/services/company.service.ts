import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCompanyData(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}company/${id}`)
  }

  fetch() {
    return this.http.get(`${environment.apiUrl}company`)
  }

  add(data: any) {
    return this.http.post(`${environment.apiUrl}company`, data)
  }

  edit(data: any) {
    return this.http.put(`${environment.apiUrl}company`, data)
  }

  activate(id: any) {
    return this.http.put(`${environment.apiUrl}company/${id}/activate`, {})
  }

  deactivate(id: any) {
    return this.http.put(`${environment.apiUrl}company/${id}/deactivate`, {})
  }

  addImage(data: any) {
    return this.http.post(`${environment.apiUrl}company/image`, data)
  }

  fetchSections(id: string) {
    return this.http.get(`${environment.apiUrl}company/${id}/sections`)
  }

  fetchProducts(id: string) {
    return this.http.get(`${environment.apiUrl}company/${id}/products`)
  }

  fetchCompositions(id: string) {
    return this.http.get(`${environment.apiUrl}company/${id}/compositions`)
  }
}
