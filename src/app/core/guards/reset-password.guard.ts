import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

export const resetPasswordGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const token = route.queryParamMap.get('token');

  if (!token) {
    router.navigate(['/auth/connexion']);
    return false;
  }

  return true;
};
