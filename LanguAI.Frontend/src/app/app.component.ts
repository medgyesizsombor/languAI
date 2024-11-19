import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Capacitor } from '@capacitor/core';
import { LocalDataService } from './util/services/local-data.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { LocalStorageService } from './util/services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    private localDataService: LocalDataService,
    private platform: Platform,
    private localStorageService: LocalStorageService
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
    this.translateService.setDefaultLang('hu');
    this.translateService.use(
      this.localDataService.nativeLanguageCode ??
        this.translateService.defaultLang
    );
    this.localDataService.setValues();
  }
}
