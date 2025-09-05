import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const isPublicRoute = req.url.includes('/api/auth');
  const isPublicGet = req.method === 'GET' && !req.url.includes('/api/user/me');

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
        window.location.reload();
      }
      return throwError(() => error);
    })
  );
};
