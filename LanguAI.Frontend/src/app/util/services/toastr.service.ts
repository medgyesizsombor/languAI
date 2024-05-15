import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastController: ToastController) {}

  /**
   * Show success toastr
   */
  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'success-toastr',
    });

    await toast.present();
  }

  /**
   * Show error toastr
   */
  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'error-toastr',
    });

    await toast.present();
  }
}
