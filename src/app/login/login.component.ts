import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertComponent } from '../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StorageService } from '../services/storage.service';
import { NgForm } from '@angular/forms';
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

  constructor(private authService: AuthService, private router: Router , private storageService: StorageService) {}
  onSubmit(form: NgForm) {
    this.alertVisible = false;
  
    if (!form.valid) {
      this.alertType = 'warning';
      this.alertMessage = 'Please fill in all required fields correctly.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return;
    }
  
    this.isLoading = true;
  
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.storageService.setAuthToken(response.token);
        this.alertType = 'success';
        this.alertMessage = 'Login successful!';
        this.alertVisible = true;
  
        setTimeout(() => {
          switch (response.role.toUpperCase()) {
            case 'ADMIN': this.router.navigate(['/admin']); break;
            case 'TESTER': this.router.navigate(['/tester']); break;
            case 'DEVELOPER': this.router.navigate(['/developper']); break;
            case 'PARTNER': this.router.navigate(['/partner']); break;
            case 'MANAGER': this.router.navigate(['/manager']); break;
            default: this.router.navigate(['/login']); break;
          }
        }, 2000);
      },
      error: (error) => {
        this.alertType = 'danger';
        this.alertMessage = error.error?.message || 'Login error. Please check your credentials.';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    });
  }

}
