import { Injectable } from '@angular/core';
import { FriendshipStatusEnum, FriendshipViewModel } from 'src/api/models';
import { FriendshipService } from 'src/api/services';
import { LocalStorageService } from './localstorage.service';
import { ToastrService } from './toastr.service';
import { LoadingService } from './loading.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendshipRequestService {
  numberOfFriendshipRequest = 5;

  constructor(
    private friendshipService: FriendshipService,
    private localstorageService: LocalStorageService,
    private toastrService: ToastrService,
    private loadingService: LoadingService,
    private translateService: TranslateService
  ) {}

  async checkFriendshipRequest() {
    // async checkIncomingMessages() {
    //   return setInterval(() => {
    //     if (this.localDataService.getUserId()) {
    //       this.messageService
    //         .messageGetOldestIncomingMessage({
    //           driverId: this.localDataService.getUserId()
    //         })
    //         .subscribe({
    //           next: message => {
    //             if (
    //               message !== null &&
    //               !this.localDataService.isMessageNotified(message.uzenetId)
    //             ) {
    //               this.msgSubject.next(message);
    //             }
    //           },
    //           error: err => {
    //             console.log(err);
    //           }
    //         });
    //     }
    //   }, this.messageCheckRefreshRate);
    // }
    // return setInterval(this.getFriendshipRequest, 3600000);
  }

  async getFriendshipRequest() {
    // return setInterval(() => {
    //   if (this.localstorageService.getUserId()) {
    //     this.friendshipService.getNumberOfFriendshipRequest$Json().subscribe({
    //       next: (res: number | null) => {
    //         if (res) {
    //           this.localstorageService.setNumberOfFriendshipRequest(res);
    //         } else {
    //           this.localstorageService.removeNumberOfFriendshipRequest();
    //         }
    //       },
    //       error: () => {
    //         this.toastrService.presentErrorToast('NOTIFICATION_ERROR');
    //         this.localstorageService.removeNumberOfFriendshipRequest();
    //       }
    //     });
    //   }
    // }, 3600000);
  }

  /**
   * Reacting to friendship request
   */
  reactFriendshipRequest(
    accept = true,
    requesterId: number | undefined
  ): Observable<FriendshipStatusEnum> {
    this.loadingService.showLoading(
      this.translateService.instant('SENDING_REACT_TO_FRIENDSHIP_REQUEST')
    );

    const nextStatus = accept
      ? FriendshipStatusEnum.Accepted
      : FriendshipStatusEnum.Deleted;

    return this.friendshipService
      .reactFriendshipRequest$Json({
        friendshipStatus: nextStatus,
        requesterId
      })
      .pipe(
        map((res: FriendshipStatusEnum) => {
          switch (res) {
            case FriendshipStatusEnum.Requested: {
              this.toastrService.presentErrorToast(
                this.translateService.instant(
                  nextStatus === FriendshipStatusEnum.Accepted
                    ? 'ERROR_HAPPEND_WHEN_TRIED_TO_ACCEPT_FRIENDSHIP_REQUEST'
                    : 'ERROR_HAPPEND_WHEN_TRIED_TO_REJECT_FRIENDSHIP_REQUEST'
                )
              );
              return FriendshipStatusEnum.Requested;
            }
            case FriendshipStatusEnum.Deleted: {
              this.toastrService.presentSuccessToast(
                this.translateService.instant(
                  'SUCCESSFUL_REJECT_FRIENDSHIP_REQUEST'
                )
              );
              return FriendshipStatusEnum.Deleted;
            }
            default: {
              this.toastrService.presentSuccessToast(
                this.translateService.instant(
                  'SUCCESSFUL_ADDED_TO_YOUR_LIST_OF_FRIENDS'
                )
              );
              return FriendshipStatusEnum.Accepted;
            }
          }
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }
}
