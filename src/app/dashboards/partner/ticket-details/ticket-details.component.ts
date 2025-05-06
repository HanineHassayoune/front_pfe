import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { SolutionComponent } from '../solution/solution.component';
import { Ticket, TicketService } from '../../../services/ticket.service';


@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailsComponent, SolutionComponent],
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


 /*  status = 'In Progress';
  priority = 'High';
  tasks = ['Fix alignment issue', 'Update user permissions', 'Deploy to staging'];
  imageUrl = 'https://media.istockphoto.com/id/1303877287/vector/paper-checklist-and-pencil-flat-pictogram.jpg';
  category = 'Bug';

  ticketTitle = 'Fix login bug';
  solutionText = 'Use FormBuilder to simplify reactive forms.';
  description = 'Suggests using Angular FormBuilder for better reactive forms.';
  technologies = 'Angular, TypeScript';
  referenceLink = 'https://angular.io/guide/reactive-forms';
  author = 'Hanin 😎';
  datePosted = 'April 22, 2025';

 

  similarSolutions = [
    { title: 'Use FormArray for dynamic forms', link: '/solutions/1' },
    { title: 'Optimize reactive form validation', link: '/solutions/2' }
  ]; */
