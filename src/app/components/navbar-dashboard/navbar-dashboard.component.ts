import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.css'
})
export class NavbarDashboardComponent {

  /* @Input() title?: string; */
  @Input() imageUrl?: string;
  @Input() userName?: string;
  @Input() userAvatarUrl?: string;
}
