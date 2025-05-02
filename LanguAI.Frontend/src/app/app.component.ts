import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { LocalStorageService } from './util/services/localstorage.service';
import { UserService } from 'src/api/services';
import { ToastrService } from './util/services/toastr.service';
import { UserDataViewModel } from 'src/api/models';
import { HUNGARIAN_LANGUAGE_CODE } from './util/util.constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    private platform: Platform,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    if (Capacitor.getPlatform() !== 'web') {
      ScreenOrientation.lock({ orientation: 'portrait' });
    }

    this.platform.ready().then(async () => {
      setTimeout(() => {
        SplashScreen.hide({
          fadeOutDuration: 1500
        });
      }, 2000);
    });
    this.initializeApp();
  }

  private initializeApp() {
    this.translateService.setDefaultLang(HUNGARIAN_LANGUAGE_CODE);
    this.translateService.use(
      this.localStorageService.getMobileLanguageCode() ??
        this.translateService.defaultLang
    );
    if (this.localStorageService.getJwtToken()?.length) {
      this.userService.getDataOfUser$Json().subscribe({
        next: (user: UserDataViewModel) => {
          this.localStorageService.setDataOfUser(user);
        },
        error: () => {
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_LOADING_USERS_DATA')
          );
        }
      });
    }
  }
}
