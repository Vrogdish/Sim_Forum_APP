import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { forumRoutes } from './features/forum/forum.routes';
import { authRoutes } from './features/auth/auth.routes';
import { profileRoutes } from './features/profile/profile.routes';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: 'accueil',
    component: HomePage,
    data: { breadcrumb: 'Accueil' },
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'profil',
    children: profileRoutes,
    canActivate: [authGuard],
  },
  {
    path: 'forum',
    children: forumRoutes,
    data: { breadcrumb: 'Forum' },
  },
  {
    path: '**',
    redirectTo: 'accueil',
  },
];
