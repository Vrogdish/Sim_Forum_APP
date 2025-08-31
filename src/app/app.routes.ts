import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { forumRoutes } from './features/forum/forum.routes';
import { authRoutes } from './features/auth/auth.routes';
import { profileRoutes } from './features/profile/profile.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: 'accueil',
    component: HomePage,
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'profile',
    children: profileRoutes,
  },
  {
    path: 'forum',
    children: forumRoutes,
  },
  {
    path: '**',
    redirectTo: 'accueil',
  },
];
