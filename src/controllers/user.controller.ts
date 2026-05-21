import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";

import userService from "../services/user.service";

class UserController {
  // GET SALES USERS
  getSalesUsers = asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const users =
        await userService.getSalesUsers();

      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    }
  );
}

export default new UserController();