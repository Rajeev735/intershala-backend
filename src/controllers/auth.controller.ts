import { Request, Response } from "express";

import authService from "../services/auth.service";

import asyncHandler from "../utils/asyncHandler";

class AuthController {
  // REGISTER
  register = asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const { name, email, password} =
        req.body;

      // VALIDATION
      if (!name || !email || !password) {
        const error: any = new Error(
          "All fields are required"
        );

        error.statusCode = 400;

        throw error;
      }

      const result =
        await authService.registerUser({
          name,
          email,
          password,
         
        });

      res.status(201).json({
        success: true,
        message:
          "User registered successfully",
        data: result,
      });
    }
  );

  // LOGIN
  login = asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const { email, password } = req.body;

      // VALIDATION
      if (!email || !password) {
        const error: any = new Error(
          "Email and password are required"
        );

        error.statusCode = 400;

        throw error;
      }

      const result =
        await authService.loginUser({
          email,
          password,
        });

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    }
  );
  createSalesUser = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const result =
      await authService.createSalesUser(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Sales user created successfully",
      data: result,
    });
  }
);
}

export default new AuthController();