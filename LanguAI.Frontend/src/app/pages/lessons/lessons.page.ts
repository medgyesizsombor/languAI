import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TopicOfCurrentLearningViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { TopicImageSrcPipe } from 'src/app/util/pipes/topic-image-src.pipe';
import { AlertService } from 'src/app/util/services/alert.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import {
  CARD_LISTS_NAVIGATION,
  HUNGARIAN_LANGUAGE_ID,
  LESSON_LEARNING_NAVIGATION
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
  standalone: false
})
export class LessonsPage {
  isLoading = false;
  topicList: Array<TopicOfCurrentLearningViewModel> = [];
  hungarianLanguageId = HUNGARIAN_LANGUAGE_ID;

  getCardListsOfCurrentUserSub: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private cardService: CardService,
    private navController: NavController,
    private alertService: AlertService,
    protected topicImageSrcPipe: TopicImageSrcPipe
  ) {}

  ionViewWillEnter() {
    if (this.localStorageService.getLanguageCode()?.length) {
      this.loadCardLists();
    }
  }

  ionViewDidLeave() {
    this.getCardListsOfCurrentUserSub?.unsubscribe();
  }

  /**
   * Navigate to CardLists page
   */
  navigateToCardListsPage() {
    this.navController.navigateForward(CARD_LISTS_NAVIGATION);
  }

  /**
   * More Topic
   */
  moreTopic() {
    this.alertService
      .showConfirmAlert(
        this.translateService.instant('NEW_LESSONS'),
        this.translateService.instant(
          'FOR_MORE_EXERCISE_WOULD_YOU_LIKE_TO_CREATE_NEW_CARDLISTS'
        ),
        this.translateService.instant('YES')
      )
      .then((confirm: boolean) => {
        if (confirm) {
          this.navigateToCardListsPage();
        }
      });
  }

  /**
   * Start exercises
   */
  startExercises(topicId: number) {
    this.navController.navigateForward(LESSON_LEARNING_NAVIGATION, {
      queryParams: { topicId }
    });
  }

  navigateToLessonLearningPage(
    description: string | null | undefined,
    cardListId: number | undefined
  ) {
    this.navController.navigateForward(LESSON_LEARNING_NAVIGATION, {
      queryParams: { description, cardListId }
    });
  }

  /**
   * Load user's cardLists
   */
  private async loadCardLists() {
    this.isLoading = true;
    await this.loadingService.showLoading();

    this.getCardListsOfCurrentUserSub = this.cardService
      .getCardListOfCurrentLearningGroupByTopic$Json({
        userId: this.localStorageService.getUserId()!
      })
      .subscribe({
        next: (res: Array<TopicOfCurrentLearningViewModel>) => {
          this.topicList = [...res];
          this.isLoading = false;
          this.loadingService.hideLoading();
        },
        error: () => {
          this.isLoading = false;
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_LOAD_LESSONS')
          );
        }
      });
  }
}
