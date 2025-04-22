import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
 
 
  private pwdUrl = environment.pwdUrl;

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<string> {
    return this.http.post(`${this.pwdUrl}/forgot-password`, { email }, { responseType: 'text' });
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post(`${this.pwdUrl}/reset-password?token=${token}&newPassword=${newPassword}`, {}, { responseType: 'text' });
  }
  
  
}
