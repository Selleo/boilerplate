import { Controller, Get, Logger } from "@nestjs/common";
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from "@nestjs/terminus";
import { Public } from "src/common/decorators/public.decorator";
import { DrizzleOrmHealthIndicator } from "./indicator/database/drizzleorm.health";

@Controller("health")
export class HealthController {
  private readonly logger = new Logger(HealthController.name);
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: DrizzleOrmHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  async check() {
    this.logger.log("HealthCheck pinged");

    return this.health.check([
      () => this.http.pingCheck("google", "https://google.com"),
      () => this.db.pingCheck("boilerplate"),
    ]);
  }
}
