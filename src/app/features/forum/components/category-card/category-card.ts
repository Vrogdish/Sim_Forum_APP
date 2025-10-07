import { Component, Input } from '@angular/core';
import { CategoryWithThreadsDto } from '../../models/category.model';

import { ResourceHandler } from '../../../../shared/components/resource-handler/resource-handler';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [ CommonModule, RouterLink],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {
  @Input() category!: CategoryWithThreadsDto;

  constructor() {}
}
