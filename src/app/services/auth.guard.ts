import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('AuthGuard triggered');
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('role');
  
  console.log('Token:', token);
  console.log('User Role:', userRole);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRole = route.data['role'];
  if (requiredRole && userRole?.toLowerCase() !== requiredRole.toLowerCase()) {
    console.log('Role mismatch: redirecting to login');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
