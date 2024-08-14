import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: HTMLIonLoadingElement | undefined;

  constructor(
    private loadingController: LoadingController,
    private translateService: TranslateService
  ) {}

  async showLoading(message?: string): Promise<void> {
    this.loading = await this.loadingController.create({
      message: message?.length
        ? message
        : this.translateService.instant('DATA_IS_LOADING'),
    });

    this.loading.present();
  }

  async hideLoading() {
    await this.loading?.dismiss();
  }
}
