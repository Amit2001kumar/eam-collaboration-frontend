import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as e from 'express';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.authService.setToken(res.token);
            this.authService.setUserDetails(res.user);
            this.router.navigate(['/dashboard/dashboard']);
          } else {
            this.error = res.message;
          }
        },
        error: (err) => {
          this.error = err.error.message || 'Login failed';

        }
      });
    }
  }
}