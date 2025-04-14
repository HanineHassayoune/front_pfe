import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerUrl = environment.registerUrl;

  constructor(private http: HttpClient) {}

  postData(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.registerUrl, data);
  }
  
}
