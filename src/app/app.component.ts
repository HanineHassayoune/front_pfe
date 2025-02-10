import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashbordComponent } from './dashboards/dashboard-admin/dashbord/dashbord.component';
import { DashboardTesteurComponent } from './dashboards/dashboard-testeur/dashboard-testeur/dashboard-testeur.component';
import { DashboardDeveloppeurComponent } from './dashboards/dashboard-developpeur/dashboard-developpeur/dashboard-developpeur.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DashbordComponent,DashboardTesteurComponent,DashboardDeveloppeurComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-project';
}
