import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

type authStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<authStatus>('checking');
  private _user = signal<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );
  private _token = signal<string | null>(localStorage.getItem('token'));

  private router = inject(Router);

  private http = inject(HttpClient);
 

  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._authStatus()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  isAdmin = computed(() => this._user()?.role.includes('ROLE_Administrador') ?? false);
  token = computed(this._token);

  login(username: string, password: string): Observable<boolean> {
    const params = new HttpParams()
    .set('username', username)
    .set('password', password);
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {}, { params }).pipe(
      tap(resp => {
        this.handleAuthSuccess(resp);
      }),
      map(() => true),
      catchError((error:any) => {
        this.logout();
        return of(false);
      })
    )
  }

  // checkStatus():Observable<boolean> {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.log('entra al if');
  //     this.logout();
  //     return of(false);
  //   }
  //   return this.http.get<User>(`${baseUrl}/auth/user`, {
  //     headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
  //     withCredentials: true
  //   }).pipe(
  //     tap(user => {
  //      this.handleAuthSuccess({user, token});
  //     }),
  //     map(() => true),
  //     catchError(() => {
  //       this.logout();
  //       return of(false);
  //     })
  //   )
  // }
  checkStatus(): boolean {
    //const token = localStorage.getItem('token');
  
    const isValid = !!this.token();
  
    if (isValid) {
      this._authStatus.set('authenticated');
    } else {
      this._authStatus.set('not-authenticated');
    }
  
    return isValid;
  }

  
  logout() {
    this._user.set(null);
    this._authStatus.set('not-authenticated');
    this._token.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  private handleAuthSuccess({user,token}: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  registerUser(user: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${baseUrl}/register`, user, { headers });
  }
}
