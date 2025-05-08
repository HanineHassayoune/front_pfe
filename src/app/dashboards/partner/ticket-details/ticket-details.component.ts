import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { SolutionComponent } from '../solution/solution.component';
import { Ticket, TicketService } from '../../../services/ticket.service';
import { CommentsComponent } from '../comments/comments.component';


@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailsComponent, SolutionComponent,CommentsComponent],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent implements OnInit {
  ticketId!: string;
  ticket!: Ticket;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('ticketId');
  if (id) {
    this.ticketService.getTicketById(id).subscribe({
      next: (ticket) => this.ticket = ticket,
      error: (err) => console.error('Erreur', err)
    });
  }
}

}

