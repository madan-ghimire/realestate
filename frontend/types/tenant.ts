export interface Tenant {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt?: string | Date | null | undefined;
  updatedAt?: string | Date | null | undefined;
}
