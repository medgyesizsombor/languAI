import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { AuthGuardFunction, LoginGuardFunction } from './util/util.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'lessons',
    loadChildren: () => import('./pages/lessons/lessons.module').then( m => m.LessonsPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuardFunction]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [LoginGuardFunction]
  },
  {
    path: 'cards',
    loadChildren: () => import('./pages/cards/cards.module').then( m => m.CardsPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'forum',
    loadChildren: () => import('./pages/forum/forum.module').then( m => m.ForumPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
