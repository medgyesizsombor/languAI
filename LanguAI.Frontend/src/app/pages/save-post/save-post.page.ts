import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, of, Subscription, switchMap } from 'rxjs';
import {
  AccessEnum,
  ImageViewModel,
  PostViewModel,
  SavePostRequest
} from 'src/api/models';
import { ChatGptService, PostService, StorageService } from 'src/api/services';
import { AlertService } from 'src/app/util/services/alert.service';
import { FileService } from 'src/app/util/services/file.service';
import { LoadingService } from 'src/app/util/services/loading.service';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-save-post',
  templateUrl: './save-post.page.html',
  styleUrls: ['./save-post.page.scss'],
  standalone: false
})
export class CreatePostPage {
  title = this.translateService.instant('CREATING_POST');
  subtitle = this.translateService.instant('CREATING_POST_SUBTITLE');
  postForm: FormGroup | undefined;
  isPostValid = false;
  //TODO changes
  unsavedPost = false;
  currentAccessOfPost = AccessEnum.Public;
  image: ImageViewModel | undefined;
  imageSrc: string | undefined;
  postId: number | undefined;

  savePostSub: Subscription | undefined;
  getPostCorrectionFromChatGptSub: Subscription | undefined;
  getPostPhrasingSub: Subscription | undefined;
  getPostSub: Subscription | undefined;

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
    private storageService: StorageService,
    private chatGPTService: ChatGptService,
    private activatedRoute: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.createForm();
    this.loadPost();
  }

  ionViewDidLeave() {
    this.savePostSub?.unsubscribe();
    this.getPostCorrectionFromChatGptSub?.unsubscribe();
    this.getPostPhrasingSub?.unsubscribe();
    this.getPostSub?.unsubscribe();
  }

  async savePost() {
    if (this.isPostValid) {
      await this.loadingService.showLoading(
        this.translateService.instant('CREATING_POST')
      );

      let postViewModel: SavePostRequest | undefined = {
        id: this.postId ?? undefined,
        access: this.postForm?.controls['access']?.value ?? AccessEnum.Public,
        content: this.postForm?.controls['text']?.value,
        userId: this.localStorageService.getUserId()!
      };

      of(this.image)
        .pipe(
          switchMap(image => {
            if (image) {
              return this.storageService.uploadBlob$Json({ body: image }).pipe(
                switchMap((imageId: number) => {
                  if (imageId) {
                    postViewModel = { ...postViewModel, imageId };
                    return this.postService.savePost$Json({
                      body: { ...postViewModel }
                    });
                  } else {
                    this.loadingService.hideLoading();
                    return EMPTY;
                  }
                })
              );
            } else {
              return this.postService.savePost$Json({
                body: { ...postViewModel }
              });
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

  async openChatGPTModal() {
    this.alertService.showChatGPTAlert().then((isPhrasing: boolean) => {
      if (isPhrasing) {
        this.alertService
          .showPhrasingAlert()
          .then(async (data: string | null) => {
            if (data?.length) {
              await this.loadingService.showLoading();
              this.getPostPhrasingSub = this.chatGPTService
                .getPostPhrasing$Json({ about: data })
                .subscribe({
                  next: (response: string) => {
                    if (response.length) {
                      this.postForm?.controls['text'].patchValue(response);
                      this.loadingService.hideLoading();
                    } else {
                      this.loadingService.hideLoading();
                      this.toastrService.presentErrorToast('/TODO');
                    }
                  },
                  error: () => {
                    this.loadingService.hideLoading();
                    this.toastrService.presentErrorToast('/TODO');
                  }
                });
            }
          });
      } else {
        if (this.postForm?.controls['text'].value?.trim()?.length) {
          this.getPostCorrectionFromChatGptSub = this.chatGPTService
            .getPostCorrectionFromChatGpt$Json({
              text: this.postForm?.controls['text'].value
            })
            .subscribe({
              next: async (response: string) => {
                await this.loadingService.showLoading();
                if (response.length) {
                  this.postForm?.controls['text'].patchValue(response);
                  this.loadingService.hideLoading();
                } else {
                  this.loadingService.hideLoading();
                  this.toastrService.presentErrorToast('/TODO');
                }
              },
              error: () => {
                this.loadingService.hideLoading();
                this.toastrService.presentErrorToast('/TODO');
              }
            });
        } else {
          this.toastrService.presentErrorToast(
            this.translateService.instant('YOU_HAVE_TO_WRITE_SOMETHING_FIRST')
          );
        }
      }
    });
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

  private async loadPost() {
    await this.loadingService.showLoading();
    this.getPostSub = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          const postId = params['post-id'];
          this.postId = postId;

          this.loadingService.hideLoading();

          if (!postId) {
            this.loadingService.hideLoading();
            return EMPTY;
          }

          this.title = this.translateService.instant('EDIT_POST');
          this.subtitle = this.translateService.instant('EDIT_POST_SUBTITLE');
          return this.postService.getPostById$Json({ postId });
        })
      )
      .subscribe({
        next: (post: PostViewModel) => {
          this.patchForm(post);
          this.loadingService.hideLoading();
        },
        error: () => {
          this.loadingService.hideLoading();
          this.toastrService.presentErrorToast('ERROR_WHILE_LOADING_POST');
        }
      });
  }

  private patchForm(post: PostViewModel) {
    this.currentAccessOfPost = post.access!;
    this.postForm?.setValue({
      text: post.content,
      access: post.access
    });
    this.image = post.image;
  }
}
