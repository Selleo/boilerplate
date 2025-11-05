import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { BullModule } from "@nestjs/bullmq";
import { QUEUE_EMAIL } from "./auth.queue";
import { AuthEmailConsumer } from "./auth-email.consumer";
import { AuthEmailProducer } from "./auth-email.producer";
import { EmailModule } from "src/common/emails/emails.module";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: QUEUE_EMAIL.name,
    }),
    BullBoardModule.forFeature({
      name: QUEUE_EMAIL.name,
      adapter: BullMQAdapter,
    }),
    EmailModule,
  ],
  providers: [AuthService, AuthEmailConsumer, AuthEmailProducer],
  exports: [AuthService, AuthEmailProducer],
})
export class AuthModule {}
