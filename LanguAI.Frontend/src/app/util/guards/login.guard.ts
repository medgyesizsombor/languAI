import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { LESSONS_NAVIGATION } from '../util.constants';
import { NavController } from '@ionic/angular';

export const LoginGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const localStorageService = inject(LocalStorageService);
  const navController = inject(NavController);

  if (!localStorageService.getJwtToken()?.length) {
    return true;
  } else {
    navController.navigateForward(['/' + LESSONS_NAVIGATION]);
    return false;
  }
};
