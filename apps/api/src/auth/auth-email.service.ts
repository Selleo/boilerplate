import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { EMAIL_QUEUE, EmailQueueJobPayloads } from "./auth.queue";

@Injectable()
export class AuthEmailService {
  private readonly jobSettings = { age: 3600 };

  constructor(@InjectQueue(EMAIL_QUEUE.name) private readonly queue: Queue) {}

  public async sendWelcomeMessageEmailAsync(
    payload: EmailQueueJobPayloads["SEND_WELCOME_EMAIL"],
  ) {
    const opts = { removeOnComplete: this.jobSettings };

    await this.queue.add(EMAIL_QUEUE.actions.SEND_WELCOME_EMAIL, payload, opts);
  }

  public async sendResetPasswordEmailAsync(
    payload: EmailQueueJobPayloads["SEND_RESET_PASSWORD_EMAIL"],
  ) {
    const opts = { removeOnComplete: this.jobSettings };

    await this.queue.add(
      EMAIL_QUEUE.actions.SEND_RESET_PASSWORD_EMAIL,
      payload,
      opts,
    );
  }
}
