import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PostViewModel } from 'src/api/models';
import { PostService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { UserInteractionService } from 'src/app/util/services/user-interaction.service';
import {
  SAVE_POST_NAVIGATION,
  FORUM_TITLE,
  POST_NAVIGATION,
  SEARCH_NEW_FRIENDS_NAVIGATION
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: false
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
    private userInteractionService: UserInteractionService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.loadPosts();
  }

  onTabChange(event: CustomEvent) {
    if (event.detail.tab === 'forum') {
    }
  }

  ionViewWillLeave() {
    this.getPostsSub?.unsubscribe();
  }

  /**
   * Searching for friend
   */
  searchForFriend() {
    this.navController.navigateForward(SEARCH_NEW_FRIENDS_NAVIGATION);
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
      url = SAVE_POST_NAVIGATION;
    }
    this.router.navigate([url]);
  }

  /**
   * Handle like event
   */
  async like(postId: number) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      await this.userInteractionService.like(post);

      if (post.numberOfLikes) {
        post.numberOfLikes = post.liked
          ? post.numberOfLikes - 1
          : post.numberOfLikes + 1;
      } else if (post.numberOfLikes === 0 && !post.liked) {
        post.numberOfLikes = 1;
      }
    }
  }

  editPost(postId?: number) {
    this.navController.navigateForward(SAVE_POST_NAVIGATION + '/' + postId);
  }

  removePost(postId?: number) {
    this.loadPosts();
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
              console.error(err.message);
              this.isLoading = false;
              this.loadingService.hideLoading();
            }
          });
      });
  }
}
