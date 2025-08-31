export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  username: string;
  email: string;
  role: string;
  avatarUrl: string;
  createdAt: string; // ou Date si tu veux convertir
  updatedAt: string; // ou Date
}

export interface TokenResponseDto {
  token: string;
}

export interface ErrorResponseDto {
  statusCode: number;
  message: string;
}
