import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';

@Component({
  selector: 'app-tickets-dev',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './tickets-dev.component.html',
  styleUrl: './tickets-dev.component.css'
})
export class TicketsDevComponent {
  title = 'Liste des Tickets';
  
  columns = [
    { field: 'ticketName', header: 'Nom du Ticket' },
    { field: 'deadline', header: 'Deadline' },
    { field: 'developer', header: 'Développeur' },
    { field: 'status', header: 'Status' },
    { field: 'team', header: 'Équipe' } 
  ];

  data = [
    { ticketName: 'Bug #123', deadline: '2025-02-10', developer: 'Alice', status: 'To Do', team: 'Back-End' },
    { ticketName: 'Feature XYZ', deadline: '2025-02-12', developer: 'Alice', status: 'In Progress', team: 'Back-End' },
    { ticketName: 'Hotfix #456', deadline: '2025-02-08', developer: 'Alice', status: 'Done', team: 'Back-End' }
  ];

}
