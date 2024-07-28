import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PostViewModel } from 'src/api/models';
import { PostService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { FORUM_TITLE } from 'src/app/util/util.constants';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  title = FORUM_TITLE;

  posts: Array<PostViewModel> = [];

  constructor(
    private postService: PostService,
    private loadingService: LoadingService,
    private translateService: TranslateService
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
          },
        });
      });
  }
}
