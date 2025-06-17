import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

 
  private statisticsUrl = environment.statisticsUrl;

  constructor(private http: HttpClient) {}

  getAllProjects(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`${this.statisticsUrl}/projects`, { headers });
  }
  getTicketStatusesByProject(projectId: number): Observable<Record<string, number>> {
  return this.http.get<Record<string, number>>(`${this.statisticsUrl}/tickets/status/${projectId}`);
}

  getTicketCategoriesPercentageByProject(projectId: number): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.statisticsUrl}/tickets/categories/percent/${projectId}`);
  }

  getUserCountByProject(projectId: number): Observable<number> {
    return this.http.get<number>(`${this.statisticsUrl}/users/count/${projectId}`);
  }


  getTicketPrioritiesByProject(projectId: number): Observable<Record<string, number>> {
  return this.http.get<Record<string, number>>(`${this.statisticsUrl}/tickets/priorities/${projectId}`);
}


getTicketCountByCategoryAndPriority(projectId: number): Observable<Record<string, Record<string, number>>> {
  return this.http.get<Record<string, Record<string, number>>>(
    `${this.statisticsUrl}/tickets/count-category-priority/${projectId}`
  );
}


}
