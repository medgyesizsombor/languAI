import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CardListViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { CARD_LISTS_TITLE } from 'src/app/util/util.constants';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss']
})
export class CardsPage implements OnInit, OnDestroy {
  title = this.translateService.instant(CARD_LISTS_TITLE);

  getCardListsSub: Subscription | undefined;
  userId: number | null | undefined;
  cardLists: Array<CardListViewModel> = [];

  constructor(
    private cardService: CardService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.userId = this.localStorageService.getUserId();
    this.loadCardLists();
  }

  ngOnDestroy() {
    this.getCardListsSub?.unsubscribe();
  }

  /**
   * Loading the list of card lists
   */
  private loadCardLists() {
    if (this.userId) {
      this.loadingService.showLoading().then(() => {
        this.getCardListsSub = this.cardService
          .getListOfCardList$Json({
            userId: this.userId!
          })
          .subscribe({
            next: (res: Array<CardListViewModel>) => {
              this.loadingService.hideLoading();
              this.cardLists = res;
            },
            error: () => {
              this.loadingService.hideLoading();
              this.toastrService.presentErrorToast(
                this.translateService.instant('DATA_ERROR')
              );
            }
          });
      });
    }
  }
}
