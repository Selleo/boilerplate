import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import basicAuth from "express-basic-auth";

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          url: configService.get<string>("REDIS_URL")!,
        },
      }),
    }),
    BullBoardModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        route: "/queues",
        adapter: ExpressAdapter,
        middleware: basicAuth({
          challenge: true,
          users: { admin: configService.get<string>("BULLBOARD_PASSWORD")! },
        }),
      }),
    }),
  ],
})
export class QueueModule {}
