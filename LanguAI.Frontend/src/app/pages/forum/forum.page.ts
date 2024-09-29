import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PostViewModel } from 'src/api/models';
import { PostService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
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
export class ForumPage implements OnInit {
  title = this.translateService.instant(FORUM_TITLE);

  posts: Array<PostViewModel> = [];

  constructor(
    private postService: PostService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.loadPosts();
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
  navigateToPost(postId?: string) {
    let url = '';
    if (postId?.length) {
      url = POST_NAVIGATION + '/' + postId;
    } else {
      url = CREATE_POST_NAVIGATION;
    }
    this.navController.navigateForward(url);
  }

  /**
   * Loading posts for the user
   */
  private loadPosts(event?: any) {
    this.loadingService
      .showLoading(this.translateService.instant('FORUM_IS_LOADING'))
      .then(() => {
        this.postService.getPosts$Json({ Username: 'zsombi' }).subscribe({
          next: res => {
            if (res) {
              this.posts = res;
              event?.target?.complete();
            }
            this.loadingService.hideLoading();
          },
          error: (err: Error) => {
            console.log(err.message);
            this.loadingService.hideLoading();
          }
        });
      });
  }
}
