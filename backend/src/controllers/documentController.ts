import { Request, Response } from "express";
import { DocumentType } from "@prisma/client";
import {
  createDocument,
  getAllDocuments,
  getDocumentById,
} from "../services/documentService";
import fs from "fs/promises";
import path from "path";
import { db } from "../../prisma/db";

export const getDocumentsHandler = async (req: Request, res: Response) => {
  try {
    const documents = await getAllDocuments();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving documents", error });
  }
};

export const getDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await getDocumentById(id);

    if (!property) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property" });
  }
};

export const createDocumentHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, type, uploadedById, propertyId, tenantId } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "File is required" });
    }

    // Validate type

    if (!Object.values(DocumentType).includes(type as DocumentType))
      res.status(400).json({ message: "Invalid document type" });

    const document = await createDocument({
      title,
      type: type as DocumentType,
      fileUrl: req.file?.path || "",
      size: req.file?.size || 0,
      mimeType: req.file?.mimetype || "",
      uploadedById,
      propertyId,
      tenantId,
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: "Error creating document", error });
  }
};

export const deleteDocumentHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const document = await db.document.findUnique({ where: { id } });

    if (!document) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    const fileName = path.basename(document.fileUrl);
    const filePath = path.join(process.cwd(), "uploads", "documents", fileName);

    try {
      await fs.unlink(filePath); // async deletion
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.warn("File not found, skipping deletion:", filePath);
      } else {
        console.error("Error deleting file:", err);
        // Optionally return error here if file delete is critical
      }
    }

    await db.document.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Error deleting document", error });
  }
};
