import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/util/services/loading.service';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-fullsize-image',
  templateUrl: './fullsize-image.page.html',
  styleUrls: ['./fullsize-image.page.scss']
})
export class FullsizeImagePage implements OnInit {
  getImageSub: Subscription | undefined;

  imageSrc: string | undefined;
  type: string | undefined;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private toastrService: ToastrService
  ) {}

  async ngOnInit() {
    await this.loadingService.showLoading();
    this.getImageSub = this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        const imageSrc = params['image-src'];
        const type = params['type'];

        this.isLoading = false;
        this.loadingService.hideLoading();

        if (imageSrc?.length && type?.length) {
          this.imageSrc = imageSrc;
          this.type = type;
        }
      },
      error: err => {
        this.toastrService.presentErrorToast(err.message);
        console.error(err);
      }
    });
  }
}
