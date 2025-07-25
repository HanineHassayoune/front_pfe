import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService, Ticket } from '../../../services/ticket.service';
import { DetailsComponent } from '../details/details.component';
import { SolutionComponent } from '../solution/solution.component';
import { CommentsComponent } from '../comments/comments.component';
import { UserService } from '../../../services/user.service';
import { TicketCarouselComponent } from '../ticket-carousel/ticket-carousel.component';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailsComponent, SolutionComponent, CommentsComponent,TicketCarouselComponent],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent implements OnInit {
  ticketId!: string;
  ticket!: Ticket;
  connectedUserId!: number;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
 
  ) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('ticketId');
    if (id) {
      this.ticketService.getTicketById(id).subscribe({
        next: (ticket) => {
          this.ticket = ticket;
          this.connectedUserId = ticket.assignedUserId;
          console.log('Nouveau ticket chargé:', this.ticket);
        },
        error: (err) => console.error('Erreur', err)
      });
    }
  });
}


}


