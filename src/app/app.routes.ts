import { Routes } from '@angular/router';
import { NavbarDashboardComponent } from './components/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
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
import { authGuard } from './services/auth.guard';
import { ProjectsComponent } from './dashboards/partner/projects/projects.component';
import { ProjectDetailsComponent } from './dashboards/partner/project-details/project-details.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { DashboardManagerComponent } from './dashboards/manager/dashboard-manager/dashboard-manager.component';
import { ErrorDetailsComponent } from './dashboards/partner/error-details/error-details.component';
import { ManagerProjectsComponent } from './dashboards/manager/manager-projects/manager-projects.component';
import { PendingRegisterComponent } from './pending-register/pending-register.component';


export const routes: Routes = [
   {path:'navbar',component:NavbarDashboardComponent},
    {path:'footer',component:FooterDashboardComponent},
    {path:'sidebar',component:SidebarComponent},
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
    {path:'projects',component:ProjectsComponent},
    { path: 'projects/:id', component: ProjectDetailsComponent } ,
    { path: 'profil', component: ProfilComponent } ,
    {path: 'table-pagination', component:TablePaginationComponent},
    { path: 'manager-projects', component: ManagerProjectsComponent },
    { path: 'pending-register', component: PendingRegisterComponent},
   
    {
      path: 'admin',
      component: DashboardAdminComponent, 
      canActivate: [authGuard], 
      data: { role: 'ADMIN' },
      children: [
        { path: 'partners', component: PartnersComponent } ,
        { path: 'profil', component: ProfilComponent } ,
        

      ]
    },
    { 
      path: 'tester', 
      component: DashboardTesterComponent, 
      canActivate: [authGuard], 
      data: { role: 'TESTER' },
      children: [
        {path:'addticket',component:AddTicketComponent},
        {path:'notifications',component:NotificationsComponent},
        { path: 'profil', component: ProfilComponent } ,
      ]
    },
    { 
      path: 'developper', 
      component:DashboardDeveloppeurComponent,
      canActivate: [authGuard], 
      data: { role: 'DEVELOPER' },
      children: [
        {path:'ticketsdev',component:TicketsDevComponent},
        { path: 'profil', component: ProfilComponent } ,
      
       
      ]
    },
    {
      path: 'partner',
      component: DashboardPartnerComponent,
      canActivate: [authGuard],
      data: { role: 'PARTNER' },
      children: [
        { path: 'users', component: UsersComponent },
        { path: 'projects', component: ProjectsComponent },
        { path: 'profil', component: ProfilComponent },
        {path: 'projects/:id',component: ProjectDetailsComponent},
        { path: 'projects/:projectId/error-details/:errorId', component: ErrorDetailsComponent },
        { path: 'pending-register', component: PendingRegisterComponent},
      ]
    },
    { 
      path: 'manager', 
      component:DashboardManagerComponent,
      canActivate: [authGuard], 
      data: { role: 'MANAGER' },
      children: [
        { path: 'profil', component: ProfilComponent } , 
        { path: 'manager-projects', component: ManagerProjectsComponent },
      
      ]
    },
  
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
  
];


