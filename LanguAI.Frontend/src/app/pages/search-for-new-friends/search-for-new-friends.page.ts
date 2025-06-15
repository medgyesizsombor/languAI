import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FriendshipStatusEnum, UserDiscoveryViewModel } from 'src/api/models';
import { FriendshipService } from 'src/api/services';
import { AlertService } from 'src/app/util/services/alert.service';
import { FileService } from 'src/app/util/services/file.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import {
  PROFILE_NAVIGATION,
  SEARCH_NEW_FRIENDS_TITLE,
  SETTINGS_NAVIGATION
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-search-for-new-friends',
  templateUrl: './search-for-new-friends.page.html',
  styleUrls: ['./search-for-new-friends.page.scss'],
  standalone: false
})
export class SearchForNewFriendsPage {
  title = this.translateService.instant(SEARCH_NEW_FRIENDS_TITLE);
  userList: Array<UserDiscoveryViewModel> = [];
  navigateBackRouter = SETTINGS_NAVIGATION;
  isLoading = true;

  sendFriendshipRequestSub: Subscription | undefined;
  deletePendingRequestSub: Subscription | undefined;
  getListOfDiscoverableUserSub: Subscription | undefined;

  friendshipStatusEnum = FriendshipStatusEnum;

  constructor(
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private friendshipService: FriendshipService,
    private toastrService: ToastrService,
    private navController: NavController,
    private alertService: AlertService,
    protected fileService: FileService
  ) {}

  ionViewWillEnter() {
    this.loadUsers();
  }

  ionViewWillLeave() {
    this.sendFriendshipRequestSub?.unsubscribe();
    this.deletePendingRequestSub?.unsubscribe();
    this.getListOfDiscoverableUserSub?.unsubscribe();
  }

  openProfile(userId: number | undefined) {
    if (userId) {
      this.navController.navigateForward(PROFILE_NAVIGATION + '/' + userId);
    }
  }

  async removePendingRequest(userId: number | undefined, index: number) {
    this.alertService
      .showConfirmAlert(
        this.translateService.instant('DELETE_FRIENDSHIP_REQUEST'),
        this.translateService.instant(
          'ARE_YOU_SURE_YOU_WANT_TO_DELETE_FRIENDSHIP_REQUEST_WITH',
          { name: this.userList[index].username }
        ),
        this.translateService.instant('DELETE')
      )
      .then(async (isDeleting: boolean) => {
        if (isDeleting) {
          await this.loadingService.showLoading(
            this.translateService.instant('DELETE_FRIENDSHIP_REQUEST_DOTDOTDOT')
          );
          this.deletePendingRequestSub = this.friendshipService
            .deletePendingRequest({ otherUserId: userId })
            .subscribe({
              next: () => {
                this.userList[index].friendshipStatusEnum = undefined;
                this.loadingService.hideLoading();
                this.toastrService.presentSuccessToast(
                  this.translateService.instant('SUCCESSFUL_DELETE')
                );
              },
              error: () => {
                this.loadingService.hideLoading();
                this.toastrService.presentErrorToast(
                  this.translateService.instant(
                    'ERROR_HAPPEND_WHEN_TRIED_TO_DELETE_REQUEST'
                  )
                );
              }
            });
        }
      });
  }

  /**
   * Send a friendship request
   */
  async sendFriendshipRequest(userId: number | undefined, index: number) {
    await this.loadingService.showLoading(
      this.translateService.instant('SENDING_FRIENDSHIP_REQUEST_DOTDOTDOT')
    );
    this.sendFriendshipRequestSub = this.friendshipService
      .requestFriendship$Json({
        recipientId: userId
      })
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            this.userList[index].friendshipStatusEnum =
              FriendshipStatusEnum.Requested;
            this.loadingService.hideLoading();
            this.toastrService.presentSuccessToast(
              this.translateService.instant(
                'SUCCESSFUL_FRIENDSHIP_REQUEST_SENT'
              )
            );
          } else {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant(
                'ERROR_HAPPEND_WHEN_SENT_FRIENDSHIP_REQUEST'
              )
            );
          }
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant(
              'ERROR_HAPPEND_WHEN_SENT_FRIENDSHIP_REQUEST'
            )
          );
        }
      });
  }

  private async loadUsers() {
    await this.loadingService.showLoading();

    this.getListOfDiscoverableUserSub = this.friendshipService
      .getListOfDiscoverableUser$Json()
      .subscribe({
        next: (users: Array<UserDiscoveryViewModel>) => {
          this.userList = [...users];
          this.isLoading = false;
          this.loadingService.hideLoading();
        },
        error: () => {
          this.isLoading = false;
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('USERS_COULDNT_BE_LOADED')
          );
        }
      });
  }
}
