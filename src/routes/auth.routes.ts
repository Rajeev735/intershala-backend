import { Router } from "express";

import authController from "../controllers/auth.controller";
import validate from "../middleware/validate.middleware";
import { createSalesSchema, loginSchema, registerSchema } from "../validation/auth.validation";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import { UserRole } from "../models/user.model";

const authRoutes = Router();

authRoutes.post("/register",validate(registerSchema),authController.register);

authRoutes.post("/login", validate(loginSchema), authController.login);
authRoutes.post(
  "/create-sales",
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validate(createSalesSchema),
  authController.createSalesUser
);
export default authRoutes;