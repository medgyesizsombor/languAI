import { Component, OnInit } from '@angular/core';
import { PROFILE_TITLE, SETTINGS_NAVIGATION } from '../../util/util.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  title = PROFILE_TITLE;
  navigationLink = SETTINGS_NAVIGATION;

  constructor() { }

  ngOnInit() {
  }

}
