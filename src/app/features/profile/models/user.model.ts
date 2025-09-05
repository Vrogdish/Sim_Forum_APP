export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateFormModel {
  avatarUrl: string;
  signature: string;
}
