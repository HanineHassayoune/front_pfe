import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectModalComponent } from '../edit-project-modal/edit-project-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './description.component.html'
})
export class DescriptionComponent implements OnInit {
 

   projectId: number;
    project: any;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private projectService: ProjectService,
      private dialog: MatDialog
    ) {
      this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    }
  
    ngOnInit(): void {
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
      this.projectService.getProjectById(this.projectId).subscribe(
        (data) => {
          this.project = data;
        },
        (error) => {
          console.error('Error fetching project details:', error);
        }
      );
    }
  
    
}
