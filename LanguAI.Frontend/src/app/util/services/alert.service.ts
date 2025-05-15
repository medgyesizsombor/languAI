import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from './toastr.service';
import { LoadingService } from './loading.service';
import { UserService } from 'src/api/services';
import { LocalStorageService } from './localstorage.service';
import { AccessEnum } from 'src/api/models';
import { LanguageEnum } from '../enums/language-enum';
import { CardlistsSortEnum } from '../enums/cardlists-sort-enum';
import { RoleBooleanDataViewModel } from '../models/role-boolean-data-view-model';

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
    private localStorageService: LocalStorageService
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
  async showCreateCardsAlert(name: string): Promise<boolean> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('GENERATING_CARDS'),
        message: this.translateService.instant('DO_YOU_WANT_CREATE_CARDS_FOR', {
          name
        }),
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
   * Show Alert if sending message was missed
   */
  async showSendingMissedAlert(): Promise<boolean> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('MESSAGE_WAS_NOT_SENT'),
        subHeader: this.translateService.instant(
          'IF_YOU_QUIT_YOUR_MESSAGE_WONT_BE_SENT'
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
                        userId: this.localStorageService.getUserId()!
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
    confirmText = this.translateService.instant('CONFIRM')
  ): Promise<boolean> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
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
   * Show language select alert
   */
  async showLanguageAlert(
    currentLanguage: LanguageEnum
  ): Promise<string | null> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('LANGUAGE_OF_APPLICATION'),
        message: this.translateService.instant('SELECT_A_LANGUAGE'),
        inputs: [
          {
            label: this.translateService.instant('HUNGARIAN'),
            type: 'radio',
            value: LanguageEnum.hungarian,
            checked: currentLanguage === LanguageEnum.hungarian
          },
          {
            label: this.translateService.instant('ENGLISH'),
            type: 'radio',
            value: LanguageEnum.english,
            checked: currentLanguage === LanguageEnum.english
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
              resolve(data === LanguageEnum.hungarian ? 'hu' : 'en');
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show image alert
   */
  async showImageUploadAlert(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('UPLOAD_PHOTO'),
        message: this.translateService.instant('CAPTURE_OR_CHOOSE_PHOTO'),
        inputs: [
          {
            label: this.translateService.instant('CAPTURE_PHOTO'),
            type: 'radio',
            value: true,
            checked: true
          },
          {
            label: this.translateService.instant('CHOOSE_FROM_GALLERY'),
            type: 'radio',
            value: false
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              reject();
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
   * Show profile picture alert
   */
  async showProfilePictureAlert(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('PROFILE_PICTURE'),
        message: this.translateService.instant('OPEN_OR_UPLOAD_PHOTO'),
        inputs: [
          {
            label: this.translateService.instant('OPEN'),
            type: 'radio',
            value: true,
            checked: true
          },
          {
            label: this.translateService.instant('UPLOAD'),
            type: 'radio',
            value: false
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              reject();
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
   * Show chatGPT alert
   */
  async showChatGPTAlert(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('REQUEST_HELP_FROM_CHATGPT'),
        inputs: [
          {
            label: this.translateService.instant('ASSISTANCE_WITH_PHRASING'),
            type: 'radio',
            value: true,
            checked: true
          },
          {
            label: this.translateService.instant('CORRECTING_MISTAKES_IN_TEXT'),
            type: 'radio',
            value: false
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              reject();
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
   * Show create card list alert
   */
  async showPhrasingAlert(): Promise<string | null> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('PHRASING'),
        message: this.translateService.instant(
          'WHAT_SHOULD_BE_YOUR_POST_BASED_ON'
        ),
        cssClass: 'ion-input',
        inputs: [
          {
            type: 'text',
            name: 'title',
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
              if (data?.title?.length) {
                resolve(data?.title?.trim());
              } else {
                resolve(null);
              }
            }
          }
        ]
      });

      this.alert.present();
    });
  }

  /**
   * Show sort alert
   */
  async showSortAlert(
    currentSort: CardlistsSortEnum
  ): Promise<CardlistsSortEnum | null> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('SORT'),
        message: this.translateService.instant('WHAT_SHOULD_BE_THE_ORDER'),
        inputs: [
          {
            label: this.translateService.instant('DATE_ASC'),
            type: 'radio',
            value: CardlistsSortEnum.dateDesc,
            checked: currentSort === CardlistsSortEnum.dateDesc
          },
          {
            label: this.translateService.instant('DATE_DESC'),
            type: 'radio',
            value: CardlistsSortEnum.dateAsc,
            checked: currentSort === CardlistsSortEnum.dateAsc
          },
          {
            label: this.translateService.instant('ALPHABETIC_ASC'),
            type: 'radio',
            value: CardlistsSortEnum.alphabetAsc,
            checked: currentSort === CardlistsSortEnum.alphabetAsc
          },
          {
            label: this.translateService.instant('ALPHABETIC_DESC'),
            type: 'radio',
            value: CardlistsSortEnum.alphabetDesc,
            checked: currentSort === CardlistsSortEnum.alphabetDesc
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
   * Show edit post alert
   */
  async showEditPostAlert(): Promise<RoleBooleanDataViewModel> {
    return new Promise(async resolve => {
      this.alert = await this.alertController.create({
        header: this.translateService.instant('EDIT_POST'),
        message: this.translateService.instant('EDIT_OR_DELETE_QUESTION'),
        inputs: [
          {
            label: this.translateService.instant('EDIT_POST'),
            type: 'radio',
            value: true
          },
          {
            label: this.translateService.instant('DELETE_POST'),
            type: 'radio',
            value: false
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('CANCEL'),
            role: 'cancel',
            handler: () => {
              resolve({
                role: 'cancel',
                data: undefined
              });
            }
          },
          {
            text: this.translateService.instant('CONFIRM'),
            role: 'confirm',
            handler: data => {
              resolve({ role: 'confirm', data });
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
