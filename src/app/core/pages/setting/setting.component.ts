import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting',
  imports: [FormsModule, CommonModule ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  @ViewChild('userForm') userForm: NgForm | undefined;
  // user = {
   
  //     nombre_usuario: '',
  //     clave: '',
  //     // roles: [1] // Valor por defecto, puedes cambiar según lo que necesites

  //   // permisos: [
  //   //   { permission_id: 2 }
  //   // ]
  // };
  user = {
    nombre_usuario: '',          // Nombre de usuario
    clave: '',                   // Contraseña
    confirmPassword: '',         // Confirmar contraseña
    roles: [],                   // Array de roles seleccionados
    permisos: []                 // Array de permisos seleccionados
  };
  errorMessage = '';
  successMessage = '';
  authService = inject(AuthService);
  // constructor(private companyService: CompanyService, private router: Router) {}

  onSubmit() {
    // Comprobar que las contraseñas coinciden antes de enviar
    if (this.user.clave !== this.user.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
  
    // Comprobar que la longitud de la contraseña sea mayor de 6 caracteres
    if (this.user.clave.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
  
    // Verificar el contenido de roles y permisos antes de enviar
    console.log('Roles:', this.user.roles);
    console.log('Permisos:', this.user.permisos);
  
    // Construir el objeto de datos para enviar con el formato que espera el backend
    const userData = {
      userName: this.user.nombre_usuario,
      userPassword: this.user.clave,
      role: this.user.roles.length > 0 ? [{
        roleId: this.user.roles[0],  // Usamos directamente el primer valor de roles
        permissions: this.user.permisos.length > 0 ? this.user.permisos.map(permissionId => ({ permissionId })) : []  // Si no hay permisos, enviamos un array vacío
      }] : []  // Si no hay roles, enviamos un array vacío
    };
  
    // Enviar los datos al servicio de autenticación
    this.authService.registerUser(userData).subscribe({
      next: (res) => {
        console.log('Usuario registrado:', res, "Data mandada:", userData);
        this.successMessage = 'Usuario registrado correctamente';
        this.errorMessage = ''; // Limpiar el mensaje de error si la operación es exitosa
  
        // Limpiar el formulario
        if (this.userForm) {
          this.userForm.reset(); // Reinicia el formulario si está disponible
        }
      },
      error: (err) => {
        // Manejo de errores según el tipo de respuesta del servidor
        if (err.status === 400) {
          this.errorMessage = err.error.message || 'Nombre de usuario ya está en uso.';
        } else if (err.status === 403) {
          this.errorMessage = 'No tienes permisos para registrar usuarios.';
        } else {
          this.errorMessage = err.error.message || 'Error al registrar usuario.';
        }
  
        // Limpiar el mensaje de éxito si hay error
        this.successMessage = '';
      }
    });
  }
}
