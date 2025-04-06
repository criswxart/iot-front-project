import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting',
  imports: [FormsModule, CommonModule ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  user = {
    usuario: {
      nombre_usuario: '',
      clave: '',
      cuenta_habilitada: true,
      cuenta_vencida: false,
      cuenta_bloqueada: false,
      credenciales_vencidas: false,
      roles: [1] // Valor por defecto, puedes cambiar según lo que necesites
    },
    permisos: [
      { permission_id: 2 }
    ]
  };
  errorMessage = '';
  successMessage = '';
  authService = inject(AuthService);
  // constructor(private companyService: CompanyService, private router: Router) {}

  onSubmit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'No se ha encontrado un token de autenticación.';
      return;
    }

    this.authService.registerUser(this.user, token).subscribe({
      next: (response) => {
        this.successMessage = 'Usuario registrado con éxito.';
        this.errorMessage = ''; // Limpiar posibles errores previos
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error al registrar el usuario.';
        this.successMessage = ''; // Limpiar mensaje de éxito si hubo un error
      }
    });
  }
}
