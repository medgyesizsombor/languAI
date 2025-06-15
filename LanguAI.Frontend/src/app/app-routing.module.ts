import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  CARD_LEARNING_NAVIGATION,
  CARD_LIST_NAVIGATION,
  CARD_LISTS_NAVIGATION,
  CARD_NAVIGATION,
  FORUM_NAVIGATION,
  LEADERBOARD_NAVIGATION,
  LEARNINGS_NAVIGATION,
  LESSON_LEARNING_NAVIGATION,
  LESSONS_NAVIGATION,
  LOGIN_NAVIGATION,
  MESSAGE_NAVIGATION,
  MESSAGES_NAVIGATION,
  NOT_FOUND_NAVIGATION,
  NOTIFICATIONS_NAVIGATION,
  POST_NAVIGATION,
  PROFILE_NAVIGATION,
  REGISTER_NAVIGATION,
  SAVE_POST_NAVIGATION,
  SEARCH_NEW_FRIENDS_NAVIGATION,
  SETTINGS_NAVIGATION
} from './util/util.constants';
import { LoginGuardFunction } from './util/guards/login.guard';
import { AuthGuardFunction } from './util/guards/auth.guard';

const routes: Routes = [
  {
    path: LESSONS_NAVIGATION,
    loadChildren: () =>
      import('./pages/lessons/lessons.module').then(m => m.LessonsPageModule),
    canActivate: [AuthGuardFunction]
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
      import('./pages/forum/forum.module').then(m => m.ForumPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: MESSAGES_NAVIGATION,
    loadChildren: () =>
      import('./pages/messages/messages.module').then(
        m => m.MessagesPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: SETTINGS_NAVIGATION,
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        m => m.SettingsPageModule
      ),
    canActivate: [AuthGuardFunction]
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
    canActivate: [AuthGuardFunction]
  },
  {
    path: CARD_NAVIGATION,
    loadChildren: () =>
      import('./pages/card/card.module').then(m => m.CardPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: CARD_NAVIGATION + '/:card-id',
    loadChildren: () =>
      import('./pages/card/card.module').then(m => m.CardPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: CARD_LIST_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/card-list/card-list.module').then(
        m => m.CardListPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: CARD_LEARNING_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/card-learning/card-learning.module').then(
        m => m.CardLearningPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: LESSON_LEARNING_NAVIGATION,
    loadChildren: () =>
      import('./pages/lesson-learning/lesson-learning.module').then(
        m => m.LessonLearningPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: LESSON_LEARNING_NAVIGATION + '/:topic-id',
    loadChildren: () =>
      import('./pages/lesson-learning/lesson-learning.module').then(
        m => m.LessonLearningPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: MESSAGE_NAVIGATION + '/:id',
    loadChildren: () =>
      import('./pages/message/message.module').then(m => m.MessagePageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: NOTIFICATIONS_NAVIGATION,
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(
        m => m.NotificationsPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: SAVE_POST_NAVIGATION,
    loadChildren: () =>
      import('./pages/save-post/save-post.module').then(
        m => m.CreatePostPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: SAVE_POST_NAVIGATION + '/:post-id',
    loadChildren: () =>
      import('./pages/save-post/save-post.module').then(
        m => m.CreatePostPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: LEARNINGS_NAVIGATION,
    loadChildren: () =>
      import('./pages/learnings/learnings.module').then(
        m => m.LearningPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: SEARCH_NEW_FRIENDS_NAVIGATION,
    loadChildren: () =>
      import(
        './pages/search-for-new-friends/search-for-new-friends.module'
      ).then(m => m.SearchForNewFriendsPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: LEADERBOARD_NAVIGATION,
    loadChildren: () =>
      import('./pages/leaderboard/leaderboard.module').then(
        m => m.LeaderboardPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: NOT_FOUND_NAVIGATION,
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        m => m.NotFoundPageModule
      ),
    canActivate: [AuthGuardFunction]
  },
  {
    path: '',
    redirectTo: LESSONS_NAVIGATION,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: NOT_FOUND_NAVIGATION, pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
