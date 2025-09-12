import { Router } from "express";
import {
  createDocumentHandler,
  getDocumentsHandler,
  getDocument,
  deleteDocumentHandler,
} from "../controllers/documentController";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

/**
 * @swagger
 * /api/documents/getAll:
 *   get:
 *     summary: Retrieves a list of all documents
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   type:
 *                     type: string
 *                   filePath:
 *                     type: string
 *                   uploadedById:
 *                     type: string
 *                   propertyId:
 *                     type: string
 *                   tenantId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */

router.get("/getAll", getDocumentsHandler);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Retrieves a document by ID
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Document ID
 *     responses:
 *       200:
 *         description: Document found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 type:
 *                   type: string
 *                 filePath:
 *                   type: string
 *                 uploadedById:
 *                   type: string
 *                 propertyId:
 *                   type: string
 *                 tenantId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getDocument);

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Upload a new document
 *     tags:
 *       - Documents
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - uploadedById
 *               - file
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [DEED, CONTRACT, INSPECTION_REPORT, TAX, OTHER]
 *               uploadedById:
 *                 type: string
 *               propertyId:
 *                 type: string
 *               tenantId:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Document uploaded successfully
 *       500:
 *         description: Internal server error
 */

router.post("/", upload.single("file"), createDocumentHandler);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Deletes a document and its associated file
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Document deleted successfully
 *       404:
 *         description: Document not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Document not found
 *       500:
 *         description: Internal server error
 */

router.delete("/:id", deleteDocumentHandler);

export default router;
