import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  menuItems = [
    { name: 'Accueil', path: 'accueil', icon: 'home' },
    { name: 'Forum', path: 'forum', icon: 'forum' },
    { name: 'À propos', path: 'apropos', icon: 'info' },
    { name: 'Contact', path: 'contact', icon: 'email' },
  ];
  mobileMenuOpen = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
