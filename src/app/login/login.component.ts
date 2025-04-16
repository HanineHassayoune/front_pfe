import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertComponent } from '../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent,CommonModule,MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    // Reset alert visibility
    this.alertVisible = false;
  
    
    if (!this.email) {
      this.alertType = 'warning';
      this.alertMessage = ' Please fill in the Email field.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return; 
    }
  
    if (!this.password) {
      this.alertType = 'warning';
      this.alertMessage = ' Please fill in the Password field.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return; 
    }
  
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
  

        // Set alert for success
        this.alertType = 'success';
        this.alertMessage = ' Login successful!';
        this.alertVisible = true;
  
        // Redirect based on role
       // Delay the redirection to allow the alert to be visible
      setTimeout(() => {
        // Redirect based on role
        switch (response.role.toUpperCase()) {
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          case 'TESTER':
            this.router.navigate(['/tester']);
            break;
          case 'DEVELOPER':
            this.router.navigate(['/developper']);
            break;
          case 'PARTNER':
            this.router.navigate(['/partner']);
            break;
          default:
            this.router.navigate(['/login']);
            break;
        }
      }, 2000); // Wait for 2 seconds before redirecting
      },
      error: (error) => {
        this.alertType = 'danger';
        this.alertMessage = error.error?.message || ' Login error. Please check your credentials.';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    });
  }

}
