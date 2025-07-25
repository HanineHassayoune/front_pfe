import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Solution {
  id?: number;
  description: string;
  reference: string;
  code: string;
  ticketId: number;
  userId: number;
  datePosted?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private solutionUpdatedSubject = new BehaviorSubject<boolean>(false);
  solutionUpdated$ = this.solutionUpdatedSubject.asObservable();
  private solutionUrl = environment.solutionUrl;

  constructor(private http: HttpClient) {}

  addSolution(solution: Solution): Observable<any> {
  return this.http.post(this.solutionUrl, solution); 
}


  getAllSolutions(): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.solutionUrl);
  }

 getSolutionByTicketId(ticketId: number): Observable<Solution> {
  return this.http.get<Solution>(`${this.solutionUrl}/by-ticket/${ticketId}`);
}

 notifySolutionUpdated(): void {
    this.solutionUpdatedSubject.next(true);
  }

}
