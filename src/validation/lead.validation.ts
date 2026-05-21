import { z } from "zod";

import {
  LeadSource,
  LeadStatus,
} from "../models/lead.model";

// CREATE LEAD
export const createLeadSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z.email("Invalid email"),

  source: z.enum(LeadSource),

  status: z
    .enum(LeadStatus)
    .optional(),
});

// UPDATE LEAD
export const updateLeadSchema = z.object({
  name: z.string().min(3).optional(),

  email: z.email().optional(),

  source: z
    .enum(LeadSource)
    .optional(),

  status: z
    .enum(LeadStatus)
    .optional(),
});