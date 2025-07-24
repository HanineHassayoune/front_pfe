import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';
import { AppNotification } from '../../models/app-notification.model'; 
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'xng-breadcrumb';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [CommonModule,BreadcrumbComponent],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.css'
})
export class NavbarDashboardComponent implements OnInit, OnDestroy {
  @Input() imageUrl?: string;
  @Input() userName?: string;
  @Input() userAvatarUrl?: string;
 @Input() userEmail?: string;



  showNotifications = false;
  notifications: AppNotification[] = [];
  user: any;
  private userSub?: Subscription;
  private notificationSub?: Subscription;

  constructor(private webSocketService: WebSocketService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // BehaviorSubject 
    this.userSub = this.userService.user$.subscribe(user => {
      if (user) {
        this.user = user;
       this.userAvatarUrl = user.profileImage || 'assets/images/default-user.jpg';
        this.userName = user.name;
        this.userEmail = user.email;
      }
    });

    this.userService.getConnectedUser().subscribe(u => {
      if (u) this.userService['userSubject'].next(u); // initialisation du BehaviorSubject
    });

    this.notificationSub = this.webSocketService.onNotification().subscribe((notif: AppNotification) => {
      console.log("Notification reçue dans navbar:", notif);
      this.notifications.unshift(notif);
    });



  }

  goToNotifications() {
  this.showNotifications = false; 
  this.router.navigate(['/manager/notifications']);
}


  ngOnDestroy() {
    this.notificationSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
