import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm = this.fb.group({
    username: ['', [Validators.required]],	
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return;
    }
   const { username, password } = this.loginForm.value;
   this.authService.login(username!, password!).subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.router.navigateByUrl('/dashboard');
        return;
      }
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);

   });
  }
  
}
