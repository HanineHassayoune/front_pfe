import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppNotification } from '../models/app-notification.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { A } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
private notificationUrl = environment.notificationUrl;

  constructor(private http: HttpClient) {}

  
getMyNotifications(): Observable<AppNotification[]> {
  return this.http.get<AppNotification[]>(`${this.notificationUrl}/me`);
}



}
