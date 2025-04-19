import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';  
import { UserService } from '../../../services/user.service';
import { ChipsComponent } from '../../../components/chips/chips.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, ProjectCardComponent, CommonModule, ModalComponent, ReactiveFormsModule, ChipsComponent, FormsModule,MatIconModule ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})


export class ProjectsComponent implements OnInit {
  projectForm!: FormGroup;
  isModalOpen = false;
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

  allUsers: { name: string }[] = [];

  
  displayWith(item: any): string {
    const display = item?.name || ''; // Safely handle undefined or null values
    console.debug('Calling displayWith:', display); // Log the processed output
    return display;
  }
  
  
  
  
  searchQuery = '';

  constructor(private fb: FormBuilder, private projectService: ProjectService, private userService: UserService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      technologies: [[]],
      users: [[]],
      imageUrl: ['']
    });

    this.fetchProjects();
    this.loadUsers();
  }

  fetchProjects(): void {
  this.projectService.getProjects().subscribe((response: any) => {
    this.projects = response.map((p: any) => ({
      ...p,
      imageUrl: p.projectImage // adapte la clé ici
    }));
  });
}

  selectedImageFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    }
  }
  
  loadUsers(): void {
    this.userService.getUsers(['MANAGER', 'TESTER', 'DEVELOPER']).subscribe({
      next: (data: { content: { id: number; name: string; email: string; profileImage: string | null; role: string; enabled: boolean }[] }) => {
        this.allUsers = data.content
          .filter((user) => user.enabled)
          .map((user) => ({ id: user.id, name: user.name }));
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      },
    });
  }
  
  
  

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.projectForm.reset({
      title: '',
      description: '',
      technologies: [],
      users: [],
      projectImage: ''
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.projectForm.value.title);
    formData.append('description', this.projectForm.value.description);
    formData.append('technologies', JSON.stringify(this.projectForm.value.technologies));
    
    const userIds = this.projectForm.value.users.map((user: any) => user.id);
    formData.append('users', JSON.stringify(userIds));
  
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
  
      this.projectService.addProject(formData).subscribe(() => {
        this.fetchProjects();
        this.closeModal();
      });
    }
  
  
  

  filteredProjects(): any[] {
    return this.projects.filter(p =>
      p.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
