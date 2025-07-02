import { Component, Input } from '@angular/core';
import { Ticket, TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-carousel.component.html',
  styleUrl: './ticket-carousel.component.css'
})
export class TicketCarouselComponent {

 @Input() ticketId!: number;

  currentSlide = 0;



constructor(private ticketService: TicketService,private router: Router) {};

  @Input() tickets: any[] = [];

  currentIndex = 0;
  visibleCount = 4; // 4 tickets visibles
  itemWidth = 316; // 300px + 2*8px margin (Tailwind mx-2)

  next() {
    if (this.currentIndex + this.visibleCount < this.tickets.length) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

ngOnInit() {
  if (this.ticketId) {
    this.ticketService.getRelatedTickets(this.ticketId).subscribe(tickets => {
      this.tickets = tickets.filter(t => t.id !== this.ticketId);
    });
  }
}

 openTicketDetails(ticket: Ticket) {
    const role = localStorage.getItem('role')?.toLowerCase();
    if (role) {
      this.router.navigate([`/${role}/projects/${ticket.projectId}/tickets/${ticket.id}`]);
       window.scrollTo({ top: 0, behavior: 'smooth' });
       
    } else {
      alert('Rôle non défini. Vous devez être connecté pour accéder à cette page.');
    }
  }
}


