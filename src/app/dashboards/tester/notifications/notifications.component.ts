import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  columns = [
    { field: 'exceptionName', header: 'Nom d\'Exception' },
    { field: 'exceptionType', header: 'Type d\'Exception' },
    { field: 'date', header: 'Date de l\'Occurrence' },
    { field: 'severity', header: 'Gravité' },
    { field: 'description', header: 'Description' },
  ];

  rows = [
    {
      exceptionName: 'NullPointerException',
      exceptionType: 'Runtime Exception',
      date: '2023-12-05',
      severity: 'Critique',
      description: 'Tentative de déréférencement d\'un objet nul.',
    },
    {
      exceptionName: 'IndexOutOfBoundsException',
      exceptionType: 'Runtime Exception',
      date: '2023-11-10',
      severity: 'Moyenne',
      description: 'Index hors des limites de la liste.',
    },
    {
      exceptionName: 'IOException',
      exceptionType: 'Checked Exception',
      date: '2023-12-15',
      severity: 'Élevée',
      description: 'Erreur lors de l\'accès à une ressource IO.',
    },
    {
      exceptionName: 'ArithmeticException',
      exceptionType: 'Runtime Exception',
      date: '2023-12-20',
      severity: 'Faible',
      description: 'Division par zéro détectée.',
    },
  ];
}
