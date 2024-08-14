import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {
  CARD_LIST_NAVIGATION,
  CARD_LISTS_NAVIGATION,
  FORUM_NAVIGATION,
  LESSONS_NAVIGATION,
  MESSAGES_NAVIGATION,
  PROFILE_NAVIGATION,
  SETTINGS_NAVIGATION
} from 'src/app/util/util.constants';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: LESSONS_NAVIGATION,
        loadChildren: () => import('../lessons/lessons.module').then(m => m.LessonsPageModule)
      },
      {
        path: CARD_LISTS_NAVIGATION,
        loadChildren: () => import('../card-lists/card-lists.module').then(m => m.CardListsPageModule)
      },
      {
        path: FORUM_NAVIGATION,
        loadChildren: () => import('../forum/forum.module').then(m => m.ForumPageModule)
      },
      {
        path: MESSAGES_NAVIGATION,
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: SETTINGS_NAVIGATION,
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: PROFILE_NAVIGATION,
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'post',
        loadChildren: () => import('../post/post.module').then(m => m.PostPageModule)
      },
      {
        path: '',
        redirectTo: '/lessons',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/lessons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
