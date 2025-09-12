import { Request, Response } from "express";
import { BookingService } from "../services/bookingService";

const service = new BookingService();

export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await service.getAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

export const getBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const listing = await service.getById(id);
    if (!listing) {
      res.status(404).json({ message: "Listing not found" });
      return;
    }
    res.status(200).json(listing);
  } catch {
    res.status(500).json({ message: "Error retrieving listing" });
  }
};

export const createBookingHandler = async (req: Request, res: Response) => {
  try {
    const booking = await service.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
};

export const updateBookingHandler = async (req: Request, res: Response) => {
  try {
    const booking = await service.update(req.params.id, req.body);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
};

export const deleteBookingHandler = async (req: Request, res: Response) => {
  try {
    await service.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
