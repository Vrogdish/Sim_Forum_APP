import { User } from '../../profile/models/user.model';

export interface PostDto {
  id: number;
  threadId: number;
  content: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
}
