import {
  NextFunction,
  Request,
  Response,
} from "express";
import AppError from "../utils/AppError";

const errorMiddleware = ( 
  error: AppError,  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      error.message || "Internal Server Error",
  });
};

export default errorMiddleware;