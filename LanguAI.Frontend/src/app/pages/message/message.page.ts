import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { MessageStatusEnum, UserViewModel } from 'src/api/models';
import { ChatGptService, MessageService, UserService } from 'src/api/services';
import { MessageViewModel } from 'src/api/models/message-view-model';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { CHAT_GPT_ID } from 'src/app/util/util.constants';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss']
})
export class MessagePage implements OnInit, OnDestroy {
  isChatGPT = false;
  chatForm: FormGroup | undefined;
  userId: number | null | undefined;
  messages: Array<MessageViewModel> = [];
  otherUser: UserViewModel | undefined;
  loadDataSub: Subscription | undefined;
  sendMessageSub: Subscription | undefined;
  isValid = false;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private chatGPTService: ChatGptService
  ) {}

  async ngOnInit() {
    await this.loadingService.showLoading();
    this.createForm();
    this.userId = this.localStorageService.getUserId();
    this.loadMessages();
  }

  ngOnDestroy() {
    this.loadDataSub?.unsubscribe();
    this.sendMessageSub?.unsubscribe();
  }

  /**
   * Send message
   * If the other user is ChatGPT, then asking for response too
   */
  async sendMessage() {
    if (this.isValid) {
      await this.loadingService.showLoading();
      this.sendMessageSub = this.messageService
        .sendMessage$Json({
          body: {
            recipientId: this.otherUser?.id,
            senderId: this.userId!,
            status: this.isChatGPT
              ? MessageStatusEnum.Read
              : MessageStatusEnum.Sent,
            text: this.chatForm?.controls['message'].value
          }
        })
        .pipe(
          switchMap((success: boolean) => {
            if (success) {
              this.chatForm?.controls['message'].patchValue(null);
              this.loadingService.hideLoading();

              return this.messageService.getMessageListByUserId$Json({
                friendId: this.otherUser?.id
              });
            } else {
              this.loadingService.hideLoading();
              this.toastrService.presentErrorToast(
                this.translateService.instant('ERROR_SENDING_MESSAGE')
              );
              return EMPTY;
            }
          }),
          switchMap((res: Array<MessageViewModel>) => {
            this.messages = [...res];
            this.loadingService.hideLoading();

            if (this.isChatGPT) {
              return this.chatGPTService.receiveMessageFromChatGpt$Json({});
            }
            return EMPTY;
          })
        )
        .subscribe({
          next: (res: MessageViewModel) => {
            if (res) {
              this.messages.push({ ...res });
            } else {
              this.toastrService.presentErrorToast(
                this.translateService.instant(
                  'ERROR_RECEIVING_MESSAGE_FROM_CHATGPT'
                )
              );
            }
            this.loadingService.hideLoading();
          },
          error: () => {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('ERROR_REFRESH_CHAT')
            );
          }
        });
    }
  }

  isMessageValid() {
    this.isValid = this.chatForm?.controls['message'].value?.trim()?.length;
  }

  /**
   * Create the form
   */
  private createForm() {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  /**
   * Load the messages, load and set the other user
   */
  private loadMessages() {
    this.loadDataSub = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          const otherUserId = params['id'];
          if (+otherUserId === CHAT_GPT_ID) {
            this.isChatGPT = true;
          }

          return this.userService.getUserById$Json({ userId: otherUserId });
        }),
        switchMap((user: UserViewModel) => {
          this.otherUser = { ...user };

          return this.messageService.getMessageListByUserId$Json({
            friendId: this.otherUser.id
          });
        })
      )
      .subscribe({
        next: (res: Array<MessageViewModel>) => {
          this.messages = [...res];
          this.loadingService.hideLoading();
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('ERROR_LOADING_CHAT')
          );
        }
      });
  }
}
