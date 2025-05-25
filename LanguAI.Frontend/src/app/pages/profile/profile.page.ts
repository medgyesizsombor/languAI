import { Component } from '@angular/core';
import {
  CARD_LIST_NAVIGATION,
  MESSAGE_NAVIGATION,
  PROFILE_NAVIGATION,
  PROFILE_TITLE
} from '../../util/util.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FriendshipService,
  StorageService,
  UserService
} from 'src/api/services';
import {
  CardListViewModel,
  FriendshipViewModel,
  ImageViewModel,
  ProfilePageDataViewModel,
  UserDiscoveryViewModel
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
import { RoleBooleanDataViewModel } from 'src/app/util/models/role-boolean-data-view-model';
import { TopicImageSrcPipe } from 'src/app/util/pipes/topic-image-src.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage {
  profileForm: FormGroup | undefined;
  title = this.translateService.instant('DETAILS');
  subtitle = this.translateService.instant('DETAILS_SUBTITLE');
  profileModel: ProfilePageDataViewModel = {};
  isEdit = false;
  originalProfileModel: ProfilePageDataViewModel = {};
  userId: number | null | undefined;
  isProfileOfSomeoneElse: boolean | undefined;
  activeBadge = BadgeEnum.friendList;
  friendList: Array<UserDiscoveryViewModel> = [];
  friendshipStatus: FriendshipStatusEnum | undefined;
  friendshipStatusEnum = FriendshipStatusEnum;
  friendshipViewModel: FriendshipViewModel | undefined;
  cardLists: Array<CardListViewModel> = [];
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
    protected fileService: FileService,
    private storageService: StorageService,
    protected topicImageSrcPipe: TopicImageSrcPipe
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

      switch (this.activeBadge) {
        case BadgeEnum.friendList: {
          this.title = this.translateService.instant('FRIENDLIST');
          this.subtitle = this.translateService.instant('FRIENDLIST_SUBTITLE');
          break;
        }
        case BadgeEnum.cards: {
          this.title = this.translateService.instant('CARDS');
          this.subtitle = this.translateService.instant('CARDS_SUBTITLE');
          break;
        }
        default: {
          this.title = this.translateService.instant('DETAILS');
          this.subtitle = this.translateService.instant('DETAILS_SUBTITLE');
          break;
        }
      }
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
        recipientId: this.profileModel.user?.id
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
    this.navController.navigateForward(MESSAGE_NAVIGATION + '/' + this.userId);
  }

  navigateToUserPage(userId: number) {
    this.navController.navigateForward(PROFILE_NAVIGATION + '/' + userId);
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
    this.alertService
      .showProfilePictureAlert()
      .then((res: RoleBooleanDataViewModel) => {
        if (res.role === 'confirm' && res.data) {
          this.showingFullsizeImage = true;
        } else if (res.role === 'confirm' && !res.data) {
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
            .catch(() => {
              this.toastrService.presentErrorToast(
                this.translateService.instant('PROFILE_PICTURE_ERROR')
              );
            });
        }
      });
  }

  /**
   * Initialize
   */
  private initialize() {
    this.loadingService
      .showLoading(this.translateService.instant('DATA_IS_LOADING_DOTDOTDOT'))
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
    this.loadDataSub = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          const idFromParam = +params['id'];
          this.isProfileOfSomeoneElse = idFromParam
            ? this.userId !== idFromParam
            : false;
          //this.isProfileOfSomeoneElse = true;

          return this.userService.getProfilePageData$Json({
            userId: idFromParam ? +idFromParam : this.userId!
          });
        }),
        switchMap((res: ProfilePageDataViewModel) => {
          this.profileModel = res;
          this.fillForm();
          if (!this.isProfileOfSomeoneElse) {
            this.originalProfileModel = { ...this.profileModel };
            this.imageSrc = this.fileService.getImageSrc(
              this.originalProfileModel?.user?.profilePicture?.contentAsString,
              this.originalProfileModel?.user?.profilePicture?.type
            );
            this.loadingService.hideLoading();
            this.isLoading = false;
            return EMPTY;
          }

          return this.friendshipService.getFriendshipByUserId$Json({
            otherUserId: this.profileModel.user?.id
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
      username: this.profileModel.user?.username,
      email: this.profileModel.user?.email,
      dateOfBirth: this.profileModel.user?.dateOfBirth
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
