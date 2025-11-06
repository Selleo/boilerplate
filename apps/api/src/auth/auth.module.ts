import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { BullModule } from "@nestjs/bullmq";
import { EMAIL_QUEUE } from "./auth.queue";
import { AuthEmailConsumer } from "./auth-email.consumer";
import { AuthEmailService } from "./auth-email.service";
import { EmailModule } from "src/common/emails/emails.module";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: EMAIL_QUEUE.name,
    }),
    BullBoardModule.forFeature({
      name: EMAIL_QUEUE.name,
      adapter: BullMQAdapter,
    }),
    EmailModule,
  ],
  providers: [AuthService, AuthEmailConsumer, AuthEmailService],
  exports: [AuthService, AuthEmailService],
})
export class AuthModule {}
