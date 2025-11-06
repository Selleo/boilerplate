import { MiddlewareConsumer, Module } from "@nestjs/common";
import { DrizzlePostgresModule } from "@knaadh/nestjs-drizzle-postgres";
import database from "./common/configuration/database";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as schema from "./storage/schema";
import { UsersModule } from "./users/users.module";
import { JwtModule } from "@nestjs/jwt";
import emailConfig from "./common/configuration/email";
import awsConfig from "./common/configuration/aws";
import fileStorageConfig from "./common/configuration/file-storage";
import { APP_GUARD } from "@nestjs/core";
import { EmailModule } from "./common/emails/emails.module";
import { FileStorageModule } from "./file-storage";
import { TestConfigModule } from "./test-config/test-config.module";
import { StagingGuard } from "./common/guards/staging.guard";
import { HealthModule } from "./health/health.module";
import { BetterAuthModule, AuthGuard } from "./auth";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { buildBetterAuthInstance } from "./lib/better-auth-options";
import { LoggerMiddleware } from "./logger/logger.middleware";
import { QueueModule } from "./queue/queue.module";

import type { DatabasePg } from "./common";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, emailConfig, awsConfig, fileStorageConfig],
      isGlobal: true,
    }),
    DrizzlePostgresModule.registerAsync({
      tag: "DB",
      useFactory(configService: ConfigService) {
        return {
          postgres: {
            url: configService.get<string>("database.url")!,
          },
          config: {
            schema: { ...schema },
          },
        };
      },
      inject: [ConfigService],
    }),
    QueueModule,
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>("jwt.secret")!,
          signOptions: {
            expiresIn: configService.get<string>("jwt.expirationTime"),
          },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    AuthModule,
    BetterAuthModule.forRootAsync({
      imports: [EmailModule, AuthModule],
      inject: [ConfigService, AuthService, "DB"],
      //@ts-expect-error types a wrong here
      useFactory: (
        configService: ConfigService,
        authService: AuthService,
        db: DatabasePg,
      ) => {
        const auth = buildBetterAuthInstance({
          db,
          env: (key) => configService.get<string>(key) ?? process.env[key],
          sendResetPasswordEmail: (data) =>
            authService.onResetPasswordEmail(data),
          sendWelcomeVerifyEmail: (data) => authService.onWelcomeEmail(data),
        });

        return { auth };
      },
    }),
    UsersModule,
    EmailModule,
    FileStorageModule,
    TestConfigModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: StagingGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
