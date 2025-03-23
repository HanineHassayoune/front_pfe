import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  
    private apiUrl = 'http://localhost:8080/api/v1/users'; 
    private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

 
  getPartners(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getPartners`,
      
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUsers`,
      
    );
  }
  
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, user);
  }
  
  activeUser(id: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/approveUser/${id}`, {}, { responseType: 'text' });
  }
  
  /* blockUser(userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/blockUser/${userId}`, {});
  } */
  blockUser(userId: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/blockUser/${userId}`, {}, { responseType: 'text' });
}

  
}
