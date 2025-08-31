import { authGuard } from '../../core/guards/auth.guard';
import { ProfilePage } from './pages/profile-page/profile-page';

export const profileRoutes = [
  {
    path: '',
    component: ProfilePage,
    canActivate: [authGuard],
  },
];
