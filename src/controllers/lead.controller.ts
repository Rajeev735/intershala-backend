import { Request, Response } from "express";

import leadService from "../services/lead.service";

import asyncHandler from "../utils/asyncHandler";

class LeadController {
  // CREATE LEAD
  createLead = asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const { name, email, source, status } =
        req.body;

      // VALIDATION
      if (!name || !email || !source) {
        const error: any = new Error(
          "Name, email and source are required"
        );

        error.statusCode = 400;

        throw error;
      }

      const lead = await leadService.createLead({
        name,
        email,
        source,
        status,

        createdBy: req.user!.id,
      });

      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: lead,
      });
    }
  );

  // GET ALL LEADS
  getLeads = asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const result =
        await leadService.getLeads({
          page: Number(req.query.page),
          limit: Number(req.query.limit),

          status: req.query.status as any,

          source: req.query.source as any,

          search: req.query.search as string,

          sort: req.query.sort as
            | "latest"
            | "oldest",
        });

      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );

  // GET SINGLE LEAD
  getSingleLead = asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const lead =
        await leadService.getSingleLead(
          req.params.id as string
        );

      res.status(200).json({
        success: true,
        data: lead,
      });
    }
  );

  // UPDATE LEAD
  updateLead = asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const lead =
        await leadService.updateLead(
          req.params.id as string,
          req.body,

          req.user!.id,
          req.user!.role
        );

      res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: lead,
      });
    }
  );

  // DELETE LEAD
  deleteLead = asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
      await leadService.deleteLead(
        req.params.id as string
      );

      res.status(200).json({
        success: true,
        message: "Lead deleted successfully",
      });
    }
  );
}

export default new LeadController();