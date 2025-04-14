import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../../components/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from '../../../components/footer-dashboard/footer-dashboard.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import {Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-dashboard-partner',
  standalone: true,
  imports: [NavbarDashboardComponent,FooterDashboardComponent,SidebarComponent,RouterModule],
  templateUrl: './dashboard-partner.component.html',
  styleUrl: './dashboard-partner.component.css'
})
export class DashboardPartnerComponent {
  links = [
    /* {
      name: 'Exceptions',
      href: '/partner/exceptions',
      iconPath: 'M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd',
    }, */
   /*  {
      name: 'Tickets',
      href: '/partner/tickets',
      iconPath: 'M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z',
    }, */
    {
      name: 'Users',
      href: '/partner/users',
      iconPath: 'M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z',
    },
    {
      name: 'Projects',
      href: '/partner/projects',
      iconPath: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z',
    },  
    /* {
      name: 'Compte',
      href: '/partner/compte',
      iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z',
    }, */
    {
      name: 'Logout',
      href: '',
      iconPath: 'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
      action: () => this.logout()  
    },
  ];
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
