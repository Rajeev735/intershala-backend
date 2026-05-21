import { Router } from "express";

import leadController from "../controllers/lead.controller";


import { UserRole } from "../models/user.model";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import validate from "../middleware/validate.middleware";
import { createLeadSchema, updateLeadSchema } from "../validation/lead.validation";

const leadRoutes = Router();

// PROTECTED ROUTES
leadRoutes.use(authMiddleware);

// CREATE LEAD
leadRoutes.post(
  "/create-lead",
  roleMiddleware(
    UserRole.ADMIN,
    UserRole.SALES
  ),
  validate(createLeadSchema),
  leadController.createLead
);

// GET ALL LEADS
leadRoutes.get(
  "/",
  roleMiddleware(
    UserRole.ADMIN,
    UserRole.SALES
  ),
  
  leadController.getLeads
);

// GET SINGLE LEAD
leadRoutes.get(
  "/:id",
  roleMiddleware(
    UserRole.ADMIN,
    UserRole.SALES
  ),
  leadController.getSingleLead
);

// UPDATE LEAD
leadRoutes.put(
  "/:id",
  roleMiddleware(
    UserRole.ADMIN,
    UserRole.SALES
  ),
  validate(updateLeadSchema),
  leadController.updateLead
);

// DELETE LEAD
leadRoutes.delete(
  "/:id",
  roleMiddleware(UserRole.ADMIN),
  leadController.deleteLead
);

export default leadRoutes;