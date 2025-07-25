import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DescriptionComponent } from '../description/description.component';
import { TeamComponent } from '../team/team.component';
import { TicketsComponent } from '../tickets/tickets.component';


@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule,MatIcon,MatTabsModule,DescriptionComponent,TicketsComponent,TeamComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent  {

 
}
