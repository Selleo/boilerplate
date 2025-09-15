import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from "@nestjs/terminus";
import { Public } from "src/common/decorators/public.decorator";
import { DrizzleOrmHealthIndicator } from "./indicator/database/drizzleorm.health";
import { WelcomeEmail } from "@repo/email-templates";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: DrizzleOrmHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  async check() {
    console.log("Health check");
    return this.health.check([
      () => this.http.pingCheck("google", "https://google.com"),
      () => this.db.pingCheck("guidebook"),
    ]);
  }
}
