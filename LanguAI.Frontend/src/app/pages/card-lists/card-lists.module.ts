import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardListsPageRoutingModule } from './card-lists-routing.module';

import { CardListsPage } from './card-lists.page';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardListsPageRoutingModule,
    UtilModule
  ],
  declarations: [CardListsPage]
})
export class CardListsPageModule {}
