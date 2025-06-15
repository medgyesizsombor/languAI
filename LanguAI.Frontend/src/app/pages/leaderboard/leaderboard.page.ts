import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LeaderboardUserViewModel } from 'src/api/models';
import { GameplayService } from 'src/api/services';
import { FileService } from 'src/app/util/services/file.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { SETTINGS_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: false
})
export class LeaderboardPage {
  lowerleaderboardData: Array<LeaderboardUserViewModel> = [];
  top1Data: Array<LeaderboardUserViewModel> = [];
  currentUserId: number | undefined;
  navigateBackRouter = SETTINGS_NAVIGATION;

  getWeeklyLeaderboardSub: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private gameplayService: GameplayService,
    protected fileService: FileService,
    private localStorageService: LocalStorageService
  ) {}

  ionViewWillEnter() {
    this.loadLeaderboard();
  }

  ionViewWillLeave() {
    this.getWeeklyLeaderboardSub?.unsubscribe();
  }

  async loadLeaderboard() {
    await this.loadingService.showLoading(
      this.translateService.instant('LEADERBOARD_LOADING')
    );
    this.currentUserId = this.localStorageService.getUserId()!;
    this.getWeeklyLeaderboardSub = this.gameplayService
      .getWeeklyLeaderboard$Json()
      .subscribe({
        next: (res: Array<LeaderboardUserViewModel>) => {
          this.top1Data = [...res].slice(0, 1);
          this.lowerleaderboardData = [...res].slice(1, res.length);
          // this.lowerleaderboardData = [...res];
          this.loadingService.hideLoading();
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('LEADERBOARD_ERROR')
          );
        }
      });
  }
}
