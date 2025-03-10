import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../services/password.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  token: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute, private passwordService: PasswordService) {}

  ngOnInit() {
    // Récupérer le token depuis l'URL
    this.token = this.route.snapshot.queryParams['token'] || '';
  }

  resetPassword() {
    if (!this.newPassword || !this.token) {
      this.message = 'Invalid request. Please try again.';
      return;
    }

    this.passwordService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => this.message = 'Password successfully reset!',
      error: () => this.message = 'Error resetting password. Try again later.',
    });
  }
}
