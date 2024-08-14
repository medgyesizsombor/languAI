import { Component, OnInit } from '@angular/core';
import { SETTINGS_TITLE } from '../../util/util.constants';
import { UserService } from 'src/api/services';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.userService.getUserById$Json({ userId: 3 }).subscribe(res => {
      if (res) {
        console.log(res);
        // patchModel();
      }
    });
  }

  openNotificationModal() {}

  openDarkModeModal() {}

  navigate(page: string, useNavController = false) {
    if (useNavController) {
      console.log('this');
      this.navController.navigateForward('/' + page);
    } else {
      console.log('that');
      this.router.navigateByUrl('/' + page);
    }
  }

  private patchModel() {}
}
