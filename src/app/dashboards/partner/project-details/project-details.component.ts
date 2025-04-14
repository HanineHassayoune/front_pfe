import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableOneBtnComponent } from '../../../components/table-one-btn/table-one-btn.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { MatTableModule } from '@angular/material/table';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [TableOneBtnComponent,CommonModule,ModalComponent,MatTableModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {

  projectId: number;
  project: any; 

  constructor(private route: ActivatedRoute,private router: Router, private projectService: ProjectService) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  }


  ngOnInit(): void {
    this.fetchProjectDetails();
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

  teamMembers = [
    { name: 'Alice Johnson', role: 'Project Manager', avatar: 'assets/images/avatar.png' },
    { name: 'Bob Smith', role: 'Backend Developer', avatar: 'assets/images/avatar.png' },
    { name: 'Charlie Brown', role: 'Frontend Developer', avatar: 'assets/images/avatar.png' },
    { name: 'Diana Adams', role: 'UI/UX Designer', avatar: 'assets/images/avatar.png' }
  ];

  displayedColumns: string[] = ['avatar', 'name', 'role', 'actions'];

  viewProfile(member: any) {
    alert(`Profil de ${member.name}`);
  }

  columns = [
    { field: 'exception', header: 'Exception' },
    { field: 'type', header: 'Type' },
    { field: 'level', header: 'Level' },
    { field: 'status', header: 'Status' },
    { field: 'description', header: 'Description' },
    { field: 'timestamp', header: 'Timestamp' },
  
  ];

  // Exemple de données à afficher
  rows = [
    {
      id: 1,
      exception: 'Null Pointer Exception',
      type: 'Error',
      level: 'High',
      status: 'To do',
      description: 'Occurred while trying to access a null object.',
      timestamp: '2025-02-05 12:45:00',
    },
  
    {
      id: 2,
      exception: 'Index Out Of Bound Exception',
      type: 'Error',
      level: 'Medium',
      status:'In progress',
      description: 'Tried to access an element outside of the array bounds.',
      timestamp: '2025-02-05 14:30:15',
      
    },
    {
      id: 3,
      exception: 'SQL Syntax Error',
      type: 'Error',
      level: 'Low',
      status:'Resolved',
      description: 'SQL query contains incorrect syntax.',
      timestamp: '2025-02-05 16:22:45',
     
    },
    {
      id: 4,
      exception: 'File Not Found',
      type: 'Error',
      level: 'High',
      status:'To do',
      description: 'The requested file could not be located.',
      timestamp: '2025-02-05 18:00:30',
      
    }
  ];

  

  goToTicketDetails(ticket: any) {
    if (ticket && ticket.id) {
      this.router.navigate(['/partner/ticket-details', ticket.id]);
    } else {
      console.error('Ticket ID is undefined!');
    }
  }
  

  
}
