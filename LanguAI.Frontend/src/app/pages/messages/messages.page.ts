import { Component } from '@angular/core';
import { MESSAGE_NAVIGATION, MESSAGES_TITLE } from '../../util/util.constants';
import { TranslateService } from '@ngx-translate/core';
import { IntSelectorModel, OtherUserViewModel } from 'src/api/models';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { FriendshipService } from 'src/api/services';
import { ModalController, NavController } from '@ionic/angular';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/util/services/alert.service';
import { CreateNewMessageModalComponent } from 'src/app/components/modals/create-new-message-modal/create-new-message-modal.component';
import { FileService } from 'src/app/util/services/file.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
  standalone: false
})
export class MessagesPage {
  title = this.translateService.instant(MESSAGES_TITLE);
  friendList: Array<OtherUserViewModel> = [];
  isLoading = true;

  getFriendListSub: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private friendshipService: FriendshipService,
    private navController: NavController,
    private toastrService: ToastrService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private modalController: ModalController,
    protected fileService: FileService
  ) {}

  ionViewWillEnter() {
    this.loadFriends();
  }

  ionViewWillLeave() {
    this.getFriendListSub?.unsubscribe();
  }

  async newMessage() {
    const modal = await this.modalController.create({
      mode: 'md',
      component: CreateNewMessageModalComponent,
      componentProps: {
        friendList: this.friendList
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.navController.navigateForward(MESSAGE_NAVIGATION + '/' + data);
    }
  }

  openMessage(id: number | undefined) {
    if (id) {
      this.navController.navigateForward(MESSAGE_NAVIGATION + '/' + id);
    } else {
      this.toastrService.presentErrorToast(
        this.translateService.instant('MESSAGE_NAVIGATION_ERROR')
      );
    }
  }

  private async loadFriends() {
    const userId = this.localStorageService.getUserId();
    await this.loadingService.showLoading();
    if (userId) {
      this.getFriendListSub = this.friendshipService
        .getFriendList$Json({
          userId,
          showChatGPT: true
        })
        .subscribe({
          next: (res: Array<OtherUserViewModel>) => {
            const filteredFriendlist = res.filter(f => f.lastMessage);

            this.friendList = filteredFriendlist.sort((a, b) =>
              new Date(a.lastMessage!.sentAt!).getTime() <
              new Date(b.lastMessage!.sentAt!).getTime()
                ? -1
                : 1
            );

            this.isLoading = false;
            this.loadingService.hideLoading();
          },
          error: () => {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('DATA_ERROR')
            );
          }
        });
    }
  }
}
