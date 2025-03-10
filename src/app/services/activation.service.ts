import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/approveUser';

  constructor(private http: HttpClient) {}
  activeUser(id: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, {});
  }
}


