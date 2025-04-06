import { inject, Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders,  HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CompanyService  {


  private http = inject(HttpClient);
  // constructor(private http: HttpClient) {}

  getCompanies(field: string, value: string): Observable<any> {
    const params = new HttpParams()
      .set('field', field)
      .set('value', value);

      const token = localStorage.getItem('token');
      const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
      

    // Realizar la solicitud con los parámetros y encabezados
    return this.http.get<any>(`${baseUrl}/v1/company`, { params, headers });
  }
}