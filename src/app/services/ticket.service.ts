import { HttpClient } from '@angular/common/http';
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
  
}
