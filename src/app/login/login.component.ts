import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    console.log('Submitting login form with:', this.email, this.password);
    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  

}
