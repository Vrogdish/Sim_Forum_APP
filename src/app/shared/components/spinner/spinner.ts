import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'white' | 'red' = 'white';
}
