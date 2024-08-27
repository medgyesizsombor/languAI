import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonLearningPageRoutingModule } from './lesson-learning-routing.module';

import { LessonLearningPage } from './lesson-learning.page';
import { UtilModule } from "../../util/util.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonLearningPageRoutingModule,
    UtilModule
],
  declarations: [LessonLearningPage]
})
export class LessonLearningPageModule {}
