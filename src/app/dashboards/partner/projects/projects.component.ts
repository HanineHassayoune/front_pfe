import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule,ProjectCardComponent,CommonModule,ModalComponent,ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = [
    { id: 1, name: 'AI Mental Health', image: 'assets/images/p1.png', details: 'AI-powered mental health support' },
    { id: 2, name: 'VR Therapy', image: 'assets/images/p2.jpg', details: 'Virtual reality therapy sessions' },
    { id: 3, name: 'Medical App', image: 'assets/images/p3.jpg', details: 'A telemedicine application for doctors' },
  ];

  //Modal 
  isModalOpen = false; 
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

  projectForm: FormGroup;

  constructor(private fb: FormBuilder) { // Injection de FormBuilder
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      technology: ['', Validators.required],
      image: ['']
    });
  }

}
