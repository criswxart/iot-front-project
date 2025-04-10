import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../../auth/services/location.service';

@Component({
  selector: 'app-location',
  imports: [FormsModule, CommonModule ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {
  field = ''; // Campo de búsqueda (ciudad, pais, direccion, id, usuario)
  value = ''; // Valor a buscar
  results: any[] = []; // Resultado de la búsqueda
  loading = false;
  errorMessage = '';

  
  locationService = inject(LocationService);

  ngOnInit() {
    this.search();
  }


  search() {
    this.loading = true;
    this.errorMessage = '';
    this.locationService.getLocation(this.field, this.value).subscribe({
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
