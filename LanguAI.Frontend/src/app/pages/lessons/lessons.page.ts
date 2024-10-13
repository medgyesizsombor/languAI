import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TopicOfCurrentLearningViewModel } from 'src/api/models';
import { CardService, LearningService } from 'src/api/services';
import { AlertService } from 'src/app/util/services/alert.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalDataService } from 'src/app/util/services/local-data.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import {
  CARD_LISTS_NAVIGATION,
  HUNGARIAN_LANGUAGE_ID
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss']
})
export class LessonsPage {
  isLoading = false;
  topicList: Array<TopicOfCurrentLearningViewModel> = [];
  hungarianLanguageId = HUNGARIAN_LANGUAGE_ID;

  getCardListsOfCurrentUserSub: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private cardService: CardService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private learningService: LearningService,
    private navController: NavController,
    protected localDataService: LocalDataService,
    private alertService: AlertService
  ) {}

  ionViewWillEnter() {
    this.loadWordLists();
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
  startExercises() {
    // TODO: Start exercises
  }

  /**
   * Load user's wordlists
   */
  private async loadWordLists() {
    this.isLoading = true;
    await this.loadingService.showLoading();

    this.getCardListsOfCurrentUserSub = this.learningService
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
