import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
 
  private apiUrl = 'http://localhost:8080/api/v1/password';

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reset-password?token=${token}&newPassword=${newPassword}`, {});
  }
}
