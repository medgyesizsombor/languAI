import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';
import { AccessEnum, ImageViewModel, SavePostRequest } from 'src/api/models';
import { PostService, StorageService } from 'src/api/services';
import { AlertService } from 'src/app/util/services/alert.service';
import { FileService } from 'src/app/util/services/file.service';
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
  image: ImageViewModel | undefined;
  imageSrc: string | undefined;

  constructor(
    private navController: NavController,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private alertService: AlertService,
    private fileService: FileService,
    private storageService: StorageService
  ) {}

  savePostSub: Subscription | undefined;

  ionViewWillEnter() {
    this.createForm();
  }

  ionViewDidLeave() {
    this.savePostSub?.unsubscribe();
  }

  async savePost() {
    if (this.isPostValid) {
      await this.loadingService.showLoading(
        this.translateService.instant('CREATING_POST')
      );
      this.storageService
        .uploadBlob$Json({ body: this.image })
        .pipe(
          switchMap((imageId: number) => {
            if (imageId) {
              const postViewModel: SavePostRequest | undefined = {
                access:
                  this.postForm?.controls['access']?.value ?? AccessEnum.Public,
                content: this.postForm?.controls['text']?.value,
                userId: this.localStorageService.getUserId()!,
                imageId: imageId
              };
              return this.postService.savePost$Json({
                body: { ...postViewModel }
              });
            } else {
              this.loadingService.hideLoading();
              return EMPTY;
            }
          })
        )
        .subscribe({
          next: (success: boolean) => {
            this.loadingService.hideLoading();
            if (success) {
              this.toastrService.presentSuccessToast(
                this.translateService.instant('SUCCESSFUL_CREATION_OF_THE_POST')
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
              this.translateService.instant('UNSUCCESSFUL_CREATION_OF_THE_POST')
            );
          }
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

  openImageModal() {
    this.alertService
      .showImageUploadAlert()
      .then((isCapturing: boolean) => {
        if (isCapturing) {
          this.fileService.createPhoto().then((image: ImageViewModel) => {
            this.image = image;
          });
        } else {
          this.fileService.pickPhoto().then((image: ImageViewModel) => {
            this.image = image;
          });
        }
      })
      .catch(() => {});
  }

  removeImage() {
    this.image = undefined;
    this.imageSrc = undefined;
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
