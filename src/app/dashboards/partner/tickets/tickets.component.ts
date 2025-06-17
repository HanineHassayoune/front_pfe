import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket, TicketService } from '../../../services/ticket.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTicketDialogComponent } from '../../add-ticket-dialog/add-ticket-dialog.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, DragDropModule, AlertComponent,FormsModule,MatDialogModule],
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
      { id: 'TO_DO', name: 'To Do', tasks: [] as Ticket[] },
      { id: 'IN_PROGRESS', name: 'In Progress', tasks: [] as Ticket[] },
      { id: 'RESOLVED', name: 'Resolved', tasks: [] as Ticket[] },
      { id: 'MERGING', name: 'Merging', tasks: [] as Ticket[] },
      { id: 'VERIFIED', name: 'Verified', tasks: [] as Ticket[] },
      { id: 'DONE', name: 'Done', tasks: [] as Ticket[] }
    ]
  };
searchTerm: string = '';

  // variable pour garder tous les tickets en cache
  allTickets: Ticket[] = [];
  assignedUserNames: Record<number, string> = {}; // key = userId, value = name

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
  this.role = localStorage.getItem('role')?.toUpperCase() || '';
  this.connectedDropLists = this.board.columns.map(c => c.id);
  this.projectId = this.route.snapshot.paramMap.get('id') || '';

  const projectIdNum = Number(this.projectId);

  this.ticketService.getTicketsByProjectId(projectIdNum).subscribe({
    next: (tickets) => {
      console.log('Tickets reçus:', tickets);
      this.allTickets = tickets;
      this.categorizeTickets(tickets);
    },
    error: (err) => {
      console.error('Erreur lors du chargement des tickets', err);
    }
  });
}

 openAddTicketDialog(): void {
  const dialogRef = this.dialog.open(AddTicketDialogComponent, {
    data: { projectId: this.projectId },
    width: '600px',
    disableClose: false
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Ticket created:', result);
      this.refreshTickets();
    }
  });
}

refreshTickets(): void {
    // Logique pour recharger les tickets
    // Par exemple : this.loadTickets();
  }

 onSearchChange() {
  const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    this.categorizeTickets(this.allTickets);
  } else {
    const filteredTickets = this.allTickets.filter(ticket =>
      (ticket.category && ticket.category.toLowerCase().includes(term)) ||
      (this.assignedUserNames[ticket.assignedUserId]?.toLowerCase().includes(term))
    );

    this.categorizeTickets(filteredTickets);
  }
}

  categorizeTickets(tickets: Ticket[]) {
    for (let column of this.board.columns) {
      column.tasks = tickets.filter(t => t.status === column.id);

      // Charger les utilisateurs assignés
      column.tasks.forEach(ticket => {
        if (ticket.assignedUserId && !this.assignedUserNames[ticket.assignedUserId]) {
          this.userService.getUserById(ticket.assignedUserId).subscribe({
            next: user => {
              this.assignedUserNames[ticket.assignedUserId!] = user.name;
            },
            error: () => {
              this.assignedUserNames[ticket.assignedUserId!] = 'Unknown User';
            }
          });
        }
      });
    }
  }

get areAllColumnsEmpty(): boolean {
  return this.board.columns.every(col => col.tasks.length === 0);
}


  drop(event: CdkDragDrop<Ticket[]>) {
    const sourceColumnId = event.previousContainer.id;
    const targetColumnId = event.container.id;

    if (sourceColumnId === targetColumnId) return;

    const allowedTransitions: Record<string, { from: string; to: string }[]> = {
      DEVELOPER: [
        { from: 'TO_DO', to: 'IN_PROGRESS' },
        { from: 'IN_PROGRESS', to: 'TO_DO' },
        { from: 'IN_PROGRESS', to: 'RESOLVED'},
        { from: 'RESOLVED', to: 'IN_PROGRESS'},
      
      ],
      MANAGER: [
        { from: 'RESOLVED', to: 'MERGING' },
        { from: 'MERGING', to: 'RESOLVED' },
        { from: 'VERIFIED', to: 'DONE' },
        { from: 'DONE', to: 'VERIFIED' },
       
      ],
      TESTER: [
       { from: 'MERGING', to: 'VERIFIED' },
       { from: 'VERIFIED', to: 'MERGING' }
      ]
     
    };

    const userRole = this.role.toUpperCase();
    const allowed = allowedTransitions[userRole] || [];

    const isAllowed = allowed.some(transition =>
      transition.from === sourceColumnId && transition.to === targetColumnId
    );

    if (!isAllowed) {
      this.alertType = 'warning';
      this.alertMessage = "You don't have permission to move this ticket to the selected column.";
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 4000);
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
