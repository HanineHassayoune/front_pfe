import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableOneBtnComponent } from '../../../components/table-one-btn/table-one-btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [TableOneBtnComponent,CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {

  projectId: number;

  constructor(private route: ActivatedRoute) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
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
      exception: 'Null Pointer Exception',
      type: 'Error',
      level: 'High',
      status:'To do',
      description: 'Occurred while trying to access a null object.',
      timestamp: '2025-02-05 12:45:00',
    
    },
    {
      exception: 'Index Out Of Bound Exception',
      type: 'Error',
      level: 'Medium',
      status:'In progress',
      description: 'Tried to access an element outside of the array bounds.',
      timestamp: '2025-02-05 14:30:15',
      
    },
    {
      exception: 'SQL Syntax Error',
      type: 'Error',
      level: 'Low',
      status:'Resolved',
      description: 'SQL query contains incorrect syntax.',
      timestamp: '2025-02-05 16:22:45',
     
    },
    {
      exception: 'File Not Found',
      type: 'Error',
      level: 'High',
      status:'To do',
      description: 'The requested file could not be located.',
      timestamp: '2025-02-05 18:00:30',
      
    }
  ];

 
  
}
