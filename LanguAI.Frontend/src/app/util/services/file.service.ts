import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ImageViewModel } from 'src/api/models';
import { FilePicker, PickFilesResult } from '@capawesome/capacitor-file-picker';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor() {}

  /**
   * Create a photo
   * @returns ImageViewModel
   */
  async createPhoto(): Promise<ImageViewModel> {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    return {
      contentAsString: photo.base64String,
      name: `${new Date().getTime()}.jpeg`,
      type: photo.format
    };
  }

  /**
   * Pick a photo
   * @returns ImageViewModel
   */
  async pickPhoto(): Promise<ImageViewModel> {
    const photo: PickFilesResult = await FilePicker.pickImages({
      readData: true,
      limit: 1,
      skipTranscoding: false
    });

    return {
      contentAsString: photo.files[0].data,
      name: photo.files[0].name,
      type: `${
        photo.files[0].name.split('.')[
          photo.files[0].name.split('.').length - 1
        ]
      }`
    };
  }

  /**
   * Check Permissions for AccessMediaLocation and ReadExternalStorage
   * It works only with Android
   * @returns Permission is granted or not
   */
  async checkPermissions(): Promise<boolean> {
    return await FilePicker.checkPermissions().then(status => {
      if (
        status.accessMediaLocation === 'granted' &&
        status.readExternalStorage === 'granted'
      ) {
        return true;
      }

      return false;
    });
  }

  /**
   * Set File Permissions for AccessMediaLocation and ReadExternalStorage
   * it works only with Android
   * @returns Permission got granted or not
   */
  async setFilePermissions(): Promise<boolean> {
    return FilePicker.requestPermissions({
      permissions: ['accessMediaLocation', 'readExternalStorage']
    }).then(status => {
      if (
        status.accessMediaLocation === 'granted' &&
        status.readExternalStorage === 'granted'
      ) {
        return true;
      }

      return false;
    });
  }

  getImageSrc(
    contentAsString: string | null | undefined,
    type: string | null | undefined
  ): string | undefined {
    if (contentAsString?.length && type?.length) {
      return `data:image/${type};base64,${contentAsString}`;
    } else {
      return undefined;
    }
  }
}
