import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostDto } from '../../models/post.model';
import { O } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Avatar } from "../../../../shared/components/avatar/avatar";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, Avatar, MatIconModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  @Input() post!: PostDto;
  @Output() postLiked = new EventEmitter<PostDto>();
  @Output() postDeleted = new EventEmitter<PostDto>();
  @Output() postEdited = new EventEmitter<PostDto>();

  constructor() {}

  onLike() {
    this.postLiked.emit(this.post);
  }

  onDelete() {
    this.postDeleted.emit(this.post);
  }

  onEdit() {
    this.postEdited.emit(this.post);
  }
}
