import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InputInputEventDetail, IonInputCustomEvent } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { CardViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { LearningPipe } from 'src/app/util/pipes/learning.pipe';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { CARD_LIST_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  standalone: false
})
export class CardPage {
  originalCard: CardViewModel | undefined;
  cardId: number | undefined;
  cardListId: number | undefined;
  hasCardChanged = false;

  getCardSub: Subscription | undefined;
  deleteCardSub: Subscription | undefined;
  saveCardSub: Subscription | undefined;

  cardForm: FormGroup | undefined;

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    public learningPipe: LearningPipe
  ) {}

  ionViewWillEnter() {
    this.createForm();
    this.initialize();
  }

  ionViewDidLeave() {
    this.getCardSub?.unsubscribe();
    this.deleteCardSub?.unsubscribe();
    this.getCardSub?.unsubscribe();
  }

  async deleteCard() {
    await this.loadingService.showLoading();
    this.deleteCardSub = this.cardService
      .deleteCardById({ cardId: this.cardId })
      .subscribe({
        next: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentSuccessToast(
            this.translateService.instant('SUCCESSFUL_DELETE')
          );
          this.navController.navigateForward(CARD_LIST_NAVIGATION);
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast('ERROR_WHILE_DELETING');
        }
      });
  }

  async save() {
    await this.loadingService.showLoading('SAVING');
    const request: CardViewModel = {
      id: this.cardId,
      wordInLearningLanguage:
        this.cardForm?.controls['wordInLearningLanguage'].value,
      wordInNativeLanguage:
        this.cardForm?.controls['wordInNativeLanguage'].value
    };

    this.saveCardSub = this.cardService.saveCard({ body: request }).subscribe({
      next: () => {
        this.hasCardChanged = false;
        this.loadingService.hideLoading();
        this.toastrService.presentSuccessToast(
          this.translateService.instant('SUCCESSFUL_SAVING')
        );
      },
      error: () => {
        this.loadingService.hideLoading();
        this.toastrService.presentErrorToast(
          this.translateService.instant('UNSUCCESSFUL_SAVING')
        );
      }
    });
  }

  /**
   * Navigate back without saving
   */
  navigateBackWithoutSaving(quit: boolean) {
    if (quit) {
      this.navController.back();
    }
  }

  modelChanged(
    event: IonInputCustomEvent<InputInputEventDetail>,
    isNativeWord = true
  ) {
    const newWord = event.detail.value;
    if (isNativeWord) {
      this.hasCardChanged = newWord !== this.originalCard?.wordInNativeLanguage;
    } else {
      this.hasCardChanged =
        newWord !== this.originalCard?.wordInLearningLanguage;
    }
  }

  /**
   * Loading the cards
   */
  private async initialize() {
    await this.loadingService.showLoading();
    this.getCardSub = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          this.cardId = params['card-id'];

          if (!this.cardId) {
            this.loadingService.hideLoading();
            return EMPTY;
          }

          return this.cardService.getCardById$Json({
            cardId: this.cardId
          });
        })
      )
      .subscribe({
        next: (res: CardViewModel) => {
          if (res) {
            this.originalCard = res;
            this.patchForm(
              this.originalCard.wordInNativeLanguage,
              this.originalCard.wordInLearningLanguage
            );
            this.loadingService.hideLoading();
          } else {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('ERROR_HAPPEND_WHILE_LOADING_CARD')
            );
          }
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('ERROR_HAPPEND_WHILE_LOADING_CARD')
          );
        }
      });
  }

  /**
   * Create the form
   */
  private createForm() {
    this.cardForm = this.formBuilder.group({
      wordInNativeLanguage: ['', [Validators.required]],
      wordInLearningLanguage: ['', [Validators.required]]
    });
  }

  private patchForm(
    wordInNativeLanguage: string | null | undefined,
    wordInLearningLanguage: string | null | undefined
  ) {
    if (!wordInLearningLanguage?.length || !wordInNativeLanguage?.length) {
      return;
    }

    this.cardForm?.patchValue({
      wordInNativeLanguage,
      wordInLearningLanguage
    });
  }
}
