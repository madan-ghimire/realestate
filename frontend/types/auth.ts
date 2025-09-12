export interface SignUpData {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface SignInData {
  username?: string;
  email?: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string | Date | null | undefined;
}

export interface AuthResponse {
  message: string;
  token?: string;
  success: boolean;
  user?: User;
}
