import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.css'
})
export class NavbarDashboardComponent {

  /* @Input() title?: string; */
  @Input() imageUrl?: string;
  @Input() userName?: string;
  @Input() userAvatarUrl?: string;

  showNotifications = false;
notifications: string[] = [
  "Nouveau message reçu",
  "Erreur dans le système de logs",
  "Nouvelle tâche assignée"
];

toggleNotifications() {
  this.showNotifications = !this.showNotifications;
}

}
