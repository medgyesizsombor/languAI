import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { UserDataViewModel } from 'src/api/models';
import { AuthenticationService, UserService } from 'src/api/services';
import { AlertService } from 'src/app/util/services/alert.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { LESSONS_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup | undefined;
  isUsernameDirty = false;
  isPasswordDirty = false;

  authenticationSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  async ionViewWillEnter() {
    await this.loadingService.showLoading();
    this.createForm();
  }

  ionViewDidLeave() {
    this.authenticationSub?.unsubscribe();
  }

  /**
   * login
   */
  async login() {
    if (this.isValid()) {
      await this.loadingService.showLoading(
        this.translateService.instant('LOGGING_IN')
      );

      this.authenticationSub = this.authenticationService
        .authenticate$Json({
          body: {
            username: this.loginForm?.controls['username'].value,
            password: this.loginForm?.controls['password'].value
          }
        })
        .pipe(
          switchMap((res: string) => {
            if (res?.length) {
              this.toastrService.presentSuccessToast(
                this.translateService.instant('SUCCESSFUL_SIGN_IN')
              );
              this.localStorageService.setJwtToken(res);
            } else {
              this.loadingService.hideLoading();
              this.toastrService.presentErrorToast(
                this.translateService.instant(
                  'ERROR_HAPPEND_WHEN_TRIED_TO_SIGN_IN'
                )
              );

              this.loadingService.hideLoading();
              return EMPTY;
            }

            return this.userService.getDataOfUser$Json();
          })
        )
        .subscribe({
          next: (user: UserDataViewModel) => {
            if (user) {
              this.localStorageService.setDataOfUser(user);
              this.loadingService.hideLoading();
              this.router.navigate(['/' + LESSONS_NAVIGATION]);
            } else {
              this.loadingService.hideLoading();
              this.toastrService.presentErrorToast(
                'UNSUCCESSFUL_LOADING_USERS_DATA'
              );
            }
          },
          error: () => {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              'UNSUCCESSFUL_LOADING_USERS_DATA'
            );
          }
        });
    } else {
      await this.alertService.showErrorAlert(this.loginForm, false);
    }
  }

  /**
   * Create the form
   */
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loadingService.hideLoading();
  }

  /**
   * Check if model is valid
   */
  private isValid(): boolean {
    return (
      !this.loginForm?.get('username')?.errors &&
      !this.loginForm?.get('password')?.errors
    );
  }
}
