import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FriendshipService } from 'src/api/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService, private friendshipService: FriendshipService) {}

  ngOnInit() {
    this.initializeApp();
  }

  private initializeApp() {
    this.translateService.setDefaultLang('hu');
  }
}
