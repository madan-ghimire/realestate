import { Request, response, Response } from "express";
import authService from "../services/authService";
import { UserDto } from "../dtos/userDto";
import { RegisterDto } from "../dtos/registerDto";
import { prismaErrorHandler } from "../utilites/prismaErrorHandler";
import { StatusCodes } from "../constant/statusCodes";

export const signup = async (req: Request, res: Response) => {
  try {
    const token = await authService.register(req.body as RegisterDto);
    res.status(201).json({ token, success: true });
  } catch (error: any) {
    const handled = prismaErrorHandler(error);
    console.log("check error handled", handled);
    res.status(400).json({ message: handled.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const response = await authService.login(req.body as UserDto, req);

    console.log("check response after login success", response);
    res
      .status(200)
      .json({ message: "Authentication successful", response, success: true });
  } catch (error: any) {
    console.log("check here", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const response = await authService.forgotPassword(req.body.email);
    res.status(StatusCodes.SUCCESS).json({
      success: true,
      message: "Reset password link sent to your inbox.",
      response,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;

    console.log("check password here i am i2 ", req.body);

    const response = await authService.resetPassword(
      req.body?.password as string,
      token as string
    );

    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Password reset successful",
      response,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// export const resetPassword(req: Request, res: Response) {
//   const token = req.params.token;
//   const response = await authService
// }

// async forgotPassword(req: Request, res: Response) {
//   await authServices.forgotPassword(req.body?.email as string);
//   res.status(StatusCodes.SUCCESS).json({
//     success: true,
//     message: 'Reset password link sent to your inbox.',
//   });
// }
