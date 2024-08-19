import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardLearningPageRoutingModule } from './card-learning-routing.module';

import { CardLearningPage } from './card-learning.page';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardLearningPageRoutingModule,
    UtilModule
  ],
  declarations: [CardLearningPage]
})
export class CardLearningPageModule {}
