import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LearningViewModel } from 'src/api/models';
import { LearningService } from 'src/api/services';
import { NewLearningModalComponent } from 'src/app/components/new-learning-modal/new-learning-modal.component';
import { AlertService } from 'src/app/util/services/alert.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import {HUNGARIAN_LANGUAGE_ID} from 'src/app/util/util.constants';

@Component({
  selector: 'app-learnings',
  templateUrl: './learnings.page.html',
  styleUrls: ['./learnings.page.scss']
})
export class LearningPage {
  isLoading = true;
  learnings: Array<LearningViewModel> | undefined;
  languageId: number | null = null;

  getLearningsSub: Subscription | undefined;
  loadLearningsSub: Subscription | undefined;
  saveLearningSub: Subscription | undefined;
  hungarianLanguageId = HUNGARIAN_LANGUAGE_ID;

  constructor(
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private learningService: LearningService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private modalController: ModalController,
    private alertService: AlertService
  ) {}

  ionViewWillEnter() {
    this.loadLearnings();
  }

  ionViewDidLeave() {
    this.getLearningsSub?.unsubscribe();
    this.loadLearningsSub?.unsubscribe();
    this.saveLearningSub?.unsubscribe();
  }

  /**
   * Load learnings
   */
  private async loadLearnings() {
    await this.loadingService.showLoading();

    this.loadLearningsSub = this.learningService
      .getLearningsOfUsers$Json()
      .subscribe({
        next: (res: Array<LearningViewModel>) => {
          this.learnings = [...res];
          this.languageId = this.localStorageService.getLanguageId();
          this.isLoading = false;
          this.loadingService.hideLoading();
        },
        error: () => {
          this.isLoading = false;
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_LEARNING_LOAD')
          );
        }
      });
  }

  /**
   * Add learning
   */
  async addLearning() {
    const modal = await this.modalController.create({
      component: NewLearningModalComponent
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      const learning = this.learnings?.find(
        l =>
          l.languageLevel === data.languageLevel &&
          l.languageId === data.languageId
      );

      if (learning) {
        const activate = await this.alertService.showExistingLearningAlert();

        if (!activate) return;

        this.changeActiveLearning(learning.id!);
        return;
      }

      await this.loadingService.showLoading();

      this.saveLearningSub = this.learningService
        .saveLearning$Json({
          body: {
            languageId: data.languageId,
            languageLevel: data.languageLevel,
            userId: this.localStorageService.getUserId()!
          }
        })
        .subscribe({
          next: (res: number) => {
            if (res) {
              this.loadingService.hideLoading();
              this.toastrService.presentSuccessToast(
                this.translateService.instant('SUCCESSFUL_SAVING_LEARNING')
              );
            } else {
              this.loadingService.hideLoading();
              this.toastrService.presentErrorToast(
                this.translateService.instant('UNSUCCESSFUL_SAVING_LEARNING')
              );
            }
          },
          error: () => {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('UNSUCCESSFUL_SAVING_LEARNING')
            );
          }
        });
    }
  }

  /**
   * Change active learning
   */
  async changeActiveLearning(learningId: number) {
    await this.loadingService.showLoading(
      this.translateService.instant('CHANGING_ACTIVE_LEARNING')
    );

    this.learningService
      .changeActiveLearning$Json({
        userId: this.localStorageService.getUserId()!,
        learningId
      })
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            const activeLearning = this.learnings?.find(
              l => l.id === learningId
            );

            if (activeLearning) {
              this.learnings?.forEach(l => (l.isActive = false));

              activeLearning.isActive = true;
            }
            this.loadingService.hideLoading();
          } else {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('UNSUCCESSFUL_CHANGE')
            );
          }
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_CHANGE')
          );
        }
      });
  }
}
