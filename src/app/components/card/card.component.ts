import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  tickets = [
    { title: 'Bug #123', description: 'Problème avec l\'authentification', deadline: '2025-02-10' },
    { title: 'Feature XYZ', description: 'Ajout de la fonctionnalité paiement', deadline: '2025-02-12' },
    { title: 'Hotfix #456', description: 'Correction critique pour la prod', deadline: '2025-02-08' }
  ];

  viewDetails(ticket: any) {
    alert(`Détails du ticket : ${ticket.title}`);
  }
}
