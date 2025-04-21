import { Component, inject, OnInit } from '@angular/core';
 import { CompanyService } from '../../../auth/services/company.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
   imports: [FormsModule, CommonModule ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {
  field = ''; // Campo de búsqueda (ciudad, pais, direccion, id, usuario)
  value = ''; // Valor a buscar
  results: any[] = []; // Resultado de la búsqueda
  loading = false;
  errorMessage = '';

  newCompanyName = '';
  addMessage = '';
  addError = false;
  deleteMessage: any;
  delete:any = false;
  companyId:any;
  companyName:any;
  companyApiKey: any;


  
  companyService = inject(CompanyService);

  ngOnInit(): void {
      this.search();
  }
  search() {
    this.loading = true;
    this.errorMessage = '';
    this.companyService.getCompanies(this.field, this.value).subscribe({
      next: (data) => {
        this.results = data.filter((company: any) => company.isCompanyActive); // <-- solo activos
        console.log('data company', this.results);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener datos.';
        this.loading = false;
      }
    });
  }

  addCompany() {
    this.addMessage = '';
    this.addError = false;

    if (!this.newCompanyName.trim()) {
      this.addMessage = '⚠️ El nombre no puede estar vacío.';
      this.addError = true;
      return;
    }

    const companyDTO = { companyName: this.newCompanyName };

    this.companyService.addCompany(companyDTO).subscribe({
      next: () => {
        this.addMessage = '✅ Compañía agregada correctamente.';
        this.addError = false;
        this.newCompanyName = '';
        this.search(); // Refresca resultados
      },
      error: (err: any) => {
        const msg = err?.error?.message || 'Error al agregar compañía.';
        this.addMessage = '❌ ' + msg;
        this.addError = true;
      }
    });
  }

  deleteCompany(companyId: number): void {
    this.deleteMessage = '';  // Limpiar mensaje antes de intentar eliminar
    this.companyService.deleteCompany(companyId).subscribe({});
    this.delete = true;
    this.deleteMessage = '✅ Se Ha desactivado la compañia'; 
    setTimeout(() => {
      this.search(); 
    }, 3000);
    
    this.updateMessage();
  }

  updateMessage(){
    setTimeout(() => {
      this.deleteMessage = ''; 
      this.delete = false;
    }, 3000);
  }

  updateCompany() {
    const companyDTO = {
      companyName: this.companyName,
      companyApiKey: this.companyApiKey
    };

    this.companyService.updateCompany(this.companyId, companyDTO).subscribe({
      next: (response) => {
        this.addMessage = 'Compañía actualizada con éxito';
        this.addError = false;
        // ✅ Limpiar campos del formulario
      this.companyId = null;
      this.companyName = '';
      this.companyApiKey = '';
        this.search(); 
      },
      error: (error) => {
        this.addMessage = `Error: ${error.message}`;
        this.addError = true;
      }
    });
  }
  
}
