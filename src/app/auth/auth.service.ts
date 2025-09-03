import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.success) {
          this.setToken(response.token);
          this.setUserDetails(response.user); 
        }
      })
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
  }

  decodeToken(token: string): any {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
      const decodedData = atob(base64); 
      return JSON.parse(decodedData); 
    }
    return null;
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (token) {
      const decoded: any = this.decodeToken(token); 
      return decoded.role && decoded.role === role;
    }
    return false;
  }

  setUserDetails(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserDetails(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = this.decodeToken(token); 
      return decoded.userId || null;
    }
    return null;
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }
  
  isUser(): boolean {
    return this.hasRole('User');
  }
  
}
