import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CardListViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { AlertService } from 'src/app/util/services/alert.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import {
  CARD_LIST_NAVIGATION,
  CARD_LISTS_TITLE
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-card-lists',
  templateUrl: './card-lists.page.html',
  styleUrls: ['./card-lists.page.scss']
})
export class CardListsPage {
  title = this.translateService.instant(CARD_LISTS_TITLE);

  userId: number | null | undefined;
  cardLists: Array<CardListViewModel> = [];

  suggestedName: string | undefined;

  isLoading = true;

  getCardListsOfCurrentUserSub: Subscription | undefined;
  createCardListSub: Subscription | undefined;

  constructor(
    private cardService: CardService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private alertService: AlertService,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    this.userId = this.localStorageService.getUserId();
    this.loadCardLists();
  }

  ionViewDidLeave() {
    this.cardLists = [];
    this.getCardListsOfCurrentUserSub?.unsubscribe();
    this.createCardListSub?.unsubscribe();
  }

  addCardList() {
    const namesOfCardLists: Array<string> = this.cardLists
      ?.map(c => c.name)
      ?.filter((name): name is string => name !== null && name !== undefined);

    this.alertService
      .showCreateCardListAlert(
        namesOfCardLists?.length ? namesOfCardLists : [],
        'asd'
      )
      .then((name: string | null) => {
        if (name?.length) {
          this.loadingService.showLoading('CREATING_CARD_LIST').then(() => {
            this.createCardListSub = this.cardService
              .saveCardList$Json({
                body: {
                  userId: 7,
                  learningLanguage: 'english',
                  nativeLanguage: 'hungarian',
                  name
                }
              })
              .subscribe({
                next: cardListId => {
                  this.loadingService.hideLoading();
                  if (cardListId) {
                    this.openCardList(cardListId);
                  } else {
                    this.translateService.instant(
                      'ERROR_WHILE_SAVING_CARD_LIST'
                    );
                  }
                },
                error: () => {
                  this.loadingService.hideLoading();
                  this.translateService.instant('ERROR_WHILE_SAVING_CARD_LIST');
                }
              });
          });
        }
      });
  }

  /**
   * Open cardList
   */
  openCardList(cardListId: number) {
    this.navController.navigateForward(CARD_LIST_NAVIGATION + '/' + cardListId);
  }

  /**
   * Loading the list of card lists
   */
  private loadCardLists() {
    if (this.userId) {
      this.loadingService.showLoading().then(() => {
        this.getCardListsOfCurrentUserSub = this.cardService
          .getCardListsOfCurrentUser$Json({
            userId: this.userId!
          })
          .subscribe({
            next: (res: Array<CardListViewModel>) => {
              this.loadingService.hideLoading();
              this.isLoading = false;
              this.cardLists = res;
              this.generateSuggestedCardListName();
            },
            error: () => {
              this.loadingService.hideLoading();
              this.isLoading = false;
              this.toastrService.presentErrorToast(
                this.translateService.instant('DATA_ERROR')
              );
            }
          });
      });
    }
  }

  /**
   * Generate a Suggested CardList name
   */
  private generateSuggestedCardListName() {
    //TODO ezt meg kell csinálni úgy, hogy nativNyelv-tanulósNyelv-következőSzám
    //this.cardLists.forEach(a => console.log(a));
  }
}
