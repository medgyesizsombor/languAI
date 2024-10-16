import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { CardViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-card-learning',
  templateUrl: './card-learning.page.html',
  styleUrls: ['./card-learning.page.scss']
})
export class CardLearningPage {
  cardListId: number | undefined | null;
  cards: Array<CardViewModel> = [];
  score = 0;
  isFlipped = false;
  currentCardIndex = 0;
  progress = 0;

  getCardsOfCardListSub: Subscription | undefined;

  constructor(
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private cardService: CardService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewDidLeave() {
    this.getCardsOfCardListSub?.unsubscribe();
  }

  /**
   * Set score, default is success
   */
  setScore(success = true) {
    if (success) {
      this.score++;
    }

    if (this.currentCardIndex === this.cards?.length - 1) {
      this.lastCardHandler();
    }

    this.progress += (1 / this.cards?.length) * 100;

    this.currentCardIndex++;
    this.isFlipped = false;
  }

  /**
   * Flipping the card
   */
  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  /**
   * Loading the data
   */
  private loadData() {
    this.loadingService.showLoading().then(() => {
      this.activatedRoute.params
        .pipe(
          switchMap((params: Params) => {
            this.cardListId = params['id'];

            if (!this.cardListId) {
              this.loadingService.hideLoading();
              return EMPTY;
            }

            return this.cardService.getCardsOfCardList$Json({
              cardListId: this.cardListId
            });
          })
        )
        .subscribe({
          next: (cards: Array<CardViewModel>) => {
            this.loadingService.hideLoading();
            if (cards?.length) {
              this.cards = [...cards];
            }
          },
          error: () => {
            this.toastrService.presentErrorToast(
              this.translateService.instant('DATA_ERROR')
            );
          }
        });
    });
  }

  /**
   * If this is the last card, returns with the cards
   */
  private lastCardHandler() {
    //TODO streak növelése
    this.navController.pop();
  }
}
