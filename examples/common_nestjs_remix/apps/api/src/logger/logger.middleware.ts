import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`[${req.method}] Incoming Request: ${req.originalUrl}`);
    this.logger.debug(`Headers: ${JSON.stringify(req.headers)}`);
    if (req.method !== "GET" && req.method !== "DELETE") {
      this.logger.debug(`Body: ${JSON.stringify(req.body)}`);
    }
    next();
  }
}
