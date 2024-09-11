import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { PROFILE_TITLE } from '../../util/util.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/api/services';
import { IntSelectorModel, UserViewModel } from 'src/api/models';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, switchMap } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/util/services/alert.service';
import { LanguageSelectModalComponent } from 'src/app/components/modals/language-select-modal/language-select-modal.component';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  @ViewChild('selectWrapperInner') selectWrapperInner: ElementRef | undefined;

  id = uuid();
  profileForm: FormGroup | undefined;
  title = this.translateService.instant(PROFILE_TITLE);
  profileModel: UserViewModel = {};
  isEdit = false;
  originalProfileModel: UserViewModel = {};
  getUserSub: Subscription | undefined;
  userId: number | null | undefined;
  someoneElseProfile = false;
  loadDataSub: Subscription | undefined;
  saveSub: Subscription | undefined;
  getLanguagesSub: Subscription | undefined;
  languages: Array<IntSelectorModel> = [
    { id: 1, name: 'hu' },
    { id: 2, name: 'en' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private navController: NavController,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.getUserSub?.unsubscribe();
    this.saveSub?.unsubscribe();
    this.loadDataSub?.unsubscribe();
  }

  /**
   * Change to edit mode
   */
  changeEditMode() {
    this.isEdit = !this.isEdit;

    const method = this.isEdit ? 'enable' : 'disable';

    ['username', 'email', 'dateOfBirth', 'language'].forEach(control => {
      this.profileForm?.controls[control][method]();
    });
  }

  /**
   * Save the profile
   */
  save() {
    this.loadingService.showLoading().then(() => {
      this.saveSub = this.userService
        .saveUser$Json({
          body: { ...this.profileForm?.value, id: this.userId! }
        })
        .subscribe({
          next: (success: boolean) => {
            this.loadingService.hideLoading();
            if (success) {
              this.isEdit = false;
              this.toastrService.presentSuccessToast(
                this.translateService.instant('SUCCESSFUL_SAVE')
              );
            } else {
              this.toastrService.presentErrorToast(
                this.translateService.instant('UNSUCCESSFUL_SAVE')
              );
            }
          },
          error: () => {
            this.loadingService.hideLoading();
            this.toastrService.presentSuccessToast(
              this.translateService.instant('UNSUCCESSFUL_SAVE')
            );
          }
        });
    });
  }

  navigateBack() {
    this.navController.back();
  }

  /**
   * Password Change
   */
  changePassword() {
    this.alertService.showChangePasswordAlert();
  }

  changeLanguage() {
    this.translateService.use(
      this.languages.find(
        l => l.id === this.profileForm?.controls['language'].value
      )?.name!
    );
  }

  async openLanguageSelect() {
    this.loadingService.showLoading().then(async () => {
      this.languages = [];
      if (!this.languages?.length) {
        this.getLanguagesSub;
      }
      const modal = await this.modalController.create({
        component: LanguageSelectModalComponent,
        componentProps: {
          allLanguages: this.languages
        }
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
      }
    });
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
    this.userId = this.localStorageService.getUserId();
    this.profileModel = {
      id: this.userId!,
      language: 1,
      dateOfBirth: '1998-04-20',
      email: 'teszt@teszt.com',
      username: 'zsombi'
    };
    this.originalProfileModel = { ...this.profileModel };
    this.fillForm();
    // this.loadDataSub = this.activatedRoute.params
    //   .pipe(
    //     switchMap((params: Params) => {
    //       const idFromParam = params['id'];
    //       this.someoneElseProfile = idFromParam?.length;

    //       return this.userService.getUserById$Json({
    //         userId: idFromParam?.length ? +idFromParam : this.userId!
    //       });
    //     })
    //   )
    //   .subscribe({
    //     next: (res: UserViewModel) => {
    //       this.profileModel = res;
    //       if (!this.someoneElseProfile) {
    //         this.originalProfileModel = { ...this.profileModel };
    //       }
    //       this.fillForm();
    //     },
    //     error: () => {
    //       this.loadingService.hideLoading();
    //     }
    //   });
  }

  /**
   * Create the form
   */
  private createForm() {
    this.profileForm = this.formBuilder.group({
      username: [{ value: '', disabled: true }, [Validators.required]],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email]
      ],
      dateOfBirth: [{ value: '', disabled: true }, [Validators.required]],
      language: [{ value: '', disabled: true }, [Validators.required]]
    });
  }

  /**
   * Fill the form
   */
  private fillForm() {
    this.profileForm?.patchValue({
      username: this.profileModel.username,
      email: this.profileModel.email,
      dateOfBirth: this.profileModel.dateOfBirth,
      language: this.profileModel.language
    });

    this.loadingService.hideLoading();
  }
}
