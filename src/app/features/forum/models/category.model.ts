import { ThreadDto } from './thread.model';

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface CategoryWithThreadsDto extends CategoryDto {
  totalThreads: number;
  threads: ThreadDto[];
}
