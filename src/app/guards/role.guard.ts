import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = next.data['expectedRole'];

    if (Array.isArray(expectedRole)) {
      return expectedRole.includes(this.authService.getUserDetails()?.role);
    }

    if (this.authService.hasRole(expectedRole)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }


}
