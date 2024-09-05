import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardFunction, LoginGuardFunction } from './util/util.guard';
import {
  CARD_LEARNING_NAVIGATION,
  CARD_LIST_NAVIGATION,
  CARD_LISTS_NAVIGATION,
  CARD_NAVIGATION,
  FORUM_NAVIGATION,
  LESSON_LEARNING,
  LESSONS_NAVIGATION,
  LOGIN_NAVIGATION,
  MESSAGE_NAVIGATION,
  MESSAGES_NAVIGATION,
  POST_NAVIGATION,
  PROFILE_NAVIGATION,
  REGISTER_NAVIGATION,
  SETTINGS_NAVIGATION
} from './util/util.constants';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: LESSONS_NAVIGATION,
    loadChildren: () =>
      import('./pages/lessons/lessons.module').then(m => m.LessonsPageModule)
  },
  {
    path: LOGIN_NAVIGATION,
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuardFunction]
  },
  {
    path: REGISTER_NAVIGATION,
    loadChildren: () =>
      import('./pages/register/register.module').then(
        m => m.RegisterPageModule
      ),
    canActivate: [LoginGuardFunction]
  },
  {
    path: CARD_LISTS_NAVIGATION,
    loadChildren: () =>
      import('./pages/card-lists/card-lists.module').then(
        m => m.CardListsPageModule
      )
  },
  {
    path: FORUM_NAVIGATION,
    loadChildren: () =>
      import('./pages/forum/forum.module').then(m => m.ForumPageModule)
  },
  {
    path: MESSAGES_NAVIGATION,
    loadChildren: () =>
      import('./pages/messages/messages.module').then(m => m.MessagesPageModule)
  },
  {
    path: SETTINGS_NAVIGATION,
    loadChildren: () =>
      import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: PROFILE_NAVIGATION,
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: POST_NAVIGATION,
    loadChildren: () =>
      import('./pages/post/post.module').then(m => m.PostPageModule)
  },
  {
    path: CARD_NAVIGATION,
    loadChildren: () =>
      import('./pages/card/card.module').then(m => m.CardPageModule)
  },
  {
    path: CARD_LIST_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/card-list/card-list.module').then(
        m => m.CardListPageModule
      )
  },
  {
    path: CARD_LEARNING_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/card-learning/card-learning.module').then(
        m => m.CardLearningPageModule
      )
  },
  {
    path: LESSON_LEARNING,
    loadChildren: () =>
      import('./pages/lesson-learning/lesson-learning.module').then(
        m => m.LessonLearningPageModule
      )
  },
  {
    path: MESSAGE_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/message/message.module').then(m => m.MessagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
