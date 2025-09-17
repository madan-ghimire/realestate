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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tenant?: any;
  username: string;
  email: string;
  role: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string | Date | null | undefined;
  tenantId?: string | null;
}

export interface AuthResponse {
  message: string;
  token?: string;
  success: boolean;
  user?: User;
}
