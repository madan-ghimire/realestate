import { Request, Response } from "express";

import {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
} from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = (req.query.search as string) || "";

    console.log("page and pagesize here i am", page, pageSize, search);

    const users = await getAllUsers({ page, pageSize, search });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    // console.log("check user create data here", req.body);
    const user = await createUser(req.body);

    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user whats gone on", error });
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log("check id and body here", id, req.body);
    const user = await editUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user here i am", error });
  }
};

export const deleteUserandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log("check id and body here", id);
    await deleteUser(id);
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Error deleting user" });
  }
};
