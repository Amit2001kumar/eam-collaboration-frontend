import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name=''; email=''; password=''; role='MEMBER'; error='';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.name, this.email, this.password, this.role).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => this.error = err?.error?.message || 'Register failed'
    });
  }
}
