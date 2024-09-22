import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {
  FriendshipRequestViewModel,
  FriendshipStatusEnum,
  FriendshipViewModel
} from 'src/api/models';
import { FriendshipService } from 'src/api/services';
import { FriendshipRequestService } from 'src/app/util/services/friendship-request.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage implements OnInit, OnDestroy {
  getFriendshipRequestListSub: Subscription | undefined;
  friendshipRequests: Array<FriendshipRequestViewModel> = [
    {
      created: Date().toString(),
      id: 2,
      requesterName: 'random',
      requesterId: 8
    },
    {
      created: Date().toString(),
      id: 2,
      requesterName: 'random',
      requesterId: 8
    }
  ];

  friendshipStatusEnum = FriendshipStatusEnum;

  reactFriendshipRequestSub: Subscription | undefined;

  constructor(
    private friendshipService: FriendshipService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private friendshipRequestService: FriendshipRequestService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loadFriendshipRequests();
  }

  ngOnDestroy() {
    this.reactFriendshipRequestSub?.unsubscribe();
    this.friendshipRequestService.numberOfFriendshipRequest =
      this.friendshipRequests.length;
  }

  /**
   * React to friendship request
   */
  reactFriendshipRequest(requesterId: number, accept = true) {
    this.reactFriendshipRequestSub = this.friendshipRequestService
      .reactFriendshipRequest(accept, requesterId)
      .subscribe((res: FriendshipStatusEnum) => {
        if (res !== FriendshipStatusEnum.Requested) {
          this.friendshipRequests.filter(f => f.requesterId !== requesterId);
        }
      });
  }

  private loadFriendshipRequests() {
    // this.loadingService
    //   .showLoading(
    //     this.translateService.instant('FRIENDSHIP_REQUESTS_ARE_LOADING')
    //   )
    //   .then(() => {
    //     this.getFriendshipRequestListSub = this.frienshipService
    //       .getFriendshipRequestList$Json()
    //       .subscribe({
    //         next: (res: Array<FriendshipRequestViewModel>) => {
    //           this.friendshipRequests = [...res];
    //           this.loadingService.hideLoading();
    //         },
    //         error: () => {
    //           this.loadingService.hideLoading();
    //           this.toastrService.presentErrorToast(
    //             this.translateService.instant('NOTIFICATION_ERROR')
    //           );
    //         }
    //       });
    //   });
  }
}
