import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { AlertComponent } from '../components/alert/alert.component';


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

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
     console.log('Form submitted');
  console.log('Name value:', this.registerForm.controls['name'].value);

    // Check for empty fields and display alerts
    if (!this.registerForm.controls['name'].value) {
      console.log("heloooooooooooooooooooo")
      this.alertType = 'warning';
      this.alertMessage = 'Please fill out the Name field.';
      this.alertVisible = true;
      //setTimeout(() => {this.alertVisible = false;}, 2000); 
      return;
    }

    if (!this.registerForm.controls['email'].value) {
      this.alertType = 'warning';
      this.alertMessage = 'Please fill out the Email field.';
      this.alertVisible = true;
      //setTimeout(() => {this.alertVisible = false;}, 2000); 
      return;
    }

    if (!this.registerForm.controls['password'].value) {
      this.alertType = 'warning';
      this.alertMessage = 'Please fill out the Password field.';
      this.alertVisible = true;
     // setTimeout(() => {this.alertVisible = false;}, 2000); ;
      return;
    }

    // If all fields are filled, submit the form
    this.registerService.postData(this.registerForm.value).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = 'Your registration is pending admin validation.';
        this.alertVisible = true;
        //setTimeout(() => {this.alertVisible = false;}, 2000); 
      },
      error: (error) => {
        this.alertType = 'danger';
        this.alertMessage = error.error?.message || ' Register error.';
        this.alertVisible = true;
       // setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    });
  }

 
}