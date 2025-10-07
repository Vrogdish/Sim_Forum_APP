import { User } from '../../profile/models/user.model';

export interface ThreadDto {
  id: number;
  title: string;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  content: string;
  user: User;
  totalPosts: number;
  tagNames: string[];
  tagIds: number[];
  createdAt: string;
}
