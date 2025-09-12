import { Router } from "express";
import {
  getBookings,
  getBooking,
  createBookingHandler,
  updateBookingHandler,
  deleteBookingHandler,
} from "../controllers/bookingController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/bookings/getAll:
 *   get:
 *     summary: Retrieves a list of all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *       500:
 *         description: Internal server error
 */
router.get("/getAll", authenticateToken, getBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Retrieves a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking found
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateToken, getBooking);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Creates a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED]
 *                 default: PENDING
 *               notes:
 *                 type: string
 *               listingId:
 *                 type: string
 *               clientId:
 *                 type: string
 *               tenantId:
 *                 type: string
 *             required:
 *               - scheduledAt
 *               - listingId
 *               - clientId
 *     responses:
 *       201:
 *         description: Booking created
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateToken, createBookingHandler);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Updates an existing booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking updated
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authenticateToken, updateBookingHandler);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Deletes a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       204:
 *         description: Booking deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateToken, deleteBookingHandler);

export default router;
