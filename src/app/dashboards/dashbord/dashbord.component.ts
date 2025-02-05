import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../components/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from '../../components/footer-dashboard/footer-dashboard.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardComponent } from '../../components/card/card.component';
import { TableComponent } from '../../components/table/table.component';
import { ExceptionsComponent } from '../exceptions/exceptions.component';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [NavbarDashboardComponent,FooterDashboardComponent,SidebarComponent,CardComponent,TableComponent,ExceptionsComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

}
