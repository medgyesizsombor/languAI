import { Component } from '@angular/core';
import { FriendshipRequestService } from 'src/app/util/services/friendship-request.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  numberOfFriendshipRequest = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private friendshipRequestService: FriendshipRequestService
  ) {
    // this.numberOfFriendshipRequest =
    //   localStorageService.getNumberOfFriendshipRequest() ?? 0;
    this.numberOfFriendshipRequest =
      this.friendshipRequestService.numberOfFriendshipRequest;
  }
}
