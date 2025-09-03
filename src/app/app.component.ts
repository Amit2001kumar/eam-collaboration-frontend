import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { TokenService } from './services/token.service';   
import { AuthService } from './auth/auth.service';        

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client_project';
  showHeaderAndSidebar = false;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit(): void {}

  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      
    }

    if (event instanceof NavigationEnd) {
      this.authService.getToken();

      const url = event.urlAfterRedirects.toLowerCase();
      const authRoutes = [
        '/auth/login',
        '/auth/register',
      ];

      const isLoggedIn = this.authService.isLoggedIn();
      const isAuthRoute = authRoutes.some(route => url.startsWith(route));
      this.showHeaderAndSidebar = isLoggedIn && !isAuthRoute;

      this.cdRef.detectChanges();
    }
  }
}
