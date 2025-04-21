import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { UserService } from '../../../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ChipsComponent } from '../../../components/chips/chips.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';

interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string | null;
  role: string;
  enabled: boolean;
}
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ProjectCardComponent,
    ChipsComponent,
    MatDialogModule,
    AddProjectDialogComponent 
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})


export class ProjectsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  projects: any[] = [];
  allTechnologies: string[] = [
    // Frontend
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js', 'Svelte', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Next.js', 'Nuxt.js',
    // Backend
    'Node.js', 'Express.js', 'Spring Boot', 'Java', 'Python', 'Django', 'Flask', 'Ruby on Rails', '.NET', 'PHP', 'Laravel', 'Go', 'NestJS', 'Kotlin',
    // Bases de données
    'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Firebase', 'Redis', 'OracleDB', 'Cassandra', 'MariaDB', 'Elasticsearch',
    // Mobile
    'Flutter', 'React Native', 'Swift', 'Kotlin (Android)', 'Ionic', 'Xamarin',
    // DevOps / Tools
    'Docker', 'Kubernetes', 'Git', 'GitLab CI/CD', 'GitHub Actions', 'Jenkins', 'AWS', 'Azure', 'GCP', 'Terraform', 'Ansible', 'Nginx',
    // Testing
    'Jest', 'Mocha', 'Chai', 'JUnit', 'Cypress', 'Selenium', 'Playwright', 'Postman',
    // Design / UI / UX
    'Figma', 'Adobe XD', 'Sketch', 'Canva',
    // AI / Data
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'OpenCV',
    // Autres
    'GraphQL', 'REST API', 'WebSockets', 'JSON', 'YAML', 'Markdown', 'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier'
  ];

  allUsers: { id: number; name: string }[] = [];
  searchQuery = '';

  ngOnInit(): void {
    this.fetchProjects();
    this.loadUsers();
  }

  fetchProjects(): void {
    this.projectService.getProjects().subscribe((response: any) => {
      this.projects = response.map((p: any) => ({
        ...p,
        imageUrl: p.projectImage,
      }));
    });
  }

  loadUsers(): void {
    this.userService.getUsers(['MANAGER', 'TESTER', 'DEVELOPER']).subscribe({
      next: (data) => {
        this.allUsers = data.content
          .filter((user:User) => user.enabled)
          .map((user:User) => ({ id: user.id, name: user.name }));
      },
      error: (err) => console.error('Failed to load users:', err),
    });
  }

  displayWith(item: any): string {
    return item?.name || '';
  }

  openAddProjectDialog(): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '600px',
      data: {
        allTechnologies: this.allTechnologies,
        allUsers: this.allUsers,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.fetchProjects();
      }
    });
  }

  filteredProjects(): any[] {
    return this.projects.filter((p) =>
      p.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
