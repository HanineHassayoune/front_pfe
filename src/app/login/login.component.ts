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
          localStorage.setItem('role', response.role); 
    
          // Redirect (based on role)
          switch (response.role) {
            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;
            case 'TESTER':
              this.router.navigate(['/tester']);
              break;
            case 'DEVELOPPER':
              this.router.navigate(['/developper']);
              break;
            case 'PARTNER':
              this.router.navigate(['/partner']);
              break;
            default:
              this.router.navigate(['/login']);
              break;
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
    

}
