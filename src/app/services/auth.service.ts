import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = environment.authUrl;
  private logoutUrl = environment.logoutUrl;

  constructor(private http: HttpClient,private storageService : StorageService) {}


  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.authUrl + '/authenticate', { email, password }).pipe(
      tap((response: any) => { //tap to store the token and role in localStorage 
        this.storageService.setAuthToken(response.token);
        this.storageService.setRole(response.role);
        this.storageService.setTenant(response.tenant);
       
      })
    );
  }
 
    logout(): Observable<void> {
      const token = this.getToken();
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.post<void>(this.logoutUrl, {}, { headers }).pipe(
          tap(() => {
            console.log("Déconnexion réussie, suppression du localStorage");
            localStorage.clear();
          }),
          catchError((error) => {
            console.error('Erreur lors de la déconnexion :', error);
            return of(); // Retourne un Observable vide pour éviter l'erreur
          })
        );
      }
      //console.warn("Aucun token trouvé, suppression du localStorage");
      localStorage.clear(); 
      return of();
    }

    
   
}
