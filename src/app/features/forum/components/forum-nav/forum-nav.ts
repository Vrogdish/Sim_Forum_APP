import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-forum-nav',
  imports: [RouterLink, CommonModule],
  templateUrl: './forum-nav.html',
  styleUrl: './forum-nav.scss',
})
export class ForumNav implements OnInit {
  navItems = [
    {
      label: 'Liste des catégories',
      link: '/forum',
      subcategories: [{ label: 'Chargement...', link: '' }],
    },
    { label: 'Créer un nouveau sujet', link: '/forum/categories' },
    { label: 'Voir mes sujets', link: '/forum/' },
    { label: 'À propos', link: '/forum/about' },
  ];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoriesWithThreads().subscribe((res) => {
      console.log('Categories with threads:', res.data);
      this.navItems[0].subcategories =
        res.data?.map((category) => ({
          label: category.name,
          link: `/forum/${category.slug}`,
        })) || [];
    });
  }
}
