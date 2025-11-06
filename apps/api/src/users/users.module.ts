import { Module } from "@nestjs/common";
import { UsersController } from "./api/users.controller";
import { UsersService } from "./users.service";
import { FileStorageModule } from "src/file-storage";
import { UsersAlertProducer } from "./users-alert.producer";
import { UsersAlertConsumer } from "./users-alert.consumer";
import { EmailModule } from "src/common/emails/emails.module";
import { BullModule } from "@nestjs/bullmq";
import { QUEUE_USER_ALERT } from "./users.queue";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { BullBoardModule } from "@bull-board/nestjs";

@Module({
  imports: [
    FileStorageModule,
    EmailModule,
    BullModule.registerQueue({
      name: QUEUE_USER_ALERT.name,
    }),
    BullBoardModule.forFeature({
      name: QUEUE_USER_ALERT.name,
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersAlertProducer, UsersAlertConsumer],
  exports: [UsersAlertProducer],
})
export class UsersModule {}
