import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatIconModule,MatProgressSpinnerModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent {
  userForm: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  submit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value); 
    }
  }

  cancel() {
    this.dialogRef.close(); 
  }
}