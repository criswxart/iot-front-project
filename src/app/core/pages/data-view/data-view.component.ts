import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeasurementService } from '../../../auth/services/measurement.service';

@Component({
  selector: 'app-data-view',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.css',
})
export class DataViewComponent {
  fromEpoch: any;
  toEpoch: any;
  companyApiKey: string = '';
  results: any[] = [];
  loading = false;
  errorMessage = '';
  currentPage: number = 0;

  constructor(private http: HttpClient) {}
  measurementService = inject(MeasurementService);

  buscarMediciones() {
    this.loading = true;
    this.errorMessage = '';
    this.results = [];

    // Convertir fecha a epoch (en segundos)
  if (this.fromEpoch) {
    this.fromEpoch = Math.floor(new Date(this.fromEpoch).getTime() / 1000);
  }

  if (this.toEpoch) {
    // Para incluir toda la fecha hasta las 23:59:59
    const endOfDay = new Date(this.toEpoch);
    endOfDay.setHours(23, 59, 59, 999);
    this.toEpoch = Math.floor(endOfDay.getTime() / 1000);
  }

    this.measurementService
      .getMeasurementByEpoch(this.fromEpoch, this.toEpoch, this.companyApiKey)
      .subscribe({
        next: (res) => {
          this.results = res;
          console.log('data by epoch', this.results);
          this.loading = false;
        },
        error: (err) => {
          if (err.status === 400) {
            this.errorMessage = err.error?.message || 'Solicitud inválida.';
          } else if (err.status === 403) {
            this.errorMessage = 'No tienes permisos para realizar esta acción.';
          } else {
            this.errorMessage =
              err.error?.message || 'Error al obtener mediciones.';
          }
          this.loading = false;
        },
      });
  }

  nextPage() {
    if (this.currentPage < this.results.length - 1) {
      this.currentPage++;
    }
  }
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
