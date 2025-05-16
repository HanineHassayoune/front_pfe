import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket, TicketService } from '../../../services/ticket.service';
@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit {
  projectId: string = '';
  connectedDropLists: string[] = [];
  role: string = '';
  board = {
    columns: [
      { id: 'pending', name: 'Pending', tasks: [] as Ticket[] },
      { id: 'resolved', name: 'Resolved', tasks: [] as Ticket[] },
      { id: 'verified', name: 'Verified', tasks: [] as Ticket[] },
      { id: 'merging', name: 'Merging', tasks: [] as Ticket[] }
    ]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
  this.role = localStorage.getItem('role')?.toUpperCase() || '';
  this.connectedDropLists = this.board.columns.map(c => c.id);
  this.projectId = this.route.snapshot.paramMap.get('id') || '';

  const projectIdNum = Number(this.projectId);

  const ticketRequest = (this.role === 'MANAGER' || this.role === 'PARTNER')
    ? this.ticketService.getTicketsByProjectId(projectIdNum)
    : this.ticketService.getMyTicketsByProjectId(projectIdNum);

  ticketRequest.subscribe({
    next: (tickets) => {
      this.categorizeTickets(tickets);
    },
    error: (err) => {
      console.error('Erreur lors du chargement des tickets', err);
    }
  });
}

  categorizeTickets(tickets: Ticket[]) {
    for (let column of this.board.columns) {
      column.tasks = tickets.filter(t => t.status.toLowerCase() === column.name.toLowerCase());
    }
  }

  drop(event: any) {
    const previousContainer = event.previousContainer;
    const container = event.container;

    if (previousContainer === container) return;

    const prevData = previousContainer.data;
    const currData = container.data;

    const [movedItem] = prevData.splice(event.previousIndex, 1);
    currData.splice(event.currentIndex, 0, movedItem);
  }

  openTicketDetails(ticket: Ticket) {
    const role = localStorage.getItem('role')?.toLowerCase(); 

    if (role) {
      // Utiliser le rôle pour déterminer le chemin de navigation
      this.router.navigate([`/${role}/projects/${this.projectId}/tickets/${ticket.id}`]);
    } else {
      alert('Rôle non défini. Vous devez être connecté pour accéder à cette page.');
    }
  }
}
