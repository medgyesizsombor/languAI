import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { ExerciseTypeEnum, ExerciseViewModel } from 'src/api/models';
import { ChatGptService } from 'src/api/services';
import { Statistics } from 'src/app/util/models/statistic-view-model';
import { LanguageLevelPipe } from 'src/app/util/pipes/language-level.pipe';
import { TimePipe } from 'src/app/util/pipes/time.pipe';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { TimerService } from 'src/app/util/services/timer.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { LESSONS_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-lesson-learning',
  templateUrl: './lesson-learning.page.html',
  styleUrls: ['./lesson-learning.page.scss'],
  standalone: false
})
export class LessonLearningPage {
  currentExercise: ExerciseTypeEnum | undefined;
  exerciseTypeEnum = ExerciseTypeEnum;
  exerciseList: Array<ExerciseViewModel> = [];
  showOverlay = false;
  isLoading = false;
  statistics: Statistics | undefined;
  showSummary = false;
  index = 0;

  receiveExercisesSub: Subscription | undefined;
  loadQueryParamSub: Subscription | undefined;

  constructor(
    private chatGPTService: ChatGptService,
    private languageLevelPipe: LanguageLevelPipe,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private timerService: TimerService,
    private navController: NavController,
    private timePipe: TimePipe
  ) {}

  async ionViewDidEnter() {
    this.generateExercises();
  }

  ionViewDidLeave() {
    this.receiveExercisesSub?.unsubscribe();
  }

  showContinueButton() {
    this.showOverlay = true;
  }

  nextExercise() {
    this.exerciseList[this.index].isActive = false;
    if (this.index === this.exerciseList?.length - 1) {
      //TODO statisztikánál kéne majd, hogy hány hiba, hány jó
      this.statistics = {
        allAnswer: this.exerciseList?.length,
        correctAnswer: this.exerciseList?.length,
        time: this.timePipe.transform(this.timerService.getTime()),
        mistakes: 1
      };
      this.showSummary = true;
    } else {
      this.index++;
      this.exerciseList[this.index].isActive = true;
      this.showOverlay = false;
    }
  }

  navigateToLessons() {
    this.navController.navigateForward(LESSONS_NAVIGATION);
  }

  /**
   * Get query params and generate the exercises
   */
  private async generateExercises() {
    await this.loadingService.showLoading(
      this.translateService.instant(
        'GENERATING_THE_EXERCISES_IT_MAY_TAKE_A_WHILE'
      )
    );
    this.receiveExercisesSub = this.activatedRoute.queryParamMap
      .pipe(
        switchMap((params: ParamMap) => {
          const description = params.get('description');
          const cardListId = params.get('cardListId');

          if (description && cardListId) {
            return this.chatGPTService.receiveExercisesFromChatGpt$Json({
              LanguageLevel: this.languageLevelPipe.transform(
                this.localStorageService.getLevelOfCurrentLanguage() ??
                  undefined,
                true
              ),
              TopicDescription: description ?? '',
              UserId: this.localStorageService.getUserId()!,
              CardListId: +cardListId
            });
          }

          this.loadingService.hideLoading();
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: Array<ExerciseViewModel>) => {
          this.exerciseList = [...res];
          this.index = 0;
          this.isLoading = false;
          this.loadingService.hideLoading();
        },
        error: () => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_GENERATE_EXERCISE')
          );
        }
      });
  }
}
