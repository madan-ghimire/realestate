import { Request, Response } from "express";
import {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
} from "../services/tenantService";

export const getTenants = async (req: Request, res: Response) => {
  try {
    const { tenants, count } = await getAllTenants();
    res.status(200).json({
      data: tenants,
      totalCount: count,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tenants" });
  }
};

export const getTenant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenant = await getTenantById(id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(tenant);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tenant" });
  }
};

export const createTenantHandler = async (req: Request, res: Response) => {
  try {
    const tenant = await createTenant(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    res.status(500).json({ message: "Error creating tenant" });
  }
};

export const updateTenantHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenant = await updateTenant(id, req.body);
    res.status(200).json(tenant);
  } catch (error) {
    res.status(500).json({ message: "Error updating tenant" });
  }
};

export const deleteTenantHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTenant(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting tenant" });
  }
};
