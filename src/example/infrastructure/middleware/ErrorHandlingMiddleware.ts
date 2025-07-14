import { Request, Response, NextFunction } from "express";
import { ErrorManager } from "../tracing/ErrorManager";

export class ErrorHandlingMiddleware {
  constructor(private readonly errorManager: ErrorManager) {}

  handle(err: Error, req: Request, res: Response, next: NextFunction) {
    const { statusCode, message } = this.errorManager.handle(err);
    res.status(statusCode).json({ message });
  }
}
