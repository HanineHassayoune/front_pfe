import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private router: Router) {
    console.log('storage service');
    window.addEventListener('storage', (event) => {
      console.log('event',event);
      if (localStorage.length === 0) {
        // Storage is completely cleared
        this.router.navigate(['/login']);
      } else if (event.key === 'auth_token' && (event.newValue != event.oldValue)) {
        // Specific key (authToken) is deleted
        this.router.navigate(['/login']);
      }
    });
  }


  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  setRole(role: string){
    localStorage.setItem('role', role);
  }

  setAuthToken(token: string){
    localStorage.setItem('auth_token', token);
  }

  setTenant(tenant: string){
    localStorage.setItem('tenant', tenant);
  }

}