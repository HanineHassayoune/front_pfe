import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOneBtnComponent } from '../../../components/table-one-btn/table-one-btn.component';
import { ActivatedRoute } from '@angular/router';
import { KinbanComponent } from '../../../components/kinban/kinban.component';

@Component({
  selector: 'app-tickets-dev',
  standalone: true,
  imports: [TableOneBtnComponent,CommonModule,KinbanComponent],
  templateUrl: './tickets-dev.component.html',
  styleUrl: './tickets-dev.component.css'
})
export class TicketsDevComponent {
  column1Title: string = 'To Do';
  column2Title: string = 'In Progress';
  column3Title: string = 'Done';
  column1Data: string[] = ['Tâche 1', 'Tâche 2'];
  column2Data: string[] = ['Tâche 3', 'Tâche 4'];
  column3Data: string[] = ['Tâche 5', 'Tâche 6'];

  projectId: number;
  
    constructor(private route: ActivatedRoute) {
      this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    }
  
  title = 'List of tickets';
  
  columns = [
    { field: 'ticketName', header: 'Nom du Ticket' },
    { field: 'deadline', header: 'Deadline' },
    { field: 'developer', header: 'Développeur' },
    { field: 'status', header: 'Status' },
    { field: 'team', header: 'Équipe' } 
  ];

  data = [
    { ticketName: 'Bug #123', deadline: '2025-02-10', developer: 'Alice', status: 'To Do', team: 'Back-End' },
    { ticketName: 'Feature XYZ', deadline: '2025-02-12', developer: 'Alice', status: 'In Progress', team: 'Back-End' },
    { ticketName: 'Hotfix #456', deadline: '2025-02-08', developer: 'Alice', status: 'Done', team: 'Back-End' }
  ];

 //Modal 
 isModalOpen = false;

 openModal(): void {
   console.log('Modal open triggered');
   this.isModalOpen = true;
 }

 closeModal(): void {
   this.isModalOpen = false;
 }
 
 submitSolution() {
  //console.log("Solution submitted:", this.form.value.solution);
  console.log("Solution submitted:");
  this.closeModal(); // Ferme le modal après la soumission
}


}
