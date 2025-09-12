import { db } from "../../prisma/db";
import { TenantDto } from "../dtos/tenantDto";

export const createTenant = async (tenantData: TenantDto) => {
  return db.tenant.create({
    data: tenantData,
  });
};

export const getAllTenants = async () => {
  const [tenants, count] = await Promise.all([
    db.tenant.findMany(),
    db.tenant.count,
  ]);
  return {
    tenants,
    count,
  };
};

export const getTenantById = async (id: string) => {
  return db.tenant.findUnique({
    where: { id },
  });
};

export const updateTenant = async (
  id: string,
  tenantData: Partial<TenantDto>
) => {
  return db.tenant.update({
    where: { id },
    data: tenantData,
  });
};

export const deleteTenant = async (id: string) => {
  return db.tenant.delete({
    where: { id },
  });
};
