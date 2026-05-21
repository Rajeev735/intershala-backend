import { NextFunction, Request, Response } from "express";

import { UserRole } from "../models/user.model";

const roleMiddleware = (
  ...allowedRoles: UserRole[]
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      // CHECK USER
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });

        return;
      }

      // CHECK ROLE
      if (
        !allowedRoles.includes(req.user.role)
      ) {
        res.status(403).json({
          success: false,
          message:
            "You do not have permission to access this resource",
        });

        return;
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
};

export default roleMiddleware;