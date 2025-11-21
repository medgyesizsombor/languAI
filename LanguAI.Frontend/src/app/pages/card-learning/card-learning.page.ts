import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { CardViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { Statistics } from 'src/app/util/models/statistic-view-model';
import { TimePipe } from 'src/app/util/pipes/time.pipe';
import { LoadingService } from 'src/app/util/services/loading.service';
import { TimerService } from 'src/app/util/services/timer.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { CARD_LIST_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-card-learning',
  templateUrl: './card-learning.page.html',
  styleUrls: ['./card-learning.page.scss'],
  standalone: false
})
export class CardLearningPage {
  cardListId: number | undefined | null;
  cards: Array<CardViewModel> = [];
  score = 0;
  isFlipped = false;
  currentCardIndex = 0;
  progress = 0;
  statistics: Statistics | undefined;
  showSummary = false;
  mistakes = 0;

  getCardsOfCardListSub: Subscription | undefined;

  constructor(
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private cardService: CardService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private navController: NavController,
    private router: Router,
    private timePipe: TimePipe,
    private timerService: TimerService
  ) {}

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewWillLeave() {
    this.getCardsOfCardListSub?.unsubscribe();
  }

  /**
   * Set score, default is success
   */
  setScore(success = true) {
    if (!success) {
      this.mistakes++;
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

  navigateBack() {
    this.showSummary = false;
    this.router.navigate([CARD_LIST_NAVIGATION + '/' + this.cardListId]);
  }

  /**
   * Loading the data
   */
  private async loadData() {
    await this.loadingService.showLoading();
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
            // this.cards = [...cards];
            this.cards = [
              {
                id: 1,
                wordInLearningLanguage: 'asd',
                wordInNativeLanguage: 'dsa'
              }
            ];
            this.timerService.setTimer();
          }
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('DATA_ERROR')
          );
        }
      });
  }

  /**
   * If this is the last card, returns with the cards
   */
  private lastCardHandler() {
    this.statistics = {
      time: this.timePipe.transform(this.timerService.getTime()),
      exp: (100 - this.mistakes * 3)
    };
    this.timerService.clearTimer();
    this.showSummary = true;
  }
}
