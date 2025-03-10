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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PartnersComponent } from './dashboards/dashboard-systeme/partners/partners.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashbordComponent } from './dashboards/dashboard-admin/dashbord/dashbord.component';



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
    {path:'login',component:LoginComponent},
    {path:'forgot-password',component:ForgotPasswordComponent},
    {path:'register',component:RegisterComponent},
    {path:'partners',component:PartnersComponent},
    {path:'reset-password',component:ResetPasswordComponent},
  
    



];


