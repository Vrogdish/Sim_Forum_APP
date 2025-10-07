import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThreadService } from '../../services/thread.service';

import { ActivatedRoute } from '@angular/router';
import { Banner } from '../../../../shared/components/banner/banner';
import { PostService } from '../../services/post.service';
import { ResourceHandler } from '../../../../shared/components/resource-handler/resource-handler';
import { Observable } from 'rxjs';
import { ResourceState } from '../../../../core/models/resource-state.model';
import { PostDto } from '../../models/post.model';
import { PostCard } from "../../components/post-card/post-card";

@Component({
  selector: 'app-thread-page',
  imports: [CommonModule, Banner, ResourceHandler, PostCard],
  templateUrl: './thread-page.html',
  styleUrl: './thread-page.scss',
})
export class ThreadPage implements OnInit {
  PostState$!: Observable<ResourceState<PostDto[]>>;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const threadId = params.get('threadId');
      this.PostState$ = this.postService.getPostsByThread(+threadId!);
    });
  }
}
