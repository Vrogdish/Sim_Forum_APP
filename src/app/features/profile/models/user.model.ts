export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatarUrl: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignatureToUpdateDto {
  signature: string;
}

export interface SignatureUpdateFormModel {
  signature: string;
}

export interface AvatarToUpdateDto {
  avatarUrl: string;
}

export interface AvatarUpdateFormModel {
  avatarUrl: string;
}
