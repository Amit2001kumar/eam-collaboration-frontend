import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) { }

  login(email: string, password: string) {
    return this.api.login(email, password).pipe(
      tap((res: any) => {
        if (res?.token) localStorage.setItem('jwt_token', res.token);
      })
    );
  }

  register(name: string, email: string, password: string, role: string) {
    return this.api.register(name, email, password, role);
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
}
