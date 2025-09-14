import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Btn } from '../../../../shared/components/btn/btn';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  imports: [Btn],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
})
export class DeleteAccount {
  @Output() close = new EventEmitter<void>();
  errorMessage = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  onCancel() {
    this.close.emit();
  }

  onDeleteAccount() {
    this.profileService.deleteAccount().subscribe((res) => {
      if (res.error) {
        this.errorMessage = res.error;
        return;
      }
      this.close.emit();
      this.authService.logout();
      this.router.navigate(['/']);
    });
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    this.onCancel();
  }
}
