import { Component, OnInit } from '@angular/core';
import { LOGIN_NAVIGATION, SETTINGS_TITLE } from '../../util/util.constants';
import { UserService } from 'src/api/services';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  title = this.translateService.instant(SETTINGS_TITLE);

  profile = {
    image: 'asd',
    username: 'asd1',
    email: 'asd@asd.com'
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private navController: NavController,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    // this.userService.getUserById$Json({ userId: 7 }).subscribe(res => {
    //   if (res) {
    //     console.log(res);
    //     // patchModel();
    //   }
    // });
  }

  openNotificationModal() {}

  openDarkModeModal() {}

  navigate(page: string, useNavController = false) {
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
    this.localStorageService.removeJwtToken();
    this.router.navigate(['/' + LOGIN_NAVIGATION]);
  }

  /**
   * Delete the profile
   */
  deleteProfile() {
    //TODO: Megcsinálni
  }
}
