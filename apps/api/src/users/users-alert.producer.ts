import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { QUEUE_USER_ALERT, QueueUserAlertJobPayloads } from "./users.queue";

@Injectable()
export class UsersAlertProducer {
  private readonly jobSettings = { age: 3600 };

  constructor(
    @InjectQueue(QUEUE_USER_ALERT.name) private readonly queue: Queue,
  ) {}

  public async sendAlertEmail(
    jobId: string,
    payload: QueueUserAlertJobPayloads["SEND_ALERT_EMAIL"],
  ) {
    console.log('enqueue job', jobId, payload);
    const opts = { jobId, removeOnComplete: this.jobSettings };
    await this.queue.add(
      QUEUE_USER_ALERT.actions.SEND_ALERT_EMAIL,
      payload,
      opts,
    );
  }
}
