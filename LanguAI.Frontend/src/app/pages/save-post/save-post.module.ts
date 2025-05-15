import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostPageRoutingModule } from './save-post-routing.module';

import { CreatePostPage } from './save-post.page';
import { UtilModule } from 'src/app/util/util.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePostPageRoutingModule,
    UtilModule
  ],
  declarations: [CreatePostPage]
})
export class CreatePostPageModule {}
