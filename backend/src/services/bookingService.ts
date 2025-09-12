import { db } from "../../prisma/db";
import { CreateBookingDto, UpdateBookingDto } from "../dtos/booking-dto";

export class BookingService {
  async getAll() {
    return db.booking.findMany({
      include: {
        listing: true,
        client: true,
        tenant: true,
      },
    });
  }

  async getById(id: string) {
    return db.booking.findUnique({
      where: { id },
      include: {
        listing: true,
        client: true,
        tenant: true,
      },
    });
  }

  async create(data: CreateBookingDto) {
    return db.booking.create({
      data,
    });
  }

  async update(id: string, data: UpdateBookingDto) {
    return db.booking.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return db.booking.delete({
      where: { id },
    });
  }
}
