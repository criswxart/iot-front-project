import { inject, Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders,  HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SensorService  {


  private http = inject(HttpClient);
  // constructor(private http: HttpClient) {}

  getSensors(field: string | undefined, value: string | undefined, companyApiKey: string): Observable<any> {
    // Asignar un valor vacío si 'field' o 'value' son undefined
    const fieldParam = field ?? '';  // Si 'field' es undefined, usa una cadena vacía
    const valueParam = value ?? '';  // Si 'value' es undefined, usa una cadena vacía
  
    // Construir los parámetros de la consulta
    const params = new HttpParams()
      .set('field', fieldParam)
      .set('value', valueParam);
  
    // Configuración de los headers con el 'company_api_key'
    const headers = new HttpHeaders().set('company_api_key', companyApiKey);
  
    // Hacer la solicitud GET al backend con los parámetros y los headers
    return this.http.get<any>(`${baseUrl}/v1/sensor`, { params, headers });
  }
  
}