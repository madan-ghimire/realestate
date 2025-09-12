import { db } from "../../prisma/db";
import { CreateListingDto, UpdateListingDto } from "../dtos/listing-dto";

export const createListing = async (data: CreateListingDto) => {
  return db.listing.create({
    data,
  });
};

export const getAllListings = async () => {
  const listings = await db.listing.findMany({
    include: { property: true, agent: true, tenant: true },
  });
  const count = await db.listing.count();
  return { listings, count };
};

export const getListingById = async (id: string) => {
  return db.listing.findUnique({
    where: { id },
    include: { property: true, agent: true, tenant: true },
  });
};

export const updateListing = async (id: string, data: UpdateListingDto) => {
  return db.listing.update({
    where: { id },
    data,
  });
};

export const deleteListing = async (id: string) => {
  return db.listing.delete({
    where: { id },
  });
};
