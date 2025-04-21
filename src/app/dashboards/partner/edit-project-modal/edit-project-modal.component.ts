import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '../../../components/modal/modal.component';
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
    ModalComponent,
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
    @Inject(MAT_DIALOG_DATA) public data: { project: any }
  ) {}
  

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers(): void {
    // Appelle ton service ici
    // Tu dois injecter UserService dans le constructeur aussi
    this.userService.getUsers(['MANAGER', 'TESTER', 'DEVELOPER']).subscribe({
      next: (data: { content: any[] }) => {
        this.allUsers = data.content
          .filter(user => user.enabled)
          .map(user => ({ id: user.id, name: user.name }));
  
        // Maintenant que les users sont chargés, tu peux peupler le form
        const userIds = this.data.project?.affectedUsers.map((u: any) => u.id) || [];
        const selectedUsers = this.allUsers.filter(user => userIds.includes(user.id));
  
        this.projectForm = this.fb.group({
          title: [this.data.project?.title || ''],
          description: [this.data.project?.description || ''],
          technologies: [this.data.project?.technologies || []],
          users: [selectedUsers || []],
          image: [null]
        });
      },
      error: err => {
        console.error('Error loading users:', err);
      }
    });
  }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }



  onSubmit() {
    const formValues = this.projectForm.value;
  
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('description', formValues.description || '');
    formData.append('technologies', JSON.stringify(formValues.technologies || []));
  
    const userIds = (formValues.users || []).map((user: any) => user.id);
    formData.append('users', JSON.stringify(userIds));
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    this.projectService.updateProject(this.data.project.id, formData).subscribe({
      next: () => {
        this.dialogRef.close(true); 
      },
      error: (err) => {
        console.error('An error occurred while updating the project. Please try again.', err);
      }
    });
  }

  displayWith = (user: any) => user?.name || '';

}
