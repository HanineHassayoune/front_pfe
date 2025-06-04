import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';
import { AppNotification } from '../../models/app-notification.model'; // adapte le chemin si besoin
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.css'
})
export class NavbarDashboardComponent implements OnInit, OnDestroy {
  @Input() imageUrl?: string;
  @Input() userName?: string;
  @Input() userAvatarUrl?: string;

  showNotifications = false;
  notifications: AppNotification[] = [];

  private notificationSub?: Subscription;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.notificationSub = this.webSocketService.onNotification().subscribe((notif: AppNotification) => {
      console.log("📥 Notification reçue dans navbar:", notif);
      this.notifications.unshift(notif);
    });
  }




  ngOnDestroy() {
    this.notificationSub?.unsubscribe();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
