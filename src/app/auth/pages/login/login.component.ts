import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false; // Controla si el spinner debe mostrarse

  fb = inject(FormBuilder);
  hasError = new BehaviorSubject<any>(false);
  isPosting = signal(false);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm = this.fb.group({
    username: ['', [Validators.required]],	
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.next(true);  
      setTimeout(() => {
        this.hasError.next(false); 
      }, 2000);
      return;
    }

    const { username, password } = this.loginForm.value;
    this.isLoading = true;  // Activar el spinner

    this.authService.login(username!, password!).subscribe((isAuthenticated) => {
      

      if (isAuthenticated) {
        setTimeout(() => {
          this.router.navigateByUrl('/');
          this.isLoading = false;// Desactivar el spinner después de la respuesta
        }, 5000);
        return;
      }

      this.hasError.next(true); 
      setTimeout(() => {
        this.hasError.next(false);  
      }, 2000);
    });
  }
}
