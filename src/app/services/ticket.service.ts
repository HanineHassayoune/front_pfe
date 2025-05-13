import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface Ticket {
  id: number;
  status: string;
  title: string;
  priority: string;
  imageUrl: string | null;
  level: string;
  date: string;
  projectName: string;
  loggerName: string;
  type: string;
  projectId: number;
  stackTrace: string;
  solution: string | null;
  comments: any[];
  assignedUserId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {



  private ticketUrl = environment.ticketUrl;

  constructor(private http: HttpClient) {}

  getTicketsByProjectId(projectId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.ticketUrl}/project/${projectId}`);
  }


  getTicketById(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.ticketUrl}/${ticketId}`);
  }

  assignUserToTicket(ticketId: number, userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.put(`${this.ticketUrl}/${ticketId}/assign`, null, { params });
  }
  
}
