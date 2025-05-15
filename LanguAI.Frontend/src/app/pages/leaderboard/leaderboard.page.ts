import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LeaderboardUserViewModel } from 'src/api/models';
import { GameplayService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: false
})
export class LeaderboardPage implements OnInit {
  leaderboard: Array<LeaderboardUserViewModel> = [];

  constructor(
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private gameplayService: GameplayService
  ) {}

  ngOnInit() {
    this.loadLeaderboard();
  }

  async loadLeaderboard() {
    await this.loadingService.showLoading('LEADERBOARD_LOADING');
    this.gameplayService.getWeeklyLeaderboard$Json().subscribe({
      next: (res: Array<LeaderboardUserViewModel>) => {
        this.leaderboard = [...res];
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
