import { Component, inject } from '@angular/core';
 import { CompanyService } from '../../../auth/services/company.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
   imports: [FormsModule, CommonModule ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  field = ''; // Campo de búsqueda (ciudad, pais, direccion, id, usuario)
  value = ''; // Valor a buscar
  results: any[] = []; // Resultado de la búsqueda
  loading = false;
  errorMessage = '';

  
  companyService = inject(CompanyService);
  search() {
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
