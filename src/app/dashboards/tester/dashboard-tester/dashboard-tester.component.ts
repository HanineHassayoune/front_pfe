import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../../components/navbar-dashboard/navbar-dashboard.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-tester',
  standalone: true,
  imports: [NavbarDashboardComponent,SidebarComponent,RouterModule],
  templateUrl: './dashboard-tester.component.html',
  styleUrl: './dashboard-tester.component.css'
})
export class DashboardTesterComponent {
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

    
  ]


}
