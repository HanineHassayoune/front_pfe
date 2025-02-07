import { Component } from '@angular/core';
import { KinbanComponent } from '../../components/kinban/kinban.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [KinbanComponent,CommonModule],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {
  column1Title: string = 'To do';
  column2Title: string = 'in progress';
  column3Title: string = 'Done';
  column1Data: string[] = ['Tâche 1', 'Tâche 2'];
  column2Data: string[] = ['Tâche 3', 'Tâche 4'];
  column3Data: string[] = ['Tâche 5', 'Tâche 6'];
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitTicket() {
    alert('Le ticket a été soumis avec succès !');
    this.closeModal();
  }

}
