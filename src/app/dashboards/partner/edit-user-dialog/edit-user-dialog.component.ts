import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']  // corrigé ici (styleUrls)
})
export class EditUserDialogComponent {
  userForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; email: string; role: string } // données reçues du parent
  ) {
    this.userForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      email: [{ value: data?.email || '', disabled: true }, [Validators.required, Validators.email]], // désactivé
      role: [data?.role || '', Validators.required]
    });
  }

  submit() {
    if (this.userForm.valid) {
      // On récupère la valeur du formulaire (email est disabled donc pas dans value)
      const { name, role } = this.userForm.getRawValue(); 
      this.dialogRef.close({ name, role }); // on renvoie uniquement ce qu'il faut
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
