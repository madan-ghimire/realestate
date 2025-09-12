import { Router } from "express";
import {
  createUserHandler,
  getUsers,
  updateUserHandler,
  deleteUserandler,
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/authorizedRoles";

const router = Router();

/**
 * @swagger
 * /api/users/getAll:
 *   get:
 *     summary: Retrieves a list of all users
 *     description: Returns an array of all users in the system. Requires authentication.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get(
  "/getAll",
  // authorizeRoles("ADMINISTRATOR"),
  authenticateToken,
  getUsers
);

router.post(
  "/create",
  authenticateToken,
  createUserHandler,
  authorizeRoles("ADMINISTRATOR")
);

router.put(
  "/update/:id",
  updateUserHandler,
  authenticateToken,
  authorizeRoles("ADMINISTRATOR")
);

router.delete(
  "/delete/:id",
  deleteUserandler,
  authenticateToken,
  authorizeRoles("ADMINISTRATOR")
);

export default router;
