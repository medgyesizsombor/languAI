import { Injectable } from '@angular/core';
import { InteractionService } from 'src/api/services';
import { ToastrService } from './toastr.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './localstorage.service';
import { LoadingService } from './loading.service';
import {
  CommentViewModel,
  InteractionEnum,
  PostViewModel
} from 'src/api/models';

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

  /**
   * Like content
   */
  async like(content: CommentViewModel | PostViewModel, isPost = true) {
    if (!content.liked) {
      await this.loadingService.showLoading(
        this.translateService.instant('SENDING_LIKE')
      );

      this.interactionService
        .saveInteraction$Json({
          body: {
            userId: this.localStorageService.getUserId()!,
            parentInteractionId: isPost ? null : content.id,
            postId: isPost ? content.id : null,
            interactionType: InteractionEnum.Like
          }
        })
        .subscribe({
          next: (success: boolean) => {
            this.loadingService.hideLoading();
            if (success) {
              content.liked = true;
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
      this.dislike(content, isPost);
    }
  }

  /**
   * Dislike content
   */
  private async dislike(
    content: CommentViewModel | PostViewModel,
    isPost = true
  ) {
    await this.loadingService.showLoading(
      this.translateService.instant('CANCEL_LIKE')
    );

    this.interactionService
      .dislike$Json({
        body: {
          postId: isPost ? content.id : null,
          parentInteractionId: isPost ? null : content.id,
          userId: this.localStorageService.getUserId()!
        }
      })
      .subscribe({
        next: (success: boolean) => {
          this.loadingService.hideLoading();
          if (success) {
            content.liked = false;
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
