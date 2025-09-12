export interface CreateListingDto {
  title: string;
  description?: string;
  price: number;
  propertyId: string;
  agentId: string;
  tenantId?: string;
}

export interface UpdateListingDto {
  title?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
  tenantId?: string;
}
