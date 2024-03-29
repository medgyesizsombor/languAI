import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'lessons',
        loadChildren: () => import('../lessons/lessons.module').then(m => m.LessonsPageModule)
      },
      {
        path: 'cards',
        loadChildren: () => import('../cards/cards.module').then(m => m.CardsPageModule)
      },
      {
        path: 'forum',
        loadChildren: () => import('../forum/forum.module').then(m => m.ForumPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
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
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
