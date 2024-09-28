import { Component, OnDestroy, OnInit } from '@angular/core';
import { MESSAGE_NAVIGATION, MESSAGES_TITLE } from '../../util/util.constants';
import { TranslateService } from '@ngx-translate/core';
import { IntSelectorModel } from 'src/api/models';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { FriendshipService } from 'src/api/services';
import { ModalController, NavController } from '@ionic/angular';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/util/services/alert.service';
import { CreateNewMessageModalComponent } from 'src/app/components/modals/create-new-message-modal/create-new-message-modal.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage implements OnInit, OnDestroy {
  title = this.translateService.instant(MESSAGES_TITLE);
  friendList: Array<IntSelectorModel> = [
    // { id: 1, name: 'asd' },
    // { id: 2, name: 'asdasd' }
  ];
  getFriendListSub: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private friendshipService: FriendshipService,
    private navController: NavController,
    private toastrService: ToastrService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadFriends();
  }

  ngOnDestroy() {
    this.getFriendListSub?.unsubscribe();
  }

  async newMessage() {
    const modal = await this.modalController.create({
      component: CreateNewMessageModalComponent,
      componentProps: {
        friendList: this.friendList
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

  openMessage(id: number | undefined) {
    if (id) {
      this.navController.navigateForward(MESSAGE_NAVIGATION + '/' + id);
    } else {
      this.toastrService.presentErrorToast('MESSAGE_NAVIGATION_ERROR');
    }
  }

  private loadFriends() {
    const userId = this.localStorageService.getUserId();
    this.loadingService.showLoading().then(() => {
      if (userId) {
        this.getFriendListSub = this.friendshipService
          .getFriendList$Json({
            userId
          })
          .subscribe({
            next: (res: Array<IntSelectorModel>) => {
              this.friendList = res;
              this.loadingService.hideLoading();
            },
            error: () => {
              this.loadingService.hideLoading();
              this.toastrService.presentErrorToast('DATA_ERROR');
            }
          });
      }
    });
  }
}
