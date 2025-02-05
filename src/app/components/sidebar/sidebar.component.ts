import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarVisible: boolean = true; // Contrôler la visibilité du sidebar

  // Fonction pour afficher/masquer le sidebar
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

}
