import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Animation } from '@ionic/angular';
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
export class SummaryComponent implements OnInit, OnDestroy {
  @ViewChild('previousStreakCard', { read: ElementRef })
  previousStreakCard!: ElementRef<HTMLIonCardElement>;
  @ViewChild('newStreakCard', { read: ElementRef })
  newStreakCard!: ElementRef<HTMLIonCardElement>;

  @Input() statistics: Statistics | undefined;
  @Output() navigateToLessonsEmit = new EventEmitter<void>();
  exp: number = 0;
  showStreakAnimation = true;
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
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    // this.calculateAndSaveGameplay();
  }

  ngAfterViewInit() {
    this.calculateAndSaveGameplay();
  }

  ngOnDestroy() {
    this.saveGameplaySub?.unsubscribe();
  }

  async startAnimation() {
    await this.animationService.streakAnimation(
      this.previousStreakCard,
      this.newStreakCard
    );

    this.showNavigateToLessons = true;
  }

  navigateToLessons() {
    this.navigateToLessonsEmit.emit();
  }

  /**
   * Calculate the experience by the mistakes
   */
  private async calculateAndSaveGameplay() {
    await this.loadingService.showLoading('CALCULATE_AND_SAVE_GAMEPLAY');
    if (
      this.statistics?.allAnswer &&
      (this.statistics?.mistakes === 0 || this.statistics?.mistakes)
    ) {
      this.exp = this.statistics?.allAnswer - this.statistics?.mistakes;
    }

    this.saveGameplaySub = this.gameplayService
      .saveGameplay$Json({
        body: { point: 3, userId: this.localStorageService.getUserId()! }
      })
      .subscribe({
        next: (streakChanged: boolean) => {
          if (streakChanged) {
            this.streak = this.localStorageService.getStreak();
            this.showStreakAnimation = true;
          }
          this.loadingService.hideLoading();
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast('ERROR_WHILE_SAVING_GAMEPLAY');
        }
      });
  }
}
