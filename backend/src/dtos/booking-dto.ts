export interface CreateBookingDto {
  scheduledAt: Date;
  status?: "PENDING" | "CONFIRMED" | "CANCELLED";
  notes?: string;
  listingId: string;
  clientId: string;
  tenantId?: string;
}

export interface UpdateBookingDto {
  scheduledAt?: Date;
  status?: "PENDING" | "CONFIRMED" | "CANCELLED";
  notes?: string;
}
