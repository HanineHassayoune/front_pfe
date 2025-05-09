import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { TablePaginationComponent } from '../../../components/table-pagination/table-pagination.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, TablePaginationComponent,MatDialogModule,UserProfileDialogComponent],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  columns = [
    { field: 'profileImage', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'action', header: 'Action' }
  ];

  projectId: number;
  project: any;
  data: any[] = [];
  totalRows = 0;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.projectService.getProjectById(this.projectId, ['DEVELOPER', 'MANAGER', 'TESTER']).subscribe(
      (data: any) => {
        this.project = data;
        this.data = (data.affectedUsers || []).map((member: any) => ({
          ...member,
          action: 'view'
        }));
        this.totalRows = this.data.length;
      },
      (error: any) => {
        console.error('Erreur lors du chargement du projet :', error);
      }
    );
  }

  handleAction(event: { id: number; action: string; user?: any }) {
    if (event.action === 'view' && event.user) {
      this.viewProfile(event.user); 
    }
  }
  

  viewProfile(user: any) {
    this.dialog.open(UserProfileDialogComponent, {
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        projectName: this.project?.title,
        projectTech: this.project?.technologies?.join(', ') || 'N/A',
        image: user.profileImage || 'assets/images/default-user.jpg'
      },width: '600px',  
      height: 'auto',  
      panelClass: 'custom-dialog'
     
      
    });
    console.log(user);
  }
  
}
