import { Component, OnDestroy, OnInit } from '@angular/core';
import { CARD_LIST_NAVIGATION, PROFILE_TITLE } from '../../util/util.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FriendshipService, UserService } from 'src/api/services';
import {
  CardListViewModel,
  FriendshipViewModel,
  IntSelectorModel,
  UserViewModel
} from 'src/api/models';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/util/services/alert.service';
import { LanguageSelectModalComponent } from 'src/app/components/modals/language-select-modal/language-select-modal.component';
import { BadgeEnum } from 'src/app/util/enums/badge-enum';
import { FriendshipStatusEnum } from 'src/api/models';

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
  userId: number | null | undefined;
  isProfileOfSomeoneElse: boolean | undefined;
  loadDataSub: Subscription | undefined;
  saveSub: Subscription | undefined;
  getLanguagesSub: Subscription | undefined;
  activeBadge = 1;
  friendshipStatus: FriendshipStatusEnum | undefined;
  friendshipStatusEnum = FriendshipStatusEnum;
  friendshipViewModel: FriendshipViewModel | undefined;
  sendFriendshipRequestSub: Subscription | undefined;
  reactFriendshipRequestSub: Subscription | undefined;
  cardLists: Array<CardListViewModel> = [
    {
      id: 1,
      created: new Date().toString(),
      modified: new Date().toString(),
      learningLanguage: 'magyar',
      nativeLanguage: 'hungarian',
      cardViewModelList: [
        { id: 1, wordInLearningLanguage: 'asd', wordInNativeLanguage: 'asd2' }
      ],
      name: 'asd',
      userId: 8
    },
    {
      id: 1,
      created: new Date().toString(),
      modified: new Date().toString(),
      learningLanguage: 'magyar',
      nativeLanguage: 'hungarian',
      cardViewModelList: [
        { id: 1, wordInLearningLanguage: 'asd', wordInNativeLanguage: 'asd2' }
      ],
      name: 'asd2',
      userId: 8
    },
    {
      id: 1,
      created: new Date().toString(),
      modified: new Date().toString(),
      learningLanguage: 'magyar',
      nativeLanguage: 'hungarian',
      cardViewModelList: [
        { id: 1, wordInLearningLanguage: 'asd', wordInNativeLanguage: 'asd2' }
      ],
      name: 'asd3',
      userId: 8
    }
  ];

  languages: Array<IntSelectorModel> = [
    { id: 1, name: 'hu' },
    { id: 2, name: 'en' }
  ];

  /**
   * To make BadgeEnum usable in the template
   */
  badgeEnum = BadgeEnum;

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
    private modalController: ModalController,
    private friendshipService: FriendshipService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.getUserSub?.unsubscribe();
    this.saveSub?.unsubscribe();
    this.loadDataSub?.unsubscribe();
    this.sendFriendshipRequestSub?.unsubscribe();
    this.reactFriendshipRequestSub?.unsubscribe();
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
   * Change active badge
   */
  setActiveBadge(indexOfActiveBudge: number) {
    if (this.activeBadge !== indexOfActiveBudge) {
      this.activeBadge = indexOfActiveBudge;
    }
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
   * Send a friendship request
   */
  sendRequest() {
    this.sendFriendshipRequestSub = this.friendshipService
      .requestFriendship$Json({
        recipientId: this.profileModel.id
      })
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            this.friendshipStatus = FriendshipStatusEnum.Requested;
            this.toastrService.presentSuccessToast(
              this.translateService.instant(
                'SUCCESSFUL_FRIENDSHIP_REQUEST_SENT'
              )
            );
          } else {
            this.toastrService.presentErrorToast(
              this.translateService.instant(
                'UNSUCCESSFUL_FRIENDSHIP_REQUEST_SENT'
              )
            );
          }
        },
        error: () => {
          this.toastrService.presentErrorToast(
            this.translateService.instant(
              'UNSUCCESSFUL_FRIENDSHIP_REQUEST_SENT'
            )
          );
        }
      });
  }

  /**
   * Navigate to chat
   */
  navigateToChat() {
    //TODO
  }

  /**
   * React friendship request
   * Default value true
   */
  async reactFriendshipRequest(accept = true) {
    await this.loadingService.showLoading();
    const nextStatus = accept
      ? FriendshipStatusEnum.Accepted
      : FriendshipStatusEnum.Deleted;

    this.reactFriendshipRequestSub = this.friendshipService
      .reactFriendshipRequest$Json({
        friendshipStatus: nextStatus,
        requesterId: this.friendshipViewModel?.requesterId
      })
      .subscribe({
        next: (res: FriendshipStatusEnum) => {
          switch (res) {
            case FriendshipStatusEnum.Requested: {
              this.toastrService.presentErrorToast(
                this.translateService.instant(
                  nextStatus === FriendshipStatusEnum.Accepted
                    ? 'ERROR_HAPPEND_WHEN_TRIED_TO_ACCEPT_FRIENDSHIP_REQUEST'
                    : 'ERROR_HAPPEND_WHEN_TRIED_TO_REJECT_FRIENDSHIP_REQUEST'
                )
              );
              this.loadingService.hideLoading();
              break;
            }
            case FriendshipStatusEnum.Deleted: {
              this.toastrService.presentSuccessToast(
                this.translateService.instant(
                  'SUCCESSFUL_REJECT_FRIENDSHIP_REQUEST'
                )
              );
              console.log(this.friendshipViewModel?.status);
              this.friendshipViewModel!.status = FriendshipStatusEnum.Deleted;
              console.log(this.friendshipViewModel?.status);
              this.loadingService.hideLoading();
              break;
            }
            default: {
              this.toastrService.presentSuccessToast(
                this.translateService.instant(
                  'SUCCESSFUL_ADDED_TO_YOUR_LIST_OF_FRIENDS'
                )
              );
              this.friendshipViewModel!.status = FriendshipStatusEnum.Accepted;
              this.loadingService.hideLoading();
              break;
            }
          }
        },
        error: () => {}
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
    this.isProfileOfSomeoneElse = true;
    this.originalProfileModel = { ...this.profileModel };
    this.fillForm();
    this.loadingService.hideLoading();
    // this.loadDataSub = this.activatedRoute.params
    //   .pipe(
    //     switchMap((params: Params) => {
    //       const idFromParam = +params['id'];
    //       this.isProfileOfSomeoneElse = idFromParam
    //         ? this.userId !== idFromParam
    //         : false;

    //       return this.userService.getUserById$Json({
    //         userId: idFromParam ? +idFromParam : this.userId!
    //       });
    //     }),
    //     switchMap((res: UserViewModel) => {
    //       this.profileModel = res;
    //       this.fillForm();
    //       if (!this.isProfileOfSomeoneElse) {
    //         this.originalProfileModel = { ...this.profileModel };
    //         return EMPTY;
    //       }

    //       return this.friendshipService.getFriendshipByUserId$Json({
    //         currentUserId: this.userId!,
    //         otherUserId: this.profileModel.id
    //       });
    //     })
    //   )
    //   .subscribe({
    //     next: (res: FriendshipViewModel) => {
    //       this.loadingService.hideLoading();
    //       this.friendshipViewModel = res;
    //     },
    //     error: () => {
    //       this.loadingService.hideLoading();
    //       this.toastrService.presentErrorToast('DATA_ERROR');
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
  }

  /**
   * Change status of friendship
   */
  private changeFriendshipStatus(
    oldStatus: FriendshipStatusEnum,
    newStatus: FriendshipStatusEnum
  ) {}

  /**
   * Open cardList
   */
  openCardList(cardListId: number) {
    this.navController.navigateForward(CARD_LIST_NAVIGATION + '/' + cardListId);
  }
}
