import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { inject } from '@angular/core';
import { LOGIN_NAVIGATION } from '../util.constants';

export const AuthGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.getJwtToken()?.length) {
    return true;
  } else {
    router.navigate(['/' + LOGIN_NAVIGATION]);
    return false;
  }
};
