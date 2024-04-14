import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: HTMLIonLoadingElement | undefined;

  constructor(
    private loadingController: LoadingController
  ) {}

  async showLoading(message: string): Promise<void> {
    this.loading = await this.loadingController.create({
      message
    });

    this.loading.present();
  }

  hideLoading() {
    this.loading?.dismiss();
  }
}
