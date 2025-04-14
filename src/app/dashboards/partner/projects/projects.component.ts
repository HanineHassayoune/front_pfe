import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';  


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, ProjectCardComponent, CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  
  projects: any[] = [];
  isModalOpen = false;
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
 }

  

ngOnInit(): void {
  this.projectService.getProjects().subscribe(
    (data) => {
      this.projects = data;
    },
    (error) => {
      console.error('Failed to load projects', error);
    }
  );
}

  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private projectService: ProjectService) { 
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      technologies: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      this.projectService.addProject(projectData).subscribe(
        (response) => {
          console.log('Project added successfully', response);
          this.closeModal();
          this.projectForm.reset();
          this.projectService.getProjects().subscribe(projects => {
            this.projects = projects;
          });
        },
        (error) => {
          console.error('Error adding project', error);
        }
      );
    }
  }
  
  


  
}
