import { Routes } from '@angular/router';
import { NavbarDashboardComponent } from './components/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ExceptionsComponent } from './dashboards/partner/exceptions/exceptions.component';
import { TicketsComponent } from './dashboards/partner/tickets/tickets.component';
import { CompteComponent } from './dashboards/partner/compte/compte.component';
import { CardComponent } from './components/card/card.component';
import { AddTicketComponent } from './dashboards/tester/add-ticket/add-ticket.component';
import { UsersComponent } from './dashboards/partner/users/users.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { RadialChartComponent } from './components/radial-chart/radial-chart.component';
import { NotificationsComponent } from './dashboards/tester/notifications/notifications.component';
import { TicketsDevComponent } from './dashboards/developper/tickets-dev/tickets-dev.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PartnersComponent } from './dashboards/admin/partners/partners.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardAdminComponent } from './dashboards/admin/dashboard-admin/dashboard-admin.component';
import { DashboardTesterComponent } from './dashboards/tester/dashboard-tester/dashboard-tester.component';
import { DashboardDeveloppeurComponent } from './dashboards/developper/dashboard-developpeur/dashboard-developpeur.component';
import { DashboardPartnerComponent } from './dashboards/partner/dashboard-partner/dashboard-partner.component';



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
    { path: 'login', component: LoginComponent },

    {
        path: 'admin',
        component: DashboardAdminComponent, 
        data: { role: 'admin' },
        children: [
          { path: 'partners', component: PartnersComponent } 
        ]
    },
    { 
      path: 'tester', 
      component: DashboardTesterComponent, 
      data: { role: 'tester' },
      children: [
        {path:'addticket',component:AddTicketComponent},
        {path:'notifications',component:NotificationsComponent},
      ]
    },
    { 
      path: 'developper', 
      component:DashboardDeveloppeurComponent,
      data: { role: 'developper' },
      children: [
        {path:'ticketsdev',component:TicketsDevComponent},
      
       
      ]
    },
    { 
      path: 'partner', 
      component:DashboardPartnerComponent,
      data: { role: 'partner' },
      children: [
        {path:'compte',component:CompteComponent},
        {path:'exceptions',component:ExceptionsComponent},
        {path:'tickets',component:TicketsComponent},
        {path:'users',component:UsersComponent},
        
       
      ]
    },
  
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
  
];


