import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { WEBSOCKET_ENDPOINT, WEBSOCKET_NOTIFY_TOPIC } from '../constants/base-url.constants';
import { AppNotification } from '../models/app-notification.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private notificationSubject = new Subject<AppNotification>();

  constructor() {
    this.stompClient = new Client({
      brokerURL: undefined, // fallback to SockJS
      webSocketFactory: () => new SockJS(WEBSOCKET_ENDPOINT),
      reconnectDelay: 5000,
      debug: str => console.log(str),
      onConnect: () => {
  console.log('✅ Connected to WebSocket');

  this.stompClient.subscribe(WEBSOCKET_NOTIFY_TOPIC, (message: Message) => {
    try {
      console.log('📩 Message brut reçu du serveur STOMP:', message);

      const notification: AppNotification = JSON.parse(message.body);

      console.log('🔔 Notification WebSocket reçue et parsée :', notification);

      this.notificationSubject.next(notification);
    } catch (error) {
      console.error('❌ Erreur lors du parsing de la notification :', error);
    }
  });
},

      onStompError: frame => {
        console.error('❌ STOMP error', frame);
      }
    });

    this.stompClient.activate();
  }

  public onNotification(): Observable<AppNotification> {
  console.log('👂 Composant appelé onNotification()');
  return this.notificationSubject.asObservable();
}

  
}
