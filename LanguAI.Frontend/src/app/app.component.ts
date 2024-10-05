import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FriendshipService } from 'src/api/services';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private friendshipService: FriendshipService
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
  }
}
