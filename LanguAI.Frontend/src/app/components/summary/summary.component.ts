import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Animation } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GameplayService } from 'src/api/services';
import { Statistics } from 'src/app/util/models/statistic-view-model';
import { AnimationService } from 'src/app/util/services/animation.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: false
})
export class SummaryComponent implements OnInit {
  @ViewChild('previousStreakCard', { read: ElementRef })
  previousStreakCard!: ElementRef<HTMLIonCardElement>;
  @ViewChild('newStreakCard', { read: ElementRef })
  newStreakCard!: ElementRef<HTMLIonCardElement>;

  @Input() statistics: Statistics | undefined;
  @Input() returnButtonTitle =
    this.translateService.instant('RETURN_TO_LESSONS');
  @Output() navigateBackEmit = new EventEmitter<void>();
  exp: number = 100;
  showStreakAnimation = true;
  wasStreakAnimationSeen = false;
  streak: number = 0;
  showNavigateToLessons = false;

  previusStreakAnimation: Animation | null = null;
  newStreakAnimation: Animation | null = null;

  saveGameplaySub: Subscription | undefined;

  constructor(
    private gameplayService: GameplayService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private animationService: AnimationService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.calculateAndSaveGameplay();
  }

  ionViewWillEnter() {
  }

  ionViewWillLeave() {
    this.saveGameplaySub?.unsubscribe();
  }

  navigateBack() {
    if (this.showStreakAnimation && !this.wasStreakAnimationSeen) {
      this.startAnimation();
      this.wasStreakAnimationSeen = true;
    } else {
      this.navigateBackEmit.emit();
    }
  }

  /**
   * Calculate the experience by the mistakes
   */
  private async calculateAndSaveGameplay() {
    //await this.loadingService.showLoading('CALCULATE_AND_SAVE_GAMEPLAY');
    if (this.statistics?.mistakes === 0 || this.statistics?.mistakes) {
      this.exp =
        100 - this.statistics?.mistakes * 5 <= 0
          ? 0
          : 100 - this.statistics?.mistakes * 5;
      this.cdr.detectChanges();
    }

    // this.saveGameplaySub = this.gameplayService
    //   .saveGameplay$Json({
    //     body: { point: this.exp, userId: this.localStorageService.getUserId()! }
    //   })
    //   .subscribe({
    //     next: (streakChanged: boolean) => {
    //       if (streakChanged) {
    //         this.streak = this.localStorageService.getStreak();
    //         this.showStreakAnimation = true;
    //       }
    //       this.loadingService.hideLoading();
    //     },
    //     error: () => {
    //       this.loadingService.hideLoading();
    //       this.toastrService.presentErrorToast('ERROR_WHILE_SAVING_GAMEPLAY');
    //     }
    //   });
  }

  private async startAnimation() {
    await this.animationService.streakAnimation(
      this.previousStreakCard,
      this.newStreakCard
    );

    this.showNavigateToLessons = true;
  }
}
