import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:3000/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        alert('User registered successfully');
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.error(err);
        alert('Registration failed');
      }
    });
  }
}
