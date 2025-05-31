import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environment/environment';

interface User {
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmationPassword?: string;
  profileImage?: File;
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  
    private usersUrl = environment.usersUrl; 
    private authUrl = environment.authUrl;
    private userSubject = new BehaviorSubject<any>(null); // BehaviorSubject pour suivre l'utilisateur
    user$ = this.userSubject.asObservable();
    constructor(private http: HttpClient) {}

 
 
    getUsers(roles: string[], name: string = '', page: number = 0, size: number = 5): Observable<any> {
      let params = new HttpParams()
        .set('name', name)
        .set('page', page.toString())
        .set('size', size.toString());
    
      roles.forEach(role => {
        params = params.append('roles', role);
      });
    
      return this.http.get(`${this.usersUrl}/`, { params });

    }
 
  
 addUser(user: any): Observable<any> {
    return this.http.post(`${this.usersUrl}/`, user);
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

  //return this.http.patch(`${this.usersUrl}/updateProfile`, formData);
  return this.http.patch<User>(`${this.usersUrl}/updateProfile`, formData).pipe(
    tap((updatedUser: User) => {
      // Mettre à jour le BehaviorSubject avec les nouvelles données
      this.userSubject.next(updatedUser);
    })
  );
}

getUserById(id: number): Observable<any> {
  return this.http.get(`${this.usersUrl}/${id}`);
}


/*  checkCurrentPassword(currentPassword: string): Observable<{ isValid: boolean }> {
  return this.http.post<{ isValid: boolean }>(`${this.usersUrl}/check-current-password`, { currentPassword });
}
 */
 
getUserProfileById(id: number): Observable<any> {
  return this.http.get(`${this.usersUrl}/${id}/profile`);
}

}
