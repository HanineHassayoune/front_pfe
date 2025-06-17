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
    @Inject(MAT_DIALOG_DATA) public data: { allTechnologies: string[], allUsers: any[],allMicroservices: []  },
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {
    this.projectForm = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        technologies: [[]],
        users: [[]],
        imageUrl: [''],
        architecture: [''],
        microservices: [[]] 
    });
  }

  getTechIcon(tech: string): string {
    const icons: Record<string, string> = {
      'HTML': '../../assets/icons/html.png',
      'CSS': '../../assets/icons/css.png',
      'JavaScript': '../../assets/icons/js.png',
      'TypeScript': '../../assets/icons/typescript.png',
      'Angular': '../../assets/icons/angular.png',
      'React': '../../assets/icons/react.png',
      'Vue.js': '../../assets/icons/vue-js.png',
      'Svelte': '../../assets/icons/Svelte.png',
      'Tailwind CSS': '../../assets/icons/tailwind.png',
      'Bootstrap': '../../assets/icons/bootstrap.png',
      'Material UI': '../../assets/icons/material-ui.png',
      
      'Next.js': '../../assets/icons/react.png',
      'Nuxt.js': '../../assets/icons/react.png',
      'Node.js': '../../assets/icons/react.png',
      'Express.js': '../../assets/icons/react.png',
      'Spring Boot': '../../assets/icons/react.png',
      'Java': '../../assets/icons/react.png',
      'Python': '../../assets/icons/react.png',
      'Django': '../../assets/icons/react.png',
      'Flask': '../../assets/icons/react.png',
      'Ruby on Rails': '../../assets/icons/react.png',
      '.NET': '../../assets/icons/react.png',
      'PHP': '../../assets/icons/react.png',
      'Laravel': '../../assets/icons/react.png',
      'Go': '../../assets/icons/react.png',
      'NestJS': '../../assets/icons/react.png',
      'Kotlin': '../../assets/icons/react.png',
      'PostgreSQL': '../../assets/icons/react.png',
      'MySQL': '../../assets/icons/react.png',
      'MongoDB': '../../assets/icons/react.png', 
      'SQLite': '../../assets/icons/react.png',
      'Firebase': '../../assets/icons/react.png',
      'Redis': '../../assets/icons/react.png',
      'Cassandra': '../../assets/icons/react.png',
      'MariaDB': '../../assets/icons/react.png',
      'Elasticsearch': '../../assets/icons/react.png',
      'Flutter': '../../assets/icons/react.png',
      'React Native': '../../assets/icons/react.png', 
      'Swift': '../../assets/icons/react.png', 
      'Kotlin (Android)': '../../assets/icons/react.png', 
      'Ionic': '../../assets/icons/react.png', 
      'Xamarin': '../../assets/icons/react.png',
      'Docker': '../../assets/icons/react.png',
      'Kubernetes': '../../assets/icons/react.png',
      'Git': '../../assets/icons/react.png',
      'GitLab CI/CD': '../../assets/icons/react.png',
      'GitHub Actions': '../../assets/icons/react.png',
      'Jenkins': '../../assets/icons/react.png',
      'AWS': '../../assets/icons/react.png',
      'Azure': '../../assets/icons/react.png',
      'GCP': '../../assets/icons/react.png',
      'Terraform': '../../assets/icons/react.png',
      'Ansible': '../../assets/icons/react.png',
      'Nginx': '../../assets/icons/react.png',
      'Jest': '../../assets/icons/react.png',
      'Mocha': '../../assets/icons/react.png',
      'Chai': '../../assets/icons/react.png',
      'JUnit': '../../assets/icons/react.png',
      'Cypress': '../../assets/icons/react.png',
      'Selenium': '../../assets/icons/react.png',
      'Playwright': '../../assets/icons/react.png', 
      'Postman': '../../assets/icons/react.png',
      'Figma': '../../assets/icons/react.png', 
      'Adobe XD':'../../assets/icons/xd.png',
      'Sketch': '../../assets/icons/react.png',
      'Canva': '../../assets/icons/react.png',
      'TensorFlow': '../../assets/icons/react.png', 
      'PyTorch': '../../assets/icons/react.png', 
      'Scikit-learn': '../../assets/icons/react.png',
      'Pandas': '../../assets/icons/react.png',
      'NumPy': '../../assets/icons/react.png',
      'Matplotlib': '../../assets/icons/react.png',
      'OpenCV': '../../assets/icons/react.png',
      'GraphQL': '../../assets/icons/react.png',
      'REST API': '../../assets/icons/react.png',
      'WebSockets': '../../assets/icons/react.png',
      'JSON': '../../assets/icons/react.png',
      'YAML': '../../assets/icons/react.png',
      'Markdown': '../../assets/icons/react.png', 
      'Webpack': '../../assets/icons/react.png',
      'Vite': '../../assets/icons/react.png',
      'Babel': '../../assets/icons/react.png',
      'ESLint': '../../assets/icons/react.png',
      'Prettier': '../../assets/icons/react.png',
      
    };
    return icons[tech] || '../../assets/icons/default.png';
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
  this.isLoading = true;

  const formData = new FormData();
  formData.append('title', this.projectForm.value.title);
  formData.append('description', this.projectForm.value.description || '');
  formData.append('technologies', JSON.stringify(this.projectForm.value.technologies || []));
  formData.append('users', JSON.stringify((this.projectForm.value.users || []).map((u: any) => u.id)));
  formData.append('architecture', this.projectForm.value.architecture);
  

  // Facultatif
  if (this.projectForm.value.architecture === 'MICROSERVICES') {
  const microserviceTitles = this.projectForm.value.microservices || [];
  const microservicesArray = microserviceTitles.map((title: string) => ({ title }));
  formData.append('microservices', JSON.stringify(microservicesArray));
}

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
