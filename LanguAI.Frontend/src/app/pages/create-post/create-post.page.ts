import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AccessEnum, PostViewModel, SavePostRequest } from 'src/api/models';
import { PostService } from 'src/api/services';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss']
})
export class CreatePostPage {
  postForm: FormGroup | undefined;
  isPostValid = false;
  unsavedPost = false;
  currentAccessOfPost = AccessEnum.Public;
  constructor(
    private navController: NavController,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  savePostSub: Subscription | undefined;

  ionViewWillEnter() {
    this.createForm();
  }

  ionViewDidLeave() {
    this.savePostSub?.unsubscribe();
  }

  savePost() {
    if (this.isPostValid) {
      const postViewModel: SavePostRequest | undefined = {
        access: this.postForm?.controls['access']?.value ?? AccessEnum.Public,
        content: this.postForm?.controls['text']?.value,
        userId: this.localStorageService.getUserId()!
      };
      this.loadingService
        .showLoading(this.translateService.instant('CREATING_POST'))
        .then(() => {
          this.savePostSub = this.postService
            .savePost$Json({
              body: { ...postViewModel }
            })
            .subscribe({
              next: (success: boolean) => {
                this.loadingService.hideLoading();
                if (success) {
                  this.toastrService.presentSuccessToast(
                    this.translateService.instant(
                      'SUCCESSFUL_CREATION_OF_THE_POST'
                    )
                  );
                  this.navController.pop();
                } else {
                  this.toastrService.presentErrorToast(
                    this.translateService.instant(
                      'UNSUCCESSFUL_CREATION_OF_THE_POST'
                    )
                  );
                }
              },
              error: () => {
                this.loadingService.hideLoading();
                this.toastrService.presentErrorToast(
                  this.translateService.instant(
                    'UNSUCCESSFUL_CREATION_OF_THE_POST'
                  )
                );
              }
            });
        });
    }
  }

  /**
   * Navigate back without saving
   */
  navigateBackWithoutSaving(quit: boolean) {
    if (quit) {
      this.navController.back();
    }
  }

  isValid() {
    this.isPostValid = this.postForm?.controls['text'].value?.trim()?.length;
  }

  changeAccess(access: AccessEnum) {
    if (access !== this.currentAccessOfPost) {
      this.postForm?.controls['access'].patchValue(access);
    }
  }

  /**
   * Create the form
   */
  private createForm() {
    this.postForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
      access: [AccessEnum.Public, [Validators.required]]
    });
  }

  private fillForm() {
    this.postForm?.controls['access'].patchValue(this.currentAccessOfPost);
  }
}
