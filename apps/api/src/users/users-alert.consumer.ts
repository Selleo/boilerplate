import { Processor, WorkerHost } from "@nestjs/bullmq";
import { UsersService } from "./users.service";
import { Job } from "bullmq";
import {
  QUEUE_USER_ALERT,
  QueueUserAlertJobData,
  QueueUserAlertJobPayloads,
} from "./users.queue";

@Processor(QUEUE_USER_ALERT.name)
export class UsersAlertConsumer extends WorkerHost {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async process(job: Job<QueueUserAlertJobData, unknown, string>): Promise<unknown> {
    switch (job.name) {
      case QUEUE_USER_ALERT.actions.SEND_ALERT_EMAIL:
        return this.sendAlertEmail(
          job as Job<QueueUserAlertJobPayloads["SEND_ALERT_EMAIL"]>,
        );
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  async sendAlertEmail(
    job: Job<QueueUserAlertJobPayloads["SEND_ALERT_EMAIL"]>,
  ) {
    console.log('processing job', job.id, job.data);
    const { email } = job.data;
    return this.usersService.sendAlertEmail(email);
  }
}
