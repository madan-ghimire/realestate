import { Router } from "express";
import {
  getProperties,
  getProperty,
  createPropertyHandler,
  updatePropertyHandler,
  deletePropertyHandler,
} from "../controllers/propertyController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/authorizedRoles";

const router = Router();
// 🟢 Accessible to all authenticated users

/**
 * @swagger
 * /api/properties/getAll:
 *   get:
 *     summary: Retrieves a list of all properties
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of properties
 *       500:
 *         description: Internal server error
 */
router.get("/getAll", authenticateToken, getProperties);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Retrieves a property by ID
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property found
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateToken, getProperty);

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Creates a new property
 *     tags: [Properties]
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
 *                 example: "Modern Villa"
 *               description:
 *                 type: string
 *                 example: "Spacious villa with sea view"
 *               type:
 *                 type: string
 *                 example: "HOUSE"
 *               price:
 *                 type: number
 *                 example: 250000
 *               sizeSqFt:
 *                 type: number
 *                 example: 1800
 *               bedrooms:
 *                 type: integer
 *                 example: 4
 *               bathrooms:
 *                 type: integer
 *                 example: 3
 *               address:
 *                 type: string
 *                 example: "123 Ocean Drive"
 *               city:
 *                 type: string
 *                 example: "Miami"
 *               state:
 *                 type: string
 *                 example: "FL"
 *               zipCode:
 *                 type: string
 *                 example: "33139"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Pool", "Garage"]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/image1.jpg"]
 *               ownerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Property created
 *       500:
 *         description: Internal server error
 */

// router.post("/", authenticateToken, createPropertyHandler);

// 🔒 Only ADMIN and AGENT can create listings
router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMINISTRATOR", "AGENT"),
  createPropertyHandler
);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Updates an existing property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Villa"
 *     responses:
 *       200:
 *         description: Property updated
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authenticateToken, updatePropertyHandler);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Deletes a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       204:
 *         description: Property deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateToken, deletePropertyHandler);

export default router;
