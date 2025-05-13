import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchForNewFriendsPageRoutingModule } from './search-for-new-friends-routing.module';

import { SearchForNewFriendsPage } from './search-for-new-friends.page';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchForNewFriendsPageRoutingModule,
    UtilModule
  ],
  declarations: [SearchForNewFriendsPage]
})
export class SearchForNewFriendsPageModule {}
