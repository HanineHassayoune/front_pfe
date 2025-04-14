import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent implements OnInit {
  ticketId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.ticketId = this.route.snapshot.paramMap.get('id')!;
    console.log('Ticket ID:', this.ticketId);
  }

  ticket = {
    title: 'Null Pointer Exception',
    description: 'Occurs when trying to access a null object in the application.',
    priority: 'High',
    status: 'Open',
  };

  solutions = [
    {
      user: 'Alice Johnson',
      content: 'Ensure that the object is properly initialized before accessing it.',
    },
    {
      user: 'Bob Smith',
      content: 'Consider using Optional or null checks to handle potential null values.',
    },
  ];

  voteSolution(solution: any) {
    alert(`Upvoted solution by: ${solution.user}`);
  }
}
