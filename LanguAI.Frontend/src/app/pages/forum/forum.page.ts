import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PostViewModel } from 'src/api/models';
import { PostService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { UserInteractionService } from 'src/app/util/services/user-interaction.service';
import {
  CREATE_POST_NAVIGATION,
  FORUM_TITLE,
  POST_NAVIGATION
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss']
})
export class ForumPage {
  title = this.translateService.instant(FORUM_TITLE);
  posts: Array<PostViewModel> = [];
  isLoading = false;

  getPostsSub: Subscription | undefined;

  constructor(
    private postService: PostService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private navController: NavController,
    private localStorageService: LocalStorageService,
    private userInteractionService: UserInteractionService
  ) {}

  ionViewWillEnter() {
    this.loadPosts();
  }

  ionViewDidLeave() {
    this.getPostsSub?.unsubscribe();
  }

  /**
   * Searching for friend
   */
  searchForFriend() {
    console.log('asd');
  }

  /**
   * Refresh the posts
   */
  refresh(event: any) {
    this.loadPosts(event);
  }

  /**
   * If postId is not null, it navigates to the post,
   * If postId is null, it navigates to create a new post
   */
  navigateToPost(postId?: number) {
    let url = '';
    if (postId) {
      url = POST_NAVIGATION + '/' + postId;
    } else {
      url = CREATE_POST_NAVIGATION;
    }
    this.navController.navigateForward(url);
  }

  /**
   * Handle like event
   */
  async like(postId: number) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      await this.userInteractionService.like(post);
    }
  }

  /**
   * Loading posts for the user
   */
  private loadPosts(event?: any) {
    this.isLoading = true;
    this.loadingService
      .showLoading(this.translateService.instant('FORUM_IS_LOADING'))
      .then(() => {
        this.getPostsSub = this.postService
          .getPostsFromForum$Json({
            userId: this.localStorageService.getUserId()!
          })
          .subscribe({
            next: (res: Array<PostViewModel>) => {
              if (res) {
                this.posts = [...res];
                event?.target?.complete();
              }
              this.isLoading = false;
              this.loadingService.hideLoading();
            },
            error: (err: Error) => {
              console.log(err.message);
              this.isLoading = false;
              this.loadingService.hideLoading();
            }
          });
      });
  }
}
