import { Processor, WorkerHost } from "@nestjs/bullmq";
import { UsersService } from "./users.service";
import { Job } from "bullmq";
import {
  USER_ALERT_QUEUE,
  UserAlertQueueJobData,
  UserAlertQueueJobPayloads,
} from "./users.queue";

type QueueUserAlertJob = Job<UserAlertQueueJobData, unknown, string>;

@Processor(USER_ALERT_QUEUE.name)
export class UsersAlertConsumer extends WorkerHost {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async process(job: QueueUserAlertJob): Promise<unknown> {
    switch (job.data.type) {
      case "SEND_ALERT_EMAIL":
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
