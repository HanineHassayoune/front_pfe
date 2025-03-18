/* import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');

  // Ajouter le token à l'en-tête si disponible
  const authReq = token 
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) 
    : req;

  return next(authReq).pipe(
    tap({
      error: (error) => {
        if (error.status === 401) {
          console.warn('Utilisateur non autorisé, redirection vers login...');
          localStorage.removeItem('auth_token');
          router.navigate(['/login']);
        }
      }
    })
  );
};
 */