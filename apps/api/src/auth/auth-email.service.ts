import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { EMAIL_QUEUE, EmailQueueJobPayloads } from "./auth.queue";

@Injectable()
export class AuthEmailService {
  private readonly jobSettings = { age: 3600 };

  constructor(@InjectQueue(EMAIL_QUEUE.name) private readonly queue: Queue) {}

  public async sendWelcomeMessageEmailAsync(
    payload: Omit<EmailQueueJobPayloads["SEND_WELCOME_EMAIL"], "type">,
  ) {
    const opts = { removeOnComplete: this.jobSettings };
    const payloadWithType = {
      ...payload,
      type: EMAIL_QUEUE.actions.SEND_WELCOME_EMAIL,
    };
    await this.queue.add(
      EMAIL_QUEUE.actions.SEND_WELCOME_EMAIL,
      payloadWithType,
      opts,
    );
  }

  public async sendResetPasswordEmailAsync(
    payload: Omit<EmailQueueJobPayloads["SEND_RESET_PASSWORD_EMAIL"], "type">,
  ) {
    const opts = { removeOnComplete: this.jobSettings };
    const payloadWithType = {
      ...payload,
      type: EMAIL_QUEUE.actions.SEND_RESET_PASSWORD_EMAIL,
    };

    await this.queue.add(
      EMAIL_QUEUE.actions.SEND_RESET_PASSWORD_EMAIL,
      payloadWithType,
      opts,
    );
  }
}
