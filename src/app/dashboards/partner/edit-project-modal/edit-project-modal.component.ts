import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChipsComponent } from '../../../components/chips/chips.component';
import { UserService } from '../../../services/user.service';
import { ProjectService } from '../../../services/project.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-project-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    ChipsComponent,AlertComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-project-modal.component.html',
  styleUrl: './edit-project-modal.component.css'
})
export class EditProjectModalComponent implements OnInit {
  isLoading = false;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage = '';
  alertVisible = false;
  projectForm!: FormGroup;
  selectedFile: File | null = null;
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
  allUsers: any[] = []; // Liste des utilisateurs
  constructor(
    private fb: FormBuilder, private userService:UserService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<EditProjectModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { project: any , allMicroservices?: string[]}
  ) {}
  

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.userService.getUsers(['MANAGER', 'TESTER', 'DEVELOPER']).subscribe({
      next: (data: { content: any[] }) => {
        this.allUsers = data.content
          .filter(user => user.enabled)
          .map(user => ({ id: user.id, name: user.name }));
  
       
        const userIds = this.data.project?.affectedUsers.map((u: any) => u.id) || [];
        const selectedUsers = this.allUsers.filter(user => userIds.includes(user.id));
  
        this.projectForm = this.fb.group({
          title: [this.data.project?.title || ''],
          description: [this.data.project?.description || ''],
          technologies: [this.data.project?.technologies || []],
          users: [selectedUsers || []],
          architecture: [this.data.project?.architecture || ''],
          microservices: [(this.data.project?.microservices || []).map((ms: any) => typeof ms === 'string' ? ms : ms.title)],

          image: [null]
        });
      },
      error: err => {
        console.error('Error loading users:', err);
      }
    });
  }
  
onMicroservicesChange(updatedList: string[]) {
  this.projectForm.patchValue({ microservices: updatedList });
}


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }



 onSubmit() {
  if (!this.projectForm.valid) return;
  this.isLoading = true;
  const formValues = this.projectForm.value;
  const formData = new FormData();

  // Champs form
  formData.append('title', formValues.title || '');
  formData.append('description', formValues.description || '');
  formData.append('technologies', JSON.stringify(formValues.technologies || []));
  formData.append('architecture', formValues.architecture);

  // assigned users
  const userIds = (formValues.users || []).map((user: any) => user.id);
  formData.append('users', JSON.stringify(userIds));

  // Image 
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  // Microservices (si architecture == MICROSERVICES)
  if (formValues.architecture === 'MICROSERVICES') {
    const microserviceTitles = formValues.microservices || [];
    const microservicesArray = microserviceTitles.map((title: string) => ({ title }));
    formData.append('microservices', JSON.stringify(microservicesArray));
  }

  
    this.projectService.updateProject(this.data.project.id, formData).subscribe({
    next: (updatedProject) => {
      this.isLoading = false; 
      this.dialogRef.close(updatedProject); 
    },
    error: (err) => {
      this.isLoading = false;
      this.alertType = 'danger';
      this.alertMessage = 'Project update failed!';
      this.alertVisible = true;
      setTimeout(() => this.alertVisible = false, 3000);
      console.error('Update failed', err);
    }
  });
}

 


  displayWith = (user: any) => user?.name || '';

}
