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
interface UserUpdateRequest {
  name?: string;
  role?: string; 
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
    return this.http.get<any>(`${this.usersUrl}/me`).pipe(
      tap(user => this.userSubject.next(user)) // met à jour le BehaviorSubject
    );
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

  
  return this.http.patch<User>(`${this.usersUrl}/updateProfile`, formData).pipe(
    tap((updatedUser: User) => {
    this.userSubject.next(updatedUser); // ⬅️ TRIGGER
   })
  );
}

getUserById(id: number): Observable<any> {
  return this.http.get(`${this.usersUrl}/${id}`);
}


 
getUserProfileById(id: number): Observable<any> {
  return this.http.get(`${this.usersUrl}/${id}/profile`);
}
updateUserRoleAndName(id: number, updateRequest: { name?: string; role?: string }): Observable<any> {
  return this.http.patch(`${this.usersUrl}/update-role-name/${id}`, updateRequest);
}

}
