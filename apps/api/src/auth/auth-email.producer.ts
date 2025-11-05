import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { QUEUE_EMAIL, QueueEmailJobPayloads } from "./auth.queue";

@Injectable()
export class AuthEmailProducer {
  private readonly jobSettings = { age: 3600 };

  constructor(@InjectQueue(QUEUE_EMAIL.name) private readonly queue: Queue) {}

  public async newUserWelcomeMessageSent(
    jobId: string,
    payload: QueueEmailJobPayloads["SEND_WELCOME_EMAIL"],
  ) {
    const opts = { jobId, removeOnComplete: this.jobSettings };
    await this.queue.add(QUEUE_EMAIL.actions.SEND_WELCOME_EMAIL, payload, opts);
  }

  public async resetPasswordMessageSent(
    jobId: string,
    payload: QueueEmailJobPayloads["SEND_RESET_PASSWORD_EMAIL"],
  ) {
    const opts = { jobId, removeOnComplete: this.jobSettings };
    await this.queue.add(
      QUEUE_EMAIL.actions.SEND_RESET_PASSWORD_EMAIL,
      payload,
      opts,
    );
  }
}
