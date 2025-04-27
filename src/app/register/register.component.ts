import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { AlertComponent } from '../components/alert/alert.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService,private router: Router ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
    
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      this.alertType = 'warning';
      this.alertMessage = 'Please fill out all fields correctly.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return;
    }
  
    this.registerService.postData(this.registerForm.value).subscribe({
      next: () => {

        this.alertType = 'success';
        this.alertMessage = 'Your registration is pending admin validation.';
        this.alertVisible = true;
        setTimeout(() => {
          this.alertVisible = false;
          this.registerForm.reset();
          this.router.navigate(['/pending-register']); 
        }, 2000); 
      },
      error: (error) => {
        this.alertType = 'danger';
        this.alertMessage = error.error?.message || 'Register error.';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    });
  }
  

 
}