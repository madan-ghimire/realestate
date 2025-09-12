import { db } from "../../prisma/db";
import { Property } from "@prisma/client";
import { PropertyDto } from "../dtos/property-dto";

// Create a new property
export const createProperty = async (propertyData: PropertyDto) => {
  return db.property.create({
    data: propertyData as any,
  });
};

// Get all properties with count (like getAllTenants)
export const getAllProperties = async (
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;

  const [properties, count] = await Promise.all([
    db.property.findMany({ skip, take: limit }),
    db.property.count(),
  ]);
  return {
    properties,
    count,
  };
};

// Get single property by ID
export const getPropertyById = async (id: string) => {
  return db.property.findUnique({
    where: { id },
    include: {
      owner: true,
      tenant: true,
      listings: true,
      documents: true,
    },
  });
};

// Update property by ID
export const updateProperty = async (
  id: string,
  propertyData: Partial<PropertyDto>
) => {
  return db.property.update({
    where: { id },
    data: propertyData as any,
  });
};

// Delete property by ID
export const deleteProperty = async (id: string) => {
  return db.property.delete({
    where: { id },
  });
};
