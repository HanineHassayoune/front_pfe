import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket, TicketService } from '../../../services/ticket.service';
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, DragDropModule, AlertComponent],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  projectId: string = '';
  connectedDropLists: string[] = [];
  isLoading: boolean = false;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;
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

  drop(event: CdkDragDrop<Ticket[]>) {
    const sourceColumnId = event.previousContainer.id;
    const targetColumnId = event.container.id;

    if (sourceColumnId === targetColumnId) return;

    const allowedTransitions: Record<string, { from: string; to: string }[]> = {
      DEVELOPER: [
        { from: 'pending', to: 'resolved' },
        { from: 'resolved', to: 'pending' }
      ],
      TESTER: [
        { from: 'resolved', to: 'verified' },
        { from: 'verified', to: 'resolved' }
      ],
      MANAGER: [
        { from: 'verified', to: 'merging' },
        { from: 'merging', to: 'verified' }
      ]
    };

    const userRole = this.role.toUpperCase();
    const allowed = allowedTransitions[userRole] || [];

    const isAllowed = allowed.some(transition =>
      transition.from === sourceColumnId && transition.to === targetColumnId
    );

    if (!isAllowed) {
      this.alertType = 'danger';
      this.alertMessage = "You don't have permission to move this ticket to the selected column.";
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 3000);
      return;
    }

    const prevData = event.previousContainer.data;
    const currData = event.container.data;

    const [movedItem] = prevData.splice(event.previousIndex, 1);
    currData.splice(event.currentIndex, 0, movedItem);

    this.ticketService.updateTicketStatus(movedItem.id, targetColumnId.toUpperCase()).subscribe({
      next: () => console.log('Status updated successfully'),
      error: err => console.error('Failed to update status', err)
    });
  }

  openTicketDetails(ticket: Ticket) {
    const role = localStorage.getItem('role')?.toLowerCase();

    if (role) {
      this.router.navigate([`/${role}/projects/${this.projectId}/tickets/${ticket.id}`]);
    } else {
      alert('Rôle non défini. Vous devez être connecté pour accéder à cette page.');
    }
  }
}
