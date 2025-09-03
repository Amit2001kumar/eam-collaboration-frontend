import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole: string = '';
  isAdmin = false;
  isUser = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser(); 
    this.userRole = this.isAdmin ? 'Admin' : this.isUser ? 'User' : '';
  }

  logout() {
    this.authService.logout();  
    this.router.navigate(['/auth/login']);  
  }
}
