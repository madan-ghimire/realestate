export interface RegisterDto {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  password: string;
  phone: string;
  role: string;
  tenantId?: string;
  resetPassword?: boolean;
  status?: string;
}

export interface CreateUserDto {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  password: string;
  phone: string;
  role: string;
  tenantId?: string;
  resetPassword?: boolean;
  status?: string;
}
