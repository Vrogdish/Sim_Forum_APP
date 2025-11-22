import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { ResourceHandler } from '../../../../shared/components/resource-handler/resource-handler';
import { Observable } from 'rxjs';
import { ResourceState } from '../../../../core/models/resource-state.model';
import { PostDto } from '../../models/post.model';
import { PostCard } from '../../components/post-card/post-card';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-thread-page',
  imports: [CommonModule, ResourceHandler, PostCard],
  templateUrl: './thread-page.html',
  styleUrl: './thread-page.scss',
})
export class ThreadPage implements OnInit {
  PostState$!: Observable<ResourceState<PostDto[]>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const threadId = params.get('threadId');
      this.PostState$ = this.postService.getPostsByThread(+threadId!);
      this.PostState$.subscribe((res) => {
        if (res.data && res.data.length > 0) {
          this.breadcrumbService.setBreadcrumbs([
            { label: 'Categories', url: '/forum' },
            { label: res.data[0].categoryName, url: `/forum/${res.data[0].categorySlug}` },
            {
              label: res.data[0].threadTitle,
              url: `/forum/${res.data[0].categorySlug}/${res.data[0].threadId}`,
            },
          ]);
        }
      });
    });
  }
}
