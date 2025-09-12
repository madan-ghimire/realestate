import { Request, Response } from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../services/listingService";

export const getListings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listings, count } = await getAllListings();
    res.status(200).json({ data: listings, totalCount: count });
  } catch {
    res.status(500).json({ message: "Error retrieving listings" });
  }
};

export const getListing = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const listing = await getListingById(id);
    if (!listing) {
      res.status(404).json({ message: "Listing not found" });
      return;
    }
    res.status(200).json(listing);
  } catch {
    res.status(500).json({ message: "Error retrieving listing" });
  }
};

export const createListingHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listing = await createListing(req.body);
    res.status(201).json(listing);
  } catch {
    res.status(500).json({ message: "Error creating listing" });
  }
};

export const updateListingHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const listing = await updateListing(id, req.body);
    res.status(200).json(listing);
  } catch {
    res.status(500).json({ message: "Error updating listing" });
  }
};

export const deleteListingHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteListing(id);
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Error deleting listing" });
  }
};
