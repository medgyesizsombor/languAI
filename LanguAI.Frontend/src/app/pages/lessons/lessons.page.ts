import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CardListViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss']
})
export class LessonsPage {
  isLoading = false;
  cardLists: Array<CardListViewModel> = [];

  getCardListsOfCurrentUserSub: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private cardService: CardService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService
  ) {}

  ionViewWillEnter() {
    this.loadWordLists();
  }

  ionViewDidLeave() {
    this.getCardListsOfCurrentUserSub?.unsubscribe();
  }

  /**
   * Load user's wordlists
   */
  private async loadWordLists() {
    this.isLoading = true;
    await this.loadingService.showLoading();

    this.getCardListsOfCurrentUserSub = this.cardService
      .getCardListsOfCurrentUser$Json({
        userId: this.localStorageService.getUserId()!
      })
      .subscribe((res: Array<CardListViewModel>) => {
        this.cardLists = { ...res };
        this.isLoading = false;
        this.loadingService.hideLoading();
      });
  }
}
