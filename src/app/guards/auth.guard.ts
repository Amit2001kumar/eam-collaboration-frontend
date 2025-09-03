import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
  
    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }
  
    const decoded = this.authService.decodeToken(token);
    const expiry = decoded?.exp;
  
    if (expiry && Date.now() > expiry * 1000) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
      return false;
    }
  
    const requiredRoles = next.data['roles'] as string[];
    if (requiredRoles && !requiredRoles.includes(decoded?.role)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  
    return true;
  }
  
}
