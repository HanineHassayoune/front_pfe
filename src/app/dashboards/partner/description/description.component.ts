import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectModalComponent } from '../edit-project-modal/edit-project-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute} from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './description.component.html'
})
export class DescriptionComponent implements OnInit {
 

    projectId: number;
    project: any;
    role: string | null = null;
    constructor(
      private route: ActivatedRoute,
      private projectService: ProjectService,
      private dialog: MatDialog,
      private storageService: StorageService,
    ) {
      this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    }
  
    ngOnInit(): void {
      this.role = this.storageService.getRole()?.toUpperCase() || null;
      this.fetchProjectDetails();
    }
  
    openEditProjectModal() {
      const dialogRef = this.dialog.open(EditProjectModalComponent, {
        width: '600px',
        data: { project: this.project }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.project = result; 
        }
      });
    }
  
    fetchProjectDetails() {
      this.projectService.getProjectById(this.projectId,['DEVELOPER','MANAGER','TESTER']).subscribe(
        (data) => {
          this.project = data;
        },
        (error) => {
          console.error('Error fetching project details:', error);
        }
      );
    }
  
 

}
