import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SolutionService, Solution } from '../../../services/solution.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: 'app-add-solution-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AlertComponent
  ],
  templateUrl: './add-solution-dialog.component.html',
  styleUrls: ['./add-solution-dialog.component.css']
})
export class AddSolutionDialogComponent {
  solutionForm: FormGroup;
  isLoading: boolean = false;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private solutionService: SolutionService,
    public dialogRef: MatDialogRef<AddSolutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: number; userId: number }
  ) {
    this.solutionForm = this.fb.group({
      description: ['', Validators.required],
      reference: [''],
      code: ['']
    });
  }

  onSubmit(): void {
  if (this.solutionForm.invalid) return;

  this.isLoading = true;
  this.alertVisible = false;

  const solution: Solution = {
    ...this.solutionForm.value,
    ticketId: this.data.ticketId,
    userId: this.data.userId
  };

  this.solutionService.addSolution(solution).subscribe({
    next: () => {
      this.isLoading = false;
      this.alertType = 'success';
      this.alertMessage = 'Solution added successfully.';
      this.alertVisible = true;

      setTimeout(() => {
        this.dialogRef.close(true);
      }, 2000);
    },
    error: (err) => {
      this.isLoading = false;
      this.alertType = 'danger';
      this.alertMessage = err.error?.message || 'Failed to add solution.';
      this.alertVisible = true;

      setTimeout(() => {
        this.alertVisible = false;
      }, 3000);
    }
  });
}




  onCancel(): void {
    this.dialogRef.close(false);
  }
}
