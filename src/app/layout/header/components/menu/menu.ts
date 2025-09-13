import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../features/profile/models/user.model';
import { environment } from '../../../../../environments/environment';
import { Avatar } from "../../../../shared/components/avatar/avatar";
@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, Avatar],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  menuItems = [
   
    { name: 'Forum', path: 'forum', icon: 'forum' },
    { name: 'À propos', path: 'apropos', icon: 'info' },
    { name: 'Contact', path: 'contact', icon: 'email' },
  ];
  mobileMenuOpen = false;
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  apiUploadUrl = environment.apiUploadUrl;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/avatars/default-avatar.png';
  }
}
