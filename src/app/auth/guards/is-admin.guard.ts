import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAdminGuard: CanMatchFn = async(
    route: Route,
    segments: UrlSegment[]
) => {

    const authService = inject(AuthService);
    const router = inject(Router);
  
    const isAuthenticated = authService.checkStatus();
  
    if (!isAuthenticated) {
      router.navigateByUrl('/auth/login');
      return false;
    }
  
    return true;
}