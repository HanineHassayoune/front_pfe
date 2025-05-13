import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SolutionService, Solution } from '../../../services/solution.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-solution-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-solution-dialog.component.html',
  styleUrls: ['./add-solution-dialog.component.css']
})
export class AddSolutionDialogComponent {
  solutionForm: FormGroup;
  isLoading = false;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage = '';
  alertVisible = false;

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

    const solution: Solution = {
      ...this.solutionForm.value,
      ticketId: this.data.ticketId,
      userId: this.data.userId // 👈 Assure-toi que cette ligne est présente
    };

    

    this.solutionService.addSolution(solution).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = '✅ Solution added successfully.';
        this.alertVisible = true;
        this.isLoading = false;

        setTimeout(() => {
          this.dialogRef.close(true);
        }, 1000);
      },
      error: (err) => {
        this.alertType = 'danger';
        this.alertMessage = `❌ Failed to add solution: ${err?.error || 'Unknown error.'}`;
        this.alertVisible = true;
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
