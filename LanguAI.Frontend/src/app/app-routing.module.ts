import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  CARD_LEARNING_NAVIGATION,
  CARD_LIST_NAVIGATION,
  CARD_LISTS_NAVIGATION,
  CARD_NAVIGATION,
  CREATE_POST_NAVIGATION,
  FORUM_NAVIGATION,
  FULLSIZE_IMAGE_NAVIGATION,
  LEARNINGS_NAVIGATION,
  LESSON_LEARNING_NAVIGATION,
  LESSONS_NAVIGATION,
  LOGIN_NAVIGATION,
  MESSAGE_NAVIGATION,
  MESSAGES_NAVIGATION,
  NOTIFICATIONS_NAVIGATION,
  POST_NAVIGATION,
  PROFILE_NAVIGATION,
  REGISTER_NAVIGATION,
  SEARCH_NEW_FRIENDS_NAVIGATION,
  SETTINGS_NAVIGATION
} from './util/util.constants';
import { LearningGuardFunction } from './util/guards/learning.guard';
import { LoginGuardFunction } from './util/guards/login.guard';
import { AuthGuardFunction } from './util/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: LESSONS_NAVIGATION,
    loadChildren: () =>
      import('./pages/lessons/lessons.module').then(m => m.LessonsPageModule),
    canActivate: [LearningGuardFunction]
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
    path: PROFILE_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: POST_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/post/post.module').then(m => m.PostPageModule),
    canActivate: [LearningGuardFunction]
  },
  {
    path: CARD_NAVIGATION,
    loadChildren: () =>
      import('./pages/card/card.module').then(m => m.CardPageModule),
    canActivate: [LearningGuardFunction]
  },
  {
    path: CARD_NAVIGATION + '/:cardId',
    loadChildren: () =>
      import('./pages/card/card.module').then(m => m.CardPageModule),
    canActivate: [LearningGuardFunction]
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
    path: LESSON_LEARNING_NAVIGATION,
    loadChildren: () =>
      import('./pages/lesson-learning/lesson-learning.module').then(
        m => m.LessonLearningPageModule
      )
  },
  {
    path: MESSAGE_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/message/message.module').then(m => m.MessagePageModule)
  },
  {
    path: NOTIFICATIONS_NAVIGATION,
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(
        m => m.NotificationsPageModule
      )
  },
  {
    path: CREATE_POST_NAVIGATION,
    loadChildren: () =>
      import('./pages/create-post/create-post.module').then(
        m => m.CreatePostPageModule
      )
  },
  {
    path: LEARNINGS_NAVIGATION,
    loadChildren: () =>
      import('./pages/learnings/learnings.module').then(
        m => m.LearningPageModule
      )
  },
  {
    path: FULLSIZE_IMAGE_NAVIGATION,
    loadChildren: () =>
      import('./pages/fullsize-image/fullsize-image.module').then(
        m => m.FullsizeImagePageModule
      )
  },
  {
    path: SEARCH_NEW_FRIENDS_NAVIGATION,
    loadChildren: () =>
      import(
        './pages/search-for-new-friends/search-for-new-friends.module'
      ).then(m => m.SearchForNewFriendsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
