import { CategoriesPage } from './pages/categories-page/categories-page';
import { CategoryPage } from './pages/category-page/category-page';
import { ThreadPage } from './pages/thread-page/thread-page';

export const forumRoutes = [
  {
    path: '',
    component: CategoriesPage,
  },
  {
    path: ':CategorySlug',
    component: CategoryPage,
  },
  {
    path: ':CategorySlug/:threadId',
    component: ThreadPage,
  },
];
