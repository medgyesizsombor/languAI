import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import {
  IonSearchbarCustomEvent,
  SearchbarInputEventDetail
} from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CardListViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { NewCardlistModalComponent } from 'src/app/components/modals/new-cardlist/new-cardlist-modal.component';
import { CardlistsSortEnum } from 'src/app/util/enums/cardlists-sort-enum';
import { TopicImageSrcPipe } from 'src/app/util/pipes/topic-image-src.pipe';
import { AlertService } from 'src/app/util/services/alert.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import {
  CARD_LIST_NAVIGATION,
  HUNGARIAN_LANGUAGE_CODE,
  LEARNINGS_NAVIGATION
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-card-lists',
  templateUrl: './card-lists.page.html',
  styleUrls: ['./card-lists.page.scss'],
  standalone: false
})
export class CardListsPage {
  userId: number | null | undefined;
  originalCardLists: Array<CardListViewModel> = [];
  cardLists: Array<CardListViewModel> = [];
  suggestedName: string | undefined;
  isLoading = true;
  sortedAsc = true;
  currentSort = CardlistsSortEnum.dateDesc;

  getCardListsOfCurrentUserSub: Subscription | undefined;
  createCardListSub: Subscription | undefined;

  constructor(
    private cardService: CardService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private alertService: AlertService,
    private navController: NavController,
    private modalController: ModalController,
    protected topicImageSrcPipe: TopicImageSrcPipe
  ) {}

  ionViewWillEnter() {
    this.userId = this.localStorageService.getUserId();
    this.loadCardLists();
    //this.addCardList();
  }

  ionViewWillLeave() {
    this.cardLists = [];
    this.getCardListsOfCurrentUserSub?.unsubscribe();
    this.createCardListSub?.unsubscribe();
  }

  async addCardList() {
    if (this.localStorageService.getCurrentLearning()) {
      const modal = await this.modalController.create({
        mode: 'md',
        component: NewCardlistModalComponent,
        componentProps: {
          suggestedName: this.suggestedName
        }
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data) {
        const currentLearning = this.localStorageService.getCurrentLearning();

        if (data.name.length) {
          this.loadingService.showLoading('CREATING_CARD_LIST').then(() => {
            this.createCardListSub = this.cardService
              .saveCardList$Json({
                body: {
                  userId: this.localStorageService.getUserId()!,
                  learningLanguageId: currentLearning?.learningLanguageId,
                  nativeLanguageId: currentLearning?.nativeLanguageId,
                  name: data.name,
                  topicId: data.topicId
                }
              })
              .subscribe({
                next: cardListId => {
                  this.generateSuggestedCardListName();
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
      }
    } else {
      await this.alertService
        .showNotExistingLearningAlert()
        .then((navigate: boolean) => {
          if (navigate) {
            this.navController.navigateForward(LEARNINGS_NAVIGATION);
          }
        });
    }
  }

  /**
   * Open cardList
   */
  openCardList(cardListId: number) {
    this.navController.navigateForward(CARD_LIST_NAVIGATION + '/' + cardListId);
  }

  search(event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    if (event.detail.value?.length) {
      this.cardLists = [...this.originalCardLists].filter(cl =>
        cl.name?.startsWith(event.detail.value!)
      );
      this.sort();
    } else {
      this.clearSearchbar();
    }
  }

  clearSearchbar() {
    this.cardLists = [...this.originalCardLists];
  }

  /**
   * Open sort modal
   */
  openSortModal() {
    this.alertService.showSortAlert(this.currentSort).then(newSort => {
      this.currentSort = newSort ?? this.currentSort;
      this.sort();
    });
  }

  sort() {
    switch (this.currentSort) {
      case CardlistsSortEnum.alphabetDesc: {
        this.cardLists = this.cardLists.sort((a, b) =>
          a.name! < b.name! ? 1 : -1
        );
        break;
      }
      case CardlistsSortEnum.alphabetAsc: {
        this.cardLists = this.cardLists.sort((a, b) =>
          a.name! < b.name! ? -1 : 1
        );
        break;
      }
      case CardlistsSortEnum.dateDesc: {
        this.cardLists = this.cardLists.sort((a, b) =>
          a.created! < b.created! ? -1 : 1
        );
        break;
      }
      default: {
        this.cardLists = this.cardLists.sort((a, b) =>
          a.created! < b.created! ? 1 : -1
        );
        break;
      }
    }
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
              this.cardLists = [...res];
              this.originalCardLists = [...res];
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
    const currentLearning = this.localStorageService.getCurrentLearning()!;

    const nativeLanguage =
      this.localStorageService.getMobileLanguageCode() ===
      HUNGARIAN_LANGUAGE_CODE
        ? currentLearning.nativeLanguageNameInHun
        : currentLearning.nativeLanguageName;
    const learningLanguage =
      this.localStorageService.getMobileLanguageCode() ===
      HUNGARIAN_LANGUAGE_CODE
        ? currentLearning.learningLanguageNameInHun
        : currentLearning.learningLanguageName;
    this.suggestedName = `${nativeLanguage}${learningLanguage}${
      this.cardLists?.length + 1
    }`;
  }
}
