import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertComponent } from '../components/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Stocker le token dans localStorage
        localStorage.setItem('token', response.token);

        this.alertType = 'success';
        this.alertMessage = 'Connexion réussie !';
        this.alertVisible = true;

        // Redirection selon le rôle
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
            this.alertMessage = 'Rôle inconnu, veuillez réessayer.';
            this.alertType = 'warning';
            break;
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.alertType = 'danger';
        this.alertMessage = error.error?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
        this.alertVisible = true;
      }
    });
  }
}
