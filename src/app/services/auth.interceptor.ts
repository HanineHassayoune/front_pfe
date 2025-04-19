import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap} from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storageService = inject(StorageService);
    const token = storageService.getAuthToken();
    
    
    // Exclure l'endpoint /register
  if (req.url.includes('/api/v1/auth/register')) {
    return next.handle(req);
  }

  if (req.url.includes('/api/v1/auth/authenticate')) {
    return next.handle(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

    return next.handle(req);
  }
}