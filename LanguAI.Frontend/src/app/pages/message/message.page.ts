import { Component, ViewChild } from '@angular/core';
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
import { CHAT_GPT_ID, MESSAGES_NAVIGATION } from 'src/app/util/util.constants';
import { IonContent, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/util/services/alert.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  standalone: false
})
export class MessagePage {
  @ViewChild('content') content: IonContent | undefined;

  isChatGPT = false;
  chatForm: FormGroup | undefined;
  userId: number | null | undefined;
  messages: Array<MessageViewModel> = [];
  otherUser: UserViewModel | undefined;
  isValid = false;
  messageStatusEnum = MessageStatusEnum;
  navigateBackRouter = MESSAGES_NAVIGATION;

  loadDataSub: Subscription | undefined;
  sendMessageSub: Subscription | undefined;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private chatGPTService: ChatGptService,
    private navController: NavController,
    private alertService: AlertService
  ) {}

  async ionViewWillEnter() {
    await this.loadingService.showLoading();
    this.createForm();
    this.userId = this.localStorageService.getUserId();
    console.log(this.chatForm);
    this.loadMessages();
  }

  ionViewWillLeave() {
    this.loadDataSub?.unsubscribe();
    this.sendMessageSub?.unsubscribe();
  }

  /**
   * Send message
   * If the other user is ChatGPT, then asking for response too
   */
  async sendMessage(again = false, message?: MessageViewModel) {
    if (this.isValid) {
      if (this.isChatGPT) {
        await this.sendMessageToChatGPT();
      } else {
        await this.sendMessageToUser(again, message);
      }
    } else {
      this.toastrService.presentErrorToast(
        this.translateService.instant('THIS_MESSAGE_DOESNT_CONTAIN_TEXT')
      );
    }
  }

  /**
   * Resend the unsent message
   */
  resendMessage(message: MessageViewModel) {
    if (message && message.text?.length) {
      this.alertService
        .showConfirmAlert(
          this.translateService.instant('UNSENT_MESSAGE'),
          this.translateService.instant(
            'WOULD_YOU_LIKE_TO_TRY_RESEND_THE_MESSAGE'
          ),
          this.translateService.instant('YES')
        )
        .then(async (confirm: boolean) => {
          if (confirm) {
            await this.loadingService.showLoading();
            this.sendMessage(true, message);
            this.loadingService.hideLoading();
          }
        });
    } else {
      this.toastrService.presentErrorToast(
        this.translateService.instant('THIS_MESSAGE_DOESNT_CONTAIN_TEXT')
      );
    }
  }

  isMessageValid() {
    this.isValid = this.chatForm?.controls['message'].value?.trim()?.length;
  }

  /**
   * Navigate back without saving
   */
  navigateBackWithoutSaving(quit: boolean) {
    if (quit) {
      this.navController.back();
    }
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
          console.log(res);
          this.loadingService.hideLoading();

          // Settimeout is needed!
          setTimeout(() => {
            this.content?.scrollToBottom(100);
          }, 50);
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('ERROR_LOADING_CHAT')
          );
        }
      });
  }

  /**
   * Send message
   * If the other user is ChatGPT, then asking for response too
   */
  private async sendMessageToChatGPT() {
    if (this.isValid) {
      await this.loadingService.showLoading(
        this.translateService.instant('SENDING_MESSAGE')
      );

      this.sendMessageSub = this.messageService
        .sendMessageToChatGpt$Json({
          message: this.chatForm?.controls['message'].value
        })
        .pipe(
          switchMap((response: string) => {
            console.log(response);
            if (response?.length) {
              return this.messageService.getMessageListByUserId$Json({
                friendId: this.otherUser?.id
              });
            } else {
              return EMPTY;
            }
          })
        )
        .subscribe({
          next: (res: Array<MessageViewModel>) => {
            console.log(res);
            if (res) {
              this.messages = [...res];
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
            const newMessage: MessageViewModel = {
              recipientId: this.otherUser?.id,
              senderId: this.userId!,
              status: MessageStatusEnum.Unsent,
              text: this.chatForm?.controls['message'].value,
              sentAt: new Date().toDateString()
            };

            this.messages.push({ ...newMessage });
            setTimeout(() => {
              this.chatForm?.controls['message'].patchValue(null);
              this.content?.scrollToBottom();
            }, 200);
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('UNSUCCESSFUL_SENDING')
            );
          }
        });
    }
  }

  private async sendMessageToUser(again = false, message?: MessageViewModel) {
    await this.loadingService.showLoading(
      this.translateService.instant('SENDING_MESSAGE')
    );
    let newMessage: MessageViewModel;
    if (again) {
      if (message) {
        newMessage = { ...message, status: MessageStatusEnum.Sent };
      } else {
        this.loadingService.hideLoading();
        this.toastrService.presentErrorToast(
          this.translateService.instant('UNSUCCESSFUL_SENDING')
        );
        return;
      }
    } else {
      newMessage = {
        recipientId: this.otherUser?.id,
        senderId: this.userId!,
        status: this.isChatGPT
          ? MessageStatusEnum.Read
          : MessageStatusEnum.Sent,
        text: again ? message?.text : this.chatForm?.controls['message'].value
      };
    }
    this.sendMessageSub = this.messageService
      .sendMessage$Json({
        body: { ...newMessage }
      })
      .pipe(
        switchMap((success: boolean) => {
          if (success) {
            if (again) {
              const sentMessageIndex = this.messages.findIndex(
                m => m.sentAt === message?.sentAt
              );
              if (sentMessageIndex) {
                this.messages[sentMessageIndex] = {
                  ...this.messages[sentMessageIndex],
                  status: MessageStatusEnum.Sent
                };
              }
            } else {
              this.messages.push({ ...newMessage });
              setTimeout(() => {
                this.content?.scrollToBottom();
              }, 200);
              this.chatForm?.controls['message'].patchValue(null);
            }
            this.loadingService.hideLoading();

            return this.messageService.getMessageListByUserId$Json({
              friendId: this.otherUser?.id
            });
          } else {
            newMessage.status = MessageStatusEnum.Unsent;
            this.messages.push({ ...newMessage });
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('ERROR_SENDING_MESSAGE')
            );

            this.loadingService.hideLoading();
            return EMPTY;
          }
        }),
        switchMap((res: Array<MessageViewModel>) => {
          this.messages = [...res];
          setTimeout(() => {
            this.content?.scrollToBottom();
          }, 1000);
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
          newMessage.status = MessageStatusEnum.Unsent;
          this.messages.push({ ...newMessage });
          newMessage.sentAt = new Date().toDateString();
          setTimeout(() => {
            this.chatForm?.controls['message'].patchValue(null);
            this.content?.scrollToBottom();
          }, 200);
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_SENDING')
          );
        }
      });
  }
}
