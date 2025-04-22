import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NavbarDashboardComponent } from '../../../components/navbar-dashboard/navbar-dashboard.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-manager',
  standalone: true,
  imports: [NavbarDashboardComponent,SidebarComponent,RouterModule],
  templateUrl: './dashboard-manager.component.html',
  styleUrl: './dashboard-manager.component.css'
})
export class DashboardManagerComponent {
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
        name: 'Profile',
        href: '/manager/profil',
        iconPath: 'M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
      },
      {
        name: 'Projects',
        href: '/manager/manager-projects',
        iconPath: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z',
      }, 
      {
        name: 'Logout',
        href: '/manager/logout',
        iconPath: 'M16 17L21 12L16 7V10H9V14H16V17ZM5 19H11V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H11V5H5V19Z',
          action: () => this.logout()  
         },
        
       ];
       constructor(private authService: AuthService, private router: Router,private userService: UserService) {}
     
       logout(): void {
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
