import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../../components/navbar-dashboard/navbar-dashboard.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { PartnersComponent } from '../partners/partners.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [NavbarDashboardComponent,SidebarComponent,RouterModule,PartnersComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  links = [
    {
      name: 'Partners',
      href: '/admin/partners',
      iconPath: 'M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z',
    },
    {
      name: 'Profile',
      href: '/admin/profil',
      iconPath: 'M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
    },
    {
      name: 'Logout',
      href: '/partner/logout',
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
