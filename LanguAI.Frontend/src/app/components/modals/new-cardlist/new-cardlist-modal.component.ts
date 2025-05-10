import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IntSelectorModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-new-cardlist-modal',
  templateUrl: './new-cardlist-modal.component.html',
  styleUrls: ['./new-cardlist-modal.component.scss'],
  standalone: false
})
export class NewCardlistModalComponent implements OnInit, OnDestroy {
  @Input() suggestedName: string | undefined;
  isLoading = true;
  newCardlistForm: FormGroup | undefined;
  topicList: Array<IntSelectorModel> = [];

  loadTopicListSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private cardService: CardService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loadTopics();
    this.createForm();
  }

  ngOnDestroy() {
    this.loadTopicListSub?.unsubscribe();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  confirm() {
    if (this.isFormValid()) {
      this.modalController.dismiss({
        topicId: this.newCardlistForm?.controls?.['topicId']?.value,
        name: this.newCardlistForm?.controls?.['name']?.value
      });
    }
  }

  /**
   * Create form
   */
  private createForm() {
    this.newCardlistForm = this.formBuilder.group({
      name: [this.suggestedName, [Validators.required]],
      topicId: ['', [Validators.required]]
    });
  }

  /**
   * Check if the form is valid
   */
  private isFormValid(): boolean {
    return this.newCardlistForm?.controls['topicId'].value;
  }

  /**
   * Load topics
   */
  private async loadTopics() {
    await this.loadingService.showLoading();

    this.loadTopicListSub = this.cardService
      .getAllTopicsByCurrentLearning$Json({
        learningId: this.localStorageService.getCurrentLearning()!.id
      })
      .subscribe({
        next: (res: Array<IntSelectorModel>) => {
          this.topicList = [...res];
          this.isLoading = false;
          this.loadingService.hideLoading();
        },
        error: () => {
          this.isLoading = false;
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_CARDLIST_CREATE')
          );
        }
      });
  }
}
