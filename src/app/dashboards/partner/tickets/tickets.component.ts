import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { RadialChartComponent } from '../../../components/radial-chart/radial-chart.component';


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TableComponent,RadialChartComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  title = 'Liste des Tickets';
  
  columns = [
    { field: 'ticketName', header: 'Nom du Ticket' },
    { field: 'deadline', header: 'Deadline' },
    { field: 'developer', header: 'Développeur' },
    { field: 'status', header: 'Status' },
    { field: 'team', header: 'Équipe' } 
  ];

  data = [
    { ticketName: 'Bug #123', deadline: '2025-02-10', developer: 'Alice', status: 'To Do', team: 'Front-End' },
    { ticketName: 'Feature XYZ', deadline: '2025-02-12', developer: 'Bob', status: 'In Progress', team: 'Back-End' },
    { ticketName: 'Hotfix #456', deadline: '2025-02-08', developer: 'Charlie', status: 'Done', team: 'DevOps' }
  ];

}
