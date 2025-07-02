import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private userService: UserService) {}
  isSidebarVisible: boolean = true; // Controler la visibilité du sidebar

  // Fonction pour afficher/masquer le sidebar
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  @Input() links: { name: string; href: string; iconPath: string; action?: () => void }[] = [];
  @Input() userAvatarUrl: string = '';  
  @Input() userName: string = '';
  user: any;

  handleClick(link: any): void {
    if (link.action) {
      console.log("Action déclenchée :", link.name);
      link.action();
    }
  }

  //BehaviorSubject
    ngOnInit(): void {
    // Se mettre à jour à chaque changement
    this.userService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.userAvatarUrl = user.profileImage || 'assets/images/default-user.jpg';
        this.userName = user.name;
      }
    });

    // Initialiser depuis le backend au démarrage
    this.userService.getConnectedUser().subscribe(u => {
      if (u) this.userService['userSubject'].next(u); // déclenche une mise à jour globale
    });
  }

}
