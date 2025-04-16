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

 
  /* getPartners(): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/getPartners`,
      
    );
  } */

 
    getPartners(name: string = '', page: number = 0, size: number = 5): Observable<any> {
      const params = {
        name: name, 
        page: page.toString(),
        size: size.toString()
      };
  
      return this.http.get<any>(`${this.usersUrl}/getPartners`, { params });
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

getConnectedUser(): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/me`);
}

updateProfile(data: {
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmationPassword?: string;
  profileImage?: File;
}): Observable<any> {
  const formData = new FormData();

  if (data.name) formData.append('name', data.name);
  if (data.currentPassword) formData.append('currentPassword', data.currentPassword);
  if (data.newPassword) formData.append('newPassword', data.newPassword);
  if (data.confirmationPassword) formData.append('confirmationPassword', data.confirmationPassword);
  if (data.profileImage) formData.append('profileImage', data.profileImage);

  return this.http.patch(`${this.usersUrl}/updateProfile`, formData);
}


/*  checkCurrentPassword(currentPassword: string): Observable<{ isValid: boolean }> {
  return this.http.post<{ isValid: boolean }>(`${this.usersUrl}/check-current-password`, { currentPassword });
}
 */
  
}
