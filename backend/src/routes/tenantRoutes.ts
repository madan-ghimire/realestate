import { Router } from "express";
import {
  getTenants,
  getTenant,
  createTenantHandler,
  updateTenantHandler,
  deleteTenantHandler,
} from "../controllers/tenantController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/tenants/getAll:
 *   get:
 *     summary: Retrieves a list of all tenants
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tenants
 *       500:
 *         description: Internal server error
 */
router.get("/getAll", authenticateToken, getTenants);

/**
 * @swagger
 * /api/tenants/{id}:
 *   get:
 *     summary: Retrieves a tenant by ID
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tenant ID
 *     responses:
 *       200:
 *         description: Tenant found
 *       404:
 *         description: Tenant not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateToken, getTenants);

/**
 * @swagger
 * /api/tenants:
 *   post:
 *     summary: Creates a new tenant
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Acme Corp"
 *     responses:
 *       201:
 *         description: Tenant created
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateToken, createTenantHandler);

/**
 * @swagger
 * /api/tenants/{id}:
 *   put:
 *     summary: Updates an existing tenant
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tenant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Corp"
 *     responses:
 *       200:
 *         description: Tenant updated
 *       404:
 *         description: Tenant not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authenticateToken, updateTenantHandler);

/**
 * @swagger
 * /api/tenants/{id}:
 *   delete:
 *     summary: Deletes a tenant
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tenant ID
 *     responses:
 *       204:
 *         description: Tenant deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateToken, deleteTenantHandler);

export default router;
