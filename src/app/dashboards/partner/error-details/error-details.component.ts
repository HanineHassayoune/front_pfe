import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TicketComponent } from '../ticket/ticket.component';
import { SolutionComponent } from '../solution/solution.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-error-details',
  standalone: true,
  imports: [CommonModule,MatTabsModule,TicketComponent,SolutionComponent,DetailsComponent],
  templateUrl: './error-details.component.html',
  styleUrl: './error-details.component.css'
})
export class ErrorDetailsComponent {
  error: any;

  constructor(private route: ActivatedRoute) {
    this.error = history.state?.error;
    if (!this.error) {
      const id = this.route.snapshot.paramMap.get('id');
      
    }
  }
  
}