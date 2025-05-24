import { Component } from '@angular/core';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  selector: 'app-microservice-details',
  standalone: true,
  imports: [TicketsComponent],
  templateUrl: './microservice-details.component.html',
  styleUrl: './microservice-details.component.css'
})
export class MicroserviceDetailsComponent {

}
