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
            case 'ADMIN': this.router.navigate(['/admin/partners']); break;
            case 'TESTER': this.router.navigate(['/tester/projects']); break;
            case 'DEVELOPER': this.router.navigate(['/developer/projects']); break;
            case 'PARTNER': this.router.navigate(['/partner/dashboard']); break;
            case 'MANAGER': this.router.navigate(['/manager/dashboard']); break;
            default: this.router.navigate(['/login']); break;
          }
        }, 2000);
      },
     error: (error) => {
  const message = error.error?.message || '';

  if (message.includes('not yet been approved')) {
    this.alertType = 'danger';
    this.alertMessage = "Your account has not been approved by the admin.";
  } else if (message.includes('Invalid credentials')) {
    this.alertType = 'danger';
    this.alertMessage = "Invalid email or password.";
  } else {
    this.alertType = 'danger';
    this.alertMessage = 'Login error. Please try again.';
  }

  this.alertVisible = true;
  setTimeout(() => {
    this.alertVisible = false;
  }, 3000);
}

    });
  }

}
