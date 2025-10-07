import { Component, Input } from '@angular/core';
import { ThreadDto } from '../../models/thread.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thread-card',
  imports: [CommonModule],
  templateUrl: './thread-card.html',
  styleUrl: './thread-card.scss'
})
export class ThreadCard {
  @Input() thread!: ThreadDto


}
