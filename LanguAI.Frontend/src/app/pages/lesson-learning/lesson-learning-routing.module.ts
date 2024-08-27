import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonLearningPage } from './lesson-learning.page';

const routes: Routes = [
  {
    path: '',
    component: LessonLearningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonLearningPageRoutingModule {}
