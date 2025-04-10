import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../auth/services/company.service';
import { SensorService } from '../../../auth/services/sensor.service';

@Component({
  selector: 'app-sensor',
  imports: [FormsModule, CommonModule ],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.css'
})
export class SensorComponent {
  field = ''; // Campo de búsqueda (ciudad, pais, direccion, id, usuario)
  value = ''; // Valor a buscar
  results: any[] = []; // Resultado de la búsqueda
  loading = false;
  errorMessage = '';
  selectedApiKey: string = '';
  newCompanyName = '';
  addMessage = '';
  addError = false;
  deleteMessage: any;
  delete:any = false;
  companyId:any;
  companyName:any;

  sensors: any[] = [];
  companyService = inject(CompanyService);
  sensorService = inject(SensorService);

  ngOnInit(): void {
      this.getCompanyKey();
  }
  search() {
    if (!this.selectedApiKey) {
      this.errorMessage = 'Por favor, seleccione una API Key.';
      return; // Detener la ejecución si falta la API Key
    }
  
    this.loading = true;
    this.errorMessage = ''; // Limpiar errores previos
  
    // Si field y value están vacíos, no los incluyes en la solicitud
    const fieldParam = this.field ? this.field : undefined;
    const valueParam = this.value ? this.value : undefined;
  
    this.sensorService.getSensors(fieldParam, valueParam, this.selectedApiKey).subscribe({
      next: (data) => {
        this.loading = false;
        if (data && data.length === 0) {
          this.sensors = [];  // Reinicia los datos de la tabla si no hay sensores
          this.errorMessage = 'No se encontraron sensores para la API Key seleccionada.';
        } else {
          this.sensors = data;  // Asigna los datos si hay sensores encontrados
          this.errorMessage = ''; // Limpiar cualquier mensaje de error previo
        }
      },
      error: (err) => {
        this.loading = false;
        this.sensors = [];  // Reinicia los datos de la tabla en caso de error
        if (err.status === 404) {
          this.errorMessage = 'No se encontraron sensores para la API Key proporcionada. Verifique la información ingresada.';
        } else if (err.status === 400) {
          this.errorMessage = 'Por favor, ingrese valores válidos para la búsqueda.';
        } else {
          this.errorMessage = 'Error al obtener los sensores: ' + (err.error.message || err.statusText);
        }
      }
    });
  }
  getCompanyKey() {
    this.loading = true;
    this.errorMessage = '';
    this.companyService.getCompanies(this.field, this.value).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener datos.';
        this.loading = false;
      }
    });
  }
}
