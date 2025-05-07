import { Component, OnInit } from '@angular/core';
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
import { AlertService } from 'src/app/util/services/alert.service';
import { LanguageEnum } from 'src/app/util/enums/language-enum';
import { UserViewModel } from 'src/api/models';
import { FileService } from 'src/app/util/services/file.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  title = this.translateService.instant(SETTINGS_TITLE);
  numberOfFriendshipRequest = 0;
  imageSrc: string | undefined;

  profile: UserViewModel = {
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
    private friendshipRequestService: FriendshipRequestService,
    private alertService: AlertService,
    private fileService: FileService
  ) {}

  async ngOnInit() {
    await this.loadingService.showLoading();
    this.loadData();
    this.userService
      .getUserById$Json({ userId: this.localStorageService.getUserId()! })
      .subscribe({
        next: (res: UserViewModel) => {
          if (res) {
            this.profile = { ...res };
            this.imageSrc = this.fileService.getImageSrc(
              this.profile.profilePicture?.contentAsString,
              this.profile.profilePicture?.type
            );
          } else {
            this.toastrService.presentErrorToast('ERROR_WHILE_LOADING_USER');
          }
          this.loadingService.hideLoading();
        },
        error: () => {
          this.toastrService.presentErrorToast('ERROR_WHILE_LOADING_USER');
        }
      });
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
      this.translateService.currentLang === 'hu'
        ? LanguageEnum.hungarian
        : LanguageEnum.english;
    this.alertService
      .showLanguageAlert(currentLanguage)
      .then((lang: string | null) => {
        if (lang && this.translateService.currentLang !== lang) {
          this.localStorageService.setMobileLangugageCode(lang);
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

  private loadData() {
    this.numberOfFriendshipRequest =
      this.friendshipRequestService.numberOfFriendshipRequest;
  }
}
