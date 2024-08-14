import { Component, OnDestroy, OnInit } from '@angular/core';
import { PROFILE_TITLE, LOGIN_NAVIGATION } from '../../util/util.constants';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/api/services';
import { UserViewModel } from 'src/api/models';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  profileForm: FormGroup | undefined;
  title = this.translateService.instant(PROFILE_TITLE);
  profileModel: UserViewModel = {};
  isEdit = false;
  originalProfileModel: UserViewModel = {};
  getUserSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.getUserSub?.unsubscribe();
  }

  /**
   * Change to edit mode
   */
  changeEditMode() {
    this.isEdit = !this.isEdit;
  }

  /**
   * Logout
   */
  logout() {
    this.localStorageService.removeJwtToken();
    this.router.navigate(['/' + LOGIN_NAVIGATION]);
  }

  /**
   * Save the profile
   */
  save() {
    //TODO
  }

  navigateBack() {
    this.navController.back();
  }

  /**
   * Initialize
   */
  private initialize() {
    this.loadingService
      .showLoading(this.translateService.instant('DATA_IS_LOADING'))
      .then(() => {
        this.createForm();
        this.loadData();
      });
  }

  /**
   * Load user's data
   */
  private loadData() {
    this.getUserSub = this.userService
      .getUserById$Json({ userId: 3 })
      .subscribe(res => {
        if (res) {
          this.profileModel = res;
          this.originalProfileModel = { ...this.profileModel };
          this.fillForm();
        } else {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast('DATA_ERROR');
        }
      });
  }

  /**
   * Create the form
   */
  private createForm() {
    this.profileForm = this.formBuilder.group({
      username: new FormControl(''),
      email: [''],
      dateOfBirth: ['']
    });
  }

  /**
   * Fill the form
   */
  private fillForm() {
    this.profileForm?.patchValue({
      username: this.profileModel.username,
      email: this.profileModel.email,
      dateOfBirth: this.profileModel.dateOfBirth
    });

    this.loadingService.hideLoading();
  }
}
