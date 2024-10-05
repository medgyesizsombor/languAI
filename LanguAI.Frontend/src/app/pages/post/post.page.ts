import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { InteractionEnum, PostViewModel } from 'src/api/models';
import { InteractionService, PostService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';
import { UserInteractionService } from 'src/app/util/services/user-interaction.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage {
  commentForm: FormGroup | undefined;
  isAnyChanges = false;
  post: PostViewModel | undefined;
  isValid = false;
  isLoading = false;

  sendCommentSub: Subscription | undefined;
  getPostSub: Subscription | undefined;

  constructor(
    private postService: PostService,
    private loadingService: LoadingService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private userInteractionService: UserInteractionService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private interactionService: InteractionService,
    private localStorageService: LocalStorageService
  ) {}

  ionViewWillEnter() {
    this.loadPost();
    this.createForm();
  }

  ionViewWillLeave() {
    this.getPostSub?.unsubscribe();
    this.sendCommentSub?.unsubscribe();
  }

  /**
   * Like a comment or the post
   */
  async like(contentId: number | null = null) {
    if (!this.post) return;

    if (contentId) {
      const comment = this.post.comments?.find(c => c.id === contentId);
      if (comment && comment.userId === this.localStorageService.getUserId()) {
        await this.userInteractionService.like(comment, false);
      }
    } else {
      await this.userInteractionService.like(this.post);
    }
  }

  /**
   * Check if the input is valid
   */
  isCommentValid() {
    this.isValid = this.commentForm?.controls['comment'].value?.trim()?.length;
  }

  /**
   * Navigate back without saving
   */
  navigateBackWithoutSaving(quit: boolean) {
    if (quit) {
      this.navController.back();
    }
  }

  /**
   * Delete a comment
   */
  async deleteComment(commentId: number) {
    await this.loadingService.showLoading('DELETING_THE_COMMENT_DOTDOTDOT');

    if (commentId) {
      const comment = this.post?.comments?.find(c => c.id === commentId);
      if (comment && comment.userId === this.localStorageService.getUserId()) {
        this.interactionService
          .deleteComment$Json({
            body: {
              id: commentId,
              userId: this.localStorageService.getUserId()!
            }
          })
          .subscribe({
            next: (success: boolean) => {
              if (success) {
                this.loadingService.hideLoading();

                if (this.post) {
                  this.post.comments = this.post.comments?.filter(
                    c => c.id !== commentId
                  );
                }
              } else {
                this.toastrService.presentErrorToast(
                  this.translateService.instant('UNSUCCESSFUL_COMMENT_DELETE')
                );
              }
            },
            error: () => {
              this.toastrService.presentErrorToast(
                this.translateService.instant('UNSUCCESSFUL_COMMENT_DELETE')
              );
            }
          });
      }
    }
  }

  /**
   * Send comment
   */
  async sendComment() {
    if (this.isValid) {
      await this.loadingService.showLoading(
        this.translateService.instant('SENDING_COMMENT_DOTDOTDOT')
      );

      this.sendCommentSub = this.interactionService
        .saveInteraction$Json({
          body: {
            content: this.commentForm?.controls['comment'].value,
            interactionType: InteractionEnum.Comment,
            postId: this.post?.id,
            userId: this.localStorageService.getUserId()!
          }
        })
        .pipe(
          switchMap((success: boolean) => {
            if (!success) {
              this.loadingService.hideLoading();
              return EMPTY;
            } else {
              return this.postService.getPostById$Json({
                postId: this.post?.id!
              });
            }
          })
        )
        .subscribe({
          next: (res: PostViewModel) => {
            this.loadingService.hideLoading();
            if (res) {
              this.post = { ...res };
              this.commentForm?.controls['comment']?.patchValue(null);
            } else {
              this.toastrService.presentErrorToast(
                this.translateService.instant('FAILED_TO_LOAD_POST')
              );
            }
          },
          error: () => {
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('FAILED_TO_LOAD_POST')
            );
          }
        });
    }
  }

  private async loadPost() {
    this.isLoading = true;
    await this.loadingService.showLoading(
      this.translateService.instant('LOADING_POST_DOTDOTDOT')
    );

    this.getPostSub = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          const postId = params['id'];

          if (!postId?.length) {
            this.isLoading = false;
            this.loadingService.hideLoading();
            return EMPTY;
          }

          return this.postService.getPostById$Json({ postId });
        })
      )
      .subscribe({
        next: (res: PostViewModel) => {
          if (res) {
            this.post = { ...res };
            this.isLoading = false;
            this.loadingService.hideLoading();
          } else {
            this.isLoading = false;
            this.loadingService.hideLoading();
            this.toastrService.presentErrorToast(
              this.translateService.instant('FAILED_TO_LOAD_POST')
            );
          }
        },
        error: () => {
          this.isLoading = false;
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast(
            this.translateService.instant('FAILED_TO_LOAD_POST')
          );
        }
      });
  }

  private createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
}
