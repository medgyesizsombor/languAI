import { Component } from '@angular/core';
import { CARD_LIST_NAVIGATION, PROFILE_TITLE } from '../../util/util.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FriendshipService,
  StorageService,
  UserService
} from 'src/api/services';
import {
  CardListViewModel,
  FriendshipViewModel,
  ImageViewModel,
  IntSelectorModel,
  UserViewModel
} from 'src/api/models';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/util/services/alert.service';
import { BadgeEnum } from 'src/app/util/enums/badge-enum';
import { FriendshipStatusEnum } from 'src/api/models';
import { FriendshipRequestService } from 'src/app/util/services/friendship-request.service';
import { FileService } from 'src/app/util/services/file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage {
  profileForm: FormGroup | undefined;
  title = this.translateService.instant(PROFILE_TITLE);
  profileModel: UserViewModel = {};
  isEdit = false;
  originalProfileModel: UserViewModel = {};
  userId: number | null | undefined;
  isProfileOfSomeoneElse: boolean | undefined;
  activeBadge = 1;
  friendshipStatus: FriendshipStatusEnum | undefined;
  friendshipStatusEnum = FriendshipStatusEnum;
  friendshipViewModel: FriendshipViewModel | undefined;
  cardLists: Array<CardListViewModel> = [
    // {
    //   id: 1,
    //   created: new Date().toString(),
    //   modified: new Date().toString(),
    //   learningLanguageI: 'magyar',
    //   nativeLanguage: 'hungarian',
    //   cardViewModelList: [
    //     { id: 1, wordInLearningLanguage: 'asd', wordInNativeLanguage: 'asd2' }
    //   ],
    //   name: 'asd',
    //   userId: 8
    // },
    // {
    //   id: 1,
    //   created: new Date().toString(),
    //   modified: new Date().toString(),
    //   learningLanguage: 'magyar',
    //   nativeLanguage: 'hungarian',
    //   cardViewModelList: [
    //     { id: 1, wordInLearningLanguage: 'asd', wordInNativeLanguage: 'asd2' }
    //   ],
    //   name: 'asd2',
    //   userId: 8
    // },
    // {
    //   id: 1,
    //   created: new Date().toString(),
    //   modified: new Date().toString(),
    //   learningLanguage: 'magyar',
    //   nativeLanguage: 'hungarian',
    //   cardViewModelList: [
    //     { id: 1, wordInLearningLanguage: 'asd', wordInNativeLanguage: 'asd2' }
    //   ],
    //   name: 'asd3',
    //   userId: 8
    // }
  ];
  showingFullsizeImage = false;
  imageSrc: string | undefined;

  sendFriendshipRequestSub: Subscription | undefined;
  reactFriendshipRequestSub: Subscription | undefined;
  getUserSub: Subscription | undefined;
  loadDataSub: Subscription | undefined;
  saveSub: Subscription | undefined;

  isLoading = true;

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
    private friendshipService: FriendshipService,
    private friendshipRequestService: FriendshipRequestService,
    private fileService: FileService,
    private storageService: StorageService
  ) {}

  ionViewWillEnter() {
    this.initialize();
  }

  ionViewDidLeave() {
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

    ['username', 'email', 'dateOfBirth'].forEach(control => {
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

  /**
   * Password Change
   */
  changePassword() {
    this.alertService.showChangePasswordAlert();
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
    this.friendshipRequestService
      .reactFriendshipRequest(accept, this.friendshipViewModel?.requesterId)
      .subscribe((res: FriendshipStatusEnum) => {
        if (res === FriendshipStatusEnum.Accepted) {
          this.friendshipViewModel!.status = FriendshipStatusEnum.Accepted;
        } else if (res === FriendshipStatusEnum.Deleted) {
          this.friendshipViewModel!.status = FriendshipStatusEnum.Deleted;
        }
      });
  }

  changeProfilePicture(image: ImageViewModel) {
    this.storageService
      .uploadBlob$Json({ body: image })
      .pipe(
        switchMap((imageId: number) => {
          if (imageId) {
            return this.userService.setProfilePicture$Json({ imageId });
          }

          this.loadingService.hideLoading();
          return EMPTY;
        })
      )
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            this.loadData();
          } else {
            this.toastrService.presentErrorToast(
              'UNSUCCESSFUL_CHANGING_PROFILE_PICTURE'
            );
          }
        },
        error: () => {
          this.toastrService.presentErrorToast(
            'UNSUCCESSFUL_CHANGING_PROFILE_PICTURE'
          );
        }
      });
  }

  openImageModal() {
    this.alertService.showProfilePictureAlert().then((isOpen: boolean) => {
      if (isOpen) {
        this.showingFullsizeImage = true;
      } else {
        this.alertService
          .showImageUploadAlert()
          .then((isCapturing: boolean) => {
            if (isCapturing) {
              this.fileService.createPhoto().then((image: ImageViewModel) => {
                this.changeProfilePicture(image);
              });
            } else {
              this.fileService.pickPhoto().then((image: ImageViewModel) => {
                this.changeProfilePicture(image);
              });
            }
          })
          .catch(() => {});
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
    // this.profileModel = {
    //   id: this.userId!,
    //   language: 1,
    //   dateOfBirth: '1998-04-20',
    //   email: 'teszt@teszt.com',
    //   username: 'zsombi'
    // };
    // this.isProfileOfSomeoneElse = true;
    // this.originalProfileModel = { ...this.profileModel };
    // this.fillForm();
    // this.loadingService.hideLoading();
    this.loadDataSub = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          const idFromParam = +params['id'];
          this.isProfileOfSomeoneElse = idFromParam
            ? this.userId !== idFromParam
            : false;

          return this.userService.getUserById$Json({
            userId: idFromParam ? +idFromParam : this.userId!
          });
        }),
        switchMap((res: UserViewModel) => {
          this.profileModel = res;
          this.fillForm();
          if (!this.isProfileOfSomeoneElse) {
            this.originalProfileModel = { ...this.profileModel };
            this.imageSrc = this.fileService.getImageSrc(
              this.originalProfileModel?.profilePicture?.contentAsString,
              this.originalProfileModel?.profilePicture?.type
            );
            this.loadingService.hideLoading();
            this.isLoading = false;
            return EMPTY;
          }

          return this.friendshipService.getFriendshipByUserId$Json({
            otherUserId: this.profileModel.id
          });
        })
      )
      .subscribe({
        next: (res: FriendshipViewModel) => {
          this.loadingService.hideLoading();
          this.friendshipViewModel = res;
          this.isLoading = false;
        },
        error: () => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.toastrService.presentErrorToast('DATA_ERROR');
        }
      });
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
      dateOfBirth: [{ value: '', disabled: true }, [Validators.required]]
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
