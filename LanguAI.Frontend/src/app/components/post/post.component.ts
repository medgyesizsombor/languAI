import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PostViewModel } from 'src/api/models';
import { PostService } from 'src/api/services';
import { RoleBooleanDataViewModel } from 'src/app/util/models/role-boolean-data-view-model';
import { AlertService } from 'src/app/util/services/alert.service';
import { FileService } from 'src/app/util/services/file.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: false
})
export class PostComponent implements OnInit {
  @Input() post: PostViewModel | undefined;
  @Input() navigate = false;
  @Input() showCommentButton = true;

  @Output() likeButtonEmit = new EventEmitter<number>();
  @Output() navigateButtonEmit = new EventEmitter<number>();
  @Output() editButtonEmit = new EventEmitter<number>();
  @Output() removeButtonEmit = new EventEmitter<number>();

  userId: number | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private alertService: AlertService,
    private postService: PostService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private router: Router,
    protected fileService: FileService
  ) {
    this.userId = this.localStorageService.getUserId();
  }

  ngOnInit() {}

  like() {
    this.likeButtonEmit.emit(this.post?.id!);
  }

  navigateToPost() {
    this.navigateButtonEmit.emit(this.post?.id!);
  }

  openInFullsize(post: PostViewModel) {
    // this.router.navigate([FULLSIZE_IMAGE_NAVIGATION + '/' + post.image?.id]);
  }

  async editPost() {
    await this.alertService
      .showEditPostAlert()
      .then(async (res: RoleBooleanDataViewModel) => {
        if (res.role === 'confirm') {
          //True is the edit
          if (res.data) {
            this.editButtonEmit.emit(this.post?.id!);
            //False is the delete
          } else if (res.data === false) {
            await this.loadingService.showLoading(
              this.translateService.instant('POST_DELETE_LOADING')
            );
            this.postService
              .softDeletePost({
                postId: this.post?.id!,
                userId: this.userId!
              })
              .subscribe({
                next: () => {
                  this.loadingService.hideLoading();
                  this.toastrService.presentSuccessToast(
                    this.translateService.instant('SUCCESS_DELETING_POST')
                  );
                  this.removeButtonEmit.emit(this.post?.id!);
                },
                error: () => {
                  this.loadingService.hideLoading();
                  this.toastrService.presentErrorToast(
                    this.translateService.instant('ERROR_WHILE_DELETING_POST')
                  );
                }
              });
          }
          // And the other events are not important for us
        }
      });
  }
}
