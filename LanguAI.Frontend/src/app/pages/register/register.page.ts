import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import {
  LESSONS_NAVIGATION,
  LOGIN_NAVIGATION
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup | undefined;

  today = new Date().toISOString();

  registerSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private registrationService: RegistrationService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private router: Router,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    this.createForm();
  }

  ionViewDidLeave() {
    this.registerSub?.unsubscribe();
  }

  async register() {
    if (this.isValid()) {
      await this.loadingService.showLoading(
        this.translateService.instant('REGISTRATION_DOTDOTDOT')
      );

      //TODO: Ország selecttel majd kipótolni
      this.registerSub = this.registrationService
        .register$Json({
          body: {
            username: this.registerForm?.get('username')?.value,
            email: this.registerForm?.get('email')?.value,
            dateOfBirth: this.registerForm?.get('dateOfBirth')?.value,
            password: this.registerForm?.get('password')?.value,
            language: 1
          }
        })
        .subscribe({
          next: res => {
            this.loadingService.hideLoading();
            if (res) {
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
    }
  }

  /**
   * Continue without login
   */
  continueWithoutLogin() {
    this.navController.navigateForward(['/' + LESSONS_NAVIGATION]);
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: [new Date().toISOString(), Validators.required],
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
