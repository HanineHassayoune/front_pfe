import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsComponent } from '../../../components/chips/chips.component';
import { ProjectService } from '../../../services/project.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../../components/alert/alert.component';
@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule, MatIconModule, ChipsComponent,MatProgressSpinnerModule,AlertComponent],
  templateUrl: './add-project-dialog.component.html',
  styleUrl: './add-project-dialog.component.css'
})
export class AddProjectDialogComponent {
  isLoading = false;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage = '';
  alertVisible = false;

  projectForm: FormGroup;
  selectedImageFile: File | null = null;
  projects: any[] = [];
  constructor(
    private dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { allTechnologies: string[], allUsers: any[] },
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      technologies: [[]],
      users: [[]],
      imageUrl: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    }
  }

  displayWith(item: any): string {
    return item?.name || '';
  }

  submit(): void {
    this.isLoading = true; // Active le spinner
  
    const formData = new FormData();
    formData.append('title', this.projectForm.value.title);
    formData.append('description', this.projectForm.value.description);
    formData.append('technologies', JSON.stringify(this.projectForm.value.technologies));
    formData.append('users', JSON.stringify(this.projectForm.value.users.map((u: any) => u.id)));
  
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
  
    this.projectService.addProject(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close('refresh');
      },
      error: (err) => {
        this.isLoading = false;
        this.alertMessage = 'Failed to add project';
        this.alertType = 'danger';
        this.alertVisible = true;
        console.error(err);
      }
    });
  }
  
  


  
  fetchProjects(): void {
    this.projectService.getProjects().subscribe((response: any) => {
      this.projects = response.map((p: any) => ({
        ...p,
        imageUrl: p.projectImage 
      }));
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
