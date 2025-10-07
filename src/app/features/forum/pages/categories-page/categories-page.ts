import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ResourceState } from '../../../../core/models/resource-state.model';
import { ResourceHandler } from "../../../../shared/components/resource-handler/resource-handler";
import { CategoryCard } from "../../components/category-card/category-card";
import { CategoryWithThreadsDto } from '../../models/category.model';
import { Banner } from "../../../../shared/components/banner/banner";

@Component({
  selector: 'app-categories-page',
  imports: [CommonModule, ResourceHandler, CategoryCard, Banner],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
})
export class CategoriesPage implements OnInit {
  categoryState$!: Observable<ResourceState<CategoryWithThreadsDto[]>>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryState$ = this.categoryService.getCategoriesWithThreads();
  }
}
