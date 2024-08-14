import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardListsPage } from './card-lists.page';

const routes: Routes = [
  {
    path: '',
    component: CardListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardListsPageRoutingModule {}
