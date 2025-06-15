import { Routes } from '@angular/router';
import { NavbarDashboardComponent } from './components/navbar-dashboard/navbar-dashboard.component';
import { FooterDashboardComponent } from './components/footer-dashboard/footer-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './dashboards/partner/users/users.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { RadialChartComponent } from './components/radial-chart/radial-chart.component';
import { NotificationsComponent } from './dashboards/tester/notifications/notifications.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PartnersComponent } from './dashboards/admin/partners/partners.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { authGuard } from './services/auth.guard';
import { ProjectsComponent } from './dashboards/partner/projects/projects.component';
import { ProjectDetailsComponent } from './dashboards/partner/project-details/project-details.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { PendingRegisterComponent } from './pending-register/pending-register.component';
import { TicketDetailsComponent } from './dashboards/partner/ticket-details/ticket-details.component';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { MicroserviceDetailsComponent } from './dashboards/partner/microservice-details/microservice-details.component';
import { LayoutComponent } from './dashboards/layout/layout.component';


export const routes: Routes = [
   {path:'navbar',component:NavbarDashboardComponent},
    {path:'footer',component:FooterDashboardComponent},
    {path:'sidebar',component:SidebarComponent},
    {path:'users',component:UsersComponent},
    {path:'pieChart',component:PieChartComponent},
    {path:'radialChart',component:RadialChartComponent},
    {path:'notifications',component:NotificationsComponent},
    {path:'login',component:LoginComponent},
    {path:'forgot-password',component:ForgotPasswordComponent},
    {path:'register',component:RegisterComponent},
    {path:'partners',component:PartnersComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:'projects',component:ProjectsComponent},
    { path: 'profil', component: ProfilComponent } ,
    {path: 'table-pagination', component:TablePaginationComponent},
    { path: 'pending-register', component: PendingRegisterComponent},
    { path: 'projects/:id', component: ProjectDetailsComponent },
    { path: 'projects/:projectId/tickets/:ticketId', component: TicketDetailsComponent },

    {
      path: 'admin',
      component: LayoutComponent, 
      canActivate: [authGuard], 
      data: { role: 'ADMIN' },
      children: [
        { path: 'partners', component: PartnersComponent } ,
        { path: 'profil', component: ProfilComponent } ,
        

      ]
    },
    { 
      path: 'tester', 
      component: LayoutComponent, 
      canActivate: [authGuard], 
      data: { role: 'TESTER' },
      children: [
        { path: 'profil', component: ProfilComponent } ,
        { path: 'projects', component: ProjectsComponent },
        { path: 'projects/:id', component: ProjectDetailsComponent },
        { path: 'projects/:id/tickets/:ticketId', component: TicketDetailsComponent },
      ]
    },
    { 
      path: 'developer', 
      component:LayoutComponent,
      canActivate: [authGuard], 
      data: { role: 'DEVELOPER' },
      children: [
        { path: 'profil', component: ProfilComponent } ,
        { path: 'projects', component: ProjectsComponent },
        { path: 'projects/:id', component: ProjectDetailsComponent },
        { path: 'projects/:id/tickets/:ticketId', component: TicketDetailsComponent },
      
       
      ]
    },
    {
      path: 'partner',
      component: LayoutComponent,
      canActivate: [authGuard],
      data: { role: 'PARTNER' , breadcrumb: '🤝partner'},
      children: [
        { path: 'users', component: UsersComponent ,data: { breadcrumb: '👥users' } },
        { path: 'projects', component: ProjectsComponent ,data: { breadcrumb: '📁projects' }},
        { path: 'profil', component: ProfilComponent ,data: { breadcrumb: '👤profil' }},
        { path: 'projects/:id', component: ProjectDetailsComponent , data: { breadcrumb: ' 🗂️project details' }},
        { path: 'pending-register', component: PendingRegisterComponent},
        { path: 'projects/:projectId/microservice/:microserviceId', component: MicroserviceDetailsComponent,data: { breadcrumb: '🎟️microservice ticket' } } ,
        { path: 'projects/:id/tickets/:ticketId', component: TicketDetailsComponent ,data: { breadcrumb: '🧾ticket details' }},
        { path: 'dashboard', component: DashboardComponent,data:{ breadcrumb: '📊dashboard' }},
      ]
    },
    { 
      path: 'manager', 
      component:LayoutComponent,
      canActivate: [authGuard], 
      data: { role: 'MANAGER' },
      children: [
        { path: 'profil', component: ProfilComponent } , 
        { path: 'projects', component: ProjectsComponent },
        { path: 'projects/:id', component: ProjectDetailsComponent },
        { path: 'projects/:id/tickets/:ticketId', component: TicketDetailsComponent },
        { path: 'dashboard', component: DashboardComponent},


      ]
    },
  
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
  
];


