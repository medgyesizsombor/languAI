import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { LEARNINGS_NAVIGATION } from '../util.constants';
import { NavController } from '@ionic/angular';

export const LearningGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const localStorageService = inject(LocalStorageService);
  const navigation = inject(NavController);

  if (!localStorageService.getCurrentLearning()?.id) {
    navigation.navigateForward(['/' + LEARNINGS_NAVIGATION]);
    return false;
  } else {
    return true;
  }
};
