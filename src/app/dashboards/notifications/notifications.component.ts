import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AppNotification } from '../../models/app-notification.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
 notifications: AppNotification[] = [];
  errorMessage: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getMyNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notifications', error);
        this.errorMessage = "Impossible de charger les notifications.";
      }
    });
  }

}


