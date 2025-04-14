import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../../components/navbar-dashboard/navbar-dashboard.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-developpeur',
  standalone: true,
  imports: [NavbarDashboardComponent,SidebarComponent,RouterModule],
  templateUrl: './dashboard-developpeur.component.html',
  styleUrl: './dashboard-developpeur.component.css'
})
export class DashboardDeveloppeurComponent {
  links = [
    {
      name: 'Tickets',
      href: '/developper/ticketsdev',
      iconPath: 'M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z',
    },
    {
      name: 'Logout',
      href: '',
      iconPath: 'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
      action: () => this.logout()  
    },
      
  ]
   constructor(private authService: AuthService, private router: Router) {}
  
    logout(): void {
      console.log("Méthode logout() appelée !");
      this.authService.logout().subscribe({
        next: () => {
          console.log("Redirection après logout");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error("Erreur lors du logout :", err);
        }
      });
    }

}
