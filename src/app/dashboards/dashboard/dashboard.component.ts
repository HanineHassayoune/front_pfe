import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NavbarDashboardComponent } from '../../components/navbar-dashboard/navbar-dashboard.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarDashboardComponent, SidebarComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  role: string | null = null;
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' | 'info' | 'dark' = 'info';
  links: { name: string; href: string; iconPath: string; action?: () => void }[] = [];

  user: any = { name: '', email: '', profileImage: '' };

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.setLinksByRole();
    this.loadUserProfile();
  }

  setLinksByRole(): void {
    const basePath = this.role?.toLowerCase();

    function makeLink(
      name: string,
      href: string,
      iconPath: string,
      action?: () => void
    ): { name: string; href: string; iconPath: string; action?: () => void } {
      return { name, href, iconPath, action };
    }
    

    switch (this.role) {
      case 'ADMIN':
        this.links = [
          makeLink(
            'Partners',
            '/admin/partners',
            'M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z'
          ),
          makeLink(
            'Profile',
            '/admin/profil',
            'M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
          ),
          makeLink(
            'Logout',
            '/admin/logout',
            'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
            () => this.logout()
          )
        ];
        break;
      case 'TESTER':
        this.links = [
          makeLink(
            'Notifications',
            '/tester/notifications',
            'M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z'
          ),
          makeLink(
            'Add ticket',
            '/tester/addticket',
            'M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z'
          ),
          makeLink(
            'Solutions',
            '/tester/solutions',
            'M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z'
          ),
          makeLink(
            'Profile',
            '/tester/profil',
            'M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
          ),
          makeLink(
            'Logout',
            '/tester/logout',
            'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
            () => this.logout()
          )
        ];
        break;
      case 'DEVELOPER':
        this.links = [
           makeLink(
            'Projects',
            '/developer/projects',
            'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z'
          ),
          makeLink(
            'Profile',
            '/developer/profil',
            'M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
          ),
          makeLink(
            'Logout',
            '/developer/logout',
            'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
            () => this.logout()
          )
          
        ];
        break;
      case 'PARTNER':
        this.links = [
          makeLink(
            'Projects',
            '/partner/projects',
            'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z'
          ),
          makeLink(
            'Users',
            '/partner/users',
            'M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z'
          ),
          makeLink(
            'Profile',
            '/partner/profil',
            'M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
          ),
          makeLink(
            'Logout',
            '/manager/logout',
            'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
            () => this.logout()
          )
        ];
        break;
      case 'MANAGER':
        this.links = [
          makeLink(
            'Profile',
            '/manager/profil',
            'M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
          ),
          makeLink(
            'Projects',
            '/manager/projects',
            'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z'
          ),
          makeLink(
            'Logout',
            '/manager/logout',
            'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
            () => this.logout()
          )
        ];
        break;
      default:
        this.links = [];
    }

  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Logout error', err)
    });
  }

  loadUserProfile(): void {
    this.userService.getConnectedUser().subscribe({
      next: (res) => {
        this.user = res; 
      },
      error: (err) => {
        this.alertType = 'danger';
        this.alertMessage = 'Error loading profile..';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    });
  }
}
