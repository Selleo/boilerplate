import { Processor, WorkerHost } from "@nestjs/bullmq";
import { UsersService } from "./users.service";
import { Job } from "bullmq";
import {
  USER_ALERT_QUEUE,
  UserAlertQueueJobPayloads,
} from "./users.queue";

type QueueUserAlertJob = Job<
  UserAlertQueueJobPayloads["SEND_ALERT_EMAIL"],
  unknown,
  typeof USER_ALERT_QUEUE.actions.SEND_ALERT_EMAIL
>;

@Processor(USER_ALERT_QUEUE.name)
export class UsersAlertConsumer extends WorkerHost {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async process(job: QueueUserAlertJob): Promise<unknown> {
    switch (job.name) {
      case USER_ALERT_QUEUE.actions.SEND_ALERT_EMAIL:
        return this.sendAlertEmail(job.data);
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  async sendAlertEmail(payload: UserAlertQueueJobPayloads["SEND_ALERT_EMAIL"]) {
    const { email } = payload;
    return this.usersService.sendAlertEmail(email);
  }
}
