import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../components/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from '../../components/footer-dashboard/footer-dashboard.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardComponent } from '../../components/card/card.component';
import { TableComponent } from '../../components/table/table.component';
import { ExceptionsComponent } from '../exceptions/exceptions.component';
import { TicketsComponent } from '../tickets/tickets.component';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [NavbarDashboardComponent,FooterDashboardComponent,SidebarComponent,CardComponent,TableComponent,ExceptionsComponent,TicketsComponent,AddTicketComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

}
