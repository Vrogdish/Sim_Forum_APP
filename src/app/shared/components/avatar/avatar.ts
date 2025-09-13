import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { User } from '../../../features/profile/models/user.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  @Input({ required: true }) user!: User;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() onClick = new EventEmitter<void>();

  apiUploadUrl = environment.apiUploadUrl;

  HandleClick() {
    this.onClick.emit();
  }

  onError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/avatars/default-avatar.png';
  }
}
