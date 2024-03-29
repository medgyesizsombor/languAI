import { Component, OnInit } from '@angular/core';
import { SETTINGS_TITLE } from '../../util/util.constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  title = SETTINGS_TITLE;

  profile = {
    image: 'asd',
    username: 'asd1',
    email: 'asd@asd.com'
  };

  constructor() { }

  ngOnInit() {
  }

  openNotificationModal(){}

  openDarkModeModal(){}
}
