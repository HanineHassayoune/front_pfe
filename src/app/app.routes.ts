import { Routes } from '@angular/router';
import { NavbarDashboardComponent } from './components/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ExceptionsComponent } from './dashboards/exceptions/exceptions.component';
import { TicketsComponent } from './dashboards/tickets/tickets.component';
import { CompteComponent } from './dashboards/compte/compte.component';

export const routes: Routes = [
    {path:'navbar',component:NavbarDashboardComponent},
    {path:'footer',component:FooterDashboardComponent},
    {path:'sidebar',component:SidebarComponent},
    {path:'exceptions',component:ExceptionsComponent},
    {path:'tickets',component:TicketsComponent},
    {path:'compte',component:CompteComponent},


];


