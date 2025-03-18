import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  
    private apiUrl = 'http://localhost:8080/api/v1/users'; 
  

  constructor(private http: HttpClient) {}

 
  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending`);
  }

  
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, user);
  }
  
  
}
