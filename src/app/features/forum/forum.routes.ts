import { CategoriesPage } from './pages/categories-page/categories-page';
import { CategoryPage } from './pages/category-page/category-page';
import { ForumPage } from './pages/forum-page/forum-page';
import { ThreadPage } from './pages/thread-page/thread-page';

export const forumRoutes = [
  {
    path: '',
    component: ForumPage,
    children: [
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
    ],
  },
];
