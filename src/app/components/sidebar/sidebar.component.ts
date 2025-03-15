import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarVisible: boolean = true; // Contrôler la visibilité du sidebar

  // Fonction pour afficher/masquer le sidebar
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  @Input() links: { name: string; href: string; iconPath: string }[] = [];
  @Input() userAvatarUrl: string = '';  
  @Input() userName: string = '';
  

  
}
