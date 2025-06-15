import { Component, ViewChild } from '@angular/core';
import {
  HUNGARIAN_LANGUAGE_CODE,
  LEADERBOARD_NAVIGATION,
  LEARNINGS_NAVIGATION,
  LOGIN_NAVIGATION,
  NOTIFICATIONS_NAVIGATION,
  PROFILE_NAVIGATION,
  SEARCH_NEW_FRIENDS_NAVIGATION
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
import { AlertService } from 'src/app/util/services/alert.service';
import { LanguageEnum } from 'src/app/util/enums/language-enum';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage {
  @ViewChild('footer') footer: FooterComponent | undefined;

  numberOfFriendshipRequest = 0;

  //Flag to use the enum in the template
  settingsNavigationEnum = SettingsNavigationEnum;

  deleteUserSub: Subscription | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private navController: NavController,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private friendshipRequestService: FriendshipRequestService,
    private alertService: AlertService
  ) {}

  async ionViewWillEnter() {
    this.loadData();
  }

  ionViewWillLeave() {
    this.deleteUserSub?.unsubscribe();
  }

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
      case SettingsNavigationEnum.discoverFriends: {
        page = SEARCH_NEW_FRIENDS_NAVIGATION;
        break;
      }
      case SettingsNavigationEnum.leaderboard: {
        page = LEADERBOARD_NAVIGATION;
        break;
      }
    }
    if (useNavController) {
      this.navController.navigateForward('/' + page);
    } else {
      this.router.navigateByUrl('/' + page);
    }
  }

  /**
   * Delete the profile
   */
  async deleteProfile() {
    await this.loadingService.showLoading();
    this.userService.deleteUser$Json().subscribe({
      next: (success: boolean) => {
        if (success) {
          this.loadingService.hideLoading();
          this.logout();
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
  }

  /**
   * Open language modal
   */
  async openLanguageModal() {
    const currentLanguage =
      this.translateService.currentLang === HUNGARIAN_LANGUAGE_CODE
        ? LanguageEnum.hungarian
        : LanguageEnum.english;
    this.alertService
      .showLanguageAlert(currentLanguage)
      .then((lang: string | null) => {
        if (lang && this.translateService.currentLang !== lang) {
          this.localStorageService.setMobileLanguageByCode(lang);
          this.translateService.use(lang);
        }
      });
  }

  /**
   * Clear the local storage and navigate to the login navigation
   */
  logout() {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['/' + LOGIN_NAVIGATION]);
  }

  private async loadData() {
    await this.loadingService.showLoading();
    this.footer?.ngOnInit();
    this.friendshipRequestService
      .getFriendshipRequest()
      .then((res: number) => {
        this.numberOfFriendshipRequest = res;
        this.loadingService.hideLoading();
      })
      .catch(() => {
        this.numberOfFriendshipRequest = 0;
        this.loadingService.hideLoading();
      });
  }
}
