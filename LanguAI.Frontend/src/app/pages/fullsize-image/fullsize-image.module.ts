import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullsizeImagePageRoutingModule } from './fullsize-image-routing.module';

import { FullsizeImagePage } from './fullsize-image.page';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullsizeImagePageRoutingModule,
    UtilModule
  ],
  declarations: [FullsizeImagePage]
})
export class FullsizeImagePageModule {}
