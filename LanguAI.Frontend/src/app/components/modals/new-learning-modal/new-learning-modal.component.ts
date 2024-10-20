import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IntSelectorModel, LanguageLevelEnum } from 'src/api/models';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/api/services';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import {
  ENGLISH_LANGUAGE_ID,
  HUNGARIAN_LANGUAGE_CODE,
  HUNGARIAN_LANGUAGE_ID
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-new-learning-modal',
  templateUrl: './new-learning-modal.component.html',
  styleUrls: ['./new-learning-modal.component.scss']
})
export class NewLearningModalComponent implements OnInit, OnDestroy {
  isLoading = true;
  newLearningForm: FormGroup | undefined;
  languageList: Array<IntSelectorModel> = [];
  languageId: number | null = null;
  languageLevelList: Array<IntSelectorModel> = [];
  languageLevelEnum = LanguageLevelEnum;

  loadLanguagesSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private languageService: LanguageService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadLanguages();
    this.createForm();
  }

  ngOnDestroy() {
    this.loadLanguagesSub?.unsubscribe();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  confirm() {
    if (this.isFormValid()) {
      this.modalController.dismiss({
        languageId: this.newLearningForm?.controls?.['languageId']?.value,
        languageLevel: this.newLearningForm?.controls?.['languageLevel']?.value
      });
    }
  }

  /**
   * Create form
   */
  private createForm() {
    this.newLearningForm = this.formBuilder.group({
      languageId: [
        HUNGARIAN_LANGUAGE_CODE === this.localStorageService.getLanguageCode()
          ? ENGLISH_LANGUAGE_ID
          : HUNGARIAN_LANGUAGE_ID,
        [Validators.required]
      ],
      languageLevel: [LanguageLevelEnum.Beginner, [Validators.required]]
    });
  }

  /**
   * Check if the form is valid
   */
  private isFormValid(): boolean {
    return (
      this.newLearningForm?.controls['languageId'].value &&
      this.newLearningForm?.controls['languageLevel'].value
    );
  }

  /**
   * Load languages
   */
  private async loadLanguages() {
    await this.loadingService.showLoading();

    this.loadLanguagesSub = this.languageService
      .getAllLanguage$Json({
        languageCode: this.localStorageService.getLanguageCode()
      })
      .subscribe({
        next: (res: Array<IntSelectorModel>) => {
          this.languageList = [...res];
          this.isLoading = false;
          this.loadingService.hideLoading();
        },
        error: () => {
          this.isLoading = false;
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_LANGUAGE_LEARNING')
          );
        }
      });
  }

  private loadData() {
    this.languageId = this.localStorageService.getLanguageId();

    this.languageLevelList = Object.keys(LanguageLevelEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => {
        return {
          name: key.toUpperCase(),
          id: LanguageLevelEnum[key as keyof typeof LanguageLevelEnum]
        };
      });
  }
}
