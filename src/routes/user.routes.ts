import express from "express";

import userController from "../controllers/user.controller";

import authMiddleware from "../middleware/auth.middleware";

import roleMiddleware from "../middleware/role.middleware";

import { UserRole } from "../models/user.model";

const userRoutes = express.Router();

// GET SALES USERS
userRoutes.get(
  "/sales",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  userController.getSalesUsers
);

export default userRoutes;