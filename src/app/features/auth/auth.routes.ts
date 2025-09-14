import { loggedInGuard } from '../../core/guards/logged-in.guard';
import { resetPasswordGuard } from '../../core/guards/reset-password.guard';
import { Reset } from './components/reset/reset';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';

export const authRoutes = [
  {
    path: 'connexion',
    component: LoginPage,
    canActivate: [loggedInGuard],
  },
  {
    path: 'inscription',
    component: RegisterPage,
    canActivate: [loggedInGuard],
  },
  {
    path: 'reinitialisation',
    component: Reset,
    canActivate: [loggedInGuard, resetPasswordGuard],
  },
];
