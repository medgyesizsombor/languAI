import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from './services/localstorage.service';
import { LESSONS_NAVIGATION, SIGN_UP_NAVIGATION } from './util.constants';

export const AuthGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.getJwtToken()?.length) {
    return true;
  } else {
    router.navigate(['/' + SIGN_UP_NAVIGATION]);
    return false;
  }
};

export const LoginGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (!localStorageService.getJwtToken()?.length) {
    return true;
  } else {
    router.navigate(['/' + LESSONS_NAVIGATION]);
    return false;
  }
};
