import { inject, Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders,  HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MeasurementService  {


  private http = inject(HttpClient);
  // constructor(private http: HttpClient) {}

  getMeasurementByEpoch(from: number | null, to: number | null, companyApiKey: string): Observable<any> {
    const fromEpoch = from?.toString() ?? '';
    const toEpoch = to?.toString() ?? '';
  
    const params = new HttpParams()
      .set('from', fromEpoch)
      .set('to', toEpoch);
  
    const headers = new HttpHeaders().set('company_api_key', companyApiKey);
  
    return this.http.get<any>(`${baseUrl}/v1/measurement/epoch`, { params, headers });
  }
  
}