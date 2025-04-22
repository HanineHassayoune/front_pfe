import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../../components/navbar-dashboard/navbar-dashboard.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard-tester',
  standalone: true,
  imports: [NavbarDashboardComponent,SidebarComponent,RouterModule],
  templateUrl: './dashboard-tester.component.html',
  styleUrl: './dashboard-tester.component.css'
})
export class DashboardTesterComponent {
  user: any = { name: '', email: '', profileImage: '' };
  currentPassword: string = '';
  newPassword: string = '';
  confirmationPassword: string = '';
  selectedImage: File | null = null;
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' | 'info' | 'dark' = 'info';
  links = [
    {
      name: 'Notifications',
      href: '/tester/notifications',
      iconPath: 'M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z',
    },
    {
      name: 'Add ticket',
      href: '/tester/addticket',
      iconPath: 'M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z',
    },
    {
      name: 'Solutions',
      href: '/tester/solutions',
      iconPath: 'M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z',
    },
    {
      name: 'Profile',
      href: '/tester/profil',
      iconPath: 'M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
    },
    {
      name: 'Logout',
      href: '',
      iconPath: 'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
      action: () => this.logout()  
    },

    
  ]
constructor(private authService: AuthService, private router: Router,private userService: UserService) {}

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
  ngOnInit(): void {
    this.loadUserProfile();
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
