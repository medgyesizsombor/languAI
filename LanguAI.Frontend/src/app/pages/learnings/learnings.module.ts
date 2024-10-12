import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningPageRoutingModule } from './learnings-routing.module';

import { LearningPage } from './learnings.page';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningPageRoutingModule,
    UtilModule
  ],
  declarations: [LearningPage]
})
export class LearningPageModule {}
