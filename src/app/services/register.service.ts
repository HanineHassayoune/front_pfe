import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // TODO change base url with .env file
  private baseUrl = 'http://localhost:8080'; //url of spring
  constructor(private http: HttpClient) {}

  postData(data: { name: string; email: string ; password: string }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/v1/auth/register`,
      data
    );
  }
  
  
}
