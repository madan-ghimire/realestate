import { DocumentType } from "@prisma/client";
import { db } from "../../prisma/db";

export const createDocument = async (data: {
  title: string;
  type: DocumentType;
  fileUrl: string;
  size: number;
  mimeType: string;
  uploadedById: string;
  propertyId?: string;
  tenantId?: string;
}) => {
  return await db.document.create({
    data,
  });
};

export const getAllDocuments = async () => {
  return await db.document.findMany({
    include: {
      uploadedBy: true,
      property: true,
      tenant: true,
    },
    orderBy: { uploadedAt: "desc" },
  });
};

// Get single property by ID
export const getDocumentById = async (id: string) => {
  return db.document.findUnique({
    where: { id },
    include: {
      uploadedBy: true,
      property: true,
      tenant: true,
    },
  });
};

export const deleteDocument = async (id: string) => {
  return await db.document.delete({
    where: { id },
  });
};
