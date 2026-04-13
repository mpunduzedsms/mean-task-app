import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router) {}

  login() {
    this.authService.login({
      username: this.username,
      password: this.password
    }) .subscribe({
      next: (res: any) => {

        // Store JWT + User
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.username);

        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        alert(err.error.message || 'Login failed');
      }
    });
  }
  ngOnInit() {
    console.log('Login component loaded');
  }

}