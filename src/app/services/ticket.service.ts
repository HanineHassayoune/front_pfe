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
  category: string;
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

 /* getMyTicketsByProjectId(projectId: number): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(`${this.ticketUrl}/project/${projectId}/me`);
} */


/* updateTicketStatus(ticketId: number, newStatus: string): Observable<Ticket> {
  return this.http.put<Ticket>(`${this.ticketUrl}/${ticketId}/status`, { status: newStatus });
}
 */

updateTicketStatus(ticketId: number, newStatus: string): Observable<Ticket> {
  const params = new HttpParams().set('status', newStatus);
  return this.http.put<Ticket>(`${this.ticketUrl}/${ticketId}/status`, null, { params });
}

filterTickets(projectId: number, category?: string, assignedUserName?: string): Observable<Ticket[]> {
  let params = new HttpParams();
  if (category) {
    params = params.set('category', category);
  }
  if (assignedUserName) {
    params = params.set('assignedUserName', assignedUserName);
  }
  return this.http.get<Ticket[]>(`${this.ticketUrl}/project/${projectId}/filter`, { params });
}

updateTicketPriority(ticketId: number, newPriority: string): Observable<Ticket> {
  const params = new HttpParams().set('priority', newPriority);
  return this.http.put<Ticket>(`${this.ticketUrl}/${ticketId}/priority`, null, { params });
}


  
}
