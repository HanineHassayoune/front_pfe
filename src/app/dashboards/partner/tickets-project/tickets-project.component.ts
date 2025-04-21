import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOneBtnComponent } from '../../../components/table-one-btn/table-one-btn.component';

@Component({
  selector: 'app-tickets-project',
  standalone: true,
  imports: [CommonModule, TableOneBtnComponent],
  templateUrl: './tickets-project.component.html'
})
export class TicketsProjectComponent {
  @Input() columns: any[] = [];
  @Input() rows: any[] = [];
  @Output() ticketClick = new EventEmitter<any>();

  onTicketClick(ticket: any) {
    this.ticketClick.emit(ticket);
  }

  goToTicketDetails(ticket: any): void {
    console.log('Ticket details:', ticket);
    
  }
  
}
