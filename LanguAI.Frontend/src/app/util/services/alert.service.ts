import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from './toastr.service';
import { IntSelectorModel } from 'src/api/models';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert: HTMLIonAlertElement | undefined;

  constructor(
    private alertController: AlertController,
    private translateService: TranslateService,
    private toastrService: ToastrService
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
   * The name is not taken
   */
  private isNameValid(title: string, namesOfCardLists: Array<string>): boolean {
    return !namesOfCardLists.includes(title);
  }
}
