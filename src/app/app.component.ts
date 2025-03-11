import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardDeveloppeurComponent } from './dashboards/developper/dashboard-developpeur/dashboard-developpeur.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardAdminComponent } from './dashboards/admin/dashboard-admin/dashboard-admin.component';
import { DashboardTesterComponent } from './dashboards/tester/dashboard-tester/dashboard-tester.component';
import { DashboardPartnerComponent } from './dashboards/partner/dashboard-partner/dashboard-partner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DashboardAdminComponent,DashboardTesterComponent,DashboardPartnerComponent,DashboardDeveloppeurComponent,LoginComponent,RegisterComponent,ForgotPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-project';
}
