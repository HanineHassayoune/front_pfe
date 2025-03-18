import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}
    
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Navigate based on the role directly from the response
        switch (response.role.toUpperCase()) { 
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
