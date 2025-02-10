import { Routes } from '@angular/router';
import { NavbarDashboardComponent } from './components/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ExceptionsComponent } from './dashboards/dashboard-admin/exceptions/exceptions.component';
import { TicketsComponent } from './dashboards/dashboard-admin/tickets/tickets.component';
import { CompteComponent } from './dashboards/dashboard-admin/compte/compte.component';
import { CardComponent } from './components/card/card.component';
import { AddTicketComponent } from './dashboards/dashboard-testeur/add-ticket/add-ticket.component';
import { UsersComponent } from './dashboards/dashboard-admin/users/users.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { RadialChartComponent } from './components/radial-chart/radial-chart.component';
import { NotificationsComponent } from './dashboards/dashboard-testeur/notifications/notifications.component';
import { TicketsDevComponent } from './dashboards/dashboard-developpeur/tickets-dev/tickets-dev.component';


export const routes: Routes = [
    {path:'navbar',component:NavbarDashboardComponent},
    {path:'footer',component:FooterDashboardComponent},
    {path:'sidebar',component:SidebarComponent},
    {path:'exceptions',component:ExceptionsComponent},
    {path:'tickets',component:TicketsComponent},
    {path:'compte',component:CompteComponent},
    {path:'card',component:CardComponent},
    {path:'addticket',component:AddTicketComponent},
    {path:'users',component:UsersComponent},
    {path:'pieChart',component:PieChartComponent},
    {path:'radialChart',component:RadialChartComponent},
    {path:'notifications',component:NotificationsComponent},
    {path:'ticketsdev',component:TicketsDevComponent},
    



];


