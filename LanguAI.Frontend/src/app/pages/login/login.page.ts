import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { LESSONS_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup | undefined;
  isUsernameDirty = false;
  isPasswordDirty = false;

  authenticationSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    library: FaIconLibrary,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    library.addIcons(faUser);
  }

  ionViewWillEnter() {
    this.createForm();
  }

  ionViewDidLeave() {
    this.authenticationSub?.unsubscribe();
  }

  /**
   * login
   */
  login() {
    if (this.isValid()) {
      this.loadingService
        .showLoading(this.translateService.instant('LOGGING_IN'))
        .then(() => {
          this.authenticationSub = this.authenticationService
            .authenticate$Json({
              body: {
                username: this.loginForm?.controls['username'].value,
                password: this.loginForm?.controls['password'].value
              }
            })
            .subscribe({
              next: res => {
                this.loadingService.hideLoading();
                if (res?.length) {
                  this.toastrService.presentSuccessToast(
                    this.translateService.instant('SUCCESSFUL_SIGN_IN')
                  );
                  this.localStorageService.setJwtToken(res);
                  this.router.navigate(['/' + LESSONS_NAVIGATION]);
                } else {
                  this.toastrService.presentErrorToast(
                    this.translateService.instant(
                      'ERROR_HAPPEND_WHEN_TRIED_TO_SIGN_IN'
                    )
                  );
                }
              },
              error: () => {
                this.loadingService.hideLoading();
                this.toastrService.presentErrorToast(
                  this.translateService.instant(
                    'ERROR_HAPPEND_WHEN_TRIED_TO_SIGN_IN'
                  )
                );
              }
            });
        });
    }
  }

  /**
   * Model change detection
   */
  modelChange(isUsernameChanged = true) {
    if (isUsernameChanged) {
      this.isUsernameDirty = true;
    } else {
      this.isPasswordDirty = true;
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
