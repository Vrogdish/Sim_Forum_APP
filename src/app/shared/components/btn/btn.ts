import { O } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Spinner } from "../spinner/spinner";

@Component({
  selector: 'app-btn',
  imports: [CommonModule, Spinner],
  templateUrl: './btn.html',
  styleUrl: './btn.scss',
})
export class Btn {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() text = 'Button';
  @Input() icon: string | null = null;
  @Input() theme: 'primary' | 'secondary' | 'danger' | 'cancel' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled && !this.loading) {
      this.onClick.emit();
    }
  }
}
