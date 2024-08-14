import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CardViewModel } from 'src/api/models';
import { CardService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss']
})
export class CardPage implements OnInit {
  cards: Array<CardViewModel> = [];

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  /**
   * Loading the cards
   */
  private initialize() {
    const id = this.activatedRoute.snapshot.queryParamMap.get('id');

    if (id?.length) {
      //TODO loading the cards of the list
    } else {
      this.cards = [
        {
          wordInLearningLanguage: 'hungary',
          wordInNativeLanguage: 'magyarország'
        },
        { wordInLearningLanguage: 'english', wordInNativeLanguage: 'anglia' }
      ];
      // this.loadingService.showLoading(this.translateService.instant('GENERATING_THE_CARDS'))
      // .then(() => {
      //   this.cardService
      //     .getWordList$Json({
      //       learningLanguage: 'hungarian',
      //       level: 'A1',
      //       nativeLanguage: 'english'
      //     })
      //     .subscribe({
      //       next: (res: Array<CardViewModel>) => {
      //         this.loadingService.hideLoading();
      //         if (res?.length) {
      //           this.cards = [...res];
      //           console.log(this.cards);
      //         } else {
      //           this.toastrService.presentErrorToast(
      //             this.translateService.instant(
      //               'ERROR_HAPPEND_WHILE_GENERATING_WORDS'
      //             )
      //           );
      //         }
      //       },
      //       error: () => {
      //         this.loadingService.hideLoading();
      //         this.toastrService.presentErrorToast(
      //           this.translateService.instant(
      //             'ERROR_HAPPEND_WHILE_GENERATING_WORDS'
      //           )
      //         );
      //       }
      //     });
      // });
    }
  }
}
