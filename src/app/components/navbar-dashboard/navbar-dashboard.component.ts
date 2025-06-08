import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';
import { AppNotification } from '../../models/app-notification.model'; // adapte le chemin si besoin
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { StorageService } from '../../services/storage.service';

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

  constructor(private webSocketService: WebSocketService,private notificationService :NotificationService,private storageService: StorageService) {}

  ngOnInit() {
    
    this.notificationSub = this.webSocketService.onNotification().subscribe((notif: AppNotification) => {
      console.log("📥 Notification reçue dans navbar:", notif);
      this.notifications.unshift(notif);
    });

  this.notificationService.getMyNotifications().subscribe({
  next: (notifications) => {
    this.notifications = notifications.reverse(); // tri si besoin
  },
  error: (err) => {
    console.error('❌ Erreur lors du chargement des notifications :', err);
  }
});

  }




  ngOnDestroy() {
    this.notificationSub?.unsubscribe();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
