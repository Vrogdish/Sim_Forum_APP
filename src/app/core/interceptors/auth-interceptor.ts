import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const isPublicRoute = req.url.includes('/api/auth');
  const isPublicGet = req.method === 'GET' && !req.url.includes('/api/user/me');
  const router = inject(Router);

  if (token && !isPublicRoute && !isPublicGet) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/auth/connexion']);
      }
      return throwError(() => error);
    })
  );
};
