import { Component } from '@angular/core';
import {
  LEARNINGS_NAVIGATION,
  LOGIN_NAVIGATION,
  NOTIFICATIONS_NAVIGATION,
  PROFILE_NAVIGATION,
  SETTINGS_TITLE
} from '../../util/util.constants';
import { UserService } from 'src/api/services';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { FriendshipRequestService } from 'src/app/util/services/friendship-request.service';
import { Subscription } from 'rxjs';
import { SettingsNavigationEnum } from 'src/app/util/enums/settings-navigation-enum';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
  title = this.translateService.instant(SETTINGS_TITLE);
  numberOfFriendshipRequest = 0;

  profile = {
    image: 'asd',
    username: 'asd1',
    email: 'asd@asd.com'
  };

  deleteUserSub: Subscription | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private navController: NavController,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private friendshipRequestService: FriendshipRequestService
  ) {}

  ionViewWillEnter() {
    this.loadData();
    //TODO befejezni
    // this.userService.getUserById$Json({ userId: 7 }).subscribe(res => {
    //   if (res) {
    //     console.log(res);
    //     // patchModel();
    //   }
    // });
  }

  ionViewDidLeave() {
    this.deleteUserSub?.unsubscribe();
  }

  openDarkModeModal() {}

  navigate(settingsNavigationEnum: SettingsNavigationEnum) {
    const useNavController = Capacitor.getPlatform() === 'web';
    let page = '';

    switch (settingsNavigationEnum) {
      case SettingsNavigationEnum.profile: {
        page = PROFILE_NAVIGATION;
        break;
      }
      case SettingsNavigationEnum.notifications: {
        page = NOTIFICATIONS_NAVIGATION;
        break;
      }
      case SettingsNavigationEnum.learnings: {
        page = LEARNINGS_NAVIGATION;
        break;
      }
    }
    if (useNavController) {
      this.navController.navigateForward('/' + page);
    } else {
      this.router.navigateByUrl('/' + page);
    }
  }

  private patchModel() {}

  /**
   * Logout
   */
  logout() {
    this.removeJwtToken();
  }

  /**
   * Delete the profile
   */
  deleteProfile() {
    this.loadingService.showLoading().then(() => {
      this.userService.deleteUser$Json().subscribe({
        next: (success: boolean) => {
          if (success) {
            this.loadingService.hideLoading();
            this.removeJwtToken();
          } else {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant(
                'ERROR_HAPPEND_WHEN_TRIED_TO_DELETE_PROFILE'
              )
            );
          }
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant(
              'ERROR_HAPPEND_WHEN_TRIED_TO_DELETE_PROFILE'
            )
          );
        }
      });
    });
  }

  private removeJwtToken() {
    this.localStorageService.removeJwtToken();
    this.router.navigate(['/' + LOGIN_NAVIGATION]);
  }

  private loadData() {
    this.numberOfFriendshipRequest =
      this.friendshipRequestService.numberOfFriendshipRequest;
  }
}
