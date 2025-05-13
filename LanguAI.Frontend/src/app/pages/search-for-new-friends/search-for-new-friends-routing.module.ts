import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchForNewFriendsPage } from './search-for-new-friends.page';

const routes: Routes = [
  {
    path: '',
    component: SearchForNewFriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchForNewFriendsPageRoutingModule {}
