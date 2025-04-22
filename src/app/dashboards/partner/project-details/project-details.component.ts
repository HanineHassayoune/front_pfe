import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableOneBtnComponent } from '../../../components/table-one-btn/table-one-btn.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DescriptionComponent } from '../description/description.component';
import { TicketsProjectComponent } from '../tickets-project/tickets-project.component';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [TableOneBtnComponent, CommonModule, ModalComponent,MatIcon,MatTabsModule,DescriptionComponent,TicketsProjectComponent,TeamComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent  {

 
}
