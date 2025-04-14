import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  
    private usersUrl = environment.usersUrl; 
    private authUrl = environment.authUrl;

  constructor(private http: HttpClient) {}

 
  getPartners(): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/getPartners`,
      
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/getUsers`,
      
    );
  }
  
 addUser(user: any): Observable<any> {
    return this.http.post(`${this.usersUrl}/add`, user);
  } 
 
  activeUser(id: number): Observable<string> {
    return this.http.put(`${this.authUrl}/approveUser/${id}`, {}, { responseType: 'text' });
  }
  
  blockUser(userId: number): Observable<string> {
    return this.http.put(`${this.authUrl}/blockUser/${userId}`, {}, { responseType: 'text' });
}

  
}
