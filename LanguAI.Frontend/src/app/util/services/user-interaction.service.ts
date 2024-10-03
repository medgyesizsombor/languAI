import { Injectable } from '@angular/core';
import { InteractionService } from 'src/api/services';
import { ToastrService } from './toastr.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './localstorage.service';
import { LoadingService } from './loading.service';
import { InteractionEnum, PostViewModel } from 'src/api/models';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {
  constructor(
    private interactionService: InteractionService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService
  ) {}

  async like(post: PostViewModel) {
    if (!post.liked) {
      await this.loadingService.showLoading(
        this.translateService.instant('SENDING_LIKE')
      );

      this.interactionService
        .saveInteraction$Json({
          body: {
            userId: this.localStorageService.getUserId()!,
            postId: post.id!,
            interactionType: InteractionEnum.Like
          }
        })
        .subscribe({
          next: (success: boolean) => {
            this.loadingService.hideLoading();
            if (success) {
              post.liked = true;
            } else {
              this.toastrService.presentErrorToast(
                this.translateService.instant('UNSUCCESSFUL_LIKE')
              );
            }
          },
          error: () => {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('UNSUCCESSFUL_LIKE')
            );
          }
        });
    } else {
      this.dislike(post);
    }
  }

  private async dislike(post: PostViewModel) {
    await this.loadingService.showLoading(
      this.translateService.instant('CANCEL_LIKE')
    );

    this.interactionService
      .deleteInteraction$Json({
        body: {
          postId: post.id!,
          userId: this.localStorageService.getUserId()!
        }
      })
      .subscribe({
        next: (success: boolean) => {
          this.loadingService.hideLoading();
          if (success) {
            post.liked = false;
          } else {
            this.toastrService.presentErrorToast(
              this.translateService.instant('UNSUCCESSFUL_LIKE_CANCEL')
            );
          }
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('UNSUCCESSFUL_LIKE_CANCEL')
          );
        }
      });
  }
}
