import {
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodType } from "zod";

const validate =
  (schema: ZodType) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Validation failed",

        errors: error.errors,
      });
    }
  };

export default validate;