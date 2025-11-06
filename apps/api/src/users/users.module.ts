import { Module } from "@nestjs/common";
import { UsersController } from "./api/users.controller";
import { UsersService } from "./users.service";
import { FileStorageModule } from "src/file-storage";
import { UsersAlertService } from "./users-alert.service";
import { UsersAlertConsumer } from "./users-alert.consumer";
import { EmailModule } from "src/common/emails/emails.module";
import { BullModule } from "@nestjs/bullmq";
import { USER_ALERT_QUEUE } from "./users.queue";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { BullBoardModule } from "@bull-board/nestjs";

@Module({
  imports: [
    FileStorageModule,
    EmailModule,
    BullModule.registerQueue({
      name: USER_ALERT_QUEUE.name,
    }),
    BullBoardModule.forFeature({
      name: USER_ALERT_QUEUE.name,
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersAlertService, UsersAlertConsumer],
  exports: [UsersAlertService],
})
export class UsersModule {}
