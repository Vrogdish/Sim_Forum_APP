import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ResourceState } from '../../../../core/models/resource-state.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ThreadDto } from '../../models/thread.model';
import { CategoryService } from '../../services/category.service';
import { ThreadService } from '../../services/thread.service';
import { ResourceHandler } from '../../../../shared/components/resource-handler/resource-handler';
import { CommonModule } from '@angular/common';
import { ThreadCard } from '../../components/thread-card/thread-card';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-category-page',
  imports: [ResourceHandler, CommonModule, ThreadCard, RouterLink],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage {
  threadsState$!: Observable<ResourceState<ThreadDto[]>>;

  constructor(
    private threadService: ThreadService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const categorySlug = params.get('CategorySlug');
      this.categoryService.getCategoryBySlug(categorySlug!).subscribe((res) => {
        if (res.data) {
          console.log(res.data);
          this.breadcrumbService.setBreadcrumbs([
            { label: 'Categories', url: '/forum' },
            { label: res.data.name, url: `/forum/${res.data.slug}` },
          ]);
          this.threadsState$ = this.threadService.getThreadsByCategory(res.data.id);
        } else {
          // Handle category not found
        }
      });
    });
  }
}
