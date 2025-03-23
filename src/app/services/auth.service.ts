import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private logoutUrl = 'http://localhost:8080/api/v1/auth/logout';

  constructor(private http: HttpClient) {}


  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/authenticate', { email, password }).pipe(
      tap((response: any) => { //tap to store the token and role in localStorage 
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('role', response.role); 
        localStorage.setItem('tenant', response.tenant); 
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
