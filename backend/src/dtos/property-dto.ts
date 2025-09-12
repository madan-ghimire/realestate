export interface PropertyDto {
  title: string;
  description?: string;
  type: string;
  status?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  price: number;
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt?: number;
  amenities: string[];
  images?: string[];
  listedAt?: Date;
  ownerId?: string;
  tenantId?: string;
}
