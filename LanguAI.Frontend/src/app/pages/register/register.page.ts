import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { LOGIN_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  registerForm: FormGroup | undefined;

  registerSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    library: FaIconLibrary,
    private loadingService: LoadingService,
    private registrationService: RegistrationService,
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
    this.registerSub?.unsubscribe();
  }

  register() {
    if (this.isValid()) {
      this.loadingService
        .showLoading(this.translateService.instant('REGISTRATION'))
        .then(() => {
          //TODO: Ország selecttel majd kipótolni
          this.registerSub = this.registrationService
            .register$Json({
              body: {
                username: this.registerForm?.get('username')?.value,
                email: this.registerForm?.get('email')?.value,
                dateOfBirth: '1998-04-20',
                password: this.registerForm?.get('password')?.value,
                language: 1
              }
            })
            .subscribe({
              next: res => {
                this.loadingService.hideLoading();
                if (res) {
                  //TODO: Bejelentkeztetni
                  this.toastrService.presentSuccessToast(
                    this.translateService.instant('SUCCESSFUL_REGISTRATION')
                  );
                  this.router.navigate(['/' + LOGIN_NAVIGATION]);
                } else {
                  this.toastrService.presentErrorToast(
                    this.translateService.instant(
                      'ERROR_HAPPEND_WHEN_TRIED_TO_REGISTER'
                    )
                  );
                }
              },
              error: () => {
                this.loadingService.hideLoading();
                this.toastrService.presentErrorToast(
                  this.translateService.instant(
                    'ERROR_HAPPEND_WHEN_TRIED_TO_REGISTER'
                  )
                );
              }
            });
        });
    }
  }

  openModal() {}

  private createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  /**
   * Check if model is valid
   */
  private isValid(): boolean {
    return (
      !this.registerForm?.get('username')?.errors &&
      !this.registerForm?.get('email')?.errors &&
      !this.registerForm?.get('dateOfBirth')?.errors &&
      !this.registerForm?.get('password')?.errors &&
      !this.registerForm?.get('confirmPassword')?.errors &&
      this.registerForm?.get('confirmPassword')?.value ===
        this.registerForm?.get('password')?.value
    );
  }
}
