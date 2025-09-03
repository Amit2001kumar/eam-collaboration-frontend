import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

onSubmit() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res: any) => {
      // User object bhi save karo
      localStorage.setItem('userData', JSON.stringify(res.user));

      // Navigate karo
      this.router.navigate(['/projects']);
    },
    error: (err) => this.error = err?.error?.message || 'Login failed'
  });
}

}
