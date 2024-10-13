import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Capacitor } from '@capacitor/core';
import { LocalDataService } from './util/services/local-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private localDataService: LocalDataService
  ) {
    if (Capacitor.getPlatform() !== 'web') {
      ScreenOrientation.lock({ orientation: 'portrait' });
    }
  }

  ngOnInit() {
    this.initializeApp();
  }

  private initializeApp() {
    this.translateService.setDefaultLang('hu');
    this.localDataService.setValues();
  }
}
