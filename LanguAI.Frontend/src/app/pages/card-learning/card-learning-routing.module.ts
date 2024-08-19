import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardLearningPage } from './card-learning.page';

const routes: Routes = [
  {
    path: '',
    component: CardLearningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardLearningPageRoutingModule {}
