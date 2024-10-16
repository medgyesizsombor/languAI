import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from './toastr.service';
import { LoadingService } from './loading.service';
import { UserService } from 'src/api/services';
import { LocalStorageService } from './localstorage.service';
import { AccessEnum } from 'src/api/models';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert: HTMLIonAlertElement | undefined;

  constructor(
    private alertController: AlertController,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private loadingService: LoadingService,
    private userService: UserService,
    private localStorage: LocalStorageService
  ) {}

  /**
   * Show remove alert
   */
  async showRemoveAlert(message?: string): Promise<boolean> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('ATTENTION_TITLE'),
        subHeader: message,
        message: this.translateService.instant('REMOVE_QUESTION'),
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: this.translateService.instant('REMOVE'),
            role: 'confirm',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show create card list alert
   */
  async showCreateCardListAlert(
    namesOfCardLists: Array<string>,
    suggestedName: string
  ): Promise<string | null> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('ENTER_A_NAME'),
        cssClass: 'ion-input',
        inputs: [
          {
            type: 'text',
            name: 'title',
            attributes: {
              autocomplete: 'off'
            },
            value: suggestedName
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              resolve(null);
            }
          },
          {
            text: this.translateService.instant('CONFIRM'),
            role: 'confirm',
            handler: data => {
              if (namesOfCardLists?.length) {
                const isNameValid = this.isNameValid(
                  data.title,
                  namesOfCardLists as Array<string>
                );

                if (isNameValid) {
                  resolve(data.title);
                } else {
                  this.toastrService.presentErrorToast(
                    this.translateService.instant('NAME_IS_ALREADY_TAKEN')
                  );
                }
              } else {
                resolve(data.title);
              }
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show create cards alert
   */
  async showCreateCardsAlert(): Promise<string | null> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant(
          'ENTER_A_TOPIC_YOU_WANT_TO_LEARN_ABOUT'
        ),
        cssClass: 'ion-input',
        inputs: [
          {
            type: 'text',
            name: 'topic',
            attributes: {
              autocomplete: 'off'
            }
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              resolve(null);
            }
          },
          {
            text: this.translateService.instant('CONFIRM'),
            role: 'confirm',
            handler: data => {
              if (!data?.topic?.length) {
                this.toastrService.presentErrorToast(
                  this.translateService.instant('TOPIC_IS_EMPTY')
                );
              } else {
                resolve(data.topic);
              }
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show Alert if saving was missed
   */
  async showSavingMissedAlert(): Promise<boolean> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('CHANGES_ARE_NOT_SAVED'),
        subHeader: this.translateService.instant(
          'IF_YOU_QUIT_YOUR_CHANGES_WONT_BE_SAVED'
        ),
        cssClass: 'ion-input',
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: this.translateService.instant('CONFIRM'),
            role: 'confirm',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show Alert if there are too few cards to learn
   */
  async showTooFewCardsAlert(): Promise<void> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('TOO_FEW_OF_THE_CARDS'),
        subHeader: this.translateService.instant(
          'TO_LEARN_THIS_CARDS_THERE_HAS_TO_BE_AT_LEAST_30_CARDS'
        ),
        buttons: [
          {
            text: this.translateService.instant('OK'),
            role: 'confirm',
            handler: () => {
              resolve();
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show Change Password Alert
   */
  async showChangePasswordAlert(): Promise<string | null> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('CHANGE_PASSWORD'),
        cssClass: 'ion-input',
        inputs: [
          {
            type: 'text',
            name: 'oldPassword',
            placeholder: this.translateService.instant('OLD_PASSWORD'),
            attributes: {
              autocomplete: 'off'
            }
          },
          {
            type: 'text',
            name: 'newPassword',
            placeholder: this.translateService.instant('NEW_PASSWORD'),
            attributes: {
              autocomplete: 'off'
            }
          },
          {
            type: 'text',
            name: 'newPasswordConfirm',
            placeholder: this.translateService.instant('CONFIRM_NEW_PASSWORD'),
            attributes: {
              autocomplete: 'off'
            }
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              resolve(null);
            }
          },
          {
            text: this.translateService.instant('CONFIRM'),
            role: 'confirm',
            handler: data => {
              if (data.newPassword === data.newPasswordConfirm) {
                this.loadingService.showLoading().then(() => {
                  this.userService
                    .changePassword$Json({
                      body: {
                        newPassword: data.newPassword,
                        oldPassword: data.oldPassword,
                        userId: this.localStorage.getUserId()!
                      }
                    })
                    .subscribe({
                      next: (success: boolean) => {
                        this.loadingService.hideLoading();
                        if (success) {
                          this.toastrService.presentSuccessToast(
                            this.translateService.instant(
                              'SUCCESSFUL_PASSWORD_CHANGE'
                            )
                          );
                        } else {
                          this.toastrService.presentErrorToast(
                            this.translateService.instant(
                              'UNSUCCESSFUL_PASSWORD_CHANGE'
                            )
                          );
                        }
                      },
                      error: () => {
                        this.loadingService.hideLoading();
                        this.toastrService.presentErrorToast(
                          this.translateService.instant(
                            'UNSUCCESSFUL_PASSWORD_CHANGE'
                          )
                        );
                      }
                    });
                });
              }
              // if (namesOfCardLists?.length) {
              //   const isNameValid = this.isNameValid(
              //     data.title,
              //     namesOfCardLists as Array<string>
              //   );

              //   if (isNameValid) {
              //     resolve(data.title);
              //   } else {
              //     this.toastrService.presentErrorToast(
              //       this.translateService.instant('NAME_IS_ALREADY_TAKEN')
              //     );
              //   }
              // } else {
              //   resolve(data.title);
              // }
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show delete user alert
   */
  async showDeleteUserAlert(message?: string): Promise<boolean> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('ATTENTION_TITLE'),
        subHeader: message,
        message: this.translateService.instant('DELETE_PROFILE_QUESTION'),
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: this.translateService.instant('DELETE_PROFILE'),
            role: 'confirm',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show cancel/confirm alert
   * TODO: kiszervezni a confirm / cancel alerteket egybe
   */
  // async showDeleteUserAlert(message?: string): Promise<boolean> {
  //   return new Promise(async resolve => {
  //     this.alert = await this.alertController.create({
  //       header: this.translateService.instant('ATTENTION_TITLE'),
  //       subHeader: message,
  //       message: this.translateService.instant('DELETE_PROFILE_QUESTION'),
  //       buttons: [
  //         {
  //           text: this.translateService.instant('CANCEL'),
  //           role: 'cancel',
  //           handler: () => {
  //             resolve(false);
  //           }
  //         },
  //         {
  //           text: this.translateService.instant('DELETE_PROFILE'),
  //           role: 'confirm',
  //           handler: () => {
  //             resolve(true);
  //           }
  //         }
  //       ]
  //     });

  //     this.alert.present();
  //   });
  // }

  /**
   * Show access alert
   */
  async showAccessAlert(currentAccess: AccessEnum): Promise<AccessEnum | null> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('ACCESS_TITLE'),
        message: this.translateService.instant('WHO_CAN_SEE_THIS_QUESTION'),
        inputs: [
          {
            label: this.translateService.instant('ONLY_ME'),
            type: 'radio',
            value: AccessEnum.Private,
            checked: currentAccess === AccessEnum.Private
          },
          {
            label: this.translateService.instant('ONLY_MY_FRIENDS'),
            type: 'radio',
            value: AccessEnum.Protected,
            checked: currentAccess === AccessEnum.Protected
          },
          {
            label: this.translateService.instant('EVERYBODY'),
            type: 'radio',
            value: AccessEnum.Public,
            checked: currentAccess === AccessEnum.Public
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              resolve(null);
            }
          },
          {
            text: this.translateService.instant('CONFIRM'),
            role: 'confirm',
            handler: data => {
              resolve(data);
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show existing learning alert
   */
  async showExistingLearningAlert(): Promise<boolean> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('ATTENTION_TITLE'),
        message: this.translateService.instant(
          'YOU_ALREADY_HAVE_LEARNING_LIKE_THIS_WOULD_YOU_LIKE_TO_MAKE_THAT_ACTIVE_QUESTIONMARK'
        ),
        buttons: [
          {
            text: this.translateService.instant('NO'),
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: this.translateService.instant('CONFIRM'),
            role: 'confirm',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show confirm alert
   */
  async showConfirmAlert(
    header: string,
    message: string,
    confirmText: string
  ): Promise<boolean> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: this.translateService.instant('NO'),
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: confirmText,
            role: 'confirm',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * The name is not taken
   */
  private isNameValid(title: string, namesOfCardLists: Array<string>): boolean {
    return !namesOfCardLists.includes(title);
  }
}
