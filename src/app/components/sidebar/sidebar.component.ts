import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarVisible: boolean = true; // Contrôler la visibilité du sidebar

  // Fonction pour afficher/masquer le sidebar
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  //@Input() links: { name: string; href: string; iconPath: string }[] = [];
  @Input() links: { name: string; href: string; iconPath: string; action?: () => void }[] = [];
  @Input() userAvatarUrl: string = '';  
  @Input() userName: string = '';
 

  handleClick(link: any): void {
    if (link.action) {
      console.log("Action déclenchée :", link.name);
      link.action();
    }
  }

  
}
