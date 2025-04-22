import { Component } from '@angular/core';
import { PasswordService } from '../services/password.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private passwordService: PasswordService) {}

  /* sendResetLink() {
    if (!this.email) {
      this.message = 'Please enter a valid email';
      return;
    }

    this.passwordService.forgotPassword(this.email).subscribe({
      next: (response) => this.message = 'Reset link sent! Check your email.',
      error: (err) => this.message = 'Error sending email. Try again later.',
    });
  } */

    sendResetLink() {
      if (!this.email) {
        this.message = 'Please enter a valid email';
        return;
      }
    
      this.passwordService.forgotPassword(this.email).subscribe({
        next: (response: string) => {
          this.message = response; 
        },
        error: (err) => {
          console.error(err);
          this.message = 'Error sending email. Try again later.';
        },
      });
    }
    
    
}
