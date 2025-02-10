import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../../components/navbar-dashboard/navbar-dashboard.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-developpeur',
  standalone: true,
  imports: [NavbarDashboardComponent,SidebarComponent],
  templateUrl: './dashboard-developpeur.component.html',
  styleUrl: './dashboard-developpeur.component.css'
})
export class DashboardDeveloppeurComponent {
  links = [
    {
      name: 'Tickets',
      href: 'ticketsdev',
      iconPath: 'M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z',
    },
      
  ]

}
