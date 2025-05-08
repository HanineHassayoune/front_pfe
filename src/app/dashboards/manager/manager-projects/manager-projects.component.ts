import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { ProjectCardComponent } from '../../partner/project-card/project-card.component';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-manager-projects',
  standalone: true,
  imports: [RouterModule,
      CommonModule,
      FormsModule,ProjectCardComponent],
  templateUrl: './manager-projects.component.html',
  styleUrl: './manager-projects.component.css'
})
export class ManagerProjectsComponent implements OnInit {

  private projectService = inject(ProjectService);
  private storageService = inject(StorageService);
  projects: any[] = [];
  

  allUsers: { id: number; name: string }[] = [];
  searchQuery = '';

  role: string | null = null;

  ngOnInit(): void {
    this.role = this.storageService.getRole()?.toUpperCase() || null;
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getAssignedProject().subscribe({
      next: (response: any[]) => {
        this.projects = response.map(project => ({
          ...project,
          imageUrl: project.projectImage
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets assignés :', err);
        this.projects = [];
      }
    });
  }
  


  displayWith(item: any): string {
    return item?.name || '';
  }
 
  filteredProjects(): any[] {
    return this.projects.filter((p) =>
      p.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
