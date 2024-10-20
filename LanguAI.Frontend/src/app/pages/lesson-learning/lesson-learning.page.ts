import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { ExerciseTypeEnum, ExerciseViewModel } from 'src/api/models';
import { ChatGptService } from 'src/api/services';
import { LanguageLevelPipe } from 'src/app/util/pipes/language-level.pipe';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalDataService } from 'src/app/util/services/local-data.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-lesson-learning',
  templateUrl: './lesson-learning.page.html',
  styleUrls: ['./lesson-learning.page.scss']
})
export class LessonLearningPage {
  currentExercise: ExerciseTypeEnum | undefined;
  exerciseTypeEnum = ExerciseTypeEnum;
  exerciseList: Array<ExerciseViewModel> = [];
  showOverlay = false;
  isLoading = true;

  receiveExercisesSub: Subscription | undefined;
  loadQueryParamSub: Subscription | undefined;

  constructor(
    private chatGPTService: ChatGptService,
    private localDataService: LocalDataService,
    private languageLevelPipe: LanguageLevelPipe,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private translateService: TranslateService
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
    this.showOverlay = false;
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
                this.localDataService.currentLevel ?? undefined
              ),
              TopicDescription: description ?? '',
              UserId: this.localStorageService.getUserId()!,
              CardListId: +cardListId
            });
          }

          return EMPTY;
        })
      )
      .subscribe({
        next: (res: Array<ExerciseViewModel>) => {
          this.exerciseList = [...res];
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
