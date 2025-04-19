import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ChipsComponent } from '../../../components/chips/chips.component';

@Component({
  selector: 'app-edit-project-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    ModalComponent,
    ChipsComponent
  ],
  templateUrl: './edit-project-modal.component.html',
  styleUrl: './edit-project-modal.component.css'
})
export class EditProjectModalComponent implements OnInit {
  projectForm!: FormGroup;
  selectedFile: File | null = null;
  allTechnologies: string[] = ['Angular', 'Spring Boot', 'Node.js']; // À adapter
  allUsers: any[] = []; // Liste des utilisateurs
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProjectModalComponent>, // ✅ public
    @Inject(MAT_DIALOG_DATA) public data: { project: any }
  ) {}
  

  ngOnInit() {
    const rawTechnologies = this.data.project?.technologies;
    const technologies = typeof rawTechnologies === 'string'
      ? JSON.parse(rawTechnologies)
      : rawTechnologies;
  
    const rawUsers = this.data.project?.users;
    const users = typeof rawUsers === 'string'
      ? JSON.parse(rawUsers)
      : rawUsers;
  
    this.projectForm = this.fb.group({
      title: [this.data.project?.title || ''],
      description: [this.data.project?.description || ''],
      technologies: [technologies || []],
      users: [users || []],
      image: [null]
    });
  }
  
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const updatedProject = {
      ...this.projectForm.value,
      id: this.data.project.id 
    };
  
    if (this.selectedFile) {
      updatedProject.image = this.selectedFile;
    }
  
    this.dialogRef.close(updatedProject);
  }
  

  displayWith = (user: any) => user?.name || '';

  
}
