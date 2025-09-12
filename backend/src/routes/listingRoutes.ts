import { Router } from "express";
import {
  getListings,
  getListing,
  createListingHandler,
  updateListingHandler,
  deleteListingHandler,
} from "../controllers/listingController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/listings/getAll:
 *   get:
 *     summary: Retrieves a list of all listings
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of listings
 *       500:
 *         description: Internal server error
 */
router.get("/getAll", authenticateToken, getListings);

/**
 * @swagger
 * /api/listings/{id}:
 *   get:
 *     summary: Retrieves a listing by ID
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing found
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateToken, getListing);

/**
 * @swagger
 * /api/listings:
 *   post:
 *     summary: Creates a new listing
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               propertyId:
 *                 type: string
 *               agentId:
 *                 type: string
 *               tenantId:
 *                 type: string
 *             required:
 *               - title
 *               - price
 *               - propertyId
 *               - agentId
 *     responses:
 *       201:
 *         description: Listing created
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateToken, createListingHandler);

/**
 * @swagger
 * /api/listings/{id}:
 *   put:
 *     summary: Updates an existing listing
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Listing updated
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authenticateToken, updateListingHandler);

/**
 * @swagger
 * /api/listings/{id}:
 *   delete:
 *     summary: Deletes a listing
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Listing ID
 *     responses:
 *       204:
 *         description: Listing deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateToken, deleteListingHandler);

export default router;
